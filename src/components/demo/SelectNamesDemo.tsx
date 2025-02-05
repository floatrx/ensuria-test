import { Select } from '@/components/Select/Select';
import { useNames } from '@/lib/api/names';
import { useState } from 'react';

const MAX_NAMES = 100000;

export const SelectNamesDemo = () => {
  const { isPending, error, data } = useNames(MAX_NAMES);
  const [value, setValue] = useState('');

  if (isPending) return <div className="py-2">⏳ Loading names...</div>;

  if (error) return <div className="py-2">⚠️ An error has occurred: {error.message}</div>;

  if (!data) return <div className="py-2">No data!</div>;

  const options = data?.results?.map(({ objectId, Name, ...item }) => ({
    value: objectId,
    title: Name,
    icon: item.Gender === 'male' ? '👨' : '👩‍🦰',
    ...item
  }));

  return (
    <section>
      <h2>Names API / Demo / 100k</h2>
      <Select
        liveSearch
        canClear
        options={options}
        renderOption={({ title, icon }) => (
          <div className="flex items-center">
            <div className="mr-2">{icon}</div>
            <div>{title}</div>
          </div>
        )}
        onChange={setValue}
      />
      <pre className="mt-1 text-xs">
        <code>{JSON.stringify({ value })}</code>
      </pre>
    </section>
  );
};
