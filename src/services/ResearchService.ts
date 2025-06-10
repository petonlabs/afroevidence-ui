import { Article, ResearchResult } from "@/pages/Index";
import { SearchHistoryService } from "./SearchHistoryService";

export class ResearchService {
  private static readonly OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
  
  private static getApiKey(): string {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OpenAI API key not found. Please check your .env.local file.");
    }
    return apiKey;
  }

  static async searchResearch(query: string): Promise<ResearchResult> {
    const prompt = `You are a research assistant specializing in African medical and scientific research. 
    
    Search query: "${query}"
    
    Please provide:
    1. A comprehensive explanation (2-3 paragraphs) synthesizing African research on this topic
    2. 3-5 relevant African research articles with citations
    3. 3-4 follow-up questions related to the topic
    
    Focus on:
    - Research from African universities and institutions
    - Studies on African populations
    - Traditional African medicine research
    - Public health research from African countries
    - Clinical studies conducted in Africa
    
    For the explanation, write in a scholarly but accessible tone, citing research findings and providing context specific to African healthcare and research.
    
    For each article, provide realistic:
    - Title relevant to African research
    - African authors/researchers (2-4 names)
    - African journal or international journal with African research
    - Publication year (2018-2024)
    - DOI in realistic format
    
    For follow-up questions, suggest clinically relevant questions that would naturally arise from the topic.

    Respond with a JSON object in this exact format:
    {
      "explanation": "Comprehensive explanation text...",
      "articles": [
        {
          "id": "unique-id",
          "title": "Article Title",
          "authors": ["Dr. Name", "Prof. Name"],
          "journal": "Journal Name",
          "year": 2023,
          "summary": "Brief summary",
          "keyFindings": ["Finding 1", "Finding 2"],
          "relevanceScore": 0.95,
          "doi": "10.1000/journal.2023.123456"
        }
      ],
      "followUpQuestions": [
        "Question 1?",
        "Question 2?",
        "Question 3?"
      ]
    }`;

    try {
      const response = await fetch(this.OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getApiKey()}`
        },
        body: JSON.stringify({
          model: "gpt-4-turbo-preview",
          messages: [
            {
              role: "system",
              content: "You are a research assistant specializing in African medical and scientific research. Provide accurate, well-structured responses in the exact JSON format requested."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      const result = JSON.parse(data.choices[0].message.content) as ResearchResult;
      
      // Save to search history
      SearchHistoryService.saveSearch(query, result);
      
      return result;
      
    } catch (error) {
      console.error("Error searching research:", error);
      throw error;
    }
  }

  static async searchArticles(query: string): Promise<Article[]> {
    const result = await this.searchResearch(query);
    return result.articles;
  }
}
