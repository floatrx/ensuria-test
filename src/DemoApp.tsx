import { Select } from '@/components/Select/Select';
import { selectConfigs } from '@/config/demo.config';

export const DemoApp = () => (
  <div className="text-foreground mx-auto max-w-[400px] space-y-2 p-10">
    <h1 className="text-primary mb-5 text-2xl font-semibold">Select / Demos</h1>
    {/* Render the select demos */}
    {selectConfigs.map((config, index) => (
      <div key={index}>
        <div className={`text-${config.size}`}>{config.label}</div>
        <Select {...config} />
      </div>
    ))}
  </div>
);
