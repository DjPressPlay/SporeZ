import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, User, Sparkles } from "lucide-react";
import { useParams } from "react-router-dom";

export const SporeOpen = () => {
  const { slug } = useParams();
  const [isOpened, setIsOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Mock data - in real app this would come from backend based on slug
  const sporeData = {
    giftName: "Exclusive Sneaker Drop",
    giftImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    originalUrl: "https://nike.com/air-jordan-exclusive",
    createdBy: "spidermanwebsguy",
    createdByUrl: "sporez.io/spidermanwebsguy"
  };

  const handleSporeClick = () => {
    if (isOpened) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setIsOpened(true);
      setIsAnimating(false);
    }, 1000);
  };

  const openGiftLink = () => {
    window.open(sporeData.originalUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/30 to-background flex items-center justify-center p-4">
      <div className="container max-w-2xl text-center">
        {!isOpened ? (
          // PHASE 1: Drop Encounter
          <div className="space-y-8">
            <div 
              className={`relative mx-auto w-64 h-64 cursor-pointer transition-all duration-500 ${
                isAnimating ? 'scale-110 animate-pulse' : 'hover:scale-105'
              }`}
              onClick={handleSporeClick}
            >
              {/* Spore Pod */}
              <div className={`
                w-full h-full rounded-full bg-gradient-primary relative overflow-hidden
                shadow-strong border-4 border-primary/20
                ${isAnimating ? 'animate-ping' : ''}
              `}>
                {/* Inner glow effect */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                
                {/* Shimmer effect */}
                <div className={`
                  absolute inset-0 rounded-full
                  ${!isAnimating ? 'animate-pulse' : ''}
                `}>
                  <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white/30 rounded-full blur-sm" />
                  <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-white/20 rounded-full blur-sm" />
                </div>

                {/* Center spore symbol */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-white animate-pulse" />
                </div>

                {/* Crack lines when animating */}
                {isAnimating && (
                  <>
                    <div className="absolute top-1/3 left-1/2 w-0.5 h-16 bg-white/60 transform -translate-x-1/2 -rotate-12" />
                    <div className="absolute top-1/2 left-1/3 w-12 h-0.5 bg-white/60 transform -translate-y-1/2 rotate-45" />
                    <div className="absolute bottom-1/3 right-1/3 w-0.5 h-12 bg-white/60 transform rotate-12" />
                  </>
                )}
              </div>
              
              {/* Outer pulse rings */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
              <div className="absolute inset-4 rounded-full border border-primary/20 animate-pulse" />
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-foreground">
                A Spore Awaits You 🧬
              </h1>
              <p className="text-xl text-muted-foreground">
                Something special has been planted for you
              </p>
              <Button 
                size="lg" 
                variant="hero"
                onClick={handleSporeClick}
                disabled={isAnimating}
                className="text-lg px-8 py-6"
              >
                {isAnimating ? "Opening Spore..." : "Tap to release your drop"}
              </Button>
            </div>
          </div>
        ) : (
          // PHASE 2: Gift Reveal
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-foreground">
                🎁 Your Spore Has Bloomed!
              </h1>
              <p className="text-muted-foreground">Here's what was planted for you:</p>
            </div>

            <Card className="p-8 bg-gradient-card border-0 shadow-strong">
              <div className="space-y-6">
                {/* Gift Image */}
                <div className="mx-auto w-48 h-48 rounded-lg overflow-hidden shadow-medium">
                  <img 
                    src={sporeData.giftImage} 
                    alt={sporeData.giftName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Gift Name */}
                <h2 className="text-2xl font-bold text-foreground">
                  {sporeData.giftName}
                </h2>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    variant="hero"
                    onClick={openGiftLink}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    📦 Claim Your Gift
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    🧬 See Your New Identity
                  </Button>
                </div>
              </div>
            </Card>

            {/* Backlink */}
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                🧩 This Spore was planted by:
              </p>
              <a 
                href={`https://${sporeData.createdByUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                <User className="w-4 h-4" />
                .sz/{sporeData.createdBy}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
