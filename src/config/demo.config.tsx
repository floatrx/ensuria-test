// Just for demo -> we can use any type of data for options, but title and value are required!
import type { SelectOption, SelectProps } from '@/components/Select/Select';
import { getRandomEmoji } from '@/lib/utils/emoji.ts';

export type TCustomData = { emoji?: string };

export const options100k: SelectOption<TCustomData>[] = Array.from({ length: 100000 }, (_, index) => ({
  title: `Option ${index + 1}`,
  value: `${index + 1}`,
  emoji: getRandomEmoji()
}));

export const selectConfigs: (SelectProps<TCustomData> & { label: string })[] = [
  {
    label: 'Large / with LiveSearch / CanClear',
    options: options100k,
    liveSearch: true,
    canClear: true,
    defaultValue: '22',
    size: 'large',
    renderOption: ({ title, value, emoji }) => (
      <span className="flex gap-1">
        {emoji} {title} <span className="flex-1" /> <span className="text-foreground text-xs">#{value}</span>
      </span>
    )
  },
  { label: 'Medium / CanClear', options: options100k, canClear: true, size: 'medium' },
  { label: 'Small / CanClear', options: options100k, canClear: true, size: 'small' }
];
