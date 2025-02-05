import { useRef, useState, useDeferredValue, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { VariantProps } from 'tailwind-variants';

import { useNavigationKeys } from '@/lib/hooks/useNavigationKeys.ts';
import { useClickOutside } from '@/lib/hooks/useClickOutside.ts';
import { cn } from '@/lib/utils/cn.ts';

import { selectOptionVariants, selectCommonVariants } from './select.variants';
import { DropdownIcon } from '@/components/icons/DropdownIcon';
import { ClearIcon } from '@/components/icons/ClearIcon';

export type SelectOption<T = Record<string, any>> = { title: string; value: string } & T;

export interface SelectProps<T = Record<string, any>> extends VariantProps<typeof selectCommonVariants> {
  options: Array<SelectOption<T>>;
  canClear?: boolean;
  renderOption?: (option: SelectOption<T>) => React.ReactNode;
  defaultValue?: string;
  onChange?: (value: string) => void;
  liveSearch?: boolean;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Select component
 * Features:
 * - Live search
 * - Keyboard navigation
 * - Virtualization (optimized rendering performance)
 * - Clear button
 * - Custom render option support custom data types for options
 * - Custom size and color (can be scaled with TailwindCSS variants)
 * - Exposed onChange event
 * - Custom Placeholder
 * - Custom wrapperProps (className, style etc.)
 * @param options
 * @param renderOption
 * @param canClear
 * @param defaultValue
 * @param size
 * @param color
 * @param liveSearch
 * @param onChange
 * @param placeholder
 * @param wrapperProps
 */
export const Select = <T,>({
  options,
  renderOption,
  canClear,
  defaultValue = '',
  size,
  color,
  liveSearch,
  onChange,
  placeholder = 'Select an option',
  ...wrapperProps
}: SelectProps<T>) => {
  const initialIndex = defaultValue ? options.findIndex((option) => option.value === defaultValue) : -1;
  const initialFilter = initialIndex !== -1 ? options[initialIndex].title : '';

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(initialIndex !== -1 ? initialIndex : null);

  // Virtual row height
  const [itemHeight, setItemHeight] = useState(0);

  // Live search filter
  const [filter, setFilter] = useState(initialFilter);
  const deferredFilter = useDeferredValue(filter);

  const listRef = useRef<HTMLDivElement>(null); // for rowVirtualizer
  const triggerRef = useRef<HTMLInputElement>(null); // help us to get trigger height for virtualizer
  const parentRef = useRef<HTMLDivElement>(null); // for useClickOutside

  const triggerClassnames = selectCommonVariants({ size, color, border: true, muted: !filter, clickable: !liveSearch });

  // Apply filter
  const filteredOptions = liveSearch
    ? options.filter((option) => option.title.toLowerCase().includes(deferredFilter.toLowerCase()))
    : options;

  // Virtualizer -> optimize rendering performance
  const rowVirtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => itemHeight
  });

  // Scroll to active option by index
  const scrollIntoView = (index: number) => rowVirtualizer.scrollToIndex(index, { align: 'center' });

  const updateActiveIndex = (newIndex: number | null) => {
    // Index can be 0, so we need to check if it's not null explicitly
    if (newIndex === null) {
      scrollIntoView(1);
      return;
    }
    if (newIndex >= 0 && newIndex < filteredOptions.length) {
      setActiveIndex(newIndex);
      scrollIntoView(newIndex);
    }
  };

  // Handle select change (onEnter & onChange)
  const handleSelectChange = (option: SelectOption<T> | null) => {
    if (!option) return;
    const { value, title } = option;
    setFilter(title);
    onChange?.(value);
    setIsOpen(false);
  };

  // Keyboard navigation
  const handleKeyDown = useNavigationKeys({
    onUp: () => {
      const newIndex = !activeIndex ? activeIndex : activeIndex - 1;
      updateActiveIndex(newIndex);
    },
    onDown: () => {
      // Fix for the 1st and last item (edge cases)
      const newIndex = activeIndex === null || activeIndex === filteredOptions.length - 1 ? activeIndex : activeIndex + 1;
      updateActiveIndex(newIndex);
      setIsOpen(true);
    },
    onEscape: () => setIsOpen(false),
    onEnter: () => handleSelectChange(filteredOptions[activeIndex!])
  });

  // Open dropdown and scroll to active option
  useEffect(() => {
    if (initialIndex !== activeIndex) return;
    if (initialIndex !== -1) {
      rowVirtualizer.scrollToIndex(initialIndex, { align: 'center' });
    }
  }, [isOpen, defaultValue, initialIndex, rowVirtualizer, activeIndex]);

  useEffect(() => {
    if (!triggerRef.current) return;
    setItemHeight(triggerRef.current.offsetHeight);
  }, [size]);

  useClickOutside(parentRef, () => setIsOpen(false));

  return (
    <div className="relative" onKeyDown={handleKeyDown} tabIndex={0} ref={parentRef} {...wrapperProps}>
      {/* Trigger */}
      <div ref={triggerRef} className="relative" onClick={() => setIsOpen((prev) => !prev)}>
        {liveSearch ? (
          <input
            className={triggerClassnames}
            placeholder={placeholder}
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
        ) : (
          <div className={triggerClassnames}>{filter || placeholder}</div>
        )}
        <DropdownIcon isOpen={isOpen} />
        {canClear && filter && (
          <button
            className="focus:ring-primary absolute top-0 top-1/2 right-0 right-8 h-full -translate-y-1/2 cursor-pointer px-2"
            onClick={(e) => {
              e.stopPropagation();
              setFilter('');
            }}
          >
            <ClearIcon />
          </button>
        )}
      </div>

      {/* LIST */}
      {isOpen && (
        <div className="bg-field absolute z-10 mt-1 w-full rounded-md p-[3px] shadow-lg">
          <div ref={listRef} className="fancy-scrollbar max-h-60 overflow-auto">
            <ul role="listbox" style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative' }}>
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const option = filteredOptions[virtualRow.index];
                const isSelected = option.title === filter;
                return (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    className={cn(
                      selectCommonVariants({ size }),
                      selectOptionVariants({
                        active: virtualRow.index === activeIndex,
                        selected: isSelected
                      })
                    )}
                    style={{ transform: `translateY(${virtualRow.start}px)` }} // for virtualization
                    onMouseEnter={() => setActiveIndex(virtualRow.index)}
                    onClick={() => {
                      handleSelectChange(option);
                      setIsOpen(false);
                    }}
                  >
                    {renderOption?.(option) || option.title}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// Made with ❤️ by floatrx
