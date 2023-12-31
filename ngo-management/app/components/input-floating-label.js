"use client";
import { useEffect, useState } from 'react';


export default function InputWithFloatingLabel({ label , ...rest }) {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = (e) => {
    if (!e.target.value) {
      setFocused(false);
    }
  };

  useEffect(() => {
    if (rest.value) {
      setFocused(true);
    }
  }, []);

  return (
    <div className="relative">
      <label
        className={`absolute top-0 left-2 transition-all  ${focused ? 'text-sm opacity-100' : 'text-2xl opacity-80'}`}
        htmlFor={rest.id}
      >
        {label}
      </label>
      <input
        {...rest}
        className={`block text-xl w-full px-4 border-b-2 border-stone-700 backgroundDarkColor ${focused ? 'outline-none h-14 pt-4' : 'h-10'}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
}
