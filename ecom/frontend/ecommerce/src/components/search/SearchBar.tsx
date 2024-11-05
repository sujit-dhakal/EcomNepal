import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const SearchBar = () => {
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
      } else {
        router.push("/");
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          ref={searchRef}
          placeholder="what are you looking for?"
          className="bg-gray-200 h-[32px] text-center text-[13px] w-[243px] lg:w-[400px] rounded-lg"
        />
        <button
          type="submit"
          className="ml-2 bg-black text-white px-2 py-1 rounded-md"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
