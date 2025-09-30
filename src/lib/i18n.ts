// Multi-language support for English and Hindi
export interface Translations {
  // Navigation and common elements
  home: string;
  register: string;
  schemes: string;
  about: string;
  contact: string;
  language: string;
  search: string;
  apply: string;
  back: string;
  next: string;
  submit: string;
  cancel: string;
  
  // Registration form
  registration: {
    title: string;
    subtitle: string;
    personalInfo: string;
    name: string;
    namePlaceholder: string;
    mobile: string;
    mobilePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    aadhar: string;
    aadharPlaceholder: string;
    address: string;
    addressPlaceholder: string;
    state: string;
    district: string;
    income: string;
    category: string;
    categories: {
      general: string;
      obc: string;
      sc: string;
      st: string;
    };
    voiceHelp: string;
    continueToSchemes: string;
  };
  
  // Homepage
  homepage: {
    welcome: string;
    subtitle: string;
    searchPlaceholder: string;
    findSchemes: string;
    categories: {
      agriculture: string;
      education: string;
      healthcare: string;
      housing: string;
      employment: string;
      women: string;
    };
    howItWorks: string;
    steps: {
      register: {
        title: string;
        description: string;
      };
      search: {
        title: string;
        description: string;
      };
      apply: {
        title: string;
        description: string;
      };
    };
  };
  
  // Chatbot
  chatbot: {
    name: string;
    greeting: string;
    helpText: string;
    voiceButton: string;
    typeMessage: string;
    examples: {
      schemes: string;
      eligibility: string;
      documents: string;
      application: string;
    };
  };
  
  // Accessibility
  accessibility: {
    largeText: string;
    highContrast: string;
    voiceMode: string;
    listening: string;
    speaking: string;
  };
  
  // Validation messages
  validation: {
    required: string;
    invalidEmail: string;
    invalidMobile: string;
    invalidAadhar: string;
  };
}

