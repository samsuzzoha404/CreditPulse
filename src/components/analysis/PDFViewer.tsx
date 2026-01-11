import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Upload, FileText, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker - use local copy
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

interface PDFViewerProps {
  pdfUrl: string | null;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export function PDFViewer({ pdfUrl, currentPage = 1, onPageChange }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(currentPage);
  const [scale, setScale] = useState(1.0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPageNumber(currentPage);
  }, [currentPage]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
  };

  const changePage = (offset: number) => {
    const newPage = pageNumber + offset;
    if (newPage >= 1 && newPage <= numPages) {
      setPageNumber(newPage);
      onPageChange?.(newPage);
    }
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2.0));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  if (!pdfUrl) {
    return (
      <Card className="h-full shadow-card overflow-hidden border-border/50">
        <CardContent className="p-0 h-full">
          <div className="flex h-full flex-col items-center justify-center p-8 bg-muted/30">
            <div className="flex flex-col items-center gap-5 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5">
                <Upload className="h-10 w-10 text-primary/60" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">No PDF Loaded</p>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Upload a financial document to view
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full shadow-card overflow-hidden border-border/50 flex flex-col">
      <CardContent className="p-0 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-border bg-card p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground truncate max-w-[200px]">
              Financial Statement
            </span>
          </div>
          
          {/* Zoom Controls */}
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={zoomOut}
              disabled={scale <= 0.5}
              className="h-8 w-8 p-0"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-xs text-muted-foreground min-w-[3rem] text-center">
              {Math.round(scale * 100)}%
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={zoomIn}
              disabled={scale >= 2.0}
              className="h-8 w-8 p-0"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* PDF Display */}
        <div className="flex-1 overflow-auto bg-muted/30 flex items-center justify-center p-4">
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm">Loading PDF...</span>
            </div>
          )}
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading=""
            error={
              <div className="text-center text-destructive">
                <p className="text-sm">Failed to load PDF</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Please check the file URL
                </p>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={false}
              className="shadow-lg"
            />
          </Document>
        </div>

        {/* Footer Navigation */}
        {numPages > 0 && (
          <div className="border-t border-border bg-card p-3 flex items-center justify-between">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => changePage(-1)}
              disabled={pageNumber <= 1}
              className="h-8 gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <span className="text-xs text-muted-foreground font-medium">
              Page {pageNumber} of {numPages}
            </span>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={() => changePage(1)}
              disabled={pageNumber >= numPages}
              className="h-8 gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
