import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingUp, Zap, Network, Brain, FileCheck, ChevronRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function Landing() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      />

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/10 backdrop-blur-xl bg-slate-950/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                CreditPulse
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors hover:scale-105 transform">Features</a>
              <a href="#technology" className="text-slate-300 hover:text-white transition-colors hover:scale-105 transform">Technology</a>
              <a href="#impact" className="text-slate-300 hover:text-white transition-colors hover:scale-105 transform">Impact</a>
              <Link to="/dashboard">
                <Button className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-105">
                  Launch App
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-8 animate-fade-in-up">
            <Sparkles className="h-4 w-4 text-blue-400 animate-pulse" />
            <span className="text-sm text-blue-300">The Agentic Covenant Monitor</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Transform Loan
            </span>
            <br />
            <span className="text-white">Administration</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            From reactive PDF processing to predictive intelligence and CDM interoperability.
            <span className="block mt-2 text-cyan-400">Powered by AI. Built for the future.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/dashboard">
              <Button size="lg" className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 text-lg px-8 py-6 shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300 hover:scale-105">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="group border-slate-700 bg-slate-900/50 hover:bg-slate-800/80 text-white text-lg px-8 py-6 backdrop-blur-sm hover:border-slate-600 transition-all duration-300">
              Watch Demo
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="group backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 hover:bg-white/10 transition-all duration-300 hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">90%</div>
              <div className="text-slate-400">Time Reduction</div>
            </div>
            <div className="group backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300 hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">3 Months</div>
              <div className="text-slate-400">Risk Prediction</div>
            </div>
            <div className="group backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300 hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">100%</div>
              <div className="text-slate-400">CDM Compatible</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                The Visibility Gap
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              While trade execution is becoming digital, Loan Administration remains stuck in an analog era
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative backdrop-blur-xl bg-slate-900/50 rounded-2xl p-8 border border-red-500/20 hover:border-red-500/40 transition-all">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mb-4">
                  <FileCheck className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">The PDF Trap</h3>
                <p className="text-slate-400">
                  Critical financial data locked in unstructured PDFs. Banks waste thousands of hours manually keying data into spreadsheets.
                </p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative backdrop-blur-xl bg-slate-900/50 rounded-2xl p-8 border border-orange-500/20 hover:border-orange-500/40 transition-all">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Reactive Monitoring</h3>
                <p className="text-slate-400">
                  Lenders discover financial distress 45-90 days after quarter end. In volatile markets, this latency is catastrophic.
                </p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative backdrop-blur-xl bg-slate-900/50 rounded-2xl p-8 border border-yellow-500/20 hover:border-yellow-500/40 transition-all">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-yellow-500 to-red-500 flex items-center justify-center mb-4">
                  <Network className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Interoperability Crisis</h3>
                <p className="text-slate-400">
                  Data sits in silos. Loan data can't move between borrowers, agents, and lenders without friction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Intelligent Features
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Beyond document reading. We understand, predict, and standardize.
            </p>
          </div>

          <div className="space-y-24 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-12 border border-blue-500/20 shadow-2xl shadow-blue-500/10">
                  <div className="aspect-video bg-slate-950/50 rounded-lg flex items-center justify-center border border-blue-500/30">
                    <Network className="h-24 w-24 text-blue-400" />
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 mb-4">
                  <Shield className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-blue-300">Interoperability</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-white">Smart Ingestion & CDM Integration</h3>
                <p className="text-slate-400 text-lg mb-6">
                  Advanced LLMs extract granular financial data from PDFs with near-perfect accuracy. 
                  Automatically maps to LMA Common Domain Model (CDM) JSON format for instant interoperability.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-cyan-400 mr-2 mt-1" />
                    <span className="text-slate-300">Extract EBITDA, Net Debt, Cash Flow automatically</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-cyan-400 mr-2 mt-1" />
                    <span className="text-slate-300">Native CDM JSON output for ecosystem integration</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-cyan-400 mr-2 mt-1" />
                    <span className="text-slate-300">Ready for LMA.Automate from day one</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 mb-4">
                  <Brain className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-purple-300">Proactive Monitoring</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-white">Predictive Risk Sentinel</h3>
                <p className="text-slate-400 text-lg mb-6">
                  Moving beyond simple Pass/Fail checks. Our AI Forecast Engine projects key ratios 3 months 
                  into the future, acting as an early warning system.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-purple-400 mr-2 mt-1" />
                    <span className="text-slate-300">Analyze historical trends with machine learning</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-purple-400 mr-2 mt-1" />
                    <span className="text-slate-300">Visual forecast lines show danger zones</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-purple-400 mr-2 mt-1" />
                    <span className="text-slate-300">Alert months before formal default occurs</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-12 border border-purple-500/20 shadow-2xl shadow-purple-500/10">
                  <div className="aspect-video bg-slate-950/50 rounded-lg flex items-center justify-center border border-purple-500/30">
                    <TrendingUp className="h-24 w-24 text-purple-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl p-12 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
                  <div className="aspect-video bg-slate-950/50 rounded-lg flex items-center justify-center border border-cyan-500/30">
                    <Zap className="h-24 w-24 text-cyan-400" />
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-4">
                  <Zap className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm text-cyan-300">Actionable AI</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-white">Agentic Waiver Workflow</h3>
                <p className="text-slate-400 text-lg mb-6">
                  When breaches are detected or predicted, CreditPulse doesn't just flag it—it helps solve it. 
                  One-click AI-generated LMA-standard waiver requests.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-cyan-400 mr-2 mt-1" />
                    <span className="text-slate-300">Auto-draft formal waiver request letters</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-cyan-400 mr-2 mt-1" />
                    <span className="text-slate-300">LMA-standard formatting and language</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-cyan-400 mr-2 mt-1" />
                    <span className="text-slate-300">Ready for Facility Agent review instantly</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="relative py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Cutting-Edge Stack
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Built with modern Web3 technologies for security, scalability, and performance
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: "GPT-4o", desc: "Advanced AI", color: "from-green-500 to-emerald-500" },
              { name: "Next.js 14", desc: "Modern Framework", color: "from-blue-500 to-cyan-500" },
              { name: "Supabase", desc: "Secure Database", color: "from-emerald-500 to-teal-500" },
              { name: "TypeScript", desc: "Type Safety", color: "from-blue-500 to-indigo-500" },
            ].map((tech, i) => (
              <div key={i} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-20 rounded-2xl blur-xl group-hover:blur-2xl transition-all`} />
                <div className="relative backdrop-blur-xl bg-slate-900/50 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all text-center">
                  <div className={`h-16 w-16 mx-auto rounded-lg bg-gradient-to-br ${tech.color} flex items-center justify-center mb-4`}>
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">{tech.name}</h4>
                  <p className="text-sm text-slate-400">{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="relative py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-16 border border-white/10">
            <div className="text-center">
              <h2 className="text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Commercial Impact
                </span>
              </h2>
              <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
                Transforming loan administration from cost center to strategic advantage
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                    90%
                  </div>
                  <div className="text-slate-400 text-lg">Efficiency Gain</div>
                  <div className="text-sm text-slate-500 mt-2">Free analysts for high-value work</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    ↓PD
                  </div>
                  <div className="text-slate-400 text-lg">Risk Mitigation</div>
                  <div className="text-sm text-slate-500 mt-2">Lower capital requirements</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    ∞
                  </div>
                  <div className="text-slate-400 text-lg">Scalability</div>
                  <div className="text-sm text-slate-500 mt-2">Built on CDM standard</div>
                </div>
              </div>

              <Link to="/dashboard">
                <Button size="lg" className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 text-lg px-12 py-6 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 hover:scale-105">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-12 px-6 mt-20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 blur-lg opacity-75" />
                <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg">
                  <Zap className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <div className="text-xl font-bold text-white">CreditPulse</div>
                <div className="text-sm text-slate-400">The Agentic Covenant Monitor</div>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 backdrop-blur-sm">
                <Sparkles className="h-5 w-5 text-blue-400 animate-pulse" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  BlockNexa Labs
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-center text-slate-500 text-sm mt-8 pt-8 border-t border-white/5">
            © 2026 CreditPulse. All rights reserved. | Revolutionizing Loan Administration.
          </div>
        </div>
      </footer>
    </div>
  );
}
