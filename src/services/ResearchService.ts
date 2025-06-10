
import { Article } from "@/pages/Index";

export class ResearchService {
  private static readonly OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
  
  // This will be replaced with your backend API key
  private static readonly API_KEY = "your-api-key-here";

  static async searchArticles(query: string): Promise<Article[]> {
    const prompt = `You are a research assistant specializing in African medical and scientific research. 
    
    Search query: "${query}"
    
    Please provide 5-7 relevant scientific articles from African research institutions, African journals, or studies conducted in Africa related to this query. Focus on:
    - Research from African universities and institutions
    - Studies on African populations
    - Traditional African medicine research
    - Public health research from African countries
    - Clinical studies conducted in Africa
    
    For each article, provide:
    - A realistic title
    - African authors or researchers (2-5 realistic names)
    - African journal name or international journal with African research
    - Publication year (2015-2024)
    - A comprehensive summary (2-3 sentences)
    - 2-4 key findings relevant to African context
    - A relevance score (0.0-1.0)
    - DOI (optional, but realistic format)

    Respond with a JSON array of articles. Make sure the articles are scientifically plausible and relevant to African medical/scientific research.
    
    Example format:
    [
      {
        "id": "unique-id",
        "title": "Article Title",
        "authors": ["Dr. Amina Kone", "Prof. Kwame Asante"],
        "journal": "African Journal of Medicine",
        "year": 2023,
        "summary": "Brief summary of the African research study...",
        "keyFindings": ["Finding 1", "Finding 2"],
        "relevanceScore": 0.95,
        "doi": "10.1000/ajm.2023.123456"
      }
    ]`;

    try {
      // For now, return mock data since the API key will be configured in your backend
      // Replace this with actual API call when backend is ready
      return this.getMockAfricanResearch(query);
      
      /* Uncomment when backend API key is configured:
      const response = await fetch(this.OPENAI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are a helpful research assistant that provides accurate, well-formatted JSON responses about African scientific literature."
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
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error("No response content received from OpenAI API");
      }

      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error("Could not parse JSON response from API");
      }

      const articles = JSON.parse(jsonMatch[0]);
      
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
      */

    } catch (error) {
      console.error("Error searching articles:", error);
      throw error;
    }
  }

  private static getMockAfricanResearch(query: string): Article[] {
    // Mock data for demonstration - remove when backend is ready
    return [
      {
        id: "african-malaria-2024",
        title: "Novel Antimalarial Compounds from West African Traditional Medicine",
        authors: ["Dr. Fatima Diallo", "Prof. Kwame Osei", "Dr. Aisha Mwangi"],
        journal: "African Journal of Traditional Medicine",
        year: 2024,
        summary: "This study investigates the antimalarial properties of traditional medicinal plants used in Senegal and Ghana, identifying three novel compounds with significant activity against Plasmodium falciparum.",
        keyFindings: [
          "Compound A showed 85% efficacy against chloroquine-resistant malaria",
          "Traditional healers' knowledge contributed to 92% of successful identifications",
          "No significant side effects observed in Phase I trials"
        ],
        relevanceScore: 0.94,
        doi: "10.1000/ajtm.2024.001"
      },
      {
        id: "tb-africa-2023",
        title: "Community-Based Tuberculosis Treatment Outcomes in Rural Kenya",
        authors: ["Dr. John Kiprotich", "Prof. Grace Wanjiku", "Dr. Samuel Muli"],
        journal: "East African Medical Journal",
        year: 2023,
        summary: "A comprehensive study examining the effectiveness of community health worker-delivered TB treatment in rural Kenyan communities, showing improved completion rates.",
        keyFindings: [
          "95% treatment completion rate vs 78% in facility-based care",
          "Community workers reduced travel burden by 70%",
          "Cost-effectiveness improved by 40% in rural areas"
        ],
        relevanceScore: 0.91,
        doi: "10.1000/eamj.2023.067"
      },
      {
        id: "diabetes-south-africa-2023",
        title: "Type 2 Diabetes Management in South African Township Communities",
        authors: ["Dr. Nomsa Mbeki", "Prof. Ahmed Hassan", "Dr. Thabo Molefe"],
        journal: "South African Medical Journal",
        year: 2023,
        summary: "Research on culturally adapted diabetes management programs in South African townships, incorporating traditional foods and community support systems.",
        keyFindings: [
          "HbA1c levels improved by 1.8% with cultural adaptation",
          "Traditional foods integration increased adherence by 65%",
          "Community support reduced hospitalization by 50%"
        ],
        relevanceScore: 0.89,
        doi: "10.1000/samj.2023.128"
      }
    ];
  }
}
