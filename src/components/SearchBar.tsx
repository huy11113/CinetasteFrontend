import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export default function SearchBar({
  placeholder = "Search movies, dishes, or ingredients...",
  onSearch,
  className = ""
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-4 bg-cinematic-gray-light/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cinematic-accent focus:ring-2 focus:ring-cinematic-accent/50 transition-all duration-300"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-cinematic-accent hover:bg-cinematic-accent-light rounded-lg text-white font-medium transition-all duration-300"
      >
        Search
      </button>
    </form>
  );
}
