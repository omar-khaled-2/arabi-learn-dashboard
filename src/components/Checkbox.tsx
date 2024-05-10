"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Checkbox = ({ ...props }) => {
  const [options, setOptions] = useState<string[]>(
    Array(4)
      .fill("")
      .map(() => (Date.now() - Math.floor(Math.random() * 1000)).toString(36)),
  );

  const addOption = () => {
    setOptions([...options, Date.now().toString(36)]);
  }
  const deleteOption = (option: string) => {
    setOptions(options.filter((o) => o !== option));
  }
  return (
    <div className="flex flex-col gap-6 max-w-md">
      {options.map((option, index) => (
        <div key={option} className="flex flex-row gap-4 items-center">
          <input type="checkbox" name="correctOption" value={index} />
          <input className="input flex-1"  name="option" required />
          <button onClick={() => deleteOption(option)} type="button">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

      ))}
      <button className="btn btn-primary" onClick={addOption} type="button">
        Add Option
      </button>
    </div>
  );
};

export default Checkbox;
