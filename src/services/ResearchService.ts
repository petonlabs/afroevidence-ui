import { Article, ResearchResult } from "@/pages/Index";
import { SearchHistoryService } from "./SearchHistoryService";

export class ResearchService {
  private static readonly OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
  
  // This will be replaced with your backend API key
  private static readonly API_KEY = "your-api-key-here";

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
      // For now, return mock data since the API key will be configured in your backend
      const result = this.getMockResearchResult(query);
      
      // Save to search history
      SearchHistoryService.saveSearch(query, result);
      
      return result;
      
    } catch (error) {
      console.error("Error searching research:", error);
      throw error;
    }
  }

  private static getMockResearchResult(query: string): ResearchResult {
    // Mock comprehensive response for demonstration
    return {
      query: query,
      explanation: `Based on African research, ${query.toLowerCase()} represents a significant health concern across the continent, with unique epidemiological patterns and treatment approaches that differ from those observed in other regions. Studies conducted by African researchers have identified several key factors that influence disease progression and treatment outcomes in African populations.

Research from institutions across Africa, including the University of Cape Town, Makerere University, and the University of Ibadan, has demonstrated that traditional African medicine plays an important complementary role in healthcare delivery. These studies have documented the efficacy of indigenous plant-based treatments and their integration with conventional medical approaches, showing promising results in community-based healthcare settings.

Current treatment protocols developed specifically for African populations take into account genetic variations, nutritional factors, and socioeconomic conditions that are prevalent across the continent. Large-scale epidemiological studies have provided evidence for culturally adapted intervention strategies that have shown superior outcomes compared to standard international protocols when implemented in African healthcare systems.`,
      articles: [
        {
          id: "african-research-2024-1",
          title: `${query} Management in Sub-Saharan Africa: A Comprehensive Review`,
          authors: ["Dr. Amina Kone", "Prof. Kwame Asante", "Dr. Fatou Diallo"],
          journal: "African Journal of Medicine",
          year: 2024,
          summary: `Comprehensive review of ${query.toLowerCase()} management strategies across Sub-Saharan Africa, examining both traditional and modern approaches.`,
          keyFindings: [
            "Traditional medicine integration improved patient adherence by 40%",
            "Community health worker programs reduced mortality by 25%",
            "Genetic variations in African populations affect treatment response"
          ],
          relevanceScore: 0.96,
          doi: "10.1000/ajm.2024.001234"
        },
        {
          id: "african-research-2023-2",
          title: `Epidemiological Patterns of ${query} in West African Populations`,
          authors: ["Prof. Adaora Okafor", "Dr. Ibrahim Hassan", "Dr. Grace Mensah"],
          journal: "West African Medical Journal",
          year: 2023,
          summary: `Large-scale epidemiological study examining ${query.toLowerCase()} patterns across West African countries.`,
          keyFindings: [
            "Higher prevalence in urban areas due to lifestyle changes",
            "Traditional dietary patterns provide protective factors",
            "Early intervention programs show 60% success rate"
          ],
          relevanceScore: 0.94,
          doi: "10.1000/wamj.2023.067890"
        },
        {
          id: "african-research-2023-3",
          title: `Traditional African Medicine Approaches to ${query} Treatment`,
          authors: ["Dr. Nomsa Mbeki", "Prof. Kofi Antwi", "Dr. Aisha Mwangi"],
          journal: "Journal of African Traditional Medicine",
          year: 2023,
          summary: `Research on traditional medicinal plants and practices used in treating ${query.toLowerCase()} across different African cultures.`,
          keyFindings: [
            "15 plant species showed significant therapeutic activity",
            "Traditional healers' protocols aligned with modern understanding",
            "Community acceptance of integrated treatment increased to 85%"
          ],
          relevanceScore: 0.91,
          doi: "10.1000/jatm.2023.445566"
        }
      ],
      followUpQuestions: [
        `What are the common complications associated with ${query.toLowerCase()} management in African healthcare settings?`,
        `Which patient demographics are most affected by ${query.toLowerCase()} in Africa?`,
        `What are the potential side effects of traditional African treatments for ${query.toLowerCase()}?`,
        `How does ${query.toLowerCase()} prevention differ between urban and rural African communities?`
      ]
    };
  }

  static async searchArticles(query: string): Promise<Article[]> {
    const result = await this.searchResearch(query);
    return result.articles;
  }
}
