
import { Article } from "@/pages/Index";

export class ResearchService {
  private static readonly OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

  private static getApiKey(): string {
    const apiKey = localStorage.getItem("openai_api_key");
    if (!apiKey) {
      throw new Error("OpenAI API key not found. Please configure your API key.");
    }
    return apiKey;
  }

  static async searchArticles(query: string): Promise<Article[]> {
    const apiKey = this.getApiKey();

    const prompt = `You are a research assistant helping to find relevant scientific articles. 
    
    Search query: "${query}"
    
    Please provide 5-7 relevant scientific articles related to this query. For each article, provide:
    - A realistic title
    - Authors (2-5 realistic author names)
    - Journal name
    - Publication year (2015-2024)
    - A comprehensive summary (2-3 sentences)
    - 2-4 key findings
    - A relevance score (0.0-1.0)
    - DOI (optional, but realistic format)

    Respond with a JSON array of articles. Make sure the articles are scientifically plausible and relevant to the query.
    
    Example format:
    [
      {
        "id": "unique-id",
        "title": "Article Title",
        "authors": ["Author One", "Author Two"],
        "journal": "Journal Name",
        "year": 2023,
        "summary": "Brief summary of the study...",
        "keyFindings": ["Finding 1", "Finding 2"],
        "relevanceScore": 0.95,
        "doi": "10.1000/journal.2023.123456"
      }
    ]`;

    try {
      const response = await fetch(this.OPENAI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are a helpful research assistant that provides accurate, well-formatted JSON responses about scientific literature."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Invalid API key. Please check your OpenAI API key.");
        }
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error("No response content received from OpenAI API");
      }

      // Extract JSON from the response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error("Could not parse JSON response from API");
      }

      const articles = JSON.parse(jsonMatch[0]);
      
      // Validate and ensure each article has required fields
      return articles.map((article: any, index: number) => ({
        id: article.id || `article-${Date.now()}-${index}`,
        title: article.title || "Untitled Article",
        authors: Array.isArray(article.authors) ? article.authors : ["Unknown Author"],
        journal: article.journal || "Unknown Journal",
        year: article.year || new Date().getFullYear(),
        summary: article.summary || "No summary available",
        keyFindings: Array.isArray(article.keyFindings) ? article.keyFindings : [],
        relevanceScore: article.relevanceScore || 0.5,
        doi: article.doi || undefined,
      }));

    } catch (error) {
      console.error("Error searching articles:", error);
      throw error;
    }
  }
}
