import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, ExternalLink, ThumbsUp, ThumbsDown, ArrowUp } from "lucide-react";
import { useState } from "react";

// Fix: Import types from local types or define them here, not from pages
interface Article {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: string | number;
  doi?: string;
}

interface ResearchResult {
  query: string;
  explanation: string;
  articles: Article[];
  followUpQuestions: string[];
}

interface ResearchResponseProps {
  result: ResearchResult;
  onFollowUpQuestion: (question: string) => void;
}

export const ResearchResponse = ({ result, onFollowUpQuestion }: ResearchResponseProps) => {
  const [showReferences, setShowReferences] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);

  const handleDOIClick = (doi?: string) => {
    if (doi) {
      window.open(`https://doi.org/${doi}`, "_blank");
    }
  };

  return (
    <div className="space-y-6">
      {/* Query Display */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <div className="w-6 h-6 border-2 border-green-600 rounded-full flex items-center justify-center">
            <span className="text-green-600 text-sm font-bold">?</span>
          </div>
        </div>
        <div className="pl-16 py-4">
          <h1 className="text-xl font-medium">{result.query}</h1>
        </div>
      </div>

      {/* Thinking indicator */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <ChevronDown className="w-4 h-4" />
        <span className="text-sm">Finished thinking</span>
      </div>

      {/* Main explanation */}
      <div className="prose prose-lg max-w-none">
        <div className="text-foreground leading-relaxed whitespace-pre-line">
          {result.explanation}
        </div>
      </div>

      {/* Feedback buttons */}
      <div className="flex gap-2">
        <Button variant="ghost" size="sm" className="gap-2">
          <ThumbsUp className="w-4 h-4" />
          Helpful
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <ThumbsDown className="w-4 h-4" />
          Not Helpful
        </Button>
      </div>

      {/* References Section */}
      <Card>
        <CardContent className="p-6">
          <Button
            variant="ghost"
            onClick={() => setShowReferences(!showReferences)}
            className="w-full justify-between p-0 h-auto"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-muted rounded flex items-center justify-center">
                <span className="text-xs font-mono">=</span>
              </div>
              <span className="font-medium">References</span>
            </div>
            {showReferences ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>

          {showReferences && (
            <div className="mt-6 space-y-6">
              {result.articles.map((article: Article, index: number) => (
                <div key={article.id} className="border-l-2 border-muted pl-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-2 mb-2">
                        <span className="font-medium text-green-600">{index + 1}.</span>
                        <h3 className="font-medium text-green-600 hover:underline cursor-pointer">
                          {article.title}
                        </h3>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-1">
                        {article.authors.join(", ")}
                      </p>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {article.journal}. {article.year}; doi:{article.doi || "N/A"}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-1"></span>
                          New Research
                        </Badge>
                        <Badge variant="outline" className="text-xs text-blue-600">
                          ⭐ Leading Journal
                        </Badge>
                      </div>

                      {article.doi && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDOIClick(article.doi)}
                          className="mt-2 p-0 h-auto text-sm"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View Article
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ThumbsDown className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Follow-up Questions */}
      {result.followUpQuestions.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <Button
              variant="ghost"
              onClick={() => setShowFollowUp(!showFollowUp)}
              className="w-full justify-between p-0 h-auto mb-4"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-muted rounded flex items-center justify-center">
                  <span className="text-xs font-mono">=</span>
                </div>
                <span className="font-medium">Follow-Up Questions</span>
              </div>
              {showFollowUp ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>

            {(showFollowUp || true) && (
              <div className="space-y-3">
                {result.followUpQuestions.map((question: string, index: number) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-between text-left h-auto p-3 hover:bg-muted"
                    onClick={() => onFollowUpQuestion(question)}
                  >
                    <span>{question}</span>
                    <span className="text-green-600">→</span>
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Follow-up input */}
      <div className="relative">
        <div className="flex items-center gap-3 p-4 border rounded-full bg-muted/50">
          <input
            type="text"
            placeholder="Ask a follow-up question..."
            className="flex-1 bg-transparent border-none outline-none"
          />
          <Button size="icon" className="rounded-full bg-green-600 hover:bg-green-700">
            <ArrowUp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
