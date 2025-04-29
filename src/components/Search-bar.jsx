"use client";

import { useState, useTransition, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      startTransition(() => {
        router.push(`?search=${encodeURIComponent(searchQuery.trim())}`);
      });
    } else {
      clearSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    startTransition(() => {
      router.push("/");
    });
  };

  return (
    <Suspense fallback={<p> Loading... </p>}>
      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search Pokémon by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <Button type="submit" disabled={isPending}>
          Search
        </Button>
      </form>
    </Suspense>
  );
}
