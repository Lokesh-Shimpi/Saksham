import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Mic, User, Phone, Mail, CreditCard, MapPin, IndianRupee, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/lib/i18n";

interface RegistrationFormProps {
  language: 'en' | 'hi';
  onComplete: (data: RegistrationData) => void;
}

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

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export default function RegistrationForm({ language, onComplete }: RegistrationFormProps) {
  const t = useTranslation(language);
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [formData, setFormData] = useState<RegistrationData>({
    name: "",
    mobile: "",
    email: "",
    aadhar: "",
    address: "",
    state: "",
    district: "",
    income: "",
    category: ""
  });

  const validateForm = () => {
    if (!formData.name || !formData.mobile || !formData.aadhar || !formData.address) {
      toast({
        title: t.validation.required,
        variant: "destructive"
      });
      return false;
    }

    if (formData.mobile.length !== 10) {
      toast({
        title: t.validation.invalidMobile,
        variant: "destructive"
      });
      return false;
    }

    if (formData.aadhar.length !== 12) {
      toast({
        title: t.validation.invalidAadhar,
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onComplete(formData);
    }
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    // In a real implementation, this would integrate with speech recognition
    setTimeout(() => setIsListening(false), 3000);
    toast({
      title: "Voice input activated",
      description: "Please speak your details clearly"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-strong">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">
            {t.registration.title}
          </CardTitle>
          <CardDescription className="text-lg">
            {t.registration.subtitle}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
                <User className="h-5 w-5" />
                {t.registration.personalInfo}
              </h3>
              
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-medium">
                  {t.registration.name} *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t.registration.namePlaceholder}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="btn-large"
                  required
                />
              </div>

              {/* Mobile Number */}
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-base font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {t.registration.mobile} *
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder={t.registration.mobilePlaceholder}
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  className="btn-large"
                  maxLength={10}
                  required
                />
              </div>

              {/* Email (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {t.registration.email}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.registration.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="btn-large"
                />
              </div>

              {/* Aadhar Number */}
              <div className="space-y-2">
                <Label htmlFor="aadhar" className="text-base font-medium flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  {t.registration.aadhar} *
                </Label>
                <Input
                  id="aadhar"
                  type="text"
                  placeholder={t.registration.aadharPlaceholder}
                  value={formData.aadhar}
                  onChange={(e) => setFormData({...formData, aadhar: e.target.value})}
                  className="btn-large"
                  maxLength={12}
                  required
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="text-base font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {t.registration.address} *
                </Label>
                <Textarea
                  id="address"
                  placeholder={t.registration.addressPlaceholder}
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="min-h-[100px] text-base"
                  required
                />
              </div>

              {/* State and District */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-base font-medium">
                    {t.registration.state}
                  </Label>
                  <Select value={formData.state} onValueChange={(value) => setFormData({...formData, state: value})}>
                    <SelectTrigger className="btn-large">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDIAN_STATES.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-medium">
                    {t.registration.district}
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter District"
                    value={formData.district}
                    onChange={(e) => setFormData({...formData, district: e.target.value})}
                    className="btn-large"
                  />
                </div>
              </div>

              {/* Income and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <IndianRupee className="h-4 w-4" />
                    {t.registration.income}
                  </Label>
                  <Select value={formData.income} onValueChange={(value) => setFormData({...formData, income: value})}>
                    <SelectTrigger className="btn-large">
                      <SelectValue placeholder="Select Income Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="below-2lakh">Below ₹2 Lakh</SelectItem>
                      <SelectItem value="2-5lakh">₹2-5 Lakh</SelectItem>
                      <SelectItem value="5-8lakh">₹5-8 Lakh</SelectItem>
                      <SelectItem value="above-8lakh">Above ₹8 Lakh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {t.registration.category}
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger className="btn-large">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">{t.registration.categories.general}</SelectItem>
                      <SelectItem value="obc">{t.registration.categories.obc}</SelectItem>
                      <SelectItem value="sc">{t.registration.categories.sc}</SelectItem>
                      <SelectItem value="st">{t.registration.categories.st}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Voice Help */}
            <div className="bg-accent/50 p-4 rounded-lg border border-accent">
              <div className="flex items-center justify-between">
                <p className="text-sm text-accent-foreground">
                  {t.registration.voiceHelp}
                </p>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleVoiceInput}
                  className={`btn-icon ${isListening ? 'voice-active' : ''}`}
                >
                  <Mic className={`h-4 w-4 ${isListening ? 'text-primary' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full btn-large gradient-hero text-white font-semibold"
              size="lg"
            >
              {t.registration.continueToSchemes}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}