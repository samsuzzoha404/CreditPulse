import { Filter, Download, MoreHorizontal, ArrowUpDown, Eye, Play, FileDown, Database } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { usePortfolioLoans } from "@/hooks/usePortfolioData";
import type { DemoLoan } from "@/data/demoData";

const statusStyles = {
  Healthy: "bg-success/10 text-success border-success/20",
  Watch: "bg-warning/10 text-warning border-warning/20",
  Breach: "bg-destructive/10 text-destructive border-destructive/20",
};

const gradeStyles: Record<string, string> = {
  "Grade A": "bg-success/10 text-success",
  "Grade B": "bg-primary/10 text-primary",
  "Grade C": "bg-warning/10 text-warning",
  "Grade D": "bg-destructive/10 text-destructive",
};

export default function LoanPortfolio() {
  const [selectedLoan, setSelectedLoan] = useState<DemoLoan | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { data: loans, isLoading } = usePortfolioLoans();

  const handleViewDetails = (loan: DemoLoan) => {
    setSelectedLoan(loan);
    setIsDetailsOpen(true);
  };

  const handleRunAnalysis = async (loan: DemoLoan) => {
    setIsAnalyzing(true);
    toast({
      title: "Analysis Started",
      description: `Running comprehensive analysis for ${loan.borrower}...`,
    });

    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete",
        description: `${loan.borrower} analysis completed successfully.`,
      });
      
      // You can navigate to analysis page or show results
      // For now, we'll just show a success message
    }, 2000);
  };

  const handleExportReport = (loan: DemoLoan) => {
    toast({
      title: "Exporting Report",
      description: `Generating report for ${loan.borrower}...`,
    });

    // Simulate report generation and download
    setTimeout(() => {
      const reportData = {
        borrower: loan.borrower,
        sector: loan.sector,
        amount: loan.amount,
        nextReview: loan.nextReview,
        riskGrade: loan.riskGrade,
        status: loan.status,
        generatedAt: new Date().toISOString(),
        reportType: "Loan Portfolio Summary",
      };

      const blob = new Blob([JSON.stringify(reportData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${loan.borrower.replace(/\s+/g, "_")}_Report_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Report Downloaded",
        description: `Report for ${loan.borrower} has been downloaded.`,
      });
    }, 1000);
  };

  const totalLoans = loans?.length || 0;
  const totalExposure = loans?.reduce((sum, l) => sum + l.amountNumeric, 0) || 0;

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">Loan Portfolio</h1>
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 gap-1.5">
              <Database className="h-3 w-3" />
              Demo Mode
            </Badge>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">Manage and monitor all active loan facilities</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="outline" size="sm" className="gap-2 text-xs sm:text-sm">
            <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2 text-xs sm:text-sm">
            <Download className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      {isLoading ? (
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <Card className="shadow-card">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                <div>
                  <p className="text-[10px] sm:text-sm text-muted-foreground">Total Loans</p>
                  <p className="text-lg sm:text-2xl font-bold text-foreground">{totalLoans}</p>
                </div>
                <Badge variant="secondary" className="text-[10px] sm:text-xs w-fit">{totalLoans} shown</Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                <div>
                  <p className="text-[10px] sm:text-sm text-muted-foreground">Total Exposure</p>
                  <p className="text-lg sm:text-2xl font-bold text-foreground">${(totalExposure / 1000).toFixed(1)}B</p>
                </div>
                <Badge className="bg-success/10 text-success border-0 text-[10px] sm:text-xs w-fit">Active</Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                <div>
                  <p className="text-[10px] sm:text-sm text-muted-foreground">Avg. Risk</p>
                  <p className="text-lg sm:text-2xl font-bold text-foreground">B+</p>
                </div>
                <Badge className="bg-primary/10 text-primary border-0 text-[10px] sm:text-xs w-fit">Stable</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Mobile Card View */}
      <div className="space-y-3 sm:hidden">
        {isLoading ? (
          <>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </>
        ) : (
          loans?.map((loan) => (
          <Card key={loan.id} className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground truncate">{loan.borrower}</p>
                  <p className="text-xs text-muted-foreground">{loan.sector}</p>
                </div>
                <Badge variant="outline" className={cn("border shrink-0 text-[10px]", statusStyles[loan.status])}>
                  {loan.status}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-border">
                <div>
                  <p className="text-[10px] text-muted-foreground">Amount</p>
                  <p className="text-sm font-medium text-foreground">{loan.amount}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Review</p>
                  <p className="text-sm font-medium text-foreground">{loan.nextReview}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Grade</p>
                  <Badge variant="secondary" className={cn("border-0 text-[10px]", gradeStyles[loan.riskGrade])}>
                    {loan.riskGrade.replace("Grade ", "")}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 gap-1 text-xs h-8"
                  onClick={() => handleViewDetails(loan)}
                >
                  <Eye className="h-3 w-3" />
                  Details
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 gap-1 text-xs h-8"
                  onClick={() => handleRunAnalysis(loan)}
                  disabled={isAnalyzing}
                >
                  <Play className="h-3 w-3" />
                  Analysis
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 gap-1 text-xs h-8"
                  onClick={() => handleExportReport(loan)}
                >
                  <FileDown className="h-3 w-3" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
        )}
      </div>

      {/* Desktop Table View */}
      <Card className="shadow-card hidden sm:block">
        <CardHeader className="border-b border-border px-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg font-semibold">Active Facilities</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="font-semibold">
                    <Button variant="ghost" className="gap-1 -ml-3 h-8 font-semibold text-muted-foreground hover:text-foreground text-xs sm:text-sm">
                      Borrower Name
                      <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground text-xs sm:text-sm hidden md:table-cell">Sector</TableHead>
                  <TableHead className="font-semibold text-muted-foreground text-xs sm:text-sm">Amount</TableHead>
                  <TableHead className="font-semibold text-muted-foreground text-xs sm:text-sm hidden lg:table-cell">Next Review</TableHead>
                  <TableHead className="font-semibold text-muted-foreground text-xs sm:text-sm hidden md:table-cell">Risk Grade</TableHead>
                  <TableHead className="font-semibold text-muted-foreground text-xs sm:text-sm">Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                          <Skeleton key={i} className="h-12 w-full" />
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  loans?.map((loan) => (
                  <TableRow key={loan.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium text-foreground text-xs sm:text-sm">{loan.borrower}</TableCell>
                    <TableCell className="text-muted-foreground text-xs sm:text-sm hidden md:table-cell">{loan.sector}</TableCell>
                    <TableCell className="font-medium text-foreground text-xs sm:text-sm">{loan.amount}</TableCell>
                    <TableCell className="text-muted-foreground text-xs sm:text-sm hidden lg:table-cell">{loan.nextReview}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="secondary" className={cn("border-0 text-[10px] sm:text-xs", gradeStyles[loan.riskGrade])}>
                        {loan.riskGrade}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("border text-[10px] sm:text-xs", statusStyles[loan.status])}>
                        {loan.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border-border">
                          <DropdownMenuItem onClick={() => handleViewDetails(loan)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRunAnalysis(loan)} disabled={isAnalyzing}>
                            <Play className="h-4 w-4 mr-2" />
                            Run Analysis
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleExportReport(loan)}>
                            <FileDown className="h-4 w-4 mr-2" />
                            Export Report
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {selectedLoan?.borrower} - Loan Details
            </DialogTitle>
            <DialogDescription>
              Comprehensive information about this loan facility
            </DialogDescription>
          </DialogHeader>
          
          {selectedLoan && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Borrower Name</p>
                    <p className="font-medium">{selectedLoan.borrower}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Sector</p>
                    <p className="font-medium">{selectedLoan.sector}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Loan Amount</p>
                    <p className="font-medium text-lg">{selectedLoan.amount}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Next Review Date</p>
                    <p className="font-medium">{selectedLoan.nextReview}, 2026</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Risk Grade</p>
                    <Badge variant="secondary" className={cn("w-fit", gradeStyles[selectedLoan.riskGrade])}>
                      {selectedLoan.riskGrade}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant="outline" className={cn("border w-fit", statusStyles[selectedLoan.status])}>
                      {selectedLoan.status}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Financial Details */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold">Financial Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Interest Rate</p>
                    <p className="font-medium">4.5% p.a.</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Tenure</p>
                    <p className="font-medium">5 years</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Outstanding Balance</p>
                    <p className="font-medium">{selectedLoan.amount}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Monthly Payment</p>
                    <p className="font-medium">$850K</p>
                  </div>
                </div>
              </div>

              {/* Covenant Status */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold">Covenant Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm">Debt Service Coverage Ratio (DSCR)</span>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      Compliant
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm">Leverage Ratio</span>
                    <Badge variant="outline" className={cn(
                      "border",
                      selectedLoan.status === "Breach" 
                        ? "bg-destructive/10 text-destructive border-destructive/20"
                        : selectedLoan.status === "Watch"
                        ? "bg-warning/10 text-warning border-warning/20"
                        : "bg-success/10 text-success border-success/20"
                    )}>
                      {selectedLoan.status === "Breach" ? "Non-Compliant" : selectedLoan.status === "Watch" ? "Watch" : "Compliant"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm">Interest Coverage Ratio</span>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      Compliant
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button 
                  className="flex-1 gap-2"
                  onClick={() => {
                    setIsDetailsOpen(false);
                    handleRunAnalysis(selectedLoan);
                  }}
                >
                  <Play className="h-4 w-4" />
                  Run Full Analysis
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2"
                  onClick={() => {
                    handleExportReport(selectedLoan);
                  }}
                >
                  <FileDown className="h-4 w-4" />
                  Export Report
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
