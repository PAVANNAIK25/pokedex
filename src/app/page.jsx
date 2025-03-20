import PokemonGrid from "@/components/Pokemon-grid";
import SearchBar from "@/components/search-bar";

export default function Home() {
  return (
    <main className="container mx-auto px-8 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">PokéDex</h1>
      <SearchBar />
      <PokemonGrid />
    </main>
  );
}
