import { FC, InputHTMLAttributes } from 'react';

interface ITermToggleButtonProps extends InputHTMLAttributes<HTMLInputElement> {}

const TermToggleButton: FC<ITermToggleButtonProps> = (props) => {
  return (
    <div className="flex items-center gap-3 mt-10">
      <p className="text-l font-medium text-gray-1000">Bill Monthly</p>
      <label htmlFor="term-toggle" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            {...props}
            id="term-toggle"
            className="term-toggle-input sr-only"
            type="checkbox"
          />
          <div className="block bg-gray-1500 w-16 h-8 rounded-2xl"></div>
          <div className="dot absolute right-1 top-1/2 -translate-y-1/2 bg-white w-6 h-6 rounded-full transition"></div>
        </div>
      </label>
      <p className="text-l font-medium text-gray-1000">Bill Annually</p>
    </div>
  );
};

export default TermToggleButton;
