"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SearchHistoryService, SearchHistoryItem } from '@/services/SearchHistoryService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Search, Trash2, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const SearchHistory = () => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  useEffect(() => {
    setHistory(SearchHistoryService.getSearchHistory());
  }, []);

  const handleDeleteItem = (id: string) => {
    SearchHistoryService.deleteSearchItem(id);
    setHistory(SearchHistoryService.getSearchHistory());
    toast.success('Search item deleted');
  };

  const handleClearAll = () => {
    SearchHistoryService.clearHistory();
    setHistory([]);
    toast.success('Search history cleared');
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Search History</h1>
          </div>
          {history.length > 0 && (
            <Button 
              variant="outline" 
              onClick={handleClearAll}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>
        {history.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No search history yet</h3>
              <p className="text-muted-foreground mb-4">
                Start searching for African research to build your history
              </p>
              <Link href="/">
                <Button className="bg-green-600 hover:bg-green-700">
                  Start Searching
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{item.query}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(item.timestamp)}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {item.result.explanation.substring(0, 200)}...
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {item.result.articles.length} articles found
                    </span>
                    <Link href={`/?q=${encodeURIComponent(item.query)}`}>
                      <Button size="sm" variant="outline">
                        View Results
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHistory;
