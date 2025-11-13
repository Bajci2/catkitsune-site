import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image } from "lucide-react";

export default function NFTGallery() {
  const nftSlots = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <Image className="h-5 w-5 text-primary" />
          NFT Galéria
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {nftSlots.map((slot) => (
            <div
              key={slot}
              className="aspect-square rounded-lg border-2 border-dashed border-border bg-muted/30 flex items-center justify-center hover-elevate cursor-pointer transition-all duration-200 hover:border-primary hover:bg-primary/5"
              data-testid={`nft-slot-${slot}`}
            >
              <div className="text-center">
                <div className="text-muted-foreground font-semibold text-sm">
                  NFT
                </div>
                <div className="text-xs text-muted-foreground/60 mt-1">
                  #{slot}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
