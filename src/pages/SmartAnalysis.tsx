import { useState } from "react";
import { PDFViewer } from "@/components/analysis/PDFViewer";
import { ExtractionEngine } from "@/components/analysis/ExtractionEngine";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sparkles, Brain, TrendingUp } from "lucide-react";
import type { AnalysisResult } from "@/types/cdm";

type AnalysisState = "idle" | "loading" | "complete";

export default function SmartAnalysis() {
  const [analysisState, setAnalysisState] = useState<AnalysisState>("idle");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setPdfUrl(result.upload_url);
    setAnalysisState("complete");
  };

  const handleMetricClick = (sourcePage?: number) => {
    if (sourcePage) {
      setCurrentPage(sourcePage);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Smart Analysis</h1>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-0 gap-1.5">
              <Sparkles className="h-3 w-3" />
              AI Powered
            </Badge>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">AI-powered document extraction and covenant validation</p>
        </div>
      </div>

      {/* AI Forecast Info Banner */}
      <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.05s', animationFillMode: 'forwards' }}>
        <Alert className="border-primary/30 bg-gradient-to-r from-primary/5 via-transparent to-transparent">
          <Brain className="h-4 w-4 text-primary" />
          <AlertTitle className="text-sm font-semibold">🔮 Predictive Analysis Enabled</AlertTitle>
          <AlertDescription className="text-xs text-muted-foreground">
            After extraction, our AI will automatically generate 3-month forward forecasts for all covenant ratios
            <Badge variant="outline" className="ml-2 bg-primary/5 text-primary border-primary/20 text-[10px]">
              <TrendingUp className="h-2.5 w-2.5 mr-1" />
              90-Day Early Warning
            </Badge>
          </AlertDescription>
        </Alert>
      </div>

      {/* Split View */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2 min-h-[300px] sm:min-h-[400px] lg:min-h-[600px] opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          <PDFViewer 
            pdfUrl={pdfUrl} 
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
        <div className="lg:col-span-3 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] opacity-0 animate-fade-in-up" style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}>
          <ExtractionEngine
            analysisState={analysisState}
            setAnalysisState={setAnalysisState}
            analysisResult={analysisResult}
            onAnalysisComplete={handleAnalysisComplete}
            onMetricClick={handleMetricClick}
          />
        </div>
      </div>
    </div>
  );
}
