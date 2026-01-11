import { Upload, FileText, File } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DocumentViewerProps {
  hasFile: boolean;
  fileName?: string;
}

export function DocumentViewer({ hasFile, fileName }: DocumentViewerProps) {
  return (
    <Card className="h-full shadow-card overflow-hidden border-border/50">
      <CardContent className="p-0 h-full">
        {!hasFile ? (
          <div className="flex h-full flex-col items-center justify-center p-8 bg-muted/30">
            <div className="flex flex-col items-center gap-5 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 transition-all hover:border-primary/50 hover:bg-primary/10">
                <Upload className="h-10 w-10 text-primary/60" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">Drag & Drop PDF here</p>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  or click "Upload Financials" to analyze
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                <File className="h-3 w-3" />
                <span>Supports PDF, XLSX, DOC formats</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col bg-muted/30">
            <div className="flex items-center gap-3 border-b border-border bg-card p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{fileName}</span>
            </div>
            
            <div className="flex-1 p-4 sm:p-6">
              <div className="h-full rounded-xl bg-card shadow-sm border border-border p-6 sm:p-8">
                <div className="space-y-4">
                  <div className="h-4 w-3/4 rounded-lg bg-muted animate-pulse" />
                  <div className="h-4 w-full rounded-lg bg-muted animate-pulse" />
                  <div className="h-4 w-5/6 rounded-lg bg-muted animate-pulse" />
                  <div className="h-4 w-2/3 rounded-lg bg-muted animate-pulse" />
                  
                  <div className="my-6 h-px bg-border" />
                  
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="space-y-2">
                        <div className="h-3 w-full rounded-lg bg-muted animate-pulse" />
                        <div className="h-8 w-2/3 rounded-lg bg-primary/10" />
                      </div>
                    ))}
                  </div>
                  
                  <div className="my-6 h-px bg-border" />
                  
                  <div className="h-4 w-full rounded-lg bg-muted animate-pulse" />
                  <div className="h-4 w-4/5 rounded-lg bg-muted animate-pulse" />
                </div>
              </div>
            </div>
            
            <div className="border-t border-border bg-card p-3 text-center">
              <span className="text-xs text-muted-foreground font-medium">Page 4 of 28</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
