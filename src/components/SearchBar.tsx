
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Settings } from "lucide-react";
import { ApiKeyDialog } from "@/components/ApiKeyDialog";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [showApiDialog, setShowApiDialog] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const hasApiKey = localStorage.getItem("openai_api_key");

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search for research papers, studies, or topics (e.g., 'COVID-19 vaccine effectiveness', 'machine learning in healthcare')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 text-base"
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          disabled={isLoading || !query.trim() || !hasApiKey}
          size="lg"
          className="px-8"
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </form>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {hasApiKey ? (
            <span className="text-green-600">✓ API Key configured</span>
          ) : (
            <span className="text-amber-600">⚠ API Key required</span>
          )}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowApiDialog(true)}
          className="gap-2"
        >
          <Settings className="h-4 w-4" />
          {hasApiKey ? "Update API Key" : "Set API Key"}
        </Button>
      </div>

      <ApiKeyDialog 
        open={showApiDialog} 
        onOpenChange={setShowApiDialog} 
      />
    </div>
  );
};
