
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ResearchResponse } from "@/components/ResearchResponse";
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

export interface ResearchResult {
  query: string;
  explanation: string;
  articles: Article[];
  followUpQuestions: string[];
}

const Index = () => {
  const [researchResult, setResearchResult] = useState<ResearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search query");
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const result = await ResearchService.searchResearch(searchQuery);
      setResearchResult(result);
      
      if (result.articles.length === 0) {
        toast.info("No African research found for your query");
      } else {
        toast.success(`Found comprehensive African research on "${searchQuery}"`);
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Failed to search research. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    handleSearch(action);
  };

  const handleFollowUpQuestion = (question: string) => {
    handleSearch(question);
  };

  return (
    <div className="min-h-screen bg-background">
      {!hasSearched ? (
        // Landing page design
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
                onClick={() => handleQuickAction("Quick facts about traditional African medicine")}
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Ask for a Quick Fact
              </Button>
              
              <Button
                variant="outline"
                className="h-12 px-6 rounded-full border-2 hover:bg-accent"
                onClick={() => handleQuickAction("Treatment alternatives in African traditional medicine")}
              >
                <Stethoscope className="w-4 h-4 mr-2" />
                Ask about Treatment Alternatives
              </Button>
              
              <Button
                variant="outline"
                className="h-12 px-6 rounded-full border-2 hover:bg-accent"
                onClick={() => handleQuickAction("African research in local languages")}
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
                <div className="flex gap-2">
                  <Button variant="outline">Share</Button>
                  <Button className="bg-orange-500 hover:bg-orange-600">New Question</Button>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-8 max-w-4xl">
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mr-2" />
                <span className="text-lg">Searching African research databases...</span>
              </div>
            )}

            {!isLoading && researchResult && (
              <ResearchResponse 
                result={researchResult} 
                onFollowUpQuestion={handleFollowUpQuestion}
              />
            )}

            {!isLoading && hasSearched && !researchResult && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No African research found. Try a different search term.
                </p>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default Index;
