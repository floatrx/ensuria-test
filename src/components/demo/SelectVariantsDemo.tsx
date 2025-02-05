import { Select } from '@/components/Select';
import { selectConfigs } from '@/config/demo.config';

export const SelectVariantsDemo = () => {
  return (
    <section className="space-y-4">
      {/* Render the select demos */}
      {selectConfigs.map((config, index) => (
        <div key={index}>
          <div className={`text-${config.size} mb-1`}>{config.label}</div>
          <Select {...config} />
        </div>
      ))}
    </section>
  );
};
