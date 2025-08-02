import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Copy, Check, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Hero = () => {
  const [url, setUrl] = useState("");
  const [sporeName, setSporeName] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateShortUrl = (customName?: string) => {
    if (customName && customName.trim()) {
      return `https://sporez.io/${customName.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-')}`;
    }
    // Generate a random short code
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return `https://sporez.io/${result}`;
  };

  const handleShorten = async () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const shortened = generateShortUrl(sporeName);
      setShortenedUrl(shortened);
      setIsLoading(false);
      toast({
        title: "Spore Created! 🧬",
        description: "Your content has been packaged into a spore",
      });
    }, 1000);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortenedUrl);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Short URL copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy URL",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-accent/30 to-background">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Turn any page into a{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Spore
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            SporeZ packages any web content into shareable spores. Paste a TikTok, Shopify store, or any URL - get your sporez.io link instantly. Coming soon: browser extension to spore any page with one click.
          </p>
        </div>

        <Card className="p-8 shadow-strong bg-gradient-card border-0 mb-8">
          <div className="space-y-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="url"
                  placeholder="Paste any URL (TikTok, Shopify, YouTube, etc.)..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-10 h-12 text-lg border-2 focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Custom spore name (optional): yourname"
                  value={sporeName}
                  onChange={(e) => setSporeName(e.target.value)}
                  className="h-12 text-lg border-2 focus:ring-2 focus:ring-primary/20"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Will create: sporez.io/{sporeName || "random-code"}
                </p>
              </div>
              <Button 
                onClick={handleShorten}
                disabled={isLoading}
                variant="hero"
                size="lg"
                className="h-12 px-8 min-w-[140px]"
              >
                {isLoading ? "Creating Spore..." : "Create Spore"}
              </Button>
            </div>
          </div>

          {shortenedUrl && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 text-left">
                  <p className="text-sm text-muted-foreground mb-1">Your spore is ready! 🧬</p>
                  <a 
                    href={shortenedUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary font-medium hover:underline text-lg"
                  >
                    {shortenedUrl}
                  </a>
                </div>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>
          )}
        </Card>

        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Trusted by developers, marketers, and businesses worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-2xl font-bold text-muted-foreground/60">
            <span>10M+</span>
            <span>Links Created</span>
            <span>•</span>
            <span>500K+</span>
            <span>Users</span>
            <span>•</span>
            <span>99.9%</span>
            <span>Uptime</span>
          </div>
        </div>
      </div>
    </section>
  );
};
