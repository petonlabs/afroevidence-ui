
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ArticleCard } from "@/components/ArticleCard";
import { ResearchService } from "@/services/ResearchService";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export interface Article {
  id: string;
  title: string;
  summary: string;
  authors: string[];
  journal: string;
  year: number;
  doi?: string;
  relevanceScore: number;
  keyFindings: string[];
}

const Index = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search query");
      return;
    }

    setIsLoading(true);
    setQuery(searchQuery);
    
    try {
      const results = await ResearchService.searchArticles(searchQuery);
      setArticles(results);
      
      if (results.length === 0) {
        toast.info("No articles found for your query");
      } else {
        toast.success(`Found ${results.length} relevant articles`);
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Failed to search articles. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Research Discovery
            </h1>
            <p className="text-xl text-muted-foreground">
              AI-powered scientific literature search and analysis
            </p>
          </div>
          
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            <span className="text-lg">Searching for relevant articles...</span>
          </div>
        )}

        {!isLoading && query && articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No articles found for "{query}". Try a different search term.
            </p>
          </div>
        )}

        {!isLoading && articles.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                Search Results for "{query}"
              </h2>
              <span className="text-muted-foreground">
                {articles.length} articles found
              </span>
            </div>
            
            <div className="grid gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}

        {!query && !isLoading && (
          <div className="text-center py-12 space-y-4">
            <h2 className="text-2xl font-semibold text-muted-foreground">
              Start your research journey
            </h2>
            <p className="text-muted-foreground">
              Search for scientific articles, studies, and research papers using natural language queries
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
