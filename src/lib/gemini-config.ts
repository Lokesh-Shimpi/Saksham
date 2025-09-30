// Gemini API configuration for government schemes chatbot
// This file provides example configurations and payloads for integrating with Google's Gemini API

export interface GeminiConfig {
  apiKey: string;
  model: string;
  baseUrl: string;
}

export interface GeminiRequestPayload {
  contents: {
    parts: { text: string }[];
  }[];
  generationConfig?: {
    temperature?: number;
    topP?: number;
    topK?: number;
    maxOutputTokens?: number;
    stopSequences?: string[];
  };
  safetySettings?: {
    category: string;
    threshold: string;
  }[];
}

// Example Gemini API configuration
export const geminiConfig: GeminiConfig = {
  apiKey: "AIzaSyAcGM2Mc_JcXfE02PaA8mKQxXvvspjbtEg", // Provided API key
  model: "gemini-1.5-flash", // Recommended model for conversational use
  baseUrl: "https://generativelanguage.googleapis.com/v1beta/models"
};

// Static content generation payload example for government schemes
export const createStaticContentPayload = (
  category: string,
  language: 'en' | 'hi'
): GeminiRequestPayload => ({
  contents: [{
    parts: [{
      text: `Generate comprehensive information about ${category} government schemes in ${language === 'hi' ? 'Hindi' : 'English'}. Include:
      1. Top 3 popular schemes in this category
      2. Eligibility criteria for each
      3. Required documents
      4. Application process
      5. Benefits and amounts
      6. Contact information
      
      Format the response in a simple, rural-friendly language suitable for low-literacy audiences. Use bullet points and clear headings.`
    }]
  }],
  generationConfig: {
    temperature: 0.3,
    topP: 0.8,
    topK: 40,
    maxOutputTokens: 2048
  },
  safetySettings: [
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE"
    }
  ]
});

// Conversational chatbot payload example for Saksham
export const createChatbotPayload = (
  userMessage: string,
  conversationHistory: string[] = [],
  userContext: {
    language: 'en' | 'hi';
    category?: string;
    income?: string;
    state?: string;
  }
): GeminiRequestPayload => {
  
  const systemPrompt = userContext.language === 'hi' ? `
तुम सक्षम हो, एक दोस्ताना सरकारी योजना सहायक। तुम्हारा काम है:
1. सरकारी योजनाओं की जानकारी देना
2. पात्रता की जांच में मदद करना  
3. आवेदन प्रक्रिया में मार्गदर्शन करना
4. दस्तावेज़ों की सूची प्रदान करना
5. जटिल सवालों के लिए मानव सहायता की सलाह देना

उत्तर सरल, सम्मानजनक और ग्रामीण दर्शकों के लिए उपयुक्त भाषा में दो।
` : `
You are Saksham, a friendly government schemes assistant. Your role is to:
1. Provide information about government schemes
2. Help check eligibility criteria
3. Guide through application processes  
4. Provide document checklists
5. Recommend human help for complex queries

Answer in simple, respectful language suitable for rural audiences.
`;

  const contextInfo = `
User Context:
- Language: ${userContext.language}
- Category Interest: ${userContext.category || 'Not specified'}
- Income Level: ${userContext.income || 'Not specified'}
- State: ${userContext.state || 'Not specified'}

Current Message: ${userMessage}
  `;

  return {
    contents: [{
      parts: [{
        text: systemPrompt + contextInfo + (conversationHistory.length > 0 ? 
          `\n\nConversation History:\n${conversationHistory.join('\n')}` : '')
      }]
    }],
    generationConfig: {
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 1024
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH", 
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      }
    ]
  };
};

// Eligibility checker payload example
export const createEligibilityPayload = (
  schemeId: string,
  userProfile: {
    age?: number;
    income?: string;
    category?: string;
    state?: string;
    occupation?: string;
    gender?: string;
  },
  language: 'en' | 'hi'
): GeminiRequestPayload => ({
  contents: [{
    parts: [{
      text: `Check eligibility for scheme "${schemeId}" based on user profile:
      Age: ${userProfile.age || 'Not provided'}
      Income: ${userProfile.income || 'Not provided'}  
      Category: ${userProfile.category || 'Not provided'}
      State: ${userProfile.state || 'Not provided'}
      Occupation: ${userProfile.occupation || 'Not provided'}
      Gender: ${userProfile.gender || 'Not provided'}
      
      Provide a clear ${language === 'hi' ? 'Hindi' : 'English'} response indicating:
      1. Whether they are eligible (Yes/No/Partially)
      2. Which criteria they meet
      3. Which criteria they don't meet (if any)
      4. Steps to improve eligibility (if applicable)
      5. Required documents for application
      
      Use simple, encouraging language.`
    }]
  }],
  generationConfig: {
    temperature: 0.2,
    topP: 0.8,
    topK: 20,
    maxOutputTokens: 1024
  }
});

// Document assistance payload example
export const createDocumentHelpPayload = (
  schemeId: string,
  userCategory: string,
  language: 'en' | 'hi'
): GeminiRequestPayload => ({
  contents: [{
    parts: [{
      text: `Provide a comprehensive document checklist for scheme "${schemeId}" for a user in "${userCategory}" category.
      
      Response should be in ${language === 'hi' ? 'Hindi' : 'English'} and include:
      1. Complete list of required documents
      2. Format requirements (original/photocopy, self-attested, etc.)
      3. Where to obtain documents (if not commonly available)
      4. Alternative documents if primary ones are unavailable
      5. Digital vs physical submission requirements
      6. Common mistakes to avoid
      
      Format as a clear, easy-to-follow checklist suitable for rural users.`
    }]
  }],
  generationConfig: {
    temperature: 0.1,
    topP: 0.8,
    topK: 20,
    maxOutputTokens: 1536
  }
});

// Example API call function (for reference - would need to be implemented in backend)
export const callGeminiAPI = async (
  payload: GeminiRequestPayload,
  config: GeminiConfig = geminiConfig
): Promise<string> => {
  const url = `${config.baseUrl}/${config.model}:generateContent?key=${config.apiKey}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
};

// Analytics events for tracking chatbot usage
export const analyticsEvents = {
  CHATBOT_OPENED: 'chatbot_opened',
  MESSAGE_SENT: 'message_sent',
  VOICE_INPUT_USED: 'voice_input_used',
  SCHEME_INQUIRY: 'scheme_inquiry', 
  ELIGIBILITY_CHECK: 'eligibility_check',
  DOCUMENT_HELP: 'document_help',
  HUMAN_HELP_REQUESTED: 'human_help_requested',
  LANGUAGE_SWITCHED: 'language_switched'
};

// Privacy and data collection guidelines
export const privacyGuidelines = {
  // Minimal data collection - only what's necessary for scheme recommendations
  collectOnlyRequired: [
    'basic_demographics',
    'location_state_district', 
    'income_range',
    'category',
    'interaction_logs'
  ],
  
  // Do not collect sensitive information
  avoidCollecting: [
    'exact_aadhar_number',
    'bank_account_details',
    'precise_location',
    'family_member_details',
    'health_information'
  ],
  
  // Data retention policy
  dataRetention: {
    chatLogs: '30_days',
    userProfile: '1_year',
    anonymizedAnalytics: '2_years'
  },
  
  // User consent requirements
  consentRequired: [
    'data_collection',
    'location_access',
    'voice_recording',
    'analytics_tracking'
  ]
};