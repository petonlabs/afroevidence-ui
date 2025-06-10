
import { ResearchResult } from "@/pages/Index";

export interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: Date;
  result: ResearchResult;
}

export class SearchHistoryService {
  private static readonly STORAGE_KEY = 'afro-evidence-search-history';

  static saveSearch(query: string, result: ResearchResult): void {
    const historyItem: SearchHistoryItem = {
      id: Date.now().toString(),
      query,
      timestamp: new Date(),
      result
    };

    const existingHistory = this.getSearchHistory();
    const updatedHistory = [historyItem, ...existingHistory].slice(0, 50); // Keep last 50 searches
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedHistory));
  }

  static getSearchHistory(): SearchHistoryItem[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return [];
    
    try {
      const parsed = JSON.parse(stored);
      return parsed.map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp)
      }));
    } catch {
      return [];
    }
  }

  static deleteSearchItem(id: string): void {
    const history = this.getSearchHistory();
    const filtered = history.filter(item => item.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
  }

  static clearHistory(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
