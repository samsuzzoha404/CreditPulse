<div align="center">

# 🎯 CreditPulse

### The Agentic Covenant Monitor

**Transforming loan administration from reactive PDF processing to predictive intelligence and CDM interoperability**

**🏆 Built by [BlockNexa Labs](https://blocknexalabs.com) 🏆**

---

## 🌐 **[✨ LIVE DEMO ✨](https://credit-pulse-chi.vercel.app)**

### **👉 [https://credit-pulse-chi.vercel.app](https://credit-pulse-chi.vercel.app) 👈**

---

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-3ECF8E.svg)](https://supabase.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini-1.5%20Flash-4285F4.svg)](https://ai.google.dev/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black.svg)](https://credit-pulse-chi.vercel.app)

![CreditPulse Banner](https://img.shields.io/badge/💼_Financial_Intelligence-AI_Powered-success?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge)
![Hackathon](https://img.shields.io/badge/🏆_LMA_EDGE-Hackathon_Project-orange?style=for-the-badge)

**Created by BlockNexa Labs**

</div>

## 🎨 Modern Web3 Landing Page

CreditPulse now features a stunning, professional Web3-style landing page that showcases:

- **Animated Gradients**: Eye-catching background animations with dynamic gradient effects
- **Glassmorphism**: Modern frosted-glass UI elements with backdrop blur effects
- **Interactive Components**: Smooth hover effects and transitions throughout
- **Responsive Design**: Perfect display on all devices from mobile to desktop
- **Professional Branding**: Prominent "Built by BlockNexa Labs" branding
- **Feature Showcase**: Clear presentation of Smart Ingestion, Predictive Risk Sentinel, and Agentic Waiver Workflow
- **Commercial Impact**: Visual statistics and key metrics highlighting the platform's value proposition

**Navigation:**
- Landing Page: `/` - Your entry point with full product overview (Home)
- Dashboard: `/dashboard` - Access the full application interface
- All other routes: `/analysis`, `/portfolio`, `/settings`

---

## 🎬 Quick Demo

Experience the power of AI-driven covenant monitoring:

1. **Visit**: [https://credit-pulse-chi.vercel.app](https://credit-pulse-chi.vercel.app)
2. **See** the stunning landing page first
3. **Click** "Launch App" or "Get Started" to access the dashboard
4. **Navigate** to Smart Analysis page
5. **Upload** a financial PDF document
6. **Watch** AI extract key metrics in real-time
7. **Explore** interactive dashboards and forecasts

> ⚡ No signup required - try it instantly!

---

## 🚀 Key Features

### ✨ AI-Powered Analysis
- **Smart Document Extraction**: Upload financial PDFs and automatically extract Revenue, EBITDA, Net Debt, and more
- **Google Gemini 1.5 Flash**: Lightning-fast AI analysis with native PDF processing
- **Source Citation**: Every metric includes the source page number for verification
- **LMA CDM Compliance**: Outputs follow Loan Market Association Common Domain Model standard

### 📊 Covenant Monitoring
- **Real-time Breach Detection**: Automatically identifies covenant violations
- **Threshold Validation**: Compares actuals vs. limits for all key ratios
- **Severity Classification**: Categorizes breaches as minor, major, or critical
- **Historical Tracking**: View trends over time with interactive charts

### 🤖 Agentic Waiver Bot
- **AI-Generated Letters**: Automatically drafts professional waiver request letters
- **LMA Standard Format**: Follows industry best practices
- **One-Click Generation**: Create formal correspondence in seconds
- **Editable Output**: Review and customize before sending

### 📈 Predictive Analytics
- **Linear Regression Forecasting**: 3-month forward predictions for key ratios
- **Trend Detection**: Automatic identification of improving/deteriorating metrics
- **Visual Indicators**: Dotted lines show forecasted values on charts

### 📄 Interactive PDF Viewer
- **Side-by-Side View**: Document on left, analysis on right
- **Click-to-Navigate**: Click any metric to jump to its source page
- **Zoom Controls**: Adjust view for better readability
- **Full Navigation**: Browse through multi-page documents

### 💾 Data Management
- **CDM Export**: Download structured JSON following LMA standards
- **Database Storage**: All analyses saved to Supabase
- **Search & Filter**: Find past analyses quickly
- **Audit Trail**: Complete history of all covenant checks

---

## � Screenshots

<div align="center">

### 📊 Interactive Dashboard
*Real-time covenant monitoring with predictive analytics*

### 🤖 Smart Document Analysis  
*AI-powered PDF extraction with source citations*

### 📈 Trend Forecasting
*3-month forward predictions using linear regression*

### 💼 Waiver Letter Generator
*Professional LMA-compliant correspondence in seconds*

</div>

---

## �🏗️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type safety and better DX
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first styling
- **Shadcn/UI** - High-quality component library
- **Recharts** - Beautiful data visualizations
- **React-PDF** - PDF rendering in browser

### Backend & AI
- **Supabase** - PostgreSQL database + storage + auth
- **Google Gemini 1.5 Flash** - AI document analysis
- **PDF-Parse** - Fallback PDF text extraction

### Key Libraries
- `@supabase/supabase-js` - Database client
- `@google/generative-ai` - Gemini API client
- `react-pdf` / `pdfjs-dist` - PDF rendering
- `sonner` - Toast notifications
- `lucide-react` - Beautiful icons

---

## 🌟 Why CreditPulse?

| Traditional Method | 🎯 CreditPulse |
|-------------------|----------------|
| Manual PDF review (hours) | ⚡ AI analysis (30 seconds) |
| Error-prone calculations | ✅ Automated accuracy |
| Static spreadsheets | 📈 Interactive dashboards |
| Manual waiver drafting | 🤖 AI-generated letters |
| Historical data only | 🔮 Predictive forecasting |
| No source tracing | 🎯 Page-level citations |

---

## 🚀 Quick Start

---

## 📋 Prerequisites

Before you begin, ensure you have:

1. **Node.js 18+** installed ([Download](https://nodejs.org/))
2. **Supabase Account** ([Sign up](https://supabase.com))
3. **Google AI API Key** ([Get key](https://makersuite.google.com/app/apikey))

---

## 🚀 Quick Start

### 1. Clone & Install


```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project
cd CreditPulse

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### 2. Configure Environment Variables

Edit `.env` with your credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_GOOGLE_API_KEY=your_google_api_key_here
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com/dashboard](https://supabase.com/dashboard)
2. Go to **SQL Editor**
3. Copy & paste contents of `supabase-schema.sql`
4. Click **Run**

This creates:
- Database tables (`analysis_results`, `waiver_requests`)
- Storage bucket (`loan-docs`)
- Policies and indexes

### 4. Start Development Server

```sh
npm run dev
```

Visit `http://localhost:5173` 🎉

---

## 📖 Detailed Setup Guide

For a comprehensive setup guide with troubleshooting, see [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)

---

## 🎯 Usage

### Upload & Analyze Financial Documents

1. Navigate to **Smart Analysis** page
2. Click **"Upload Financials & Analyze"**
3. Select a PDF financial statement
4. Wait for AI analysis (10-30 seconds)
5. View extracted metrics with source pages
6. Click any metric to jump to PDF source page

### Generate Waiver Letters

1. After analysis, if breaches detected
2. Click **"Auto-Draft Waiver Request"**
3. AI generates professional letter (~5 seconds)
4. Review and edit as needed
5. Copy to clipboard or download as .txt

### Export CDM Data

1. Complete an analysis
2. Click **"Export to CDM"** button
3. Downloads structured JSON file
4. Use in other LMA-compliant systems

### View Forecasts

1. Go to **Dashboard** page
2. Check **"Leverage Ratio Trend"** chart
3. Dotted line shows 3-month forecast
4. Based on linear regression of historical data

---

## 📁 Project Structure

```
CreditPulse/
├── src/
│   ├── components/
│   │   ├── analysis/
│   │   │   ├── PDFViewer.tsx          # PDF display component
│   │   │   ├── ExtractionEngine.tsx   # Main analysis UI
│   │   │   └── WaiverDialog.tsx       # Waiver generation modal
│   │   ├── dashboard/
│   │   │   ├── KPICard.tsx
│   │   │   ├── RiskChart.tsx          # Chart with forecasting
│   │   │   └── AlertsFeed.tsx
│   │   └── ui/                        # Shadcn components
│   ├── services/
│   │   ├── analysisService.ts         # PDF upload & AI analysis
│   │   └── waiverService.ts           # Waiver generation
│   ├── utils/
│   │   ├── cdmUtils.ts                # CDM formatting & export
│   │   └── forecastUtils.ts           # Linear regression & trends
│   ├── types/
│   │   └── cdm.ts                     # TypeScript interfaces
│   ├── lib/
│   │   ├── supabase.ts                # Supabase client
│   │   └── database.types.ts          # Database types
│   └── pages/
│       ├── Dashboard.tsx
│       ├── SmartAnalysis.tsx
│       └── LoanPortfolio.tsx
├── supabase-schema.sql                # Database setup
├── IMPLEMENTATION_GUIDE.md            # Detailed setup guide
└── .env.example                       # Environment template
```

---

## 🎯 Use Cases

### 💼 For Lenders
- Monitor covenant compliance across loan portfolios
- Early warning system for potential breaches
- Automated reporting and documentation

### 🏦 For Credit Analysts
- Faster financial statement review
- Standardized data extraction
- Trend analysis and forecasting

### 📊 For Risk Management
- Portfolio-wide risk assessment
- Predictive breach detection
- Regulatory compliance (LMA CDM standards)

---

## 🔧 Configuration

### Covenant Thresholds

Edit thresholds in the AI prompt (`src/services/analysisService.ts`):

```typescript
const EXTRACTION_PROMPT = `
...
- Assume standard LMA covenants:
  * Leverage Ratio must be ≤ 3.5x  // Change this
  * Interest Coverage must be ≥ 4.0x  // Change this
...
`;
```

### Forecast Period

Adjust forecast length in `src/utils/forecastUtils.ts`:

```typescript
generateForecastData(historicalData, 6); // 6 months instead of 3
```

---

## 🧪 Testing

### Run Development Server
```sh
npm run dev
```

### Build for Production
```sh
npm run build
```

### Preview Production Build
```sh
npm run preview
```

### Type Check
```sh
npx tsc --noEmit
```

---

## 🌐 Live Deployment

### Production URL
**[https://credit-pulse-chi.vercel.app](https://credit-pulse-chi.vercel.app)**

Deployed on **Vercel** with:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Instant deployment from Git
- ✅ Zero-downtime updates

---

## 🚢 Deploy Your Own

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/CreditPulse)

```sh
npm install -g vercel
vercel
```

### Netlify
```sh
npm run build
# Upload dist/ folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## 🔐 Security Notes

⚠️ **Current Setup**: Public access for demo purposes

**For Production:**
- Enable Supabase Row Level Security (RLS)
- Implement authentication (Supabase Auth)
- Restrict storage policies to authenticated users
- Add rate limiting on API calls
- Encrypt sensitive financial data
- Set up proper CORS policies

---

## 📚 API Reference

### Analysis Service

```typescript
// Upload and analyze PDF
uploadAndAnalyzePDF(file: File, onProgress?: (stage: string) => void)
  → Promise<{ success: boolean; data?: AnalysisResult; error?: string }>

// Fetch all analyses
fetchAnalysisResults()
  → Promise<AnalysisResult[]>

// Fetch single analysis
fetchAnalysisById(id: string)
  → Promise<AnalysisResult>
```

### Waiver Service

```typescript
// Generate waiver letter
draftWaiverLetter(request: WaiverLetterRequest, saveToDatabase?: boolean)
  → Promise<{ success: boolean; letter?: string; error?: string }>
```

### Forecast Utils

```typescript
// Generate forecast with linear regression
generateForecastData(data: TimeSeriesDataPoint[], months?: number)
  → TimeSeriesDataPoint[]

// Calculate trend direction
calculateTrend(data: TimeSeriesDataPoint[])
  → 'up' | 'down' | 'stable'
```

---

## 🐛 Troubleshooting

### "Google API Key not configured"
- Verify `.env` file exists with `VITE_GOOGLE_API_KEY`
- Restart dev server after adding env variables

### "Failed to upload file"
- Check Supabase credentials in `.env`
- Verify `loan-docs` bucket exists
- Check storage policies allow uploads

### PDF not displaying
- Ensure PDF URL is publicly accessible
- Check browser console for errors
- Verify `pdfjs-dist` is installed

See [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) for more troubleshooting.

---

## 🎓 Learning Resources

- **[Implementation Guide](./IMPLEMENTATION_GUIDE.md)** - Detailed setup instructions
- **[Usage Examples](./src/examples/usage-examples.ts)** - Code samples
- **[CDM Types](./src/types/cdm.ts)** - LMA standard interfaces
- **[Live Demo](https://credit-pulse-chi.vercel.app)** - Try it yourself!

---

## 🤝 Contributing

Contributions are welcome! Whether it's:

- 🐛 Bug fixes
- ✨ New features
- 📖 Documentation improvements
- 🎨 UI/UX enhancements

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📊 Project Stats

- **Lines of Code**: ~10,000+
- **Components**: 40+
- **AI Models**: Google Gemini 1.5 Flash
- **Database**: PostgreSQL (Supabase)
- **Deployment**: Vercel
- **Build Time**: ~30 seconds

---

## 🔮 Roadmap

- [ ] Multi-language support (Spanish, French, German)
- [ ] Excel file upload support
- [ ] Batch document processing
- [ ] Email alerts for covenant breaches
- [ ] Mobile app (React Native)
- [ ] Integration with accounting software (QuickBooks, Xero)
- [ ] Advanced AI models (GPT-4, Claude)
- [ ] Multi-tenant architecture
- [ ] Real-time collaboration features

---

## 📄 License

MIT License - feel free to use in your projects!

---

## 🙏 Acknowledgments

- **LMA** - Loan Market Association standards
- **Supabase** - Backend infrastructure
- **Google Gemini** - AI analysis
- **Shadcn/UI** - Component library
- **Recharts** - Data visualization

---

## 📞 Support & Contact

Need help or have questions?

- 🌐 **Live Demo**: [https://credit-pulse-chi.vercel.app](https://credit-pulse-chi.vercel.app)
- 📖 **Documentation**: [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)
- 💬 **Issues**: Open a GitHub issue
- 📧 **Email**: support@creditpulse.dev (if applicable)

---

## 🎉 Acknowledgments

Special thanks to:

- **[LMA EDGE Hackathon](https://www.lma.eu.com/)** - For inspiring innovation in loan markets
- **[BlockNexa Labs](https://blocknexalabs.com)** - Development team
- **[Loan Market Association (LMA)](https://www.lma.eu.com/)** - Industry standards
- **[Supabase](https://supabase.com)** - Backend infrastructure
- **[Google Gemini](https://ai.google.dev/)** - AI-powered analysis
- **[Shadcn/UI](https://ui.shadcn.com/)** - Beautiful component library
- **[Recharts](https://recharts.org/)** - Data visualization
- **[Vercel](https://vercel.com)** - Seamless deployment

---

<div align="center">

### **🚀 [Experience CreditPulse Live](https://credit-pulse-chi.vercel.app) 🚀**

**Built with ❤️ by BlockNexa Labs for LMA EDGE Hackathon**

*Empowering financial professionals worldwide*

---

⭐ **Star this repo if you find it useful!** ⭐

[![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/CreditPulse?style=social)](https://github.com/YOUR_USERNAME/CreditPulse)
[![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/CreditPulse?style=social)](https://github.com/YOUR_USERNAME/CreditPulse/fork)

---

**[🌐 Visit Live Site](https://credit-pulse-chi.vercel.app)** • **[📚 Read Docs](./IMPLEMENTATION_GUIDE.md)** • **[🐛 Report Bug](https://github.com/YOUR_USERNAME/CreditPulse/issues)** • **[✨ Request Feature](https://github.com/YOUR_USERNAME/CreditPulse/issues)**

</div>
