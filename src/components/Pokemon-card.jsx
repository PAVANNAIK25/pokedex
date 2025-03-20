"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Type color mapping
const typeColors = {
  normal: "bg-gray-400",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-200",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-700",
  flying: "bg-indigo-300",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-yellow-800",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-700",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};

export default function PokemonCard({ pokemon }) {
  const [isFlipped, setIsFlipped] = useState(false);

  //   const mainType = pokemon.types[0]?.type.name || "normal";
  const cardBgClass =
    "bg-gradient-to-br from-white to-gray-100 hover:from-gray-50 hover:to-gray-200";

  const formatStatName = (name) => {
    switch (name) {
      case "hp":
        return "HP";
      case "attack":
        return "ATK";
      case "defense":
        return "DEF";
      case "special-attack":
        return "SP.ATK";
      case "special-defense":
        return "SP.DEF";
      case "speed":
        return "SPD";
      default:
        return name.toUpperCase();
    }
  };

  const formatPokemonId = (id) => `#${id.toString().padStart(3, "0")}`;

  const formatPokemonName = (name) =>
    name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 transform ${cardBgClass} ${
        isFlipped ? "rotate-y-180" : ""
      } cursor-pointer`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`transition-opacity duration-300 ${isFlipped ? "hidden" : "block"}`}
      >
        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold capitalize">
              {formatPokemonName(pokemon.name)}
            </h3>
            <span className="text-gray-500 font-semibold">
              {formatPokemonId(pokemon.id)}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="relative h-48 w-full mb-4">
            <Image
              src={
                pokemon.sprites.other["official-artwork"].front_default ||
                "/placeholder.svg?height=200&width=200"
              }
              alt={pokemon.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
          <div className="flex gap-2 mt-2">
            {pokemon.types.map((type) => (
              <Badge
                key={type.type.name}
                className={`${typeColors[type.type.name] || "bg-gray-400"} text-white`}
              >
                {type.type.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </div>

      <div
        className={`transition-opacity duration-300 ${isFlipped ? "block" : "hidden"}`}
      >
        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold capitalize">
              {formatPokemonName(pokemon.name)}
            </h3>
            <span className="text-gray-500 font-semibold">
              {formatPokemonId(pokemon.id)}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h4 className="font-semibold mb-2">Base Stats</h4>
          <div className="space-y-3">
            {pokemon.stats.map((stat) => (
              <div
                key={stat.stat.name}
                className="grid grid-cols-[80px_1fr] gap-2 items-center"
              >
                <span className="text-sm font-medium">
                  {formatStatName(stat.stat.name)}
                </span>
                <div className="flex items-center gap-2">
                  <Progress value={stat.base_stat} max={255} className="h-2" />
                  <span className="text-sm font-semibold w-8">
                    {stat.base_stat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <p className="text-sm text-gray-500 italic">Click to see front</p>
        </CardFooter>
      </div>
    </Card>
  );
}
