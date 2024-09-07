import { useEffect, useRef, useState } from 'react';

interface SelectProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({ label, value, onChange, options, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null)
  // console.log("OPTIONA AAAJ",value, options)

  const handleSelect = (selectedValue: string) => {
    if (value.includes(selectedValue)) {
      onChange(value.filter((v) => v !== selectedValue));
    } else {
      onChange([...value, selectedValue]);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false); // Close dropdown if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside); // Add event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup
    };
  }, [])

  return (
    <div className="w-full" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 dark:text-neutral-400">{label}</label>
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`mt-2 cursor-pointer bg-white  dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-md shadow-sm p-2 ${
            disabled ? 'bg-gray-100' : ''
          }`}
        >
          <div className="flex flex-wrap gap-1 ">
            {value.length === 0 ? (
              <span className="text-gray-500 dark:text-neutral-600">Select members</span>
            ) : (
              value.map((selected) => (
                <span
                  key={selected}
                  className="inline-block bg-blue-100 dark:bg-neutral-800 text-blue-700 dark:text-white px-2 py-1 rounded-md text-sm"
                >
                  {options.find((opt) => opt.value === selected)?.label} 
                </span>
              ))
            )}
          </div>
        </div>

        {isOpen && (
          <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 dark:border-neutral-700 dark:bg-neutral-900 rounded-md shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <li
                key={option.value}
                className={`cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-neutral-950 ${
                  value.includes(option.value) ? ' dark:bg-neutral-900' : ''
                }`}
                onClick={() => handleSelect(option.value)}
              >
                <input
                  type="checkbox"
                  className="mr-2 "
                  checked={value.includes(option.value)}
                  onChange={() => handleSelect(option.value)}
                />
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;
