import { useState, useEffect, useRef } from "react";
import { Upload, Loader2, CheckCircle2, XCircle, FileSearch, Calculator, Database, FileJson, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { uploadAndAnalyzePDF } from "@/services/analysisService";
import { exportCDMToJSON, formatCurrency, formatRatio, getCovenantStatus } from "@/utils/cdmUtils";
import { WaiverDialog } from "./WaiverDialog";
import type { AnalysisResult, WaiverLetterRequest, FinancialMetric } from "@/types/cdm";

type AnalysisState = "idle" | "loading" | "complete";

interface ExtractionEngineProps {
  analysisState: AnalysisState;
  setAnalysisState: (state: AnalysisState) => void;
  analysisResult: AnalysisResult | null;
  onAnalysisComplete: (result: AnalysisResult) => void;
  onMetricClick: (sourcePage?: number) => void;
}


const loadingStages = [
  { text: "Uploading PDF to storage...", icon: FileSearch },
  { text: "Analyzing with AI...", icon: Database },
  { text: "Extracting financial metrics...", icon: Calculator },
  { text: "Validating covenants...", icon: CheckCircle2 },
];

export function ExtractionEngine({ 
  analysisState, 
  setAnalysisState, 
  analysisResult,
  onAnalysisComplete,
  onMetricClick 
}: ExtractionEngineProps) {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [waiverDialogOpen, setWaiverDialogOpen] = useState(false);
  const [waiverRequest, setWaiverRequest] = useState<WaiverLetterRequest | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.includes('pdf')) {
        toast.error('Invalid File Type', {
          description: 'Please upload a PDF file',
        });
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File Too Large', {
          description: 'File size must be less than 10MB',
        });
        return;
      }
      
      setSelectedFile(file);
      handleAnalyze(file);
    }
  };

  const handleAnalyze = async (file: File) => {
    setAnalysisState("loading");
    setProgress(0);
    setCurrentStage(0);

    try {
      const result = await uploadAndAnalyzePDF(file, (stage: string) => {
        setProgressMessage(stage);
        
        // Update stage based on message
        if (stage.includes('Uploading')) {
          setCurrentStage(0);
          setProgress(25);
        } else if (stage.includes('Analyzing')) {
          setCurrentStage(1);
          setProgress(50);
        } else if (stage.includes('Saving')) {
          setCurrentStage(2);
          setProgress(75);
        } else if (stage.includes('complete')) {
          setCurrentStage(3);
          setProgress(100);
        }
      });

      if (result.success && result.data) {
        setProgress(100);
        setAnalysisState("complete");
        onAnalysisComplete(result.data);
        
        // Check for breaches (safely)
        const breaches = result.data.cdm_data?.covenant_compliance?.breaches;
        if (breaches && breaches.length > 0) {
          toast.warning('Covenant Breach Detected', {
            description: `${breaches.length} covenant breach(es) found`,
          });
        } else {
          toast.success('Analysis Complete', {
            description: 'All covenants compliant',
          });
        }
      } else {
        throw new Error(result.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysisState("idle");
      toast.error('Analysis Failed', {
        description: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  };


  const handleExportCDM = () => {
    if (analysisResult) {
      exportCDMToJSON(analysisResult.cdm_data, analysisResult.company_name);
    }
  };

  const handleDraftWaiver = (breach: any) => {
    if (!analysisResult) return;
    
    const request: WaiverLetterRequest = {
      company_name: analysisResult.cdm_data.company_name,
      breach_details: {
        covenant_name: breach.covenant_name,
        threshold: breach.threshold,
        actual: breach.actual,
        reporting_period: `${analysisResult.cdm_data.reporting_period.period_type} ${analysisResult.cdm_data.reporting_period.end_date}`,
      },
    };
    
    setWaiverRequest(request);
    setWaiverDialogOpen(true);
  };

  const renderMetric = (label: string, metric?: FinancialMetric, isRatio: boolean = false) => {
    if (!metric && !isRatio) return null;
    
    const displayValue = isRatio 
      ? formatRatio(metric as any)
      : metric 
        ? formatCurrency(metric.value, metric.currency) 
        : 'N/A';
    
    const sourcePage = metric?.source_page;
    
    return (
      <div 
        key={label}
        className={cn(
          "rounded-lg border border-border bg-muted/30 p-3 sm:p-4 transition-all",
          sourcePage && "cursor-pointer hover:border-primary/50 hover:bg-primary/5"
        )}
        onClick={() => sourcePage && onMetricClick(sourcePage)}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] sm:text-xs font-medium text-muted-foreground">{label}</p>
            <p className="text-base sm:text-xl font-bold text-foreground mt-0.5 sm:mt-1">{displayValue}</p>
          </div>
        </div>
        {sourcePage && (
          <p className="text-[8px] sm:text-[10px] text-primary mt-1 sm:mt-2 font-medium">
            📄 Page {sourcePage}
          </p>
        )}
      </div>
    );
  };

  if (analysisState === "idle") {
    return (
      <Card className="h-full shadow-card flex flex-col items-center justify-center border-border/50">
        <CardContent className="flex flex-col items-center gap-5 sm:gap-8 p-6 sm:p-12 text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="relative">
            <div className="flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-3xl bg-primary/10">
              <FileSearch className="h-10 w-10 sm:h-14 sm:w-14 text-primary" />
            </div>
            <div className="absolute -inset-2 rounded-3xl bg-primary/5 blur-xl" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">Ready to Analyze</h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-sm">
              Upload financial statements to automatically extract key metrics and validate covenant compliance
            </p>
          </div>
          <Button 
            size="lg" 
            onClick={() => fileInputRef.current?.click()} 
            className="gap-2 gradient-primary text-primary-foreground hover:opacity-90 transition-opacity text-sm sm:text-base"
          >
            <Upload className="h-4 w-4 sm:h-5 sm:w-5" />
            Upload Financials & Analyze
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (analysisState === "loading") {
    const StageIcon = loadingStages[currentStage].icon;
    return (
      <Card className="h-full shadow-card flex flex-col items-center justify-center">
        <CardContent className="flex flex-col items-center gap-6 sm:gap-8 p-6 sm:p-12 text-center w-full max-w-md">
          <div className="relative">
            <div className="flex h-16 w-16 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-primary/10">
              <Loader2 className="h-8 w-8 sm:h-12 sm:w-12 text-primary animate-spin" />
            </div>
          </div>
          
          <div className="w-full space-y-3 sm:space-y-4">
            <div className="flex items-center justify-center gap-2 text-foreground font-medium text-sm sm:text-base">
              <StageIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <span>{progressMessage || loadingStages[currentStage].text}</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs sm:text-sm text-muted-foreground">{progress}% complete</p>
          </div>

          <div className="flex gap-2">
            {loadingStages.map((stage, index) => (
              <div
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  index <= currentStage ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Analysis complete - show results
  if (!analysisResult || !analysisResult.cdm_data) {
    return (
      <Card className="h-full shadow-card flex items-center justify-center">
        <CardContent className="text-center text-muted-foreground">
          <p>No analysis results available</p>
        </CardContent>
      </Card>
    );
  }

  const { cdm_data, company_name } = analysisResult;
  const { financial_metrics, covenant_ratios, covenant_compliance, reporting_period } = cdm_data;
  const breaches = covenant_compliance?.breaches || [];
  const hasBreaches = breaches.length > 0;

  return (
    <>
      <Card className="h-full shadow-card overflow-auto">
        <CardHeader className="border-b border-border bg-muted/30 p-4 sm:p-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <CardTitle className="text-base sm:text-lg font-semibold">
                  {company_name} - {reporting_period.period_type} {new Date(reporting_period.end_date).getFullYear()}
                </CardTitle>
                <Badge className={cn(
                  "text-[10px] sm:text-xs",
                  covenant_compliance.is_compliant 
                    ? "bg-success/20 text-success border border-success/30" 
                    : "bg-destructive/20 text-destructive border border-destructive/30"
                )}>
                  {covenant_compliance.is_compliant ? 'Compliant' : `${breaches.length} Breach(es)`}
                </Badge>
              </div>
              <Badge className={cn(
                covenant_compliance.is_compliant ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"
              )}>
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Processed
              </Badge>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Analysis completed • {Object.keys(financial_metrics).length} metrics extracted
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleExportCDM}
                className="gap-2 text-xs border-primary/30 hover:bg-primary/5 hover:border-primary w-fit"
              >
                <FileJson className="h-3.5 w-3.5" />
                Export to CDM
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Extracted Data Grid */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-3 sm:mb-4">Extracted Financial Data</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
              {financial_metrics.revenue && renderMetric('Revenue', financial_metrics.revenue)}
              {financial_metrics.ebitda && renderMetric('EBITDA', financial_metrics.ebitda)}
              {financial_metrics.net_debt && renderMetric('Net Debt', financial_metrics.net_debt)}
              {financial_metrics.total_assets && renderMetric('Total Assets', financial_metrics.total_assets)}
              {financial_metrics.cash_balance && renderMetric('Cash Balance', financial_metrics.cash_balance)}
              {covenant_ratios.leverage_ratio && (
                <div className="rounded-lg border border-border bg-muted/30 p-3 sm:p-4">
                  <p className="text-[10px] sm:text-xs font-medium text-muted-foreground">Leverage Ratio</p>
                  <p className="text-base sm:text-xl font-bold text-foreground mt-0.5 sm:mt-1">
                    {formatRatio(covenant_ratios.leverage_ratio)}
                  </p>
                  <p className="text-[8px] sm:text-[10px] text-muted-foreground mt-1 sm:mt-2">
                    Net Debt / EBITDA
                  </p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Covenant Validation */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-3 sm:mb-4">Covenant Validation</h4>
            
            {/* Breach Cards */}
            {hasBreaches && breaches.map((breach, index) => {
              const isCritical = breach.severity === 'critical';
              const isMajor = breach.severity === 'major';
              
              return (
                <Card key={index} className={cn(
                  "border-2 mb-3 sm:mb-4",
                  isCritical ? "border-destructive bg-destructive/5" : 
                  isMajor ? "border-orange-500 bg-orange-500/5" :
                  "border-yellow-500 bg-yellow-500/5"
                )}>
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={cn(
                        "flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg",
                        isCritical ? "bg-destructive/10" : "bg-orange-500/10"
                      )}>
                        <XCircle className={cn(
                          "h-4 w-4 sm:h-5 sm:w-5",
                          isCritical ? "text-destructive" : "text-orange-500"
                        )} />
                      </div>
                      <div className="flex-1 space-y-3 sm:space-y-4 min-w-0">
                        <div>
                          <h5 className="font-semibold text-foreground text-sm sm:text-base">{breach.covenant_name}</h5>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                            Covenant Test - {breach.severity.toUpperCase()} Severity
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 sm:gap-4">
                          <div>
                            <p className="text-[10px] sm:text-xs font-medium text-muted-foreground">Threshold</p>
                            <p className="text-sm sm:text-lg font-semibold text-foreground">
                              {breach.covenant_name.includes('Leverage') ? '≤ ' : '≥ '}
                              {formatRatio(breach.threshold)}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] sm:text-xs font-medium text-muted-foreground">Actual</p>
                            <p className={cn(
                              "text-sm sm:text-lg font-bold",
                              isCritical ? "text-destructive" : "text-orange-500"
                            )}>
                              {formatRatio(breach.actual)}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] sm:text-xs font-medium text-muted-foreground">Status</p>
                            <Badge variant="destructive" className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs">
                              BREACH
                            </Badge>
                          </div>
                        </div>
                        
                        <div className={cn(
                          "rounded-md p-2 sm:p-3",
                          isCritical ? "bg-destructive/10" : "bg-orange-500/10"
                        )}>
                          <p className={cn(
                            "text-[10px] sm:text-xs font-medium",
                            isCritical ? "text-destructive" : "text-orange-600"
                          )}>
                            ⚠️ {breach.covenant_name} of {formatRatio(breach.actual)} exceeds the covenant threshold of {formatRatio(breach.threshold)} by {(((breach.actual - breach.threshold) / breach.threshold) * 100).toFixed(1)}%. 
                            {isCritical && ' Immediate escalation recommended.'}
                          </p>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDraftWaiver(breach)}
                          className="gap-2 text-xs font-medium bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/40 hover:shadow-sm transition-all duration-200 w-fit mt-1.5"
                        >
                          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                          Auto-Draft Waiver Request
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* All Pass - Show compliant message */}
            {!hasBreaches && (
              <Card className="border border-success/30 bg-success/5">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-success/10">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-foreground text-sm sm:text-base">All Covenants Compliant</h5>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        All covenant tests passed successfully. No action required.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
            <Button 
              className="flex-1 gradient-primary text-primary-foreground hover:opacity-90 text-sm"
              onClick={() => toast.info('Report generation feature coming soon')}
            >
              Generate Report
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 text-sm"
              onClick={() => toast.info('Escalation feature coming soon')}
            >
              Escalate to Manager
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Waiver Dialog */}
      {waiverRequest && (
        <WaiverDialog
          open={waiverDialogOpen}
          onOpenChange={setWaiverDialogOpen}
          waiverRequest={waiverRequest}
        />
      )}
    </>
  );
}
