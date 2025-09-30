# Government Schemes Website - Complete Reference Documentation

## Overview
A comprehensive government schemes website designed for rural audiences with multi-language support (English/Hindi), voice interaction capabilities, and AI-powered assistance through "Saksham" chatbot.

## Architecture & Design

### Technology Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui (customized)
- **State Management**: React Hooks
- **Routing**: React Router v6
- **Multi-language**: Custom i18n implementation
- **Voice**: Web Speech API (SpeechRecognition + SpeechSynthesis)
- **AI Chatbot**: Google Gemini API integration
- **Analytics**: Custom event tracking

### Design System

#### Color Palette (HSL Values)
```css
/* Primary Colors - Government Saffron Inspired */
--primary: 22 93% 58% (Main brand color)
--primary-light: 25 95% 68% (Hover states)
--primary-dark: 20 90% 48% (Active states)

/* Secondary Colors - Trust Building Blue */
--secondary: 217 91% 60%
--secondary-light: 220 95% 70%

/* Success/Action Colors */
--success: 142 76% 36%
--warning: 38 92% 50%

/* Neutral Accessibility Colors */
--background: 0 0% 100%
--foreground: 240 10% 8%
--muted: 30 10% 96%
--border: 25 15% 88%
```

#### Typography & Accessibility
- Base font size: 1rem (16px) with scaling options
- Large text mode: 1.25rem base for low-literacy users
- High contrast mode support
- Focus indicators for keyboard navigation
- Voice interaction visual feedback

#### Components
- **Rural-friendly buttons**: Minimum 48px height, clear labels
- **Scheme cards**: Hover effects, clear benefit display
- **Voice indicators**: Visual feedback for speech states
- **Responsive grid**: Mobile-first approach

## Site Structure

### Sitemap
```
/
├── /registration (Initial form - mobile first)
├── /home (Main dashboard after registration)
├── /schemes
│   ├── /agriculture
│   ├── /education  
│   ├── /healthcare
│   ├── /housing
│   ├── /employment
│   └── /women-welfare
├── /eligibility-checker
├── /application-status
├── /help
└── /contact
```

### Page Layouts

#### Registration Form (`/registration`)
**Fields with Validation:**
```typescript
interface RegistrationData {
  // Required fields
  name: string;           // Min 2 chars, alphabets only
  mobile: string;         // Exactly 10 digits
  aadhar: string;         // Exactly 12 digits  
  address: string;        // Min 10 chars
  state: string;          // Dropdown selection
  district: string;       // Text input
  income: string;         // Range selection
  category: string;       // General/OBC/SC/ST

  // Optional fields  
  email?: string;         // Valid email format
}
```

**Validation Rules:**
- Mobile: /^[6-9]\d{9}$/ (Indian mobile pattern)
- Aadhar: /^\d{12}$/ (12 digits only)
- Name: /^[a-zA-Z\s]+$/ (Letters and spaces)
- Email: Standard email regex (when provided)

**Voice Input Support:**
- Microphone button for each field
- Audio prompts in selected language
- Speech-to-text for form filling

#### Homepage (`/home`)
**Layout Sections:**
1. **Header**: Logo, language toggle, user menu
2. **Hero Banner**: Welcome message, search bar, CTA
3. **Category Grid**: 6 main scheme categories with icons
4. **Featured Schemes**: Top 4-6 schemes with quick apply
5. **How It Works**: 3-step process explanation
6. **Footer**: Contact info, help links

**Search Functionality:**
- Global search across all schemes
- Filter by category, eligibility, benefits
- Voice search capability
- Auto-suggestions based on user profile

#### Scheme Category Pages
**Template Structure:**
- Category hero section with relevant imagery
- Filter sidebar (income, age, location, documents)
- Scheme cards with:
  - Title and brief description
  - Eligibility criteria (color-coded)
  - Benefit amount/type
  - Required documents summary
  - Quick apply button
  - "Ask Saksham" button

## Multi-Language Implementation

### i18n Structure
```typescript
interface Translations {
  // Navigation & Common
  home: string;
  register: string;
  schemes: string;
  
  // Registration Form
  registration: {
    title: string;
    subtitle: string;
    // ... all form fields
  };
  
  // Homepage
  homepage: {
    welcome: string;
    categories: {
      agriculture: string;
      education: string;
      // ... all categories
    };
  };
  
  // Chatbot
  chatbot: {
    name: string;
    greeting: string;
    // ... all chatbot text
  };
}
```

