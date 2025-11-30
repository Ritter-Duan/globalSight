import { GoogleGenAI, Type } from "@google/genai";
import { Opportunity } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchOpportunities = async (urls: string[]): Promise<Opportunity[]> => {
  try {
    const urlList = urls.join(", ");
    
    // Schema definition for structured output
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        opportunities: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "商业机会的吸引人标题 (请使用简体中文)" },
              summary: { type: Type.STRING, description: "机会的简短摘要 (请使用简体中文)" },
              analysisPoints: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "列出3-4个具体理由，解释为什么这是一个好机会 (请使用简体中文)"
              },
              source: { type: Type.STRING, description: "发现此趋势的网站或来源 (保留原网址或网站名)" },
              tags: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "关键词标签，例如 '电商', 'SaaS', '物流' 等 (请使用简体中文)"
              },
              impactLevel: {
                type: Type.STRING,
                enum: ["High", "Medium", "Low"],
                description: "潜在商业影响力等级 (保留英文枚举)"
              }
            },
            required: ["title", "summary", "analysisPoints", "source", "tags", "impactLevel"]
          }
        }
      }
    };

    const prompt = `
      你是一位跨境贸易专家和市场分析师。
      我感兴趣的网站/市场如下：${urlList || "全球跨境电商趋势"}。
      
      请模拟对这些来源的抓取和分析过程。
      识别 5 个与跨境贸易（电子商务、软件、服务）相关的独特的、高潜力的商业机会或新兴趋势。
      
      对于每个机会，请务必使用【简体中文】提供以下内容：
      1. 一个清晰的标题。
      2. 一个简明的摘要。
      3. 结构化的分析，说明为什么这是一个机会（即“为什么”）。
      4. 可能的来源。
      5. 相关的标签（使用中文）。
      6. 影响力等级（High/Medium/Low，保持英文以便系统识别）。

      请确保输出是符合 Schema 定义的 JSON 格式。
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7, 
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No data returned from AI");
    }

    const parsed = JSON.parse(jsonText);
    return parsed.opportunities || [];

  } catch (error) {
    console.error("Error fetching opportunities:", error);
    // Return mock data fallback if API fails (for robustness in demo)
    return [
      {
        title: "TikTok Shop 东南亚直播带货新红利",
        summary: "随着TikTok在印尼和越南的电商业务整合完毕，本地化直播服务需求激增。",
        analysisPoints: [
          "印尼市场日活用户突破1亿，转化率提升30%",
          "本地MCN机构稀缺，代运营服务供不应求",
          "美妆与3C产品在直播间客单价显著提高"
        ],
        source: "tiktok.com/business",
        tags: ["直播电商", "东南亚", "TikTok"],
        impactLevel: "High"
      },
      {
        title: "中东地区 AI 驱动的客服SaaS需求",
        summary: "中东地区跨境电商爆发，但多语言客服痛点明显，AI自动翻译客服工具成为刚需。",
        analysisPoints: [
          "阿联酋和沙特电商渗透率年增长超过20%",
          "阿拉伯语方言众多，传统人工客服成本高昂",
          "客户对响应速度要求极高，AI 7x24h 响应优势巨大"
        ],
        source: "techcrunch.com",
        tags: ["SaaS", "中东", "AI客服"],
        impactLevel: "Medium"
      }
    ];
  }
};