import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }: { onSearch: () => void }) => {
  const locale = useLocale();
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchRef.current) {
      const query = searchRef.current.value;
      if (query) {
        router.push(
          `/${locale}/search?query=${encodeURIComponent(
            searchRef.current.value
          )}`
        );
        searchRef.current.value = "";
        onSearch();
      } else {
        router.push("/");
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="text"
            ref={searchRef}
            placeholder="What are you looking for?"
            className="bg-gray-200 pr-9 h-[36px] text-center text-base w-full xl:w-[350px] rounded-lg"
          />
          <div className="absolute top-2 right-2 text-gray-500" aria-label="Search">
            <FaSearch size={20} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
