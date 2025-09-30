import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Mic, 
  Send, 
  X, 
  Volume2, 
  VolumeX,
  User,
  Bot,
  Phone,
  HelpCircle
} from "lucide-react";
import { useTranslation, ttsTexts } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";

interface ChatbotProps {
  language: 'en' | 'hi';
  isOpen: boolean;
  onToggle: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
}

interface ChatbotIntent {
  id: string;
  name: string;
  examples: string[];
  response: string;
  followUp?: string[];
}

export default function Chatbot({ language, isOpen, onToggle }: ChatbotProps) {
  const t = useTranslation(language);
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Chatbot intents with sample utterances for both languages
  const chatbotIntents: { [key: string]: ChatbotIntent[] } = {
    en: [
      {
        id: "greeting",
        name: "Greeting",
        examples: [
          "hello", "hi", "namaste", "good morning", 
          "how are you", "what can you do"
        ],
        response: "Namaste! I'm Saksham, your government schemes assistant. I can help you find schemes, check eligibility, understand application processes, and provide document checklists. How can I assist you today?",
        followUp: ["Find schemes for farmers", "Check eligibility", "What documents needed?"]
      },
      {
        id: "schemes_search",
        name: "Schemes Search",
        examples: [
          "what schemes are available", "show me schemes for farmers",
          "housing schemes", "education benefits", "health schemes", 
          "employment schemes"
        ],
        response: "I can help you find schemes! Based on your profile, here are some relevant options: PM-KISAN for farmers (₹6,000/year), Ayushman Bharat for health coverage (₹5 lakh), and PMAY for housing. Which category interests you most?",
        followUp: ["Tell me about PM-KISAN", "Ayushman Bharat details", "Housing scheme eligibility"]
      },
      {
        id: "eligibility_check",
        name: "Eligibility Check",
        examples: [
          "am I eligible", "who can apply", "eligibility criteria",
          "income limit", "age requirements", "category requirements"
        ],
        response: "I'll help check your eligibility! Most schemes have criteria like income limits (usually below ₹8 lakhs), category requirements, and specific target groups. Can you tell me which scheme you're interested in?",
        followUp: ["Check PM-KISAN eligibility", "Ayushman Bharat eligibility", "Housing scheme criteria"]
      },
      {
        id: "documents",
        name: "Document Requirements",
        examples: [
          "what documents do I need", "required papers",
          "aadhar card needed", "income certificate", "bank details", "photo requirements"
        ],
        response: "Document requirements vary by scheme, but commonly needed are: Aadhar Card, Bank Account details, Income Certificate, Residence Proof, and Passport-size photos. Which specific scheme documents do you need help with?",
        followUp: ["PM-KISAN documents", "Ayushman card documents", "Housing scheme papers"]
      },
      {
        id: "application_help",
        name: "Application Assistance",
        examples: [
          "how to apply", "application process", "help me apply",
          "step by step", "online application", "where to submit"
        ],
        response: "I'll guide you through the application process step-by-step! Most applications are now online through official portals. First, gather your documents, then create an account on the scheme portal. Would you like detailed steps for a specific scheme?",
        followUp: ["PM-KISAN application steps", "Ayushman Bharat enrollment", "Housing scheme application"]
      },
      {
        id: "human_help",
        name: "Human Assistance",
        examples: [
          "talk to human", "customer service", "call center",
          "need more help", "complex query", "speak to officer"
        ],
        response: "I understand you need additional assistance. You can contact the helpline at 1800-11-1800 or visit your nearest Common Service Center (CSC). Local government offices also provide scheme guidance. Would you like me to help you find the nearest CSC?",
        followUp: ["Find nearest CSC", "Helpline numbers", "Government office contacts"]
      }
    ],
    hi: [
      {
        id: "greeting",
        name: "अभिवादन",
        examples: [
          "नमस्ते", "हैलो", "सुप्रभात", "आप कैसे हैं",
          "क्या कर सकते हैं", "मदद चाहिए"
        ],
        response: "नमस्ते! मैं सक्षम हूँ, आपका सरकारी योजना सहायक। मैं आपको योजनाएं खोजने, पात्रता जांचने, आवेदन प्रक्रिया समझने और दस्तावेज़ सूची प्रदान करने में मदद कर सकता हूँ। आज मैं आपकी कैसे सहायता करूँ?",
        followUp: ["किसानों के लिए योजनाएं", "पात्रता जांचें", "कौन से दस्तावेज़ चाहिए?"]
      },
      {
        id: "schemes_search",
        name: "योजना खोज",
        examples: [
          "कौन सी योजनाएं हैं", "किसानों के लिए योजनाएं",
          "आवास योजना", "शिक्षा लाभ", "स्वास्थ्य योजना", 
          "रोजगार योजना"
        ],
        response: "मैं आपको योजनाएं खोजने में मदद कर सकता हूं! आपकी प्रोफाइल के आधार पर कुछ उपयुक्त विकल्प हैं: किसानों के लिए पीएम-किसान (₹6,000/वर्ष), स्वास्थ्य कवरेज के लिए आयुष्मान भारत (₹5 लाख), और आवास के लिए PMAY। आपको कौन सी श्रेणी में सबसे अधिक रुचि है?",
        followUp: ["पीएम-किसान के बारे में बताएं", "आयुष्मान भारत विवरण", "आवास योजना पात्रता"]
      },
      {
        id: "eligibility_check",
        name: "पात्रता जांच",
        examples: [
          "क्या मैं पात्र हूं", "कौन आवेदन कर सकता है", "पात्रता मानदंड",
          "आय सीमा", "आयु आवश्यकताएं", "श्रेणी आवश्यकताएं"
        ],
        response: "मैं आपकी पात्रता जांचने में मदद करूंगा! अधिकांश योजनाओं में आय सीमा (आमतौर पर ₹8 लाख से कम), श्रेणी आवश्यकताएं और विशिष्ट लक्षित समूह जैसे मानदंड हैं। क्या आप मुझे बता सकते हैं कि आप किस योजना में रुचि रखते हैं?",
        followUp: ["पीएम-किसान पात्रता जांचें", "आयुष्मान भारत पात्रता", "आवास योजना मानदंड"]
      },
      {
        id: "documents",
        name: "दस्तावेज़ आवश्यकताएं",
        examples: [
          "कौन से दस्तावेज़ चाहिए", "आवश्यक कागज़ात",
          "आधार कार्ड चाहिए", "आय प्रमाण पत्र", "बैंक विवरण", "फोटो आवश्यकताएं"
        ],
        response: "दस्तावेज़ की आवश्यकताएं योजना के अनुसार अलग होती हैं, लेकिन आमतौर पर ज़रूरी हैं: आधार कार्ड, बैंक खाता विवरण, आय प्रमाण पत्र, निवास प्रमाण, और पासपोर्ट-आकार की तस्वीरें। आपको किस विशिष्ट योजना के दस्तावेज़ों में मदद चाहिए?",
        followUp: ["पीएम-किसान दस्तावेज़", "आयुष्मान कार्ड दस्तावेज़", "आवास योजना कागज़ात"]
      },
      {
        id: "application_help",
        name: "आवेदन सहायता",
        examples: [
          "कैसे आवेदन करें", "आवेदन प्रक्रिया", "आवेदन में मदद करें",
          "चरणबद्ध तरीका", "ऑनलाइन आवेदन", "कहां जमा करें"
        ],
        response: "मैं आपको आवेदन प्रक्रिया में चरणबद्ध मार्गदर्शन करूंगा! अधिकांश आवेदन अब आधिकारिक पोर्टल के माध्यम से ऑनलाइन हैं। पहले अपने दस्तावेज़ इकट्ठे करें, फिर योजना पोर्टल पर खाता बनाएं। क्या आप किसी विशिष्ट योजना के विस्तृत चरण चाहते हैं?",
        followUp: ["पीएम-किसान आवेदन चरण", "आयुष्मान भारत नामांकन", "आवास योजना आवेदन"]
      },
      {
        id: "human_help",
        name: "मानव सहायता",
        examples: [
          "इंसान से बात करना है", "ग्राहक सेवा", "कॉल सेंटर",
          "और मदद चाहिए", "जटिल प्रश्न", "अधिकारी से बात करना है"
        ],
        response: "मैं समझता हूं कि आपको अतिरिक्त सहायता चाहिए। आप 1800-11-1800 हेल्पलाइन पर संपर्क कर सकते हैं या अपने निकटतम कॉमन सर्विस सेंटर (CSC) पर जा सकते हैं। स्थानीय सरकारी कार्यालय भी योजना मार्गदर्शन प्रदान करते हैं। क्या आप चाहेंगे कि मैं आपको निकटतम CSC खोजने में मदद करूं?",
        followUp: ["निकटतम CSC खोजें", "हेल्पलाइन नंबर", "सरकारी कार्यालय संपर्क"]
      }
    ]
  };

  // Initialize with greeting message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting: Message = {
        id: '1',
        type: 'bot',
        content: t.chatbot.greeting,
        timestamp: new Date()
      };
      setMessages([greeting]);
      
      if (voiceEnabled) {
        speak(greeting.content);
      }
    }
  }, [isOpen, t.chatbot.greeting, voiceEnabled]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window && voiceEnabled) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const findBestMatch = (userInput: string): ChatbotIntent => {
    const intents = chatbotIntents[language];
    const normalizedInput = userInput.toLowerCase();
    
    for (const intent of intents) {
      for (const example of intent.examples) {
        if (normalizedInput.includes(example.toLowerCase()) || 
            example.toLowerCase().includes(normalizedInput)) {
          return intent;
        }
      }
    }
    
    // Default fallback
    return {
      id: "fallback",
      name: "Fallback",
      examples: [],
      response: language === 'en' 
        ? "I'm here to help with government schemes! You can ask me about eligibility, documents needed, application process, or specific schemes like PM-KISAN, Ayushman Bharat, or housing schemes."
        : "मैं सरकारी योजनाओं में आपकी मदद करने के लिए यहाँ हूँ! आप मुझसे पात्रता, आवश्यक दस्तावेज़, आवेदन प्रक्रिया, या पीएम-किसान, आयुष्मान भारत, या आवास योजनाओं जैसी विशिष्ट योजनाओं के बारे में पूछ सकते हैं।",
      followUp: language === 'en' 
        ? ["Find schemes", "Check eligibility", "Application help"]
        : ["योजनाएं खोजें", "पात्रता जांचें", "आवेदन मदद"]
    };
  };

  const sendMessage = async (message: string, isVoiceMessage = false) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date(),
      isVoice: isVoiceMessage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Simulate processing delay
    setTimeout(() => {
      const matchedIntent = findBestMatch(message);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: matchedIntent.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      
      if (voiceEnabled) {
        speak(botResponse.content);
      }
    }, 1000);
  };

  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      setIsListening(true);
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        sendMessage(transcript, true);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast({
          title: language === 'en' ? "Voice input failed" : "आवाज़ इनपुट असफल",
          description: language === 'en' ? "Please try again" : "कृपया पुनः प्रयास करें",
          variant: "destructive"
        });
      };

      recognition.onend = () => setIsListening(false);
    } else {
      toast({
        title: language === 'en' ? "Voice not supported" : "आवाज़ समर्थित नहीं",
        description: language === 'en' ? "Please type your message" : "कृपया अपना संदेश टाइप करें",
        variant: "destructive"
      });
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-strong gradient-hero text-white z-50"
        size="lg"
      >
        <MessageCircle className="h-8 w-8" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[32rem] flex flex-col shadow-strong z-50">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-3 gradient-hero text-white rounded-t-xl">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8 bg-white/20">
            <AvatarFallback className="bg-white/20 text-white">
              <Bot className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{t.chatbot.name}</CardTitle>
            <p className="text-xs text-white/80">{t.chatbot.helpText}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className="text-white hover:bg-white/20"
          >
            {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4">
          <div className="py-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className={message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}>
                    {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                
                <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground ml-auto' 
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    {message.isVoice && (
                      <Badge variant="secondary" className="mt-2 text-xs">
                        <Mic className="h-3 w-3 mr-1" />
                        {language === 'en' ? 'Voice' : 'आवाज़'}
                      </Badge>
                    )}
                  </div>
                  
                  {message.type === 'bot' && (
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => speak(message.content)}
                        disabled={isSpeaking}
                        className="h-6 px-2 text-xs"
                      >
                        {isSpeaking ? (
                          <VolumeX className="h-3 w-3" />
                        ) : (
                          <Volume2 className="h-3 w-3" />
                        )}
                      </Button>
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder={t.chatbot.typeMessage}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
              className="flex-1"
            />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={startVoiceInput}
              disabled={isListening}
              className={`${isListening ? 'voice-active' : ''}`}
            >
              <Mic className={`h-4 w-4 ${isListening ? 'text-primary' : ''}`} />
            </Button>
            
            <Button
              onClick={() => sendMessage(inputMessage)}
              disabled={!inputMessage.trim()}
              size="sm"
              className="gradient-hero text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {isListening && (
            <p className="text-xs text-center text-muted-foreground mt-2">
              {t.accessibility.listening}
            </p>
          )}

          <div className="flex flex-wrap gap-1 mt-2">
            {Object.values(t.chatbot.examples).slice(0, 3).map((example, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="text-xs h-6 px-2 text-muted-foreground hover:text-foreground"
                onClick={() => sendMessage(example)}
              >
                {example}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}