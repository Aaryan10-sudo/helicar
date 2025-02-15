import { useState } from "react";
import { SearchIcon } from "../../../assets/NavBarIcons";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleValueChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="w-[297px] border border-[#00000080] flex justify-between items-center rounded-[10px] p-[10px]">
      <input
        type="text"
        value={query}
        onChange={handleValueChange}
        className="w-full border-none outline-none"
      />
      <button
        onClick={() => {
          console.log(query);
        }}
        className="flex gap-[3px] items-center justify-center text-[#00000080] hover:cursor-pointer"
      >
        <SearchIcon />
        <label className="hover:cursor-pointer">Search</label>
      </button>
    </div>
  );
};

export default SearchBar;
