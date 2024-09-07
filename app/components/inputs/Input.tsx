"use client"

import clsx from "clsx";
import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type = 'text',
  required,
  register,
  errors,
  disabled,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900 dark:text-neutral-400"
      >
        {label}
      </label>
      <div className="mt-2 ">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={`
            form-input
            block 
            w-full 
            rounded-sm 
            border-0 
            py-1.5 
            pl-2
            text-gray-900 
            dark:text-neutral-400
            shadow-sm 
            ring-1 
            ring-inset 
            ring-gray-300 dark:ring-neutral-700
            placeholder:text-gray-400 
            dark:focus:ring-1
            focus:ring-inset 
            focus:ring-sky-600 
            focus:border-sky-600
            sm:text-sm 
            sm:leading-6
            ${errors[id] && 'ring-rose-500'}
            ${disabled && 'opacity-50 cursor-default'}
          `}
        />
      </div>
      {errors[id] && (
        <p className="mt-1 text-sm text-rose-500">
          {errors[id]?.message?.toString() || 'This field is required.'}
        </p>
      )}
    </div>
  );
};

export default Input; 

