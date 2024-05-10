"use client";

import { useState } from "react";

import { XMarkIcon } from "@heroicons/react/24/outline";

interface McqInputProps {
  optionName: string;
  correctOptionName: string;
}
const McqInput = () => {
  const [options, setOptions] = useState<string[]>(
    Array(3)
      .fill("")
      .map(() => (Date.now() - Math.floor(Math.random() * 1000)).toString(36)),
  );

  const addOption = () => {
    setOptions([...options, Date.now().toString(36)]);
  };

  const deleteOption = (option: string) => {
    setOptions(options.filter((o) => o !== option));
  };
  return (
    <div className="flex flex-col gap-5 max-w-md">
      {options.map((option, index) => (
        <div
          key={option}
          className="flex flex-row gap-4 items-center justify-between"
        >
          <input type="radio" name="correctOption" value={index} required />
          <input className="input flex-1" name="option" required />
          <button onClick={() => deleteOption(option)} type="button">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      ))}
      

      <button onClick={addOption} className="btn btn-primary" type="button">
        Add Option
      </button>
    </div>
  );
};

export default McqInput;
