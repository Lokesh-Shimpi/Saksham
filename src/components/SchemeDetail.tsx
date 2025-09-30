import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle, 
  FileText, 
  MapPin, 
  Calendar, 
  Users, 
  IndianRupee,
  Clock,
  AlertCircle,
  Download,
  Phone,
  Globe,
  HelpCircle
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface SchemeDetailProps {
  schemeId: string;
  language: 'en' | 'hi';
  onBack: () => void;
  onApply: (scheme: { id: string; title: string }) => void;
}

interface DetailedScheme {
  id: string;
  title: string;
  description: string;
  ministry: string;
  category: string;
  status: 'active' | 'upcoming' | 'closed';
  launchDate: string;
  lastDate?: string;
  benefitAmount: string;
  totalBeneficiaries?: string;
  coverage: string;
  objectives: string[];
  eligibility: {
    criteria: string[];
    ageLimit?: string;
    incomeLimit?: string;
    category?: string[];
  };
  benefits: string[];
  documents: string[];
  applicationProcess: {
    steps: string[];
    onlineUrl?: string;
    offlineProcess?: string;
  };
  keyFeatures: string[];
  faqs: { question: string; answer: string; }[];
  helpline: string;
  officialWebsite: string;
}

export default function SchemeDetail({ schemeId, language, onBack, onApply }: SchemeDetailProps) {
  const t = useTranslation(language);

  // Mock data based on the scheme ID - in real app, this would be fetched from API
  const getSchemeData = (id: string): DetailedScheme => {
    const schemes: Record<string, DetailedScheme> = {
      'pm-kisan': {
        id: 'pm-kisan',
        title: language === 'en' ? 'PM-KISAN Scheme' : 'पीएम-किसान योजना',
        description: language === 'en' 
          ? 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector Scheme launched on 1st February 2019. Under this scheme, income support of ₹6,000 per year is provided to all farmer families across the country in three equal installments of ₹2,000 each every four months.'
          : 'प्रधानमंत्री किसान सम्मान निधि (पीएम-किसान) एक केंद्रीय क्षेत्र योजना है जो 1 फरवरी 2019 को शुरू की गई थी। इस योजना के तहत, देश भर के सभी किसान परिवारों को प्रति वर्ष ₹6,000 की आय सहायता प्रदान की जाती है जो तीन समान किश्तों में ₹2,000 की दर से हर चार महीने में दी जाती है।',
        ministry: language === 'en' ? 'Ministry of Agriculture & Farmers Welfare' : 'कृषि एवं किसान कल्याण मंत्रालय',
        category: language === 'en' ? 'Agriculture' : 'कृषि',
        status: 'active' as const,
        launchDate: '01 Feb 2019',
        benefitAmount: '₹6,000 per year',
        totalBeneficiaries: '11+ Crore',
        coverage: language === 'en' ? 'All of India' : 'पूरा भारत',
        objectives: language === 'en' ? [
          'Provide income support to all farmer families',
          'Supplement financial needs for agriculture and allied activities',
          'Ensure proper crop health and appropriate yields'
        ] : [
          'सभी किसान परिवारों को आय सहायता प्रदान करना',
          'कृषि और संबद्ध गतिविधियों की वित्तीय आवश्यकताओं को पूरा करना',
          'उचित फसल स्वास्थ्य और उत्पादन सुनिश्चित करना'
        ],
        eligibility: {
          criteria: language === 'en' ? [
            'Small and marginal farmer families',
            'Landholding farmers across the country',
            'Exclusions apply for institutional land holders, income tax payers'
          ] : [
            'छोटे और सीमांत किसान परिवार',
            'देश भर में भूमि धारक किसान',
            'संस्थागत भूमि धारकों, आयकर दाताओं के लिए बहिष्करण लागू'
          ],
          category: ['General', 'OBC', 'SC', 'ST']
        },
        benefits: language === 'en' ? [
          '₹6,000 per year in 3 installments',
          'Direct bank transfer (DBT)',
          'No processing fee',
          'Transparent and efficient delivery'
        ] : [
          'प्रति वर्ष ₹6,000 की राशि 3 किश्तों में',
          'प्रत्यक्ष बैंक स्थानांतरण (DBT)',
          'कोई प्रसंस्करण शुल्क नहीं',
          'पारदर्शी और कुशल वितरण'
        ],
        documents: language === 'en' ? [
          'Aadhar Card (mandatory)',
          'Bank Account Details with IFSC',
          'Land ownership documents',
          'Mobile number linked to Aadhar'
        ] : [
          'आधार कार्ड (अनिवार्य)',
          'IFSC के साथ बैंक खाता विवरण',
          'भूमि स्वामित्व दस्तावेज',
          'आधार से लिंक मोबाइल नंबर'
        ],
        applicationProcess: {
          steps: language === 'en' ? [
            'Visit PM-KISAN official website or nearest CSC',
            'Click on "Farmers Corner" section',
            'Select "New Farmer Registration"',
            'Fill the registration form with required details',
            'Upload necessary documents',
            'Submit the application and note down the reference number'
          ] : [
            'पीएम-किसान की आधिकारिक वेबसाइट या निकटतम CSC पर जाएं',
            '"फार्मर्स कॉर्नर" सेक्शन पर क्लिक करें',
            '"नया किसान पंजीकरण" चुनें',
            'आवश्यक विवरण के साथ पंजीकरण फॉर्म भरें',
            'आवश्यक दस्तावेज अपलोड करें',
            'आवेदन जमा करें और संदर्भ संख्या नोट करें'
          ],
          onlineUrl: 'https://pmkisan.gov.in/',
          offlineProcess: language === 'en' 
            ? 'Visit nearest Common Service Center (CSC) or local agriculture office'
            : 'निकटतम कॉमन सर्विस सेंटर (CSC) या स्थानीय कृषि कार्यालय पर जाएं'
        },
        keyFeatures: language === 'en' ? [
          '100% Central Government funding',
          'Direct Benefit Transfer (DBT)',
          'Self-registration facility available',
          'Aadhaar-based beneficiary identification'
        ] : [
          '100% केंद्र सरकार द्वारा वित्त पोषित',
          'प्रत्यक्ष लाभ स्थानांतरण (DBT)',
          'स्व-पंजीकरण सुविधा उपलब्ध',
          'आधार आधारित लाभार्थी पहचान'
        ],
        faqs: language === 'en' ? [
          {
            question: 'Who is eligible for PM-KISAN?',
            answer: 'All farmer families with cultivable land are eligible, excluding institutional landholders and income tax payers.'
          },
          {
            question: 'How to check payment status?',
            answer: 'Visit pmkisan.gov.in, go to "Farmers Corner" and select "Beneficiary Status" to check payment details.'
          }
        ] : [
          {
            question: 'पीएम-किसान के लिए कौन पात्र है?',
            answer: 'कृषि योग्य भूमि वाले सभी किसान परिवार पात्र हैं, संस्थागत भूमिधारकों और आयकर दाताओं को छोड़कर।'
          },
          {
            question: 'भुगतान की स्थिति कैसे जांचें?',
            answer: 'pmkisan.gov.in पर जाएं, "फार्मर्स कॉर्नर" पर जाएं और भुगतान विवरण जांचने के लिए "लाभार्थी स्थिति" चुनें।'
          }
        ],
        helpline: '155261 / 1800-115-526',
        officialWebsite: 'https://pmkisan.gov.in/'
      },
      'ayushman': {
        id: 'ayushman',
        title: language === 'en' ? 'Ayushman Bharat' : 'आयुष्मान भारत',
        description: language === 'en' 
          ? 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB PM-JAY) is the largest health insurance scheme in the world which aims at providing health coverage of Rs. 5 lakh per family per year to over 10.74 crore poor and vulnerable families.'
          : 'आयुष्मान भारत प्रधानमंत्री जन आरोग्य योजना (AB PM-JAY) विश्व की सबसे बड़ी स्वास्थ्य बीमा योजना है जिसका लक्ष्य 10.74 करोड़ से अधिक गरीब और कमजोर परिवारों को प्रति परिवार प्रति वर्ष 5 लाख रुपये का स्वास्थ्य कवरेज प्रदान करना है।',
        ministry: language === 'en' ? 'Ministry of Health and Family Welfare' : 'स्वास्थ्य और परिवार कल्याण मंत्रालय',
        category: language === 'en' ? 'Healthcare' : 'स्वास्थ्य सेवा',
        status: 'active' as const,
        launchDate: '23 Sep 2018',
        benefitAmount: '₹5 lakh per family per year',
        totalBeneficiaries: '10.74+ Crore families',
        coverage: language === 'en' ? 'All of India' : 'पूरा भारत',
        objectives: language === 'en' ? [
          'Provide financial protection against high medical costs',
          'Improve access to quality healthcare for poor families',
          'Reduce catastrophic healthcare expenditure'
        ] : [
          'उच्च चिकित्सा लागत से वित्तीय सुरक्षा प्रदान करना',
          'गरीब परिवारों के लिए गुणवत्तापूर्ण स्वास्थ्य सेवा तक पहुंच में सुधार',
          'आपदाजनक स्वास्थ्य व्यय को कम करना'
        ],
        eligibility: {
          criteria: language === 'en' ? [
            'Families covered under SECC-2011 database',
            'Below poverty line families',
            'Rural and urban poor families'
          ] : [
            'SECC-2011 डेटाबेस के तहत आने वाले परिवार',
            'गरीबी रेखा से नीचे के परिवार',
            'ग्रामीण और शहरी गरीब परिवार'
          ],
          category: ['General', 'OBC', 'SC', 'ST']
        },
        benefits: language === 'en' ? [
          '₹5 lakh health coverage per family per year',
          'Cashless treatment at empanelled hospitals',
          'Secondary and tertiary care hospitalization',
          'Pre and post-hospitalization expenses covered'
        ] : [
          'प्रति परिवार प्रति वर्ष ₹5 लाख का स्वास्थ्य कवरेज',
          'सूचीबद्ध अस्पतालों में कैशलेस इलाज',
          'द्वितीयक और तृतीयक देखभाल अस्पताल में भर्ती',
          'अस्पताल में भर्ती से पहले और बाद के खर्च शामिल'
        ],
        documents: language === 'en' ? [
          'Aadhar Card',
          'Family ID/Ration Card',
          'SECC-2011 beneficiary verification',
          'Mobile number'
        ] : [
          'आधार कार्ड',
          'पारिवारिक पहचान/राशन कार्ड',
          'SECC-2011 लाभार्थी सत्यापन',
          'मोबाइल नंबर'
        ],
        applicationProcess: {
          steps: language === 'en' ? [
            'Check eligibility on PM-JAY website',
            'Visit nearest Common Service Center (CSC)',
            'Provide required documents for verification',
            'Get Ayushman card generated',
            'Use card for cashless treatment at empanelled hospitals'
          ] : [
            'PM-JAY वेबसाइट पर पात्रता जांचें',
            'निकटतम कॉमन सर्विस सेंटर (CSC) पर जाएं',
            'सत्यापन के लिए आवश्यक दस्तावेज प्रदान करें',
            'आयुष्मान कार्ड बनवाएं',
            'सूचीबद्ध अस्पतालों में कैशलेस इलाज के लिए कार्ड का उपयोग करें'
          ],
          onlineUrl: 'https://pmjay.gov.in/',
          offlineProcess: language === 'en' 
            ? 'Visit nearest Common Service Center (CSC) or empanelled hospital'
            : 'निकटतम कॉमन सर्विस सेंटर (CSC) या सूचीबद्ध अस्पताल पर जाएं'
        },
        keyFeatures: language === 'en' ? [
          'Largest health insurance scheme globally',
          'Cashless and paperless access',
          'Portable across the country',
          'No cap on family size and age'
        ] : [
          'विश्व की सबसे बड़ी स्वास्थ्य बीमा योजना',
          'कैशलेस और कागज रहित पहुंच',
          'देश भर में पोर्टेबल',
          'पारिवारिक आकार और आयु पर कोई सीमा नहीं'
        ],
        faqs: language === 'en' ? [
          {
            question: 'How to check if my name is in Ayushman Bharat list?',
            answer: 'Visit pmjay.gov.in and use the "Am I Eligible" feature with your mobile number or name to check eligibility.'
          },
          {
            question: 'Is there any premium to be paid?',
            answer: 'No, Ayushman Bharat is completely free for eligible beneficiaries. No premium payment is required.'
          }
        ] : [
          {
            question: 'कैसे जांचें कि मेरा नाम आयुष्मान भारत की सूची में है?',
            answer: 'pmjay.gov.in पर जाएं और पात्रता जांचने के लिए अपने मोबाइल नंबर या नाम के साथ "Am I Eligible" सुविधा का उपयोग करें।'
          },
          {
            question: 'क्या कोई प्रीमियम देना होता है?',
            answer: 'नहीं, आयुष्मान भारत पात्र लाभार्थियों के लिए पूरी तरह से मुफ्त है। किसी प्रीमियम का भुगतान आवश्यक नहीं है।'
          }
        ],
        helpline: '14555 / 1800-111-565',
        officialWebsite: 'https://pmjay.gov.in/'
      },
      'crop-insurance': {
        id: 'crop-insurance',
        title: language === 'en' ? 'Pradhan Mantri Fasal Bima Yojana' : 'प्रधानमंत्री फसल बीमा योजना',
        description: language === 'en' 
          ? 'PMFBY provides comprehensive risk insurance to farmers against crop loss due to natural calamities, pests, and diseases. It ensures farmers receive timely financial support to stabilize their income.'
          : 'PMFBY प्राकृतिक आपदाओं, कीटों और बीमारियों के कारण फसल के नुकसान के खिलाफ किसानों को व्यापक जोखिम बीमा प्रदान करता है।',
        ministry: language === 'en' ? 'Ministry of Agriculture & Farmers Welfare' : 'कृषि एवं किसान कल्याण मंत्रालय',
        category: language === 'en' ? 'Agriculture' : 'कृषि',
        status: 'active' as const,
        launchDate: '13 Jan 2016',
        benefitAmount: 'Up to actual crop value',
        totalBeneficiaries: '5.5+ Crore',
        coverage: language === 'en' ? 'All of India' : 'पूरा भारत',
        objectives: language === 'en' ? [
          'Provide insurance coverage and financial support to farmers',
          'Stabilize the income of farmers',
          'Encourage farmers to adopt innovative practices'
        ] : [
          'किसानों को बीमा कवरेज और वित्तीय सहायता प्रदान करना',
          'किसानों की आय को स्थिर करना',
          'किसानों को नवीन प्रथाओं को अपनाने के लिए प्रोत्साहित करना'
        ],
        eligibility: {
          criteria: language === 'en' ? [
            'All farmers growing notified crops',
            'Sharecroppers and tenant farmers',
            'Compulsory for loanee farmers'
          ] : [
            'अधिसूचित फसलें उगाने वाले सभी किसान',
            'बटाईदार और किरायेदार किसान',
            'ऋणी किसानों के लिए अनिवार्य'
          ],
          category: ['General', 'OBC', 'SC', 'ST']
        },
        benefits: language === 'en' ? [
          'Low premium rates (2% for Kharif, 1.5% for Rabi)',
          'Coverage for pre-sowing to post-harvest losses',
          'Quick settlement of claims',
          'Technology-enabled crop assessment'
        ] : [
          'कम प्रीमियम दरें (खरीफ के लिए 2%, रबी के लिए 1.5%)',
          'बुवाई से पहले से लेकर कटाई के बाद तक के नुकसान का कवरेज',
          'दावों का त्वरित निपटान',
          'प्रौद्योगिकी-सक्षम फसल मूल्यांकन'
        ],
        documents: language === 'en' ? [
          'Aadhar Card',
          'Bank account details',
          'Land ownership documents / Tenancy agreement',
          'Sowing certificate'
        ] : [
          'आधार कार्ड',
          'बैंक खाता विवरण',
          'भूमि स्वामित्व दस्तावेज / किरायेदारी समझौता',
          'बुवाई प्रमाण पत्र'
        ],
        applicationProcess: {
          steps: language === 'en' ? [
            'Visit PMFBY portal or nearest bank/CSC',
            'Select crop and area to be insured',
            'Submit required documents',
            'Pay nominal premium amount',
            'Receive policy confirmation via SMS'
          ] : [
            'PMFBY पोर्टल या निकटतम बैंक/CSC पर जाएं',
            'बीमा की जाने वाली फसल और क्षेत्र चुनें',
            'आवश्यक दस्तावेज जमा करें',
            'नाममात्र प्रीमियम राशि का भुगतान करें',
            'SMS के माध्यम से पॉलिसी की पुष्टि प्राप्त करें'
          ],
          onlineUrl: 'https://pmfby.gov.in/',
          offlineProcess: language === 'en' 
            ? 'Visit nearest bank branch or Common Service Center'
            : 'निकटतम बैंक शाखा या कॉमन सर्विस सेंटर पर जाएं'
        },
        keyFeatures: language === 'en' ? [
          'Heavily subsidized premium',
          'No upper limit on claim',
          'Covers all stages from pre-sowing to post-harvest',
          'Use of technology for quick assessment'
        ] : [
          'भारी सब्सिडी वाला प्रीमियम',
          'दावे पर कोई ऊपरी सीमा नहीं',
          'बुवाई से पहले से लेकर कटाई के बाद तक सभी चरणों को कवर करता है',
          'त्वरित मूल्यांकन के लिए प्रौद्योगिकी का उपयोग'
        ],
        faqs: language === 'en' ? [
          {
            question: 'What is the last date to apply for crop insurance?',
            answer: 'The cutoff date varies by crop and season. For Kharif, it is usually end of July, and for Rabi, it is end of December.'
          },
          {
            question: 'How to check claim status?',
            answer: 'Visit pmfby.gov.in and use the claim status feature with your application number or Aadhar number.'
          }
        ] : [
          {
            question: 'फसल बीमा के लिए आवेदन करने की अंतिम तिथि क्या है?',
            answer: 'कट-ऑफ तिथि फसल और सीजन के अनुसार भिन्न होती है। खरीफ के लिए, यह आमतौर पर जुलाई के अंत में होती है, और रबी के लिए, यह दिसंबर के अंत में होती है।'
          },
          {
            question: 'दावे की स्थिति कैसे जांचें?',
            answer: 'pmfby.gov.in पर जाएं और अपने आवेदन नंबर या आधार नंबर के साथ दावा स्थिति सुविधा का उपयोग करें।'
          }
        ],
        helpline: '1800-180-1551',
        officialWebsite: 'https://pmfby.gov.in/'
      },
      'kisan-credit-card': {
        id: 'kisan-credit-card',
        title: language === 'en' ? 'Kisan Credit Card Scheme' : 'किसान क्रेडिट कार्ड योजना',
        description: language === 'en' 
          ? 'KCC provides adequate and timely credit support to farmers for their cultivation and other needs. It offers flexible credit with simplified procedures and attractive interest rates.'
          : 'KCC किसानों को उनकी खेती और अन्य जरूरतों के लिए पर्याप्त और समय पर ऋण सहायता प्रदान करता है।',
        ministry: language === 'en' ? 'Ministry of Agriculture & Farmers Welfare' : 'कृषि एवं किसान कल्याण मंत्रालय',
        category: language === 'en' ? 'Agriculture' : 'कृषि',
        status: 'active' as const,
        launchDate: 'Aug 1998',
        benefitAmount: 'Up to ₹3 lakh at 7% interest',
        totalBeneficiaries: '7+ Crore',
        coverage: language === 'en' ? 'All of India' : 'पूरा भारत',
        objectives: language === 'en' ? [
          'Provide timely and adequate credit to farmers',
          'Meet short-term credit requirements for crop cultivation',
          'Post-harvest expenses and working capital'
        ] : [
          'किसानों को समय पर और पर्याप्त ऋण प्रदान करना',
          'फसल की खेती के लिए अल्पकालिक ऋण आवश्यकताओं को पूरा करना',
          'कटाई के बाद के खर्च और कार्यशील पूंजी'
        ],
        eligibility: {
          criteria: language === 'en' ? [
            'All farmers - individual/joint borrowers',
            'Tenant farmers, oral lessees',
            'Share croppers'
          ] : [
            'सभी किसान - व्यक्तिगत/संयुक्त उधारकर्ता',
            'किरायेदार किसान, मौखिक पट्टेदार',
            'बटाईदार'
          ],
          category: ['General', 'OBC', 'SC', 'ST']
        },
        benefits: language === 'en' ? [
          'Interest subvention of 2% for timely repayment',
          'Additional 3% interest subvention on prompt payment',
          'Flexible repayment schedule',
          'Overdraft facility available'
        ] : [
          'समय पर चुकौती के लिए 2% ब्याज छूट',
          'त्वरित भुगतान पर अतिरिक्त 3% ब्याज छूट',
          'लचीली पुनर्भुगतान अनुसूची',
          'ओवरड्राफ्ट सुविधा उपलब्ध'
        ],
        documents: language === 'en' ? [
          'Identity proof (Aadhar/Voter ID)',
          'Address proof',
          'Land ownership documents',
          'Passport size photographs'
        ] : [
          'पहचान प्रमाण (आधार/मतदाता पहचान पत्र)',
          'पते का प्रमाण',
          'भूमि स्वामित्व दस्तावेज',
          'पासपोर्ट साइज फोटो'
        ],
        applicationProcess: {
          steps: language === 'en' ? [
            'Visit nearest bank branch with required documents',
            'Fill KCC application form',
            'Submit land records and identity documents',
            'Bank will verify and process application',
            'Receive KCC card within 15-20 days'
          ] : [
            'आवश्यक दस्तावेजों के साथ निकटतम बैंक शाखा पर जाएं',
            'KCC आवेदन पत्र भरें',
            'भूमि रिकॉर्ड और पहचान दस्तावेज जमा करें',
            'बैंक आवेदन को सत्यापित और संसाधित करेगा',
            '15-20 दिनों के भीतर KCC कार्ड प्राप्त करें'
          ],
          onlineUrl: 'https://www.nabard.org/kccscheme.aspx',
          offlineProcess: language === 'en' 
            ? 'Visit nearest bank branch (Nationalized/Cooperative/Regional Rural Banks)'
            : 'निकटतम बैंक शाखा (राष्ट्रीयकृत/सहकारी/क्षेत्रीय ग्रामीण बैंक) पर जाएं'
        },
        keyFeatures: language === 'en' ? [
          'One-time documentation',
          'Multi-year validity',
          'Hassle-free withdrawals',
          'Insurance coverage included'
        ] : [
          'एक बार दस्तावेज़ीकरण',
          'बहु-वर्षीय वैधता',
          'परेशानी मुक्त निकासी',
          'बीमा कवरेज शामिल'
        ],
        faqs: language === 'en' ? [
          {
            question: 'What is the interest rate on KCC?',
            answer: 'The effective interest rate is 4% per annum for loans up to ₹3 lakh with timely repayment (7% minus 2% interest subvention minus additional 3% prompt payment incentive).'
          },
          {
            question: 'Can I use KCC for non-agricultural purposes?',
            answer: 'Yes, KCC can be used for allied activities like dairy, fishery, poultry, and household consumption needs.'
          }
        ] : [
          {
            question: 'KCC पर ब्याज दर क्या है?',
            answer: 'समय पर चुकौती के साथ ₹3 लाख तक के ऋण के लिए प्रभावी ब्याज दर 4% प्रति वर्ष है (7% माइनस 2% ब्याज छूट माइनस अतिरिक्त 3% त्वरित भुगतान प्रोत्साहन)।'
          },
          {
            question: 'क्या मैं KCC का उपयोग गैर-कृषि उद्देश्यों के लिए कर सकता हूं?',
            answer: 'हां, KCC का उपयोग डेयरी, मत्स्य पालन, मुर्गी पालन और घरेलू उपभोग की जरूरतों जैसी संबद्ध गतिविधियों के लिए किया जा सकता है।'
          }
        ],
        helpline: '1800-180-1111',
        officialWebsite: 'https://www.nabard.org/kccscheme.aspx'
      },
      'soil-health-card': {
        id: 'soil-health-card',
        title: language === 'en' ? 'Soil Health Card Scheme' : 'मृदा स्वास्थ्य कार्ड योजना',
        description: language === 'en' 
          ? 'Soil Health Card Scheme provides soil health cards to farmers which carry crop-wise recommendations of nutrients and fertilizers required for farm lands to help farmers improve productivity through judicious use of inputs.'
          : 'मृदा स्वास्थ्य कार्ड योजना किसानों को मृदा स्वास्थ्य कार्ड प्रदान करती है जिसमें फसल-वार पोषक तत्वों और उर्वरकों की सिफारिशें होती हैं।',
        ministry: language === 'en' ? 'Ministry of Agriculture & Farmers Welfare' : 'कृषि एवं किसान कल्याण मंत्रालय',
        category: language === 'en' ? 'Agriculture' : 'कृषि',
        status: 'active' as const,
        launchDate: '19 Feb 2015',
        benefitAmount: 'Free soil testing services',
        totalBeneficiaries: '22+ Crore cards issued',
        coverage: language === 'en' ? 'All of India' : 'पूरा भारत',
        objectives: language === 'en' ? [
          'Issue soil health cards to all farmers',
          'Promote judicious use of fertilizers',
          'Improve soil health and crop productivity'
        ] : [
          'सभी किसानों को मृदा स्वास्थ्य कार्ड जारी करना',
          'उर्वरकों के विवेकपूर्ण उपयोग को बढ़ावा देना',
          'मिट्टी के स्वास्थ्य और फसल उत्पादकता में सुधार'
        ],
        eligibility: {
          criteria: language === 'en' ? [
            'All farmers owning agricultural land',
            'Both small and large farmers eligible'
          ] : [
            'कृषि भूमि के मालिक सभी किसान',
            'छोटे और बड़े दोनों किसान पात्र'
          ],
          category: ['General', 'OBC', 'SC', 'ST']
        },
        benefits: language === 'en' ? [
          'Free soil testing every 3 years',
          'Customized fertilizer recommendations',
          'Increased crop yield',
          'Cost savings on fertilizers'
        ] : [
          'हर 3 साल में निःशुल्क मिट्टी परीक्षण',
          'अनुकूलित उर्वरक सिफारिशें',
          'फसल की उपज में वृद्धि',
          'उर्वरकों पर लागत बचत'
        ],
        documents: language === 'en' ? [
          'Land ownership documents',
          'Aadhar Card',
          'Mobile number',
          'Bank account details'
        ] : [
          'भूमि स्वामित्व दस्तावेज',
          'आधार कार्ड',
          'मोबाइल नंबर',
          'बैंक खाता विवरण'
        ],
        applicationProcess: {
          steps: language === 'en' ? [
            'Visit Soil Health Card portal',
            'Register with land details',
            'Collect soil samples as per guidelines',
            'Submit samples at designated lab',
            'Receive soil health card with recommendations'
          ] : [
            'मृदा स्वास्थ्य कार्ड पोर्टल पर जाएं',
            'भूमि विवरण के साथ पंजीकरण करें',
            'दिशानिर्देशों के अनुसार मिट्टी के नमूने एकत्र करें',
            'निर्दिष्ट प्रयोगशाला में नमूने जमा करें',
            'सिफारिशों के साथ मृदा स्वास्थ्य कार्ड प्राप्त करें'
          ],
          onlineUrl: 'https://soilhealth.dac.gov.in/',
          offlineProcess: language === 'en' 
            ? 'Visit nearest agriculture office or Krishi Vigyan Kendra'
            : 'निकटतम कृषि कार्यालय या कृषि विज्ञान केंद्र पर जाएं'
        },
        keyFeatures: language === 'en' ? [
          'Completely free service',
          'Scientific soil testing',
          'Crop-specific recommendations',
          'Digital card availability'
        ] : [
          'पूरी तरह से निःशुल्क सेवा',
          'वैज्ञानिक मिट्टी परीक्षण',
          'फसल-विशिष्ट सिफारिशें',
          'डिजिटल कार्ड उपलब्धता'
        ],
        faqs: language === 'en' ? [
          {
            question: 'How often should I get my soil tested?',
            answer: 'Soil testing should be done once every 3 years to monitor soil health and adjust fertilizer use accordingly.'
          },
          {
            question: 'How to download digital soil health card?',
            answer: 'Visit soilhealth.dac.gov.in, enter your details, and download your digital soil health card.'
          }
        ] : [
          {
            question: 'मुझे कितनी बार अपनी मिट्टी का परीक्षण करवाना चाहिए?',
            answer: 'मिट्टी के स्वास्थ्य की निगरानी और उर्वरक उपयोग को तदनुसार समायोजित करने के लिए हर 3 साल में एक बार मिट्टी परीक्षण किया जाना चाहिए।'
          },
          {
            question: 'डिजिटल मृदा स्वास्थ्य कार्ड कैसे डाउनलोड करें?',
            answer: 'soilhealth.dac.gov.in पर जाएं, अपना विवरण दर्ज करें, और अपना डिजिटल मृदा स्वास्थ्य कार्ड डाउनलोड करें।'
          }
        ],
        helpline: '1800-180-1551',
        officialWebsite: 'https://soilhealth.dac.gov.in/'
      },
      'pm-kusum': {
        id: 'pm-kusum',
        title: language === 'en' ? 'PM-KUSUM Scheme' : 'पीएम-कुसुम योजना',
        description: language === 'en' 
          ? 'Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan (PM-KUSUM) aims to provide financial and water security to farmers through installation of solar pumps and grid-connected solar power plants.'
          : 'प्रधानमंत्री किसान ऊर्जा सुरक्षा एवं उत्थान महाभियान (PM-KUSUM) का उद्देश्य सौर पंप और ग्रिड से जुड़े सौर ऊर्जा संयंत्रों की स्थापना के माध्यम से किसानों को वित्तीय और जल सुरक्षा प्रदान करना है।',
        ministry: language === 'en' ? 'Ministry of New and Renewable Energy' : 'नवीन और नवीकरणीय ऊर्जा मंत्रालय',
        category: language === 'en' ? 'Agriculture' : 'कृषि',
        status: 'active' as const,
        launchDate: '08 Mar 2019',
        benefitAmount: 'Up to 90% subsidy on solar pumps',
        totalBeneficiaries: '3.5+ Lakh installations',
        coverage: language === 'en' ? 'All of India' : 'पूरा भारत',
        objectives: language === 'en' ? [
          'De-dieselize agriculture sector',
          'Provide sustainable irrigation to farmers',
          'Generate additional income for farmers'
        ] : [
          'कृषि क्षेत्र को डीजल-मुक्त करना',
          'किसानों को स्थायी सिंचाई प्रदान करना',
          'किसानों के लिए अतिरिक्त आय उत्पन्न करना'
        ],
        eligibility: {
          criteria: language === 'en' ? [
            'Individual farmers',
            'Group of farmers / FPOs / Panchayats',
            'Cooperative societies'
          ] : [
            'व्यक्तिगत किसान',
            'किसानों का समूह / एफपीओ / पंचायत',
            'सहकारी समितियां'
          ],
          category: ['General', 'OBC', 'SC', 'ST']
        },
        benefits: language === 'en' ? [
          '30% subsidy from central government',
          '30% subsidy from state government',
          '30% loan from banks',
          'Additional income from selling surplus power'
        ] : [
          'केंद्र सरकार से 30% सब्सिडी',
          'राज्य सरकार से 30% सब्सिडी',
          'बैंकों से 30% ऋण',
          'अधिशेष बिजली बेचने से अतिरिक्त आय'
        ],
        documents: language === 'en' ? [
          'Land ownership documents',
          'Aadhar Card',
          'Bank account details',
          'Electricity bill (if applicable)'
        ] : [
          'भूमि स्वामित्व दस्तावेज',
          'आधार कार्ड',
          'बैंक खाता विवरण',
          'बिजली बिल (यदि लागू हो)'
        ],
        applicationProcess: {
          steps: language === 'en' ? [
            'Visit PM-KUSUM portal',
            'Register as farmer beneficiary',
            'Submit application with documents',
            'Get feasibility assessment done',
            'Install solar pump through empanelled vendor',
            'Receive subsidy after installation'
          ] : [
            'PM-KUSUM पोर्टल पर जाएं',
            'किसान लाभार्थी के रूप में पंजीकरण करें',
            'दस्तावेजों के साथ आवेदन जमा करें',
            'व्यवहार्यता मूल्यांकन करवाएं',
            'सूचीबद्ध विक्रेता के माध्यम से सौर पंप स्थापित करें',
            'स्थापना के बाद सब्सिडी प्राप्त करें'
          ],
          onlineUrl: 'https://kusum.online/',
          offlineProcess: language === 'en' 
            ? 'Visit State Nodal Agency or DISCOM office'
            : 'राज्य नोडल एजेंसी या डिस्कॉम कार्यालय पर जाएं'
        },
        keyFeatures: language === 'en' ? [
          'Clean and green energy',
          'Reduced irrigation cost',
          'Assured water supply',
          'Additional income opportunity'
        ] : [
          'स्वच्छ और हरित ऊर्जा',
          'कम सिंचाई लागत',
          'आश्वस्त जल आपूर्ति',
          'अतिरिक्त आय का अवसर'
        ],
        faqs: language === 'en' ? [
          {
            question: 'What is the farmer contribution in PM-KUSUM?',
            answer: 'Farmers need to contribute only 10% of the total cost. Rest 60% is subsidized and 30% can be taken as bank loan.'
          },
          {
            question: 'Can I sell extra electricity generated?',
            answer: 'Yes, under Component-C of PM-KUSUM, farmers can sell surplus solar power to DISCOMs and earn additional income.'
          }
        ] : [
          {
            question: 'PM-KUSUM में किसान का योगदान क्या है?',
            answer: 'किसानों को कुल लागत का केवल 10% योगदान करना होता है। बाकी 60% सब्सिडी है और 30% बैंक ऋण के रूप में लिया जा सकता है।'
          },
          {
            question: 'क्या मैं उत्पन्न अतिरिक्त बिजली बेच सकता हूं?',
            answer: 'हां, PM-KUSUM के घटक-C के तहत, किसान डिस्कॉम को अधिशेष सौर ऊर्जा बेच सकते हैं और अतिरिक्त आय अर्जित कर सकते हैं।'
          }
        ],
        helpline: '1800-180-3333',
        officialWebsite: 'https://kusum.online/'
      },
      'scholarship': {
        id: 'scholarship',
        title: language === 'en' ? 'National Scholarship Portal' : 'राष्ट्रीय छात्रवृत्ति पोर्टल',
        description: language === 'en' 
          ? 'NSP is a one-stop solution through which various services starting from student application, application receipt, processing, sanction and disbursement of various scholarships to Students are enabled.'
          : 'NSP एक वन-स्टॉप समाधान है जिसके माध्यम से छात्र आवेदन से लेकर विभिन्न छात्रवृत्तियों के वितरण तक की विभिन्न सेवाएं सक्षम की जाती हैं।',
        ministry: language === 'en' ? 'Ministry of Electronics and IT' : 'इलेक्ट्रॉनिक्स और सूचना प्रौद्योगिकी मंत्रालय',
        category: language === 'en' ? 'Education' : 'शिक्षा',
        status: 'active' as const,
        launchDate: '2015',
        benefitAmount: 'Varies by scholarship (₹3,000 to ₹1,25,000)',
        totalBeneficiaries: '9+ Crore applications',
        coverage: language === 'en' ? 'All of India' : 'पूरा भारत',
        objectives: language === 'en' ? [
          'Provide scholarships to meritorious students',
          'Support students from disadvantaged communities',
          'Enable transparent scholarship delivery'
        ] : [
          'मेधावी छात्रों को छात्रवृत्ति प्रदान करना',
          'वंचित समुदायों के छात्रों का समर्थन करना',
          'पारदर्शी छात्रवृत्ति वितरण सक्षम करना'
        ],
        eligibility: {
          criteria: language === 'en' ? [
            'Students from minority communities',
            'SC/ST/OBC students',
            'Meritorious students from economically weaker sections',
            'Students pursuing higher education'
          ] : [
            'अल्पसंख्यक समुदायों के छात्र',
            'SC/ST/OBC छात्र',
            'आर्थिक रूप से कमजोर वर्ग के मेधावी छात्र',
            'उच्च शिक्षा प्राप्त कर रहे छात्र'
          ],
          category: ['OBC', 'SC', 'ST', 'Minority']
        },
        benefits: language === 'en' ? [
          'Financial assistance for education',
          'Direct Benefit Transfer to bank account',
          'Multiple scholarship schemes under one platform',
          'No need to visit multiple offices'
        ] : [
          'शिक्षा के लिए वित्तीय सहायता',
          'बैंक खाते में प्रत्यक्ष लाभ हस्तांतरण',
          'एक मंच के तहत कई छात्रवृत्ति योजनाएं',
          'कई कार्यालयों में जाने की आवश्यकता नहीं'
        ],
        documents: language === 'en' ? [
          'Aadhar Card',
          'Income certificate',
          'Caste certificate (if applicable)',
          'Previous year mark sheets',
          'Bank account details',
          'Current course fee receipt'
        ] : [
          'आधार कार्ड',
          'आय प्रमाण पत्र',
          'जाति प्रमाण पत्र (यदि लागू हो)',
          'पिछले वर्ष की मार्कशीट',
          'बैंक खाता विवरण',
          'वर्तमान पाठ्यक्रम शुल्क रसीद'
        ],
        applicationProcess: {
          steps: language === 'en' ? [
            'Visit NSP portal and register',
            'Complete profile with required details',
            'Apply for relevant scholarships',
            'Upload required documents',
            'Submit application before deadline',
            'Track application status on portal'
          ] : [
            'NSP पोर्टल पर जाएं और पंजीकरण करें',
            'आवश्यक विवरण के साथ प्रोफ़ाइल पूरी करें',
            'प्रासंगिक छात्रवृत्ति के लिए आवेदन करें',
            'आवश्यक दस्तावेज अपलोड करें',
            'समय सीमा से पहले आवेदन जमा करें',
            'पोर्टल पर आवेदन स्थिति ट्रैक करें'
          ],
          onlineUrl: 'https://scholarships.gov.in/',
          offlineProcess: language === 'en' 
            ? 'Contact institution for offline application assistance'
            : 'ऑफलाइन आवेदन सहायता के लिए संस्थान से संपर्क करें'
        },
        keyFeatures: language === 'en' ? [
          'Single platform for all scholarships',
          'Transparent application process',
          'Direct benefit transfer',
          'Easy application tracking'
        ] : [
          'सभी छात्रवृत्तियों के लिए एकल मंच',
          'पारदर्शी आवेदन प्रक्रिया',
          'प्रत्यक्ष लाभ हस्तांतरण',
          'आसान आवेदन ट्रैकिंग'
        ],
        faqs: language === 'en' ? [
          {
            question: 'When does the scholarship portal open?',
            answer: 'Different scholarships have different timelines. Generally, fresh applications open in July-August and renewals in September-October.'
          },
          {
            question: 'Can I apply for multiple scholarships?',
            answer: 'Yes, you can apply for multiple scholarships if you meet their respective eligibility criteria. However, you can receive only one scholarship at a time.'
          }
        ] : [
          {
            question: 'छात्रवृत्ति पोर्टल कब खुलता है?',
            answer: 'विभिन्न छात्रवृत्तियों की अलग-अलग समय सीमा होती है। आम तौर पर, नए आवेदन जुलाई-अगस्त में खुलते हैं और नवीनीकरण सितंबर-अक्टूबर में होता है।'
          },
          {
            question: 'क्या मैं कई छात्रवृत्तियों के लिए आवेदन कर सकता हूं?',
            answer: 'हां, यदि आप उनके संबंधित पात्रता मानदंडों को पूरा करते हैं तो आप कई छात्रवृत्तियों के लिए आवेदन कर सकते हैं। हालांकि, आप एक समय में केवल एक छात्रवृत्ति प्राप्त कर सकते हैं।'
          }
        ],
        helpline: '0120-6619540',
        officialWebsite: 'https://scholarships.gov.in/'
      },
      'mid-day-meal': {
        id: 'mid-day-meal',
        title: language === 'en' ? 'Mid Day Meal Scheme' : 'मध्याह्न भोजन योजना',
        description: language === 'en' 
          ? 'PM POSHAN (formerly Mid Day Meal Scheme) provides hot cooked meals to children in government and government-aided schools. It aims to improve the nutritional status of school-age children and boost enrollment.'
          : 'PM POSHAN (पूर्व में मध्याह्न भोजन योजना) सरकारी और सरकारी सहायता प्राप्त स्कूलों में बच्चों को गर्म पका हुआ भोजन प्रदान करता है।',
        ministry: language === 'en' ? 'Ministry of Education' : 'शिक्षा मंत्रालय',
        category: language === 'en' ? 'Education' : 'शिक्षा',
        status: 'active' as const,
        launchDate: '15 Aug 1995',
        benefitAmount: 'Free hot cooked meal daily',
        totalBeneficiaries: '11.8+ Crore children',
        coverage: language === 'en' ? 'All of India' : 'पूरा भारत',
        objectives: language === 'en' ? [
          'Improve nutritional status of children',
          'Encourage poor children to attend school',
          'Provide nutritional support to children'
        ] : [
          'बच्चों की पोषण स्थिति में सुधार',
          'गरीब बच्चों को स्कूल जाने के लिए प्रोत्साहित करना',
          'बच्चों को पोषण सहायता प्रदान करना'
        ],
        eligibility: {
          criteria: language === 'en' ? [
            'Children studying in Classes I to VIII',
            'Government and government-aided schools',
            'Pre-primary students in some states'
          ] : [
            'कक्षा I से VIII में पढ़ने वाले बच्चे',
            'सरकारी और सरकारी सहायता प्राप्त स्कूल',
            'कुछ राज्यों में पूर्व-प्राथमिक छात्र'
          ],
          category: ['General', 'OBC', 'SC', 'ST']
        },
        benefits: language === 'en' ? [
          'Free nutritious hot cooked meal',
          'Improved school attendance',
          'Better learning outcomes',
          'Reduced classroom hunger'
        ] : [
          'निःशुल्क पौष्टिक गर्म पका हुआ भोजन',
          'बेहतर स्कूल उपस्थिति',
          'बेहतर सीखने के परिणाम',
          'कक्षा में भूख में कमी'
        ],
        documents: language === 'en' ? [
          'School enrollment proof',
          'No additional documents required from students'
        ] : [
          'स्कूल नामांकन प्रमाण',
          'छात्रों से कोई अतिरिक्त दस्तावेज आवश्यक नहीं'
        ],
        applicationProcess: {
          steps: language === 'en' ? [
            'Enroll child in government/aided school',
            'School automatically registers students',
            'Meals provided during school hours',
            'No separate application needed'
          ] : [
            'सरकारी/सहायता प्राप्त स्कूल में बच्चे का नामांकन करें',
            'स्कूल स्वचालित रूप से छात्रों को पंजीकृत करता है',
            'स्कूल के समय के दौरान भोजन प्रदान किया जाता है',
            'कोई अलग आवेदन की आवश्यकता नहीं'
          ],
          onlineUrl: 'https://mdm.nic.in/',
          offlineProcess: language === 'en' 
            ? 'Enroll in government or government-aided school'
            : 'सरकारी या सरकारी सहायता प्राप्त स्कूल में नामांकन करें'
        },
        keyFeatures: language === 'en' ? [
          'Universal coverage in government schools',
          'Nutritionally balanced meals',
          'Regular monitoring and quality checks',
          'Promotes school attendance'
        ] : [
          'सरकारी स्कूलों में सार्वभौमिक कवरेज',
          'पोषण संतुलित भोजन',
          'नियमित निगरानी और गुणवत्ता जांच',
          'स्कूल उपस्थिति को बढ़ावा देता है'
        ],
        faqs: language === 'en' ? [
          {
            question: 'What is served in mid-day meal?',
            answer: 'Meals typically include rice/wheat, dal (pulses), vegetables, and vary by region. The menu is designed to provide adequate calories and protein.'
          },
          {
            question: 'Are private school students eligible?',
            answer: 'No, currently the scheme covers only government and government-aided schools.'
          }
        ] : [
          {
            question: 'मध्याह्न भोजन में क्या परोसा जाता है?',
            answer: 'भोजन में आम तौर पर चावल/गेहूं, दाल, सब्जियां शामिल होती हैं और क्षेत्र के अनुसार भिन्न होती हैं। मेनू पर्याप्त कैलोरी और प्रोटीन प्रदान करने के लिए डिज़ाइन किया गया है।'
          },
          {
            question: 'क्या निजी स्कूल के छात्र पात्र हैं?',
            answer: 'नहीं, वर्तमान में यह योजना केवल सरकारी और सरकारी सहायता प्राप्त स्कूलों को कवर करती है।'
          }
        ],
        helpline: '1800-11-8004',
        officialWebsite: 'https://mdm.nic.in/'
      },
      'samagra-shiksha': {
        id: 'samagra-shiksha',
        title: language === 'en' ? 'Samagra Shiksha Abhiyan' : 'समग्र शिक्षा अभियान',
        description: language === 'en' 
          ? 'Samagra Shiksha is an integrated scheme for school education covering the entire gamut from pre-school to class 12. It aims to ensure inclusive and equitable quality education.'
          : 'समग्र शिक्षा प्री-स्कूल से कक्षा 12 तक की संपूर्ण स्कूली शिक्षा के लिए एक एकीकृत योजना है।',
        ministry: language === 'en' ? 'Ministry of Education' : 'शिक्षा मंत्रालय',
        category: language === 'en' ? 'Education' : 'शिक्षा',
        status: 'active' as const,
        launchDate: '24 May 2018',
        benefitAmount: 'Various educational benefits',
        coverage: language === 'en' ? 'All of India' : 'पूरा भारत',
        objectives: language === 'en' ? [
          'Ensure inclusive and equitable quality education',
          'Bridge social and gender gaps',
          'Ensure safety and security of students'
        ] : [
          'समावेशी और न्यायसंगत गुणवत्तापूर्ण शिक्षा सुनिश्चित करना',
          'सामाजिक और लैंगिक अंतर को पाटना',
          'छात्रों की सुरक्षा सुनिश्चित करना'
        ],
        eligibility: {
          criteria: language === 'en' ? [
            'All students from pre-primary to class 12',
            'Focus on disadvantaged groups'
          ] : [
            'प्री-प्राइमरी से कक्षा 12 तक के सभी छात्र',
            'वंचित समूहों पर ध्यान'
          ],
          category: ['General', 'OBC', 'SC', 'ST']
        },
        benefits: language === 'en' ? [
          'Quality education infrastructure',
          'Teacher training programs',
          'Free textbooks and uniforms',
          'Digital education initiatives'
        ] : [
          'गुणवत्तापूर्ण शिक्षा अवसंरचना',
          'शिक्षक प्रशिक्षण कार्यक्रम',
          'निःशुल्क पाठ्यपुस्तकें और वर्दी',
          'डिजिटल शिक्षा पहल'
        ],
        documents: language === 'en' ? [
          'School enrollment certificate',
          'No additional documents from students'
        ] : [
          'स्कूल नामांकन प्रमाण पत्र',
          'छात्रों से कोई अतिरिक्त दस्तावेज नहीं'
        ],
        applicationProcess: {
          steps: language === 'en' ? [
            'Benefits provided through schools',
            'No separate application needed',
            'Students automatically covered under the scheme'
          ] : [
            'स्कूलों के माध्यम से लाभ प्रदान किया जाता है',
            'कोई अलग आवेदन की आवश्यकता नहीं',
            'छात्र स्वचालित रूप से योजना के तहत शामिल'
          ],
          onlineUrl: 'https://samagra.education.gov.in/',
          offlineProcess: language === 'en' 
            ? 'Contact school administration'
            : 'स्कूल प्रशासन से संपर्क करें'
        },
        keyFeatures: language === 'en' ? [
          'Integrated approach to school education',
          'Focus on quality and equity',
          'Comprehensive coverage from pre-school to senior secondary'
        ] : [
          'स्कूली शिक्षा के लिए एकीकृत दृष्टिकोण',
          'गुणवत्ता और समानता पर ध्यान',
          'प्री-स्कूल से वरिष्ठ माध्यमिक तक व्यापक कवरेज'
        ],
        faqs: language === 'en' ? [
          {
            question: 'Who is covered under Samagra Shiksha?',
            answer: 'All students in government and government-aided schools from pre-primary to class 12 are covered.'
          }
        ] : [
          {
            question: 'समग्र शिक्षा के तहत कौन आता है?',
            answer: 'प्री-प्राइमरी से कक्षा 12 तक सरकारी और सरकारी सहायता प्राप्त स्कूलों के सभी छात्र शामिल हैं।'
          }
        ],
        helpline: '011-23765609',
        officialWebsite: 'https://samagra.education.gov.in/'
      },
      'beti-bachao-padhao': {
        id: 'beti-bachao-padhao',
        title: language === 'en' ? 'Beti Bachao Beti Padhao' : 'बेटी बचाओ बेटी पढ़ाओ',
        description: language === 'en' 
          ? 'Beti Bachao Beti Padhao is a social campaign addressing declining Child Sex Ratio and empowering women through education. It aims to celebrate the girl child and enable her education.'
          : 'बेटी बचाओ बेटी पढ़ाओ एक सामाजिक अभियान है जो घटते बाल लिंग अनुपात को संबोधित करता है और शिक्षा के माध्यम से महिलाओं को सशक्त बनाता है।',
        ministry: language === 'en' ? 'Ministry of Women and Child Development' : 'महिला एवं बाल विकास मंत्रालय',
        category: language === 'en' ? 'Education & Women Empowerment' : 'शिक्षा और महिला सशक्तिकरण',
        status: 'active' as const,
        launchDate: '22 Jan 2015',
        benefitAmount: 'Educational incentives and support',
        coverage: language === 'en' ? 'All of India' : 'पूरा भारत',
        objectives: language === 'en' ? [
          'Prevent gender-biased sex selection',
          'Ensure survival and protection of girl child',
          'Ensure education and participation of girl child'
        ] : [
          'लिंग-पक्षपाती यौन चयन को रोकना',
          'बालिका के अस्तित्व और संरक्षण को सुनिश्चित करना',
          'बालिका की शिक्षा और भागीदारी सुनिश्चित करना'
        ],
        eligibility: {
          criteria: language === 'en' ? [
            'Girl children across India',
            'Focus on districts with low Child Sex Ratio'
          ] : [
            'पूरे भारत में बालिकाएं',
            'कम बाल लिंग अनुपात वाले जिलों पर ध्यान'
          ],
          category: ['General', 'OBC', 'SC', 'ST']
        },
        benefits: language === 'en' ? [
          'Educational incentives for girls',
          'Awareness campaigns',
          'Community mobilization',
          'Multi-sectoral action'
        ] : [
          'लड़कियों के लिए शैक्षिक प्रोत्साहन',
          'जागरूकता अभियान',
          'सामुदायिक गतिशीलता',
          'बहु-क्षेत्रीय कार्रवाई'
        ],
        documents: language === 'en' ? [
          'Birth certificate',
          'School enrollment proof',
          'Aadhar Card'
        ] : [
          'जन्म प्रमाण पत्र',
          'स्कूल नामांकन प्रमाण',
          'आधार कार्ड'
        ],
        applicationProcess: {
          steps: language === 'en' ? [
            'Campaign-based initiative',
            'Benefits through various schemes',
            'Contact district administration for details'
          ] : [
            'अभियान-आधारित पहल',
            'विभिन्न योजनाओं के माध्यम से लाभ',
            'विवरण के लिए जिला प्रशासन से संपर्क करें'
          ],
          onlineUrl: 'https://wcd.nic.in/bbbp-scheme',
          offlineProcess: language === 'en' 
            ? 'Visit district Women and Child Development office'
            : 'जिला महिला एवं बाल विकास कार्यालय पर जाएं'
        },
        keyFeatures: language === 'en' ? [
          'Multi-sectoral approach',
          'Mass campaign',
          'Focus on behavior change',
          'Community engagement'
        ] : [
          'बहु-क्षेत्रीय दृष्टिकोण',
          'जन अभियान',
          'व्यवहार परिवर्तन पर ध्यान',
          'सामुदायिक जुड़ाव'
        ],
        faqs: language === 'en' ? [
          {
            question: 'What is the main objective?',
            answer: 'To address declining Child Sex Ratio and empower girls through education and protection.'
          }
        ] : [
          {
            question: 'मुख्य उद्देश्य क्या है?',
            answer: 'घटते बाल लिंग अनुपात को संबोधित करना और शिक्षा और संरक्षण के माध्यम से लड़कियों को सशक्त बनाना।'
          }
        ],
        helpline: '011-23389721',
        officialWebsite: 'https://wcd.nic.in/bbbp-scheme'
      },
      'digital-india-e-learning': {
        id: 'digital-india-e-learning',
        title: language === 'en' ? 'Digital India E-Learning' : 'डिजिटल इंडिया ई-लर्निंग',
        description: language === 'en' 
          ? 'Digital India E-Learning initiative provides digital infrastructure and online educational resources to enhance learning experiences and promote digital literacy across India.'
          : 'डिजिटल इंडिया ई-लर्निंग पहल डिजिटल बुनियादी ढांचा और ऑनलाइन शैक्षिक संसाधन प्रदान करती है।',
        ministry: language === 'en' ? 'Ministry of Electronics and IT' : 'इलेक्ट्रॉनिक्स और सूचना प्रौद्योगिकी मंत्रालय',
        category: language === 'en' ? 'Education' : 'शिक्षा',
        status: 'active' as const,
        launchDate: '01 Jul 2015',
        benefitAmount: 'Free online courses and resources',
        coverage: language === 'en' ? 'All of India' : 'पूरा भारत',
        objectives: language === 'en' ? [
          'Promote digital literacy',
          'Provide quality online education',
          'Bridge digital divide'
        ] : [
          'डिजिटल साक्षरता को बढ़ावा देना',
          'गुणवत्तापूर्ण ऑनलाइन शिक्षा प्रदान करना',
          'डिजिटल विभाजन को पाटना'
        ],
        eligibility: {
          criteria: language === 'en' ? [
            'All students and citizens',
            'No age restrictions'
          ] : [
            'सभी छात्र और नागरिक',
            'कोई आयु प्रतिबंध नहीं'
          ],
          category: ['General', 'OBC', 'SC', 'ST']
        },
        benefits: language === 'en' ? [
          'Free online courses',
          'Digital learning resources',
          'E-books and study materials',
          'Skill development programs'
        ] : [
          'निःशुल्क ऑनलाइन पाठ्यक्रम',
          'डिजिटल शिक्षण संसाधन',
          'ई-पुस्तकें और अध्ययन सामग्री',
          'कौशल विकास कार्यक्रम'
        ],
        documents: language === 'en' ? [
          'Email ID for registration',
          'Mobile number',
          'Basic identification'
        ] : [
          'पंजीकरण के लिए ईमेल आईडी',
          'मोबाइल नंबर',
          'बुनियादी पहचान'
        ],
        applicationProcess: {
          steps: language === 'en' ? [
            'Visit Digital India portal or SWAYAM',
            'Register with email/mobile',
            'Browse and enroll in courses',
            'Complete courses at own pace'
          ] : [
            'डिजिटल इंडिया पोर्टल या स्वयं पर जाएं',
            'ईमेल/मोबाइल से पंजीकरण करें',
            'पाठ्यक्रमों को ब्राउज़ करें और नामांकन करें',
            'अपनी गति से पाठ्यक्रम पूरे करें'
          ],
          onlineUrl: 'https://www.digitalindia.gov.in/',
          offlineProcess: language === 'en' 
            ? 'Visit Common Service Centers for digital literacy'
            : 'डिजिटल साक्षरता के लिए कॉमन सर्विस सेंटर पर जाएं'
        },
        keyFeatures: language === 'en' ? [
          'Free access to quality content',
          'Self-paced learning',
          'Wide range of subjects',
          'Digital certificates'
        ] : [
          'गुणवत्तापूर्ण सामग्री तक निःशुल्क पहुंच',
          'स्व-गति से सीखना',
          'विषयों की विस्तृत श्रृंखला',
          'डिजिटल प्रमाणपत्र'
        ],
        faqs: language === 'en' ? [
          {
            question: 'Are the courses free?',
            answer: 'Yes, most courses under Digital India E-Learning are free. Some may offer paid certificates.'
          }
        ] : [
          {
            question: 'क्या पाठ्यक्रम निःशुल्क हैं?',
            answer: 'हां, डिजिटल इंडिया ई-लर्निंग के तहत अधिकांश पाठ्यक्रम निःशुल्क हैं। कुछ सशुल्क प्रमाणपत्र की पेशकश कर सकते हैं।'
          }
        ],
        helpline: '1800-111-550',
        officialWebsite: 'https://www.digitalindia.gov.in/'
      },
      'janani-suraksha': {
        id: 'janani-suraksha',
        title: language === 'en' ? 'Janani Suraksha Yojana' : 'जननी सुरक्षा योजना',
        description: language === 'en' 
          ? 'Janani Suraksha Yojana is a safe motherhood intervention under National Health Mission promoting institutional delivery among poor pregnant women. Cash assistance is provided to reduce maternal and neo-natal mortality.'
          : 'जननी सुरक्षा योजना राष्ट्रीय स्वास्थ्य मिशन के तहत एक सुरक्षित मातृत्व हस्तक्षेप है जो गरीब गर्भवती महिलाओं के बीच संस्थागत प्रसव को बढ़ावा देता है।',
        ministry: language === 'en' ? 'Ministry of Health and Family Welfare' : 'स्वास्थ्य और परिवार कल्याण मंत्रालय',
        category: language === 'en' ? 'Healthcare' : 'स्वास्थ्य सेवा',
        status: 'active' as const,
        launchDate: '12 Apr 2005',
        benefitAmount: '₹1,400 (rural) / ₹1,000 (urban)',
        totalBeneficiaries: '10+ Crore deliveries',
        coverage: language === 'en' ? 'All of India' : 'पूरा भारत',
        objectives: language === 'en' ? [
          'Reduce maternal mortality',
          'Reduce infant mortality',
          'Promote institutional delivery'
        ] : [
          'मातृ मृत्यु दर को कम करना',
          'शिशु मृत्यु दर को कम करना',
          'संस्थागत प्रसव को बढ़ावा देना'
        ],
        eligibility: {
          criteria: language === 'en' ? [
            'Pregnant women from BPL families',
            'All SC/ST pregnant women',
            'For first 2 live births only'
          ] : [
            'बीपीएल परिवारों की गर्भवती महिलाएं',
            'सभी SC/ST गर्भवती महिलाएं',
            'केवल पहले 2 जीवित जन्मों के लिए'
          ],
          ageLimit: '19 years and above',
          category: ['BPL', 'SC', 'ST']
        },
        benefits: language === 'en' ? [
          'Cash assistance for delivery',
          'Free institutional delivery',
          'Post-natal care',
          'ASHA worker support'
        ] : [
          'प्रसव के लिए नकद सहायता',
          'निःशुल्क संस्थागत प्रसव',
          'प्रसवोत्तर देखभाल',
          'आशा कार्यकर्ता सहायता'
        ],
        documents: language === 'en' ? [
          'BPL card / Caste certificate',
          'Aadhar Card',
          'Bank account details',
          'JSY card from ASHA worker'
        ] : [
          'बीपीएल कार्ड / जाति प्रमाण पत्र',
          'आधार कार्ड',
          'बैंक खाता विवरण',
          'आशा कार्यकर्ता से JSY कार्ड'
        ],
        applicationProcess: {
          steps: language === 'en' ? [
            'Register pregnancy with ASHA worker',
            'Get JSY card',
            'Undergo antenatal checkups',
            'Deliver at government health facility',
            'Receive cash assistance post-delivery'
          ] : [
            'आशा कार्यकर्ता के साथ गर्भावस्था पंजीकृत करें',
            'JSY कार्ड प्राप्त करें',
            'प्रसवपूर्व जांच करवाएं',
            'सरकारी स्वास्थ्य सुविधा में प्रसव',
            'प्रसव के बाद नकद सहायता प्राप्त करें'
          ],
          onlineUrl: 'https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309',
          offlineProcess: language === 'en' 
            ? 'Contact ASHA worker or visit nearest PHC/CHC'
            : 'आशा कार्यकर्ता से संपर्क करें या निकटतम PHC/CHC पर जाएं'
        },
        keyFeatures: language === 'en' ? [
          'Cash incentive for institutional delivery',
          'Free delivery services',
          'ASHA worker assistance',
          'Direct benefit transfer'
        ] : [
          'संस्थागत प्रसव के लिए नकद प्रोत्साहन',
          'निःशुल्क प्रसव सेवाएं',
          'आशा कार्यकर्ता सहायता',
          'प्रत्यक्ष लाभ हस्तांतरण'
        ],
        faqs: language === 'en' ? [
          {
            question: 'When is the cash assistance given?',
            answer: 'Cash assistance is provided immediately after institutional delivery through ASHA worker or directly to bank account.'
          },
          {
            question: 'How many deliveries are covered?',
            answer: 'The scheme covers the first two live births for eligible women.'
          }
        ] : [
          {
            question: 'नकद सहायता कब दी जाती है?',
            answer: 'संस्थागत प्रसव के तुरंत बाद आशा कार्यकर्ता के माध्यम से या सीधे बैंक खाते में नकद सहायता प्रदान की जाती है।'
          },
          {
            question: 'कितने प्रसव शामिल हैं?',
            answer: 'यह योजना पात्र महिलाओं के लिए पहले दो जीवित जन्मों को कवर करती है।'
          }
        ],
        helpline: '104 / 1800-180-1104',
        officialWebsite: 'https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309'
      },
      'mission-indradhanush': {
        id: 'mission-indradhanush',
        title: language === 'en' ? 'Mission Indradhanush' : 'मिशन इन्द्रधनुष',
        description: language === 'en' 
          ? 'Mission Indradhanush is a comprehensive immunization program ensuring vaccination of all children and pregnant women against 7 vaccine-preventable diseases. It targets unvaccinated and partially vaccinated children.'
          : 'मिशन इन्द्रधनुष एक व्यापक टीकाकरण कार्यक्रम है जो सभी बच्चों और गर्भवती महिलाओं को 7 टीके से रोकी जा सकने वाली बीमारियों से बचाता है।',
        ministry: language === 'en' ? 'Ministry of Health and Family Welfare' : 'स्वास्थ्य और परिवार कल्याण मंत्रालय',
        category: language === 'en' ? 'Healthcare' : 'स्वास्थ्य सेवा',
        status: 'active' as const,
        launchDate: '25 Dec 2014',
        benefitAmount: 'Free vaccination',
        totalBeneficiaries: '3.5+ Crore children',
        coverage: language === 'en' ? 'All of India' : 'पूरा भारत',
        objectives: language === 'en' ? [
          'Achieve full immunization coverage',
          'Reduce vaccine-preventable diseases',
          'Strengthen routine immunization'
        ] : [
          'पूर्ण टीकाकरण कवरेज प्राप्त करना',
          'टीके से रोकी जा सकने वाली बीमारियों को कम करना',
          'नियमित टीकाकरण को मजबूत करना'
        ],
        eligibility: {
          criteria: language === 'en' ? [
            'Children under 2 years',
            'Pregnant women',
            'Unvaccinated and partially vaccinated children'
          ] : [
            '2 वर्ष से कम आयु के बच्चे',
            'गर्भवती महिलाएं',
            'अटीकाकृत और आंशिक रूप से टीकाकृत बच्चे'
          ],
          category: ['General', 'OBC', 'SC', 'ST']
        },
        benefits: language === 'en' ? [
          'Free vaccination against 7 diseases',
          'Diphtheria, Pertussis, Tetanus, Polio, Tuberculosis, Measles, Hepatitis B',
          'Door-to-door vaccination campaigns',
          'Regular immunization sessions'
        ] : [
          '7 बीमारियों के खिलाफ निःशुल्क टीकाकरण',
          'डिप्थीरिया, काली खांसी, टिटनेस, पोलियो, तपेदिक, खसरा, हेपेटाइटिस बी',
          'घर-घर टीकाकरण अभियान',
          'नियमित टीकाकरण सत्र'
        ],
        documents: language === 'en' ? [
          'Child birth certificate (if available)',
          'Aadhar Card (if available)',
          'No mandatory documents required'
        ] : [
          'बच्चे का जन्म प्रमाण पत्र (यदि उपलब्ध हो)',
          'आधार कार्ड (यदि उपलब्ध हो)',
          'कोई अनिवार्य दस्तावेज आवश्यक नहीं'
        ],
        applicationProcess: {
          steps: language === 'en' ? [
            'Visit nearest health center',
            'Register child for immunization',
            'Follow immunization schedule',
            'Receive immunization card',
            'Track vaccination status'
          ] : [
            'निकटतम स्वास्थ्य केंद्र पर जाएं',
            'बच्चे को टीकाकरण के लिए पंजीकृत करें',
            'टीकाकरण कार्यक्रम का पालन करें',
            'टीकाकरण कार्ड प्राप्त करें',
            'टीकाकरण स्थिति ट्रैक करें'
          ],
          onlineUrl: 'https://www.nhp.gov.in/mission-indradhanush',
          offlineProcess: language === 'en' 
            ? 'Visit nearest PHC, CHC, or Anganwadi center'
            : 'निकटतम PHC, CHC, या आंगनवाड़ी केंद्र पर जाएं'
        },
        keyFeatures: language === 'en' ? [
          'Targets hard-to-reach areas',
          'Intensive vaccination drives',
          'Mobile immunization units',
          'Community mobilization'
        ] : [
          'कठिन-से-पहुंच वाले क्षेत्रों को लक्षित करता है',
          'गहन टीकाकरण अभियान',
          'मोबाइल टीकाकरण इकाइयां',
          'सामुदायिक गतिशीलता'
        ],
        faqs: language === 'en' ? [
          {
            question: 'Which vaccines are covered?',
            answer: 'Mission Indradhanush covers vaccines for Diphtheria, Pertussis, Tetanus, Polio, Tuberculosis, Measles, and Hepatitis B.'
          },
          {
            question: 'Is vaccination really free?',
            answer: 'Yes, all vaccinations under Mission Indradhanush are completely free at government health facilities.'
          }
        ] : [
          {
            question: 'कौन से टीके शामिल हैं?',
            answer: 'मिशन इन्द्रधनुष डिप्थीरिया, काली खांसी, टिटनेस, पोलियो, तपेदिक, खसरा और हेपेटाइटिस बी के टीकों को कवर करता है।'
          },
          {
            question: 'क्या टीकाकरण वास्तव में निःशुल्क है?',
            answer: 'हां, मिशन इन्द्रधनुष के तहत सभी टीकाकरण सरकारी स्वास्थ्य सुविधाओं में पूरी तरह से निःशुल्क हैं।'
          }
        ],
        helpline: '104 / 1800-180-1104',
        officialWebsite: 'https://www.nhp.gov.in/mission-indradhanush'
      }
    };

    // If scheme not found, return a default scheme with the requested ID but generic data
    if (!schemes[id]) {
      return {
        id: id,
        title: language === 'en' ? 'Government Scheme' : 'सरकारी योजना',
        description: language === 'en' ? 'This is a government welfare scheme for eligible citizens.' : 'यह पात्र नागरिकों के लिए एक सरकारी कल्याणकारी योजना है।',
        ministry: language === 'en' ? 'Government of India' : 'भारत सरकार',
        category: language === 'en' ? 'General' : 'सामान्य',
        status: 'active' as const,
        launchDate: '2024',
        benefitAmount: 'Varies',
        coverage: language === 'en' ? 'All of India' : 'पूरा भारत',
        objectives: [
          language === 'en' ? 'Provide welfare benefits to eligible citizens' : 'पात्र नागरिकों को कल्याणकारी लाभ प्रदान करना'
        ],
        eligibility: {
          criteria: [
            language === 'en' ? 'As per scheme guidelines' : 'योजना दिशानिर्देशों के अनुसार'
          ]
        },
        benefits: [
          language === 'en' ? 'Various benefits as per scheme' : 'योजना के अनुसार विभिन्न लाभ'
        ],
        documents: [
          language === 'en' ? 'Aadhar Card' : 'आधार कार्ड',
          language === 'en' ? 'Income Certificate' : 'आय प्रमाण पत्र'
        ],
        applicationProcess: {
          steps: [
            language === 'en' ? 'Visit official website' : 'आधिकारिक वेबसाइट पर जाएं',
            language === 'en' ? 'Fill application form' : 'आवेदन फॉर्म भरें',
            language === 'en' ? 'Submit required documents' : 'आवश्यक दस्तावेज जमा करें'
          ],
          onlineUrl: 'https://www.myscheme.gov.in/',
          offlineProcess: language === 'en' ? 'Visit nearest government office' : 'निकटतम सरकारी कार्यालय पर जाएं'
        },
        keyFeatures: [
          language === 'en' ? 'Government funded' : 'सरकार द्वारा वित्त पोषित',
          language === 'en' ? 'Direct benefit transfer' : 'प्रत्यक्ष लाभ स्थानांतरण'
        ],
        faqs: [
          {
            question: language === 'en' ? 'How to apply?' : 'आवेदन कैसे करें?',
            answer: language === 'en' ? 'Visit the official website and follow the application process.' : 'आधिकारिक वेबसाइट पर जाएं और आवेदन प्रक्रिया का पालन करें।'
          }
        ],
        helpline: '1800-XXX-XXXX',
        officialWebsite: 'https://www.myscheme.gov.in/'
      };
    }

    return schemes[id];
  };

  const scheme = getSchemeData(schemeId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'upcoming': return 'bg-blue-500';
      case 'closed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    if (language === 'en') {
      switch (status) {
        case 'active': return 'Active';
        case 'upcoming': return 'Upcoming';
        case 'closed': return 'Closed';
        default: return 'Unknown';
      }
    } else {
      switch (status) {
        case 'active': return 'सक्रिय';
        case 'upcoming': return 'आगामी';
        case 'closed': return 'बंद';
        default: return 'अज्ञात';
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-soft sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {language === 'en' ? 'Back' : 'वापस'}
            </Button>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(scheme.status)}`}></div>
              <Badge variant="secondary">{getStatusText(scheme.status)}</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Scheme Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl text-primary">{scheme.title}</CardTitle>
                    <CardDescription className="text-base">{scheme.ministry}</CardDescription>
                  </div>
                  <Badge variant="outline" className="ml-4">{scheme.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{scheme.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <IndianRupee className="h-6 w-6 mx-auto mb-1 text-primary" />
                    <p className="text-sm font-medium">{scheme.benefitAmount}</p>
                    <p className="text-xs text-muted-foreground">
                      {language === 'en' ? 'Benefit' : 'लाभ'}
                    </p>
                  </div>
                  
                  {scheme.totalBeneficiaries && (
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Users className="h-6 w-6 mx-auto mb-1 text-primary" />
                      <p className="text-sm font-medium">{scheme.totalBeneficiaries}</p>
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' ? 'Beneficiaries' : 'लाभार्थी'}
                      </p>
                    </div>
                  )}
                  
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <MapPin className="h-6 w-6 mx-auto mb-1 text-primary" />
                    <p className="text-sm font-medium">{scheme.coverage}</p>
                    <p className="text-xs text-muted-foreground">
                      {language === 'en' ? 'Coverage' : 'कवरेज'}
                    </p>
                  </div>
                  
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <Calendar className="h-6 w-6 mx-auto mb-1 text-primary" />
                    <p className="text-sm font-medium">{scheme.launchDate}</p>
                    <p className="text-xs text-muted-foreground">
                      {language === 'en' ? 'Launch Date' : 'प्रारंभ तिथि'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Objectives */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  {language === 'en' ? 'Objectives' : 'उद्देश्य'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {scheme.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Eligibility Criteria */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  {language === 'en' ? 'Eligibility Criteria' : 'पात्रता मानदंड'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">
                    {language === 'en' ? 'Who can apply:' : 'कौन आवेदन कर सकता है:'}
                  </h4>
                  <ul className="space-y-2">
                    {scheme.eligibility.criteria.map((criteria, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {scheme.eligibility.category && (
                  <div>
                    <h4 className="font-medium mb-2">
                      {language === 'en' ? 'Eligible Categories:' : 'पात्र श्रेणियां:'}
                    </h4>
                    <div className="flex gap-2 flex-wrap">
                      {scheme.eligibility.category.map((cat, index) => (
                        <Badge key={index} variant="secondary">{cat}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Required Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  {language === 'en' ? 'Required Documents' : 'आवश्यक दस्तावेज'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {scheme.documents.map((doc, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                      <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{doc}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Application Process */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  {language === 'en' ? 'How to Apply' : 'आवेदन कैसे करें'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {scheme.applicationProcess.steps.map((step, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-sm text-muted-foreground">{step}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scheme.applicationProcess.onlineUrl && (
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => window.open(scheme.applicationProcess.onlineUrl, '_blank')}
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      {language === 'en' ? 'Apply Online' : 'ऑनलाइन आवेदन करें'}
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </Button>
                  )}
                  
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="h-4 w-4 mr-2" />
                    {language === 'en' ? 'Find Nearest CSC' : 'निकटतम CSC खोजें'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'en' ? 'Quick Actions' : 'त्वरित कार्य'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full btn-large" 
                  onClick={() => onApply({ id: scheme.id, title: scheme.title })}
                >
                  {language === 'en' ? 'Get Help with Application' : 'आवेदन में मदद लें'}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open(scheme.officialWebsite, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Official Website' : 'आधिकारिक वेबसाइट'}
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Contact Helpline' : 'हेल्पलाइन से संपर्क करें'}
                </Button>
              </CardContent>
            </Card>

            {/* Key Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'en' ? 'Key Features' : 'मुख्य विशेषताएं'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {scheme.keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'en' ? 'Benefits' : 'लाभ'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {scheme.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <IndianRupee className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'en' ? 'Help & Support' : 'सहायता और समर्थन'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="font-medium">
                    {language === 'en' ? 'Helpline:' : 'हेल्पलाइन:'}
                  </span>
                  <span>{scheme.helpline}</span>
                </div>
                
                <Button variant="ghost" size="sm" className="w-full justify-start p-2">
                  <Download className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Download User Manual' : 'यूज़र मैन्युअल डाउनलोड करें'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQs Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              {language === 'en' ? 'Frequently Asked Questions' : 'अक्सर पूछे जाने वाले प्रश्न'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheme.faqs.map((faq, index) => (
                <div key={index} className="border-b border-border pb-4 last:border-b-0">
                  <h4 className="font-medium mb-2">{faq.question}</h4>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}