export const translations: { en: Translations; hi: Translations } = {
  en: {
    home: "Home",
    register: "Register",
    schemes: "Schemes",
    about: "About",
    contact: "Contact",
    language: "Language",
    search: "Search",
    apply: "Apply Now",
    back: "Back",
    next: "Next",
    submit: "Submit",
    cancel: "Cancel",
    
    registration: {
      title: "Register for Government Schemes",
      subtitle: "Get personalized scheme recommendations by sharing your basic details",
      personalInfo: "Personal Information",
      name: "Full Name",
      namePlaceholder: "Enter your full name",
      mobile: "Mobile Number",
      mobilePlaceholder: "Enter 10-digit mobile number",
      email: "Email Address",
      emailPlaceholder: "Enter your email (optional)",
      aadhar: "Aadhar Number",
      aadharPlaceholder: "Enter 12-digit Aadhar number",
      address: "Address",
      addressPlaceholder: "Enter your complete address",
      state: "State",
      district: "District",
      income: "Annual Income",
      category: "Category",
      categories: {
        general: "General",
        obc: "OBC",
        sc: "SC",
        st: "ST",
      },
      voiceHelp: "Need help? Tap the microphone to speak your details",
      continueToSchemes: "Continue to Find Schemes",
    },
    
    homepage: {
      welcome: "Welcome to Government Schemes Portal",
      subtitle: "Find and apply for government schemes that benefit you and your family",
      searchPlaceholder: "Search schemes by name, category, or benefit...",
      findSchemes: "Find Schemes For You",
      categories: {
        agriculture: "Agriculture & Farming",
        education: "Education & Skills",
        healthcare: "Health & Medical",
        housing: "Housing & Infrastructure",
        employment: "Employment & Business",
        women: "Women & Child Welfare",
      },
      howItWorks: "How It Works",
      steps: {
        register: {
          title: "Register Your Details",
          description: "Share basic information to get personalized recommendations",
        },
        search: {
          title: "Find Relevant Schemes",
          description: "Browse schemes by category or search by your specific needs",
        },
        apply: {
          title: "Apply Easily",
          description: "Complete applications with guided assistance and document help",
        },
      },
    },
    
    chatbot: {
      name: "Saksham",
      greeting: "Namaste! I'm Saksham, your government schemes assistant. How can I help you today?",
      helpText: "I can help you find schemes, check eligibility, and guide you through applications",
      voiceButton: "Tap to speak",
      typeMessage: "Type your message here...",
      examples: {
        schemes: "What schemes are available for farmers?",
        eligibility: "Am I eligible for housing schemes?",
        documents: "What documents do I need?",
        application: "Help me apply for this scheme",
      },
    },
    
    accessibility: {
      largeText: "Large Text",
      highContrast: "High Contrast",
      voiceMode: "Voice Mode",
      listening: "Listening...",
      speaking: "Speaking...",
    },
    
    validation: {
      required: "This field is required",
      invalidEmail: "Please enter a valid email address",
      invalidMobile: "Please enter a valid 10-digit mobile number",
      invalidAadhar: "Please enter a valid 12-digit Aadhar number",
    },
  },
  
  hi: {
    home: "मुख्य पृष्ठ",
    register: "पंजीकरण",
    schemes: "योजनाएं",
    about: "हमारे बारे में",
    contact: "संपर्क",
    language: "भाषा",
    search: "खोज",
    apply: "अभी आवेदन करें",
    back: "वापस",
    next: "आगे",
    submit: "जमा करें",
    cancel: "रद्द करें",
    
    registration: {
      title: "सरकारी योजनाओं के लिए पंजीकरण",
      subtitle: "अपनी बुनियादी जानकारी साझा करके व्यक्तिगत योजना सिफारिशें प्राप्त करें",
      personalInfo: "व्यक्तिगत जानकारी",
      name: "पूरा नाम",
      namePlaceholder: "अपना पूरा नाम दर्ज करें",
      mobile: "मोबाइल नंबर",
      mobilePlaceholder: "10 अंकों का मोबाइल नंबर दर्ज करें",
      email: "ईमेल पता",
      emailPlaceholder: "अपना ईमेल दर्ज करें (वैकल्पिक)",
      aadhar: "आधार नंबर",
      aadharPlaceholder: "12 अंकों का आधार नंबर दर्ज करें",
      address: "पता",
      addressPlaceholder: "अपना पूरा पता दर्ज करें",
      state: "राज्य",
      district: "जिला",
      income: "वार्षिक आय",
      category: "श्रेणी",
      categories: {
        general: "सामान्य",
        obc: "ओबीसी",
        sc: "एससी",
        st: "एसटी",
      },
      voiceHelp: "मदद चाहिए? अपनी जानकारी बोलने के लिए माइक दबाएं",
      continueToSchemes: "योजनाएं खोजने के लिए जारी रखें",
    },
    
    homepage: {
      welcome: "सरकारी योजना पोर्टल में आपका स्वागत है",
      subtitle: "अपने और अपने परिवार के फायदे की सरकारी योजनाएं खोजें और आवेदन करें",
      searchPlaceholder: "नाम, श्रेणी या लाभ से योजनाएं खोजें...",
      findSchemes: "आपके लिए योजनाएं खोजें",
      categories: {
        agriculture: "कृषि और खेती",
        education: "शिक्षा और कौशल",
        healthcare: "स्वास्थ्य और चिकित्सा",
        housing: "आवास और अवसंरचना",
        employment: "रोजगार और व्यापार",
        women: "महिला और बाल कल्याण",
      },
      howItWorks: "यह कैसे काम करता है",
      steps: {
        register: {
          title: "अपना विवरण पंजीकृत करें",
          description: "व्यक्तिगत सिफारिशें पाने के लिए बुनियादी जानकारी साझा करें",
        },
        search: {
          title: "संबंधित योजनाएं खोजें",
          description: "श्रेणी के अनुसार योजनाओं को ब्राउज़ करें या अपनी विशिष्ट आवश्यकताओं के अनुसार खोजें",
        },
        apply: {
          title: "आसानी से आवेदन करें",
          description: "निर्देशित सहायता और दस्तावेज़ सहायता के साथ आवेदन पूरा करें",
        },
      },
    },
    
    chatbot: {
      name: "सक्षम",
      greeting: "नमस्ते! मैं सक्षम हूं, आपका सरकारी योजना सहायक। आज मैं आपकी कैसे सहायता कर सकता हूं?",
      helpText: "मैं आपको योजनाएं खोजने, पात्रता जांचने और आवेदन में मार्गदर्शन करने में मदद कर सकता हूं",
      voiceButton: "बोलने के लिए दबाएं",
      typeMessage: "यहां अपना संदेश टाइप करें...",
      examples: {
        schemes: "किसानों के लिए कौन सी योजनाएं उपलब्ध हैं?",
        eligibility: "क्या मैं आवास योजनाओं के लिए पात्र हूं?",
        documents: "मुझे कौन से दस्तावेज़ चाहिए?",
        application: "इस योजना के लिए आवेदन में मेरी मदद करें",
      },
    },
    
    accessibility: {
      largeText: "बड़ा पाठ",
      highContrast: "उच्च कंट्रास्ट",
      voiceMode: "आवाज़ मोड",
      listening: "सुन रहा है...",
      speaking: "बोल रहा है...",
    },
    
    validation: {
      required: "यह फ़ील्ड आवश्यक है",
      invalidEmail: "कृपया एक वैध ईमेल पता दर्ज करें",
      invalidMobile: "कृपया एक वैध 10-अंकीय मोबाइल नंबर दर्ज करें",
      invalidAadhar: "कृपया एक वैध 12-अंकीय आधार नंबर दर्ज करें",
    },
  },
};

