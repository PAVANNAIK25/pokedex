"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PokemonCard from "./Pokemon-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "./ui/button";

export default function PokemonGrid() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 12;

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        if (searchQuery) {
          try {
            const res = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`,
            );
            if (res.ok) {
              const data = await res.json();
              setPokemon([data]);
            } else {
              setPokemon([]);
            }
          } catch (error) {
            console.error("Error fetching specific pokemon:", error);
            setPokemon([]);
          }
        } else {
          const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
          );
          const data = await res.json();

          const pokemonDetails = await Promise.all(
            data.results.map(async (p) => {
              const res1 = await fetch(p.url);
              return res1.json();
            }),
          );

          setPokemon(pokemonDetails);
        }
      } catch (error) {
        console.error("Error fetching pokemon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [searchQuery, offset]);

  const loadMore = () => {
    setOffset((prev) => prev + limit);
  };

  const loadPrevious = () => {
    setOffset((prev) => Math.max(0, prev - limit));
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {Array(limit)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <Skeleton className="h-48 w-full" />
              <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  if (pokemon.length === 0) {
    return (
      <div className="text-center mt-12">
        <h2 className="text-2xl font-semibold">No Pokémon found</h2>
        <p className="text-gray-500 mt-2">
          Try searching for a different Pokémon
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {pokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>

      {!searchQuery && (
        <div className="flex justify-center mt-8 gap-4">
          <Button
            onClick={loadPrevious}
            disabled={offset === 0}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50"
          >
            Previous
          </Button>
          <Button
            onClick={loadMore}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
