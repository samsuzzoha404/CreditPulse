import React, { useState } from 'react';
import { Sparkles, Copy, Check, Download, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { draftWaiverLetter } from '@/services/waiverService';
import type { WaiverLetterRequest } from '@/types/cdm';

interface WaiverDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  waiverRequest: WaiverLetterRequest;
}

export function WaiverDialog({ open, onOpenChange, waiverRequest }: WaiverDialogProps) {
  const [letter, setLetter] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await draftWaiverLetter(waiverRequest, false);
      
      if (result.success && result.letter) {
        setLetter(result.letter);
        toast.success('Waiver Letter Generated', {
          description: 'AI has drafted a professional waiver request letter',
        });
      } else {
        toast.error('Generation Failed', {
          description: result.error || 'Failed to generate waiver letter',
        });
      }
    } catch (error) {
      toast.error('Generation Failed', {
        description: 'An unexpected error occurred',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(letter);
      setIsCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([letter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Waiver_Request_${waiverRequest.company_name}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Waiver letter downloaded');
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setLetter('');
      setIsCopied(false);
    }
    onOpenChange(newOpen);
  };

  // Auto-generate on open
  React.useEffect(() => {
    if (open && !letter && !isGenerating) {
      handleGenerate();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI-Generated Waiver Request
          </DialogTitle>
          <DialogDescription>
            Professional waiver letter draft for {waiverRequest.company_name}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">
                  Drafting waiver letter...
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  This may take a few moments
                </p>
              </div>
            </div>
          ) : letter ? (
            <Textarea
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
              placeholder="Waiver letter will appear here..."
            />
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <p className="text-sm">No letter generated yet</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {letter && (
            <>
              <Button
                variant="outline"
                onClick={handleCopy}
                className="gap-2"
              >
                {isCopied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleDownload}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </>
          )}
          <Button
            variant="default"
            onClick={() => handleOpenChange(false)}
            className="gradient-primary"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
