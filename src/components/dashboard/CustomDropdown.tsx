"use client"

import React, { useState } from 'react'
import { MdKeyboardArrowDown } from "react-icons/md";

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  placeholder: string;
  onSelect: (option: Option) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, placeholder, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <div
        className="text-[14px] flex items-center justify-between text-gray-800 capitalize font-[500]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? selectedOption.label : placeholder}
        <MdKeyboardArrowDown />
      </div>
      {isOpen && (
        <div className="absolute w-full rounded mt-1 bg-white z-10">
          {options.map((option) => (
            <div
              key={option.value}
              className="text-[12px] py-1 capitalize text-gray-800"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;