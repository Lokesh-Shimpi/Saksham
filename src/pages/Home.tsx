import { useState } from "react";
import RegistrationForm from "@/components/RegistrationForm";
import Homepage from "@/components/Homepage";
import Chatbot from "@/components/Chatbot";
import SchemeDetail from "@/components/SchemeDetail";

interface RegistrationData {
  name: string;
  mobile: string;
  email: string;
  aadhar: string;
  address: string;
  state: string;
  district: string;
  income: string;
  category: string;
}

export default function Home() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [isRegistered, setIsRegistered] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [selectedScheme, setSelectedScheme] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'homepage' | 'scheme-detail'>('homepage');

  const handleRegistrationComplete = (data: RegistrationData) => {
    setRegistrationData(data);
    setIsRegistered(true);
  };

  const handleLanguageChange = (lang: 'en' | 'hi') => {
    setLanguage(lang);
  };

  const toggleChatbot = () => {
    setChatbotOpen(!chatbotOpen);
  };

  const handleApply = (scheme: { id: string; title: string }) => {
    setChatbotOpen(true);
  };

  const handleSchemeSelect = (schemeId: string) => {
    setSelectedScheme(schemeId);
    setCurrentView('scheme-detail');
  };

  const handleBackToHomepage = () => {
    setCurrentView('homepage');
    setSelectedScheme(null);
  };

  if (!isRegistered) {
    return (
      <>
        <RegistrationForm 
          language={language}
          onComplete={handleRegistrationComplete}
        />
        <Chatbot 
          language={language}
          isOpen={chatbotOpen}
          onToggle={toggleChatbot}
        />
      </>
    );
  }

  return (
    <>
      {currentView === 'homepage' ? (
        <Homepage 
          language={language}
          onLanguageChange={handleLanguageChange}
          onApply={handleApply}
          onSchemeSelect={handleSchemeSelect}
        />
      ) : (
        selectedScheme && (
          <SchemeDetail
            schemeId={selectedScheme}
            language={language}
            onBack={handleBackToHomepage}
            onApply={handleApply}
          />
        )
      )}
      
      <Chatbot 
        language={language}
        isOpen={chatbotOpen}
        onToggle={toggleChatbot}
      />
    </>
  );
}