export const useTranslation = (language: 'en' | 'hi' = 'en') => {
  return translations[language];
};

// TTS-ready phrases for voice interaction
export const ttsTexts = {
  en: {
    welcomeMessage: "Welcome to the Government Schemes Portal. I can help you find schemes that benefit you.",
    registrationStart: "Please share your basic details to get personalized scheme recommendations.",
    eligibilityCheck: "Based on your details, here are schemes you may be eligible for.",
    documentHelp: "I will help you understand what documents you need for this application.",
    applicationGuidance: "Let me guide you step by step through this application process.",
  },
  hi: {
    welcomeMessage: "सरकारी योजना पोर्टल में आपका स्वागत है। मैं आपको लाभकारी योजनाएं खोजने में मदद कर सकता हूं।",
    registrationStart: "कृपया व्यक्तिगत योजना सिफारिशें पाने के लिए अपना बुनियादी विवरण साझा करें।",
    eligibilityCheck: "आपके विवरण के आधार पर, यहां वे योजनाएं हैं जिनके लिए आप पात्र हो सकते हैं।",
    documentHelp: "मैं आपको यह समझने में मदद करूंगा कि इस आवेदन के लिए आपको कौन से दस्तावेज़ चाहिए।",
    applicationGuidance: "मैं आपको इस आवेदन प्रक्रिया के माध्यम से कदम दर कदम मार्गदर्शन करूंगा।",
  },
};

// STT utterance examples for voice training
export const sttUtterances = {
  en: [
    "What schemes are available for farmers",
    "I need help with housing schemes", 
    "Am I eligible for education benefits",
    "What documents do I need",
    "Help me apply for this scheme",
    "Read this information out loud",
  ],
  hi: [
    "किसानों के लिए कौन सी योजनाएं हैं",
    "मुझे आवास योजनाओं में मदद चाहिए",
    "क्या मैं शिक्षा लाभ के लिए पात्र हूं", 
    "मुझे कौन से दस्तावेज़ चाहिए",
    "इस योजना के लिए आवेदन में मदद करें",
    "इस जानकारी को ज़ोर से पढ़ें",
  ],
};