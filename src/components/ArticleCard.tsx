
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Users, Calendar, BookOpen } from "lucide-react";
import { Article } from "@/pages/Index";

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const handleDOIClick = () => {
    if (article.doi) {
      window.open(`https://doi.org/${article.doi}`, "_blank");
    }
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl leading-tight">
            {article.title}
          </CardTitle>
          <Badge variant="outline" className="shrink-0">
            {Math.round(article.relevanceScore * 100)}% match
          </Badge>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{article.authors.slice(0, 3).join(", ")}</span>
            {article.authors.length > 3 && (
              <span>+{article.authors.length - 3} more</span>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{article.journal}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{article.year}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">Summary</h4>
          <p className="text-muted-foreground leading-relaxed">
            {article.summary}
          </p>
        </div>
        
        {article.keyFindings.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Key Findings</h4>
            <ul className="space-y-1">
              {article.keyFindings.map((finding, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {article.doi && (
          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDOIClick}
              className="gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              View Full Article
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
