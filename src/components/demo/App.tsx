import { SelectNamesDemo } from './SelectNamesDemo';
import { SelectVariantsDemo } from './SelectVariantsDemo';

export const App = () => (
  <div className="text-foreground mx-auto max-w-[400px] space-y-5 p-10">
    <h1 className="text-primary mb-5 text-2xl font-semibold">Select / Demos</h1>

    <SelectNamesDemo />
    <SelectVariantsDemo />

    <a
      href="https://github.com/floatrx/ensuria-test"
      target="_blank"
      rel="noopener"
      className="opacity-20 transition duration-300 ease-in-out hover:opacity-100"
    >
      Source code on GitHub »
    </a>
  </div>
);
