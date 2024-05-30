import React, { useState } from "react";

const ToggleableTextField = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex items-center">
      <input
        type={showPassword ? "text" : "password"}
        value={inputValue}
        onChange={handleChange}
        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black mr-2"
        placeholder="Textfield"
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className="focus:outline-none"
      >
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>
  );
};

export default ToggleableTextField;
