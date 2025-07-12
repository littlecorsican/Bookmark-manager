import React, { useContext, useCallback, useState, useEffect } from "react";
import { GlobalContext } from "./Client";
import TextInput from "./Shared/TextInput";
import Button from "./Shared/Button";
import { Search, X, Filter } from "lucide-react";
import { debounce } from "lodash";
import { SearchBarProps } from "@/types/types";

interface SearchFilters {
  title: string;
  description: string;
  url: string;
  tags: string[];
  minVisits?: number;
  maxVisits?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ setFilterText }) => {
  const context = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    title: "",
    description: "",
    url: "",
    tags: []
  });

  const debouncedSetFilterText = useCallback(
    debounce((value: string) => {
      setFilterText(value);
    }, 300),
    [setFilterText]
  );

  useEffect(() => {
    debouncedSetFilterText(searchTerm);
  }, [searchTerm, debouncedSetFilterText]);

  const handleClearSearch = () => {
    setSearchTerm("");
    setFilterText("");
    setFilters({
      title: "",
      description: "",
      url: "",
      tags: []
    });
  };

  return (
    <div className="space-y-2 my-2">
      <div className="flex space-x-4 items-center">
        <div className="flex items-center flex-1">
          <Search className="mr-2 text-gray-400" />
          <TextInput
            id="search"
            placeholder="Search bookmarks by title, description, or URL..."
            label=""
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button
              onClick={handleClearSearch}
              className="ml-2 p-1"
              tooltip="Clear search"
            >
              <X size={16} />
            </Button>
          )}
        </div>
        
        <Button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="px-3 py-1 text-sm"
          tooltip={showAdvanced ? "Hide advanced search" : "Show advanced search"}
        >
          <Filter size={16} />
        </Button>
      </div>

      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              value={filters.title}
              onChange={(e) => setFilters({ ...filters, title: e.target.value })}
              placeholder="Search in title..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              value={filters.description}
              onChange={(e) => setFilters({ ...filters, description: e.target.value })}
              placeholder="Search in description..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              value={filters.url}
              onChange={(e) => setFilters({ ...filters, url: e.target.value })}
              placeholder="Search in URL..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Visits
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              value={filters.minVisits || ""}
              onChange={(e) => setFilters({ ...filters, minVisits: parseInt(e.target.value) || undefined })}
              placeholder="Minimum visits..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Visits
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              value={filters.maxVisits || ""}
              onChange={(e) => setFilters({ ...filters, maxVisits: parseInt(e.target.value) || undefined })}
              placeholder="Maximum visits..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              value={filters.tags.join(", ")}
              onChange={(e) => setFilters({ ...filters, tags: e.target.value.split(",").map(tag => tag.trim()).filter(Boolean) })}
              placeholder="tag1, tag2, tag3..."
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
