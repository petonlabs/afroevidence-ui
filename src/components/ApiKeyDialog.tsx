
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface ApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ApiKeyDialog = ({ open, onOpenChange }: ApiKeyDialogProps) => {
  const [apiKey, setApiKey] = useState(localStorage.getItem("openai_api_key") || "");

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }

    if (!apiKey.startsWith("sk-")) {
      toast.error("OpenAI API keys should start with 'sk-'");
      return;
    }

    localStorage.setItem("openai_api_key", apiKey.trim());
    toast.success("API key saved successfully");
    onOpenChange(false);
  };

  const handleRemove = () => {
    localStorage.removeItem("openai_api_key");
    setApiKey("");
    toast.success("API key removed");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>OpenAI API Configuration</DialogTitle>
          <DialogDescription>
            Enter your OpenAI API key to enable research search functionality. 
            Your key is stored locally in your browser and never sent to our servers.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="apikey">API Key</Label>
            <Input
              id="apikey"
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              Don't have an API key? Get one from{" "}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                OpenAI Platform
              </a>
            </p>
            <p className="text-xs">
              Note: API usage will be charged to your OpenAI account according to their pricing.
            </p>
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          {apiKey && (
            <Button variant="outline" onClick={handleRemove}>
              Remove Key
            </Button>
          )}
          <Button onClick={handleSave}>
            Save API Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
