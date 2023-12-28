import { Dispatch, FC, SetStateAction } from 'react';

interface ISuggestionsProps {
  onSelectSuggestion: (item: string) => void;
  suggestionList?: string[];
}

const Suggestions: FC<ISuggestionsProps> = ({ onSelectSuggestion, suggestionList = [] }) => {
  return (
    <div className="suggestions">
      <p className="text-s text-gray-500 mb-2.5">Suggestions</p>
      <ul className="flex flex-wrap -mx-[5px] -mt-2.5">
        {suggestionList.map((item, index) => (
          <li
            key={index}
            className="px-[5px] pt-2.5 cursor-pointer"
            onClick={() => onSelectSuggestion(item)}
          >
            <p className="text-s text-black rounded-lg shadow-s bg-white px-3 py-2.5 w-fit">
              {item}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Suggestions;
