import { tv } from 'tailwind-variants';

/**
 * Use this to style the select options and trigger.
 */
export const selectCommonVariants = tv({
  base: 'bg-field text-field-foreground w-full rounded-md focusable',
  variants: {
    size: {
      small: 'text-sm px-2 py-1',
      medium: 'text-base px-4 py-2',
      large: 'text-lg px-5 py-3'
    },
    border: {
      true: 'border border-field-border shadow-md'
    },
    muted: {
      true: 'text-field-foreground/30'
    },
    clickable: {
      true: 'cursor-pointer select-none'
    },
    true: 'border border-field-border',
    color: {
      primary: 'focus:ring-primary'
    }
  },
  defaultVariants: {
    size: 'medium',
    color: 'primary'
  }
});

/**
 * Use this to style the select options.
 */
export const selectOptionVariants = tv({
  base: 'bg-field-foreground/5 text-field-foreground absolute top-0 left-0 w-full cursor-pointer select-none focusable line-clamp-1 text-nowrap',
  variants: {
    active: {
      true: 'bg-primary text-primary-foreground'
    },
    selected: {
      true: 'bg-primary/30 text-primary'
    }
  }
});