### TTS (Text-to-Speech) Implementation
**Ready Phrases for Voice Output:**
```typescript
export const ttsTexts = {
  en: {
    welcomeMessage: "Welcome to the Government Schemes Portal...",
    registrationStart: "Please share your basic details...",
    eligibilityCheck: "Based on your details, here are schemes...",
    documentHelp: "I will help you understand what documents...",
    applicationGuidance: "Let me guide you step by step...",
  },
  hi: {
    welcomeMessage: "सरकारी योजना पोर्टल में आपका स्वागत है...",
    registrationStart: "कृपया व्यक्तिगत योजना सिफारिशें पाने के लिए...",
    // ... Hindi versions
  }
};
```

### STT (Speech-to-Text) Examples
**Sample Utterances for Training:**
```typescript
export const sttUtterances = {
  en: [
    "What schemes are available for farmers",
    "I need help with housing schemes",
    "Am I eligible for education benefits",
    "What documents do I need",
    "Help me apply for this scheme",
    "Read this information out loud"
  ],
  hi: [
    "किसानों के लिए कौन सी योजनाएं हैं",
    "मुझे आवास योजनाओं में मदद चाहिए",
    "क्या मैं शिक्षा लाभ के लिए पात्र हूं",
    "मुझे कौन से दस्तावेज़ चाहिए",
    "इस योजना के लिए आवेदन में मदद करें",
    "इस जानकारी को ज़ोर से पढ़ें"
  ]
};
```

## Saksham Chatbot Implementation

### Chatbot Intents & Responses

#### Intent Categories
1. **Greeting** - Welcome users, explain capabilities
2. **Scheme Search** - Find relevant schemes by category/need
3. **Eligibility Check** - Verify user qualifications
4. **Document Help** - Provide document checklists
5. **Application Assistance** - Step-by-step guidance
6. **Human Escalation** - Connect to human support

#### Sample Intent Configuration
```typescript
interface ChatbotIntent {
  id: string;
  name: string;
  examples: string[]; // 6+ utterances per language
  response: string;
  followUp?: string[];
}

// Example: Scheme Search Intent
{
  id: "schemes_search",
  name: "Schemes Search",
  examples: [
    "what schemes are available",
    "show me schemes for farmers", 
    "housing schemes",
    "education benefits",
    "health schemes",
    "employment schemes"
  ],
  response: "I can help you find schemes! Based on your profile, here are some relevant options: PM-KISAN for farmers (₹6,000/year), Ayushman Bharat for health coverage (₹5 lakh), and PMAY for housing. Which category interests you most?",
  followUp: [
    "Tell me about PM-KISAN",
    "Ayushman Bharat details", 
    "Housing scheme eligibility"
  ]
}
```

### Gemini API Integration

#### Configuration
```typescript
export const geminiConfig = {
  apiKey: "AIzaSyAcGM2Mc_JcXfE02PaA8mKQxXvvspjbtEg",
  model: "gemini-1.5-flash",
  baseUrl: "https://generativelanguage.googleapis.com/v1beta/models"
};
```

#### Request Payload Examples

**Static Content Generation:**
```typescript
const staticPayload = {
  contents: [{
    parts: [{
      text: `Generate comprehensive information about ${category} government schemes in ${language}. Include eligibility, documents, benefits, process.`
    }]
  }],
  generationConfig: {
    temperature: 0.3,
    topP: 0.8,
    maxOutputTokens: 2048
  }
};
```

**Conversational Chat:**
```typescript
const chatPayload = {
  contents: [{
    parts: [{
      text: `You are Saksham, a government schemes assistant. User context: ${userProfile}. Current message: ${userMessage}`
    }]
  }],
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 1024
  }
};
```

**Eligibility Checking:**
```typescript  
const eligibilityPayload = {
  contents: [{
    parts: [{
      text: `Check eligibility for scheme "${schemeId}" based on user profile: Age: ${age}, Income: ${income}, Category: ${category}. Provide Yes/No with reasoning.`
    }]
  }],
  generationConfig: {
    temperature: 0.2,
    maxOutputTokens: 1024
  }
};
```

## Accessibility Features

### Low-Bandwidth Considerations
- Optimized images with WebP format + fallbacks
- Lazy loading for non-critical content  
- Minimal external dependencies
- Progressive enhancement approach
- Offline capability for core features

### Voice Interaction
- **TTS Integration**: Web Speech API with language-specific voices
- **STT Support**: Microphone input for all text fields
- **Audio Controls**: Play/pause/stop for longer content
- **Visual Indicators**: Recording state, speaking state

