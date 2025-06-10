
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ArticleCard } from "@/components/ArticleCard";
import { ResearchService } from "@/services/ResearchService";
import { Loader2, Lightbulb, Stethoscope, Globe } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

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
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search query");
      return;
    }

    setIsLoading(true);
    setQuery(searchQuery);
    setHasSearched(true);
    
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
      toast.error("Failed to search articles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    handleSearch(action);
  };

  return (
    <div className="min-h-screen bg-background">
      {!hasSearched ? (
        // Landing page design matching OpenEvidence
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <div className="w-full max-w-4xl mx-auto text-center space-y-8">
            {/* Logo */}
            <div className="mb-12">
              <h1 className="text-5xl md:text-6xl font-normal text-foreground tracking-tight">
                AfroEvidence
                <span className="inline-block w-3 h-3 bg-orange-500 rounded-full ml-2 mb-2"></span>
              </h1>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-4xl mx-auto">
              <SearchBar onSearch={handleSearch} isLoading={isLoading} isLanding={true} />
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button
                variant="outline"
                className="h-12 px-6 rounded-full border-2 hover:bg-accent"
                onClick={() => handleQuickAction("Ask for a Quick Fact about African medicine")}
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Ask for a Quick Fact
              </Button>
              
              <Button
                variant="outline"
                className="h-12 px-6 rounded-full border-2 hover:bg-accent"
                onClick={() => handleQuickAction("Ask about Treatment Alternatives in African traditional medicine")}
              >
                <Stethoscope className="w-4 h-4 mr-2" />
                Ask about Treatment Alternatives
              </Button>
              
              <Button
                variant="outline"
                className="h-12 px-6 rounded-full border-2 hover:bg-accent"
                onClick={() => handleQuickAction("Ask about African research in local languages")}
              >
                <Globe className="w-4 h-4 mr-2" />
                Ask about Local Research
              </Button>
            </div>

            {/* Explore More */}
            <div className="pt-8">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Explore More Capabilities
                <span className="ml-2">↓</span>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        // Search results page
        <div>
          {/* Header with search */}
          <header className="border-b bg-card sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-semibold text-foreground">
                  AfroEvidence
                  <span className="inline-block w-2 h-2 bg-orange-500 rounded-full ml-1 mb-1"></span>
                </h1>
                <div className="flex-1 max-w-2xl">
                  <SearchBar onSearch={handleSearch} isLoading={isLoading} isLanding={false} />
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-8">
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mr-2" />
                <span className="text-lg">Searching African research databases...</span>
              </div>
            )}

            {!isLoading && query && articles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No African research articles found for "{query}". Try a different search term.
                </p>
              </div>
            )}

            {!isLoading && articles.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">
                    African Research Results for "{query}"
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
          </main>
        </div>
      )}
    </div>
  );
};

export default Index;
