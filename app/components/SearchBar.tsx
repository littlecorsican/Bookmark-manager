import React, { useContext, useCallback } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import TextInput from "./Shared/TextInput";
// import Button from "./Shared/Button";
import { Search } from "lucide-react";
import { debounce } from "lodash";


interface SearchBarProps {
    setFilterText: React.Dispatch<React.SetStateAction<string>>;
}
  
  const SearchBar: React.FC<SearchBarProps> = ({ setFilterText }) => {
  const context = useContext(GlobalContext);

    const debouncedSetFilterText = useCallback(
        debounce((value: string) => {
          setFilterText(value);
        }, 1000),
        [setFilterText]
    );
    

  return (
    <div className="flex space-x-4 my-2">
      <div className="flex items-center">
        <Search />
      </div>
      <TextInput
          id="search"
          placeholder=""
          label=""
          onChange={(e) => {
              debouncedSetFilterText(e.target.value);
          }}
      />
      {/* <Button className="bg-blue-500 text-white">
          <Search />
      </Button> */}
    </div>
  );
};

export default SearchBar;