### Visual Accessibility
- **High Contrast Mode**: Alternative color scheme
- **Large Text Mode**: 125% scaling option
- **Focus Management**: Keyboard navigation support
- **Screen Reader**: ARIA labels and semantic HTML
- **Icon + Text**: All actions have both visual and text cues

### SMS Fallback
For areas with poor internet connectivity:
- SMS-based scheme information service
- Application status via SMS
- Document submission appointment booking
- Emergency contact numbers

## Analytics & Privacy

### Event Tracking
```typescript
const analyticsEvents = {
  // Registration flow
  REGISTRATION_STARTED: 'registration_started',
  REGISTRATION_COMPLETED: 'registration_completed', 
  FORM_FIELD_VOICE_USED: 'form_voice_input',
  
  // Scheme interaction  
  SCHEME_VIEWED: 'scheme_viewed',
  SCHEME_APPLIED: 'scheme_applied',
  ELIGIBILITY_CHECKED: 'eligibility_checked',
  
  // Chatbot usage
  CHATBOT_OPENED: 'chatbot_opened',
  MESSAGE_SENT: 'chatbot_message',
  VOICE_INPUT_USED: 'chatbot_voice_input',
  HUMAN_HELP_REQUESTED: 'human_help_requested',
  
  // Language & accessibility
  LANGUAGE_SWITCHED: 'language_changed',
  ACCESSIBILITY_ENABLED: 'accessibility_feature_used'
};
```

### Privacy Guidelines
**Data Collection - Minimal & Safe:**
- Basic demographics (age range, location state/district)
- Income range (not exact amounts)
- Category for eligibility  
- Interaction logs (anonymized after 30 days)

**Avoid Collecting:**
- Exact Aadhar numbers (hash for uniqueness)
- Bank account details
- Precise GPS location
- Family member information
- Health details

**Data Retention:**
- Chat logs: 30 days
- User profiles: 1 year  
- Analytics: 2 years (anonymized)

**User Consent:**
- Data collection notice
- Voice recording permissions
- Location access (state/district level)
- Analytics opt-out option

## Backend Architecture Suggestions

### Recommended Stack
```
Backend: Node.js + Express.js
Database: PostgreSQL + Redis (caching)
Authentication: JWT tokens
File Storage: AWS S3/MinIO for documents
API Documentation: OpenAPI/Swagger
```

### Key Endpoints
```
POST /api/register - User registration
GET /api/schemes - List schemes with filters
POST /api/eligibility-check - Check user eligibility
POST /api/chatbot/message - Chatbot interaction
GET /api/schemes/:id/documents - Required documents
POST /api/applications - Submit application
GET /api/applications/:id/status - Application status
```

### Gemini Integration Service
```typescript
// Backend service for Gemini API calls
class GeminiService {
  async generateSchemeContent(category: string, language: string) {
    // Call Gemini API for static content generation
  }
  
  async processChatMessage(message: string, context: UserContext) {
    // Handle conversational AI requests
  }
  
  async checkEligibility(schemeId: string, userProfile: UserProfile) {
    // AI-powered eligibility verification
  }
}
```

### Caching Strategy
- Redis for scheme data (updated daily)
- CDN for static assets
- Browser caching for translations
- Service worker for offline functionality

## Deployment & Scaling

### Infrastructure
```yaml
Frontend:
  - Static hosting (Vercel/Netlify)
  - CDN for global delivery
  - Progressive Web App (PWA)

Backend:
  - Container deployment (Docker)  
  - Load balancing for high availability
  - Auto-scaling based on demand
  - Database read replicas

Monitoring:
  - Application performance monitoring
  - Error tracking and alerting  
  - User analytics and insights
  - API rate limiting and security
```

### Performance Optimization
- **Code Splitting**: Route-based and component-based
- **Image Optimization**: WebP with fallbacks, lazy loading
- **Bundle Analysis**: Tree shaking, minimal dependencies
- **Caching**: Service worker, HTTP cache headers
- **Compression**: Gzip/Brotli for text assets

## Security Considerations

### Data Protection
- HTTPS everywhere (SSL/TLS)
- Input validation and sanitization
- SQL injection prevention
- XSS protection headers
- CSRF tokens for forms

### API Security  
- Rate limiting per user/IP
- API key management
- Request/response validation
- Audit logging for sensitive operations
- Encryption for PII data

### User Privacy
- Minimal data collection
- Consent management
- Right to data deletion
- Data export functionality
- Anonymization of analytics

This documentation provides a comprehensive foundation for building a production-ready government schemes website that serves rural populations effectively with modern technology and accessibility considerations.