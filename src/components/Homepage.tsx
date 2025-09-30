import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Wheat, 
  GraduationCap, 
  Heart, 
  Home, 
  Briefcase, 
  Users,
  ArrowRight,
  CheckCircle,
  FileText,
  MapPin,
  Languages
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import heroImage from "@/assets/hero-banner.jpg";

interface HomepageProps {
  language: 'en' | 'hi';
  onLanguageChange: (lang: 'en' | 'hi') => void;
  onApply: (scheme: { id: string; title: string }) => void;
  onSchemeSelect: (schemeId: string) => void;
}

interface SchemeCategory {
  id: string;
  icon: React.ReactNode;
  schemes: Array<{
    id: string;
    title: string;
    description: string;
    eligibility: string;
    benefits: string;
    officialUrl: string;
  }>;
}

export default function Homepage({ language, onLanguageChange, onApply, onSchemeSelect }: HomepageProps) {
  const t = useTranslation(language);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const schemesRef = useRef<HTMLDivElement>(null);

  const schemeCategories: SchemeCategory[] = [
    {
      id: "agriculture",
      icon: <Wheat className="h-8 w-8" />,
      schemes: [
        {
          id: "pm-kisan",
          title: language === 'en' ? "PM-KISAN Scheme" : "पीएम-किसान योजना",
          description: language === 'en' 
            ? "Direct income support to farmer families" 
            : "किसान परिवारों को प्रत्यक्ष आय सहायता",
          eligibility: language === 'en' 
            ? "Small & marginal farmers" 
            : "छोटे और सीमांत किसान",
          benefits: language === 'en' 
            ? "₹6,000 per year in 3 installments" 
            : "₹6,000 प्रति वर्ष 3 किश्तों में",
          officialUrl: "https://pmkisan.gov.in/"
        },
        {
          id: "crop-insurance",
          title: language === 'en' ? "Crop Insurance Scheme" : "फसल बीमा योजना",
          description: language === 'en' 
            ? "Insurance coverage for crop losses" 
            : "फसल नुकसान के लिए बीमा कवरेज",
          eligibility: language === 'en' 
            ? "All farmers" 
            : "सभी किसान",
          benefits: language === 'en' 
            ? "Up to 90% premium subsidy" 
            : "90% तक प्रीमियम सब्सिडी",
          officialUrl: "https://pmfby.gov.in/"
        },
        {
          id: "kisan-credit-card",
          title: language === 'en' ? "Kisan Credit Card" : "किसान क्रेडिट कार्ड",
          description: language === 'en' 
            ? "Affordable credit for farmers" 
            : "किसानों के लिए किफायती ऋण",
          eligibility: language === 'en' 
            ? "All farmers" 
            : "सभी किसान",
          benefits: language === 'en' 
            ? "Low interest rate loans" 
            : "कम ब्याज दर पर ऋण",
          officialUrl: "https://www.nabard.org/kccscheme.aspx"
        },
        {
          id: "soil-health-card",
          title: language === 'en' ? "Soil Health Card Scheme" : "मृदा स्वास्थ्य कार्ड योजना",
          description: language === 'en' 
            ? "Soil testing and nutrient management" 
            : "मिट्टी परीक्षण और पोषक तत्व प्रबंधन",
          eligibility: language === 'en' 
            ? "All farmers" 
            : "सभी किसान",
          benefits: language === 'en' 
            ? "Free soil testing" 
            : "निःशुल्क मिट्टी परीक्षण",
          officialUrl: "https://soilhealth.dac.gov.in/"
        },
        {
          id: "pm-kusum",
          title: language === 'en' ? "PM-KUSUM Scheme" : "पीएम-कुसुम योजना",
          description: language === 'en' 
            ? "Solar pumps for farmers" 
            : "किसानों के लिए सोलर पंप",
          eligibility: language === 'en' 
            ? "All farmers" 
            : "सभी किसान",
          benefits: language === 'en' 
            ? "90% subsidy on solar pumps" 
            : "सोलर पंप पर 90% सब्सिडी",
          officialUrl: "https://kusum.online/"
        }
      ]
    },
    {
      id: "education",
      icon: <GraduationCap className="h-8 w-8" />,
      schemes: [
        {
          id: "scholarship",
          title: language === 'en' ? "National Scholarship Portal" : "राष्ट्रीय छात्रवृत्ति पोर्टल",
          description: language === 'en' 
            ? "Scholarships for meritorious students" 
            : "मेधावी छात्रों के लिए छात्रवृत्ति",
          eligibility: language === 'en' 
            ? "Students from minority communities" 
            : "अल्पसंख्यक समुदाय के छात्र",
          benefits: language === 'en' 
            ? "Financial assistance for education" 
            : "शिक्षा के लिए वित्तीय सहायता",
          officialUrl: "https://scholarships.gov.in/"
        },
        {
          id: "mid-day-meal",
          title: language === 'en' ? "Mid Day Meal Scheme" : "मध्याह्न भोजन योजना",
          description: language === 'en' 
            ? "Free lunch for school children" 
            : "स्कूली बच्चों के लिए निःशुल्क दोपहर का भोजन",
          eligibility: language === 'en' 
            ? "Students in government schools" 
            : "सरकारी स्कूलों के छात्र",
          benefits: language === 'en' 
            ? "Nutritious hot cooked meal" 
            : "पौष्टिक गर्म पका हुआ भोजन",
          officialUrl: "https://mdm.nic.in/"
        },
        {
          id: "samagra-shiksha",
          title: language === 'en' ? "Samagra Shiksha Abhiyan" : "समग्र शिक्षा अभियान",
          description: language === 'en' 
            ? "Holistic education development" 
            : "समग्र शिक्षा विकास",
          eligibility: language === 'en' 
            ? "All students" 
            : "सभी छात्र",
          benefits: language === 'en' 
            ? "Quality education infrastructure" 
            : "गुणवत्तापूर्ण शिक्षा अवसंरचना",
          officialUrl: "https://samagra.education.gov.in/"
        },
        {
          id: "beti-bachao-padhao",
          title: language === 'en' ? "Beti Bachao Beti Padhao" : "बेटी बचाओ बेटी पढ़ाओ",
          description: language === 'en' 
            ? "Girl child education and safety" 
            : "बालिका शिक्षा और सुरक्षा",
          eligibility: language === 'en' 
            ? "Girl children" 
            : "बालिकाएं",
          benefits: language === 'en' 
            ? "Educational incentives for girls" 
            : "लड़कियों के लिए शैक्षिक प्रोत्साहन",
          officialUrl: "https://wcd.nic.in/bbbp-scheme"
        },
        {
          id: "digital-india-e-learning",
          title: language === 'en' ? "Digital India E-Learning" : "डिजिटल इंडिया ई-लर्निंग",
          description: language === 'en' 
            ? "Digital education platform" 
            : "डिजिटल शिक्षा मंच",
          eligibility: language === 'en' 
            ? "All students" 
            : "सभी छात्र",
          benefits: language === 'en' 
            ? "Free online courses" 
            : "निःशुल्क ऑनलाइन पाठ्यक्रम",
          officialUrl: "https://www.digitalindia.gov.in/"
        }
      ]
    },
    {
      id: "healthcare",
      icon: <Heart className="h-8 w-8" />,
      schemes: [
        {
          id: "ayushman",
          title: language === 'en' ? "Ayushman Bharat" : "आयुष्मान भारत",
          description: language === 'en' 
            ? "Health insurance for poor families" 
            : "गरीब परिवारों के लिए स्वास्थ्य बीमा",
          eligibility: language === 'en' 
            ? "Below poverty line families" 
            : "गरीबी रेखा से नीचे के परिवार",
          benefits: language === 'en' 
            ? "₹5 lakh annual health coverage" 
            : "₹5 लाख वार्षिक स्वास्थ्य कवरेज",
          officialUrl: "https://pmjay.gov.in/"
        },
        {
          id: "janani-suraksha",
          title: language === 'en' ? "Janani Suraksha Yojana" : "जननी सुरक्षा योजना",
          description: language === 'en' 
            ? "Safe motherhood intervention" 
            : "सुरक्षित मातृत्व हस्तक्षेप",
          eligibility: language === 'en' 
            ? "Pregnant women from poor families" 
            : "गरीब परिवारों की गर्भवती महिलाएं",
          benefits: language === 'en' 
            ? "Cash assistance for delivery" 
            : "प्रसव के लिए नकद सहायता",
          officialUrl: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309"
        },
        {
          id: "mission-indradhanush",
          title: language === 'en' ? "Mission Indradhanush" : "मिशन इन्द्रधनुष",
          description: language === 'en' 
            ? "Universal immunization program" 
            : "सार्वभौमिक टीकाकरण कार्यक्रम",
          eligibility: language === 'en' 
            ? "Children and pregnant women" 
            : "बच्चे और गर्भवती महिलाएं",
          benefits: language === 'en' 
            ? "Free vaccination" 
            : "निःशुल्क टीकाकरण",
          officialUrl: "https://www.nhp.gov.in/mission-indradhanush"
        },
        {
          id: "pradhan-mantri-swasthya-suraksha-yojana",
          title: language === 'en' ? "PM Swasthya Suraksha Yojana" : "पीएम स्वास्थ्य सुरक्षा योजना",
          description: language === 'en' 
            ? "Healthcare infrastructure development" 
            : "स्वास्थ्य सेवा अवसंरचना विकास",
          eligibility: language === 'en' 
            ? "All citizens" 
            : "सभी नागरिक",
          benefits: language === 'en' 
            ? "Better healthcare facilities" 
            : "बेहतर स्वास्थ्य सुविधाएं",
          officialUrl: "https://pmssy-mohfw.nic.in/"
        }
      ]
    },
    {
      id: "housing",
      icon: <Home className="h-8 w-8" />,
      schemes: [
        {
          id: "pmay",
          title: language === 'en' ? "Pradhan Mantri Awas Yojana" : "प्रधानमंत्री आवास योजना",
          description: language === 'en' 
            ? "Affordable housing for all" 
            : "सभी के लिए किफायती आवास",
          eligibility: language === 'en' 
            ? "Economically weaker sections" 
            : "आर्थिक रूप से कमजोर वर्ग",
          benefits: language === 'en' 
            ? "Subsidized home loans" 
            : "सब्सिडी वाले होम लोन",
          officialUrl: "https://pmaymis.gov.in/"
        },
        {
          id: "pmay-gramin",
          title: language === 'en' ? "PM Awas Yojana Gramin" : "पीएम आवास योजना ग्रामीण",
          description: language === 'en' 
            ? "Rural housing scheme" 
            : "ग्रामीण आवास योजना",
          eligibility: language === 'en' 
            ? "Rural homeless families" 
            : "ग्रामीण बेघर परिवार",
          benefits: language === 'en' 
            ? "Financial assistance for house construction" 
            : "घर निर्माण के लिए वित्तीय सहायता",
          officialUrl: "https://pmayg.nic.in/"
        },
        {
          id: "atal-mission-rejuvenation",
          title: language === 'en' ? "AMRUT Scheme" : "अमृत योजना",
          description: language === 'en' 
            ? "Urban infrastructure development" 
            : "शहरी अवसंरचना विकास",
          eligibility: language === 'en' 
            ? "Urban areas" 
            : "शहरी क्षेत्र",
          benefits: language === 'en' 
            ? "Water supply and sewerage" 
            : "जल आपूर्ति और सीवरेज",
          officialUrl: "http://amrut.gov.in/"
        }
      ]
    },
    {
      id: "employment",
      icon: <Briefcase className="h-8 w-8" />,
      schemes: [
        {
          id: "mgnrega",
          title: language === 'en' ? "MGNREGA" : "मनरेगा",
          description: language === 'en' 
            ? "100 days guaranteed employment" 
            : "100 दिन गारंटीशुदा रोजगार",
          eligibility: language === 'en' 
            ? "Rural households" 
            : "ग्रामीण घर-परिवार",
          benefits: language === 'en' 
            ? "Minimum wage guarantee" 
            : "न्यूनतम मजदूरी की गारंटी",
          officialUrl: "https://nrega.nic.in/netnrega/home.aspx"
        },
        {
          id: "pmkvy",
          title: language === 'en' ? "Pradhan Mantri Kaushal Vikas Yojana" : "प्रधानमंत्री कौशल विकास योजना",
          description: language === 'en' 
            ? "Skill development training" 
            : "कौशल विकास प्रशिक्षण",
          eligibility: language === 'en' 
            ? "Youth aged 15-45 years" 
            : "15-45 वर्ष आयु के युवा",
          benefits: language === 'en' 
            ? "Free skill training and certification" 
            : "निःशुल्क कौशल प्रशिक्षण और प्रमाणन",
          officialUrl: "https://www.pmkvyofficial.org/"
        },
        {
          id: "startup-india",
          title: language === 'en' ? "Startup India" : "स्टार्टअप इंडिया",
          description: language === 'en' 
            ? "Support for startups" 
            : "स्टार्टअप के लिए सहायता",
          eligibility: language === 'en' 
            ? "Entrepreneurs" 
            : "उद्यमी",
          benefits: language === 'en' 
            ? "Tax benefits and funding support" 
            : "कर लाभ और फंडिंग सहायता",
          officialUrl: "https://www.startupindia.gov.in/"
        },
        {
          id: "mudra-yojana",
          title: language === 'en' ? "Pradhan Mantri MUDRA Yojana" : "प्रधानमंत्री मुद्रा योजना",
          description: language === 'en' 
            ? "Micro finance for small businesses" 
            : "छोटे व्यवसायों के लिए सूक्ष्म वित्त",
          eligibility: language === 'en' 
            ? "Small business owners" 
            : "छोटे व्यवसाय के मालिक",
          benefits: language === 'en' 
            ? "Loans up to ₹10 lakh" 
            : "₹10 लाख तक का ऋण",
          officialUrl: "https://www.mudra.org.in/"
        }
      ]
    },
    {
      id: "women",
      icon: <Users className="h-8 w-8" />,
      schemes: [
        {
          id: "jan-dhan",
          title: language === 'en' ? "Jan Dhan Yojana" : "जन धन योजना",
          description: language === 'en' 
            ? "Financial inclusion for all" 
            : "सभी के लिए वित्तीय समावेश",
          eligibility: language === 'en' 
            ? "All Indian citizens" 
            : "सभी भारतीय नागरिक",
          benefits: language === 'en' 
            ? "Zero balance bank account" 
            : "जीरो बैलेंस बैंक खाता",
          officialUrl: "https://www.pmjdy.gov.in/"
        },
        {
          id: "sukanya-samriddhi",
          title: language === 'en' ? "Sukanya Samriddhi Yojana" : "सुकन्या समृद्धि योजना",
          description: language === 'en' 
            ? "Savings scheme for girl child" 
            : "बालिकाओं के लिए बचत योजना",
          eligibility: language === 'en' 
            ? "Girl child under 10 years" 
            : "10 वर्ष से कम आयु की बालिकाएं",
          benefits: language === 'en' 
            ? "High interest savings account" 
            : "उच्च ब्याज बचत खाता",
          officialUrl: "https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=61"
        },
        {
          id: "ujjwala-yojana",
          title: language === 'en' ? "Pradhan Mantri Ujjwala Yojana" : "प्रधानमंत्री उज्ज्वला योजना",
          description: language === 'en' 
            ? "Free LPG connections to women" 
            : "महिलाओं को निःशुल्क एलपीजी कनेक्शन",
          eligibility: language === 'en' 
            ? "Women from BPL families" 
            : "बीपीएल परिवारों की महिलाएं",
          benefits: language === 'en' 
            ? "Free gas connection and stove" 
            : "निःशुल्क गैस कनेक्शन और चूल्हा",
          officialUrl: "https://www.pmujjwalayojana.com/"
        }
      ]
    }
  ];

  const categoryTitles = {
    agriculture: t.homepage.categories.agriculture,
    education: t.homepage.categories.education,
    healthcare: t.homepage.categories.healthcare,
    housing: t.homepage.categories.housing,
    employment: t.homepage.categories.employment,
    women: t.homepage.categories.women,
  };

  const filteredSchemes = schemeCategories.flatMap(category => 
    category.schemes.filter(scheme =>
      scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(scheme => ({ ...scheme, category: category.id }))
  );

  const displaySchemes = searchQuery
    ? filteredSchemes
    : selectedCategory
      ? schemeCategories
          .filter(c => c.id === selectedCategory)
          .flatMap(c => c.schemes.map(scheme => ({ ...scheme, category: c.id })))
      : schemeCategories.slice(0, 4).flatMap(c => 
        c.schemes.map(scheme => ({ ...scheme, category: c.id }))
      );

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Language Toggle */}
      <header className="border-b border-border bg-card shadow-soft">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-full"></div>
            <span className="text-xl font-bold text-primary">
              {language === 'en' ? 'Government Schemes' : 'सरकारी योजनाएं'}
            </span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onLanguageChange(language === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-2"
          >
            <Languages className="h-4 w-4" />
            {language === 'en' ? 'हिंदी' : 'English'}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-hero text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <img 
              src={heroImage} 
              alt="Government Schemes Banner"
              className="w-full h-64 object-cover rounded-xl mb-8 shadow-strong"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t.homepage.welcome}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {t.homepage.subtitle}
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t.homepage.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-6 text-lg bg-white/10 border-white/20 text-white placeholder-white/70"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Scheme Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            {t.homepage.findSchemes}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {schemeCategories.map((category) => (
              <Card 
                key={category.id} 
                className="scheme-card cursor-pointer group"
                role="button"
                tabIndex={0}
                onClick={() => {
                  setSelectedCategory(category.id);
                  schemesRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-primary mb-4 group-hover:text-secondary transition-smooth">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-lg">
                    {categoryTitles[category.id as keyof typeof categoryTitles]}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Schemes */}
      <section className="py-16" ref={schemesRef}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displaySchemes.map((scheme) => (
              <Card key={scheme.id} className="scheme-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle 
                        className="text-xl mb-2 cursor-pointer hover:text-primary transition-smooth"
                        onClick={() => onSchemeSelect(scheme.id)}
                      >
                        {scheme.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {scheme.description}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="ml-2">
                      {categoryTitles[scheme.category as keyof typeof categoryTitles]}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">
                          {language === 'en' ? 'Eligibility:' : 'पात्रता:'}
                        </p>
                        <p className="text-sm text-muted-foreground">{scheme.eligibility}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <FileText className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">
                          {language === 'en' ? 'Benefits:' : 'लाभ:'}
                        </p>
                        <p className="text-sm text-muted-foreground">{scheme.benefits}</p>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-6 btn-large" 
                    variant="default"
                    onClick={() => window.open(scheme.officialUrl, '_blank')}
                  >
                    {t.apply}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            {t.homepage.howItWorks}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.homepage.steps.register.title}</h3>
              <p className="text-muted-foreground">{t.homepage.steps.register.description}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.homepage.steps.search.title}</h3>
              <p className="text-muted-foreground">{t.homepage.steps.search.description}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-success-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.homepage.steps.apply.title}</h3>
              <p className="text-muted-foreground">{t.homepage.steps.apply.description}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}