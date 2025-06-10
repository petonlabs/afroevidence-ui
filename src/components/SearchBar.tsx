import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  isLanding?: boolean;
}

export const SearchBar = ({ onSearch, isLoading, isLanding = false }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  if (isLanding) {
    return (
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <div className="w-6 h-6 border-2 border-green-600 rounded-full flex items-center justify-center">
              <Search className="w-3 h-3 text-green-600" />
            </div>
          </div>
          <Input
            type="text"
            placeholder="Ask a medical question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-16 pl-16 pr-16 text-lg rounded-full border-2 border-green-200 focus:border-green-600 focus-visible:ring-green-600"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !query.trim()}
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-12 w-12 rounded-full bg-green-600 hover:bg-green-700"
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search African research..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-10"
          disabled={isLoading}
        />
      </div>
      <Button 
        type="submit" 
        disabled={isLoading || !query.trim()}
        className="bg-green-600 hover:bg-green-700"
      >
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </form>
  );
};
