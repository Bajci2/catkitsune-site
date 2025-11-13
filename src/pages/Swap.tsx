import { useState } from "react";
import { ArrowDownUp, Settings } from "lucide-react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Swap() {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDC");

  const handleSwap = () => {
    console.log("Swapping", fromAmount, fromToken, "to", toToken);
    // TODO: Implement swap logic
  };

  const handleFlip = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userName="Alex Kovács" userPoints={1250} />
      
      <div className="container px-6 py-12">
        <div className="max-w-lg mx-auto">
          <h1 
            className="text-4xl font-bold mb-8 text-center" 
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Swap
          </h1>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Token Csere</CardTitle>
              <Button size="icon" variant="ghost" data-testid="button-settings">
                <Settings className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Elküldesz</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    className="flex-1"
                    data-testid="input-from-amount"
                  />
                  <div className="w-24">
                    <select 
                      className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                      value={fromToken}
                      onChange={(e) => setFromToken(e.target.value)}
                      data-testid="select-from-token"
                    >
                      <option value="ETH">ETH</option>
                      <option value="USDC">USDC</option>
                      <option value="USDT">USDT</option>
                      <option value="DAI">DAI</option>
                    </select>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Egyenleg: 2.5 {fromToken}
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleFlip}
                  data-testid="button-flip"
                  className="rounded-full"
                >
                  <ArrowDownUp className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Kapsz (becsült)</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={toAmount}
                    onChange={(e) => setToAmount(e.target.value)}
                    className="flex-1"
                    data-testid="input-to-amount"
                  />
                  <div className="w-24">
                    <select 
                      className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                      value={toToken}
                      onChange={(e) => setToToken(e.target.value)}
                      data-testid="select-to-token"
                    >
                      <option value="ETH">ETH</option>
                      <option value="USDC">USDC</option>
                      <option value="USDT">USDT</option>
                      <option value="DAI">DAI</option>
                    </select>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  1 {fromToken} = 2,450 {toToken}
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Díj</span>
                  <span className="font-medium">0.3%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ár befolyás</span>
                  <span className="font-medium text-green-600">{"<0.01%"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Minimum kapott</span>
                  <span className="font-medium">{toAmount || "0.0"} {toToken}</span>
                </div>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={handleSwap}
                disabled={!fromAmount || parseFloat(fromAmount) <= 0}
                data-testid="button-swap"
              >
                Swap
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">Legutóbbi tranzakciók</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <div className="font-medium">0.5 ETH → 1,225 USDC</div>
                    <div className="text-xs text-muted-foreground">2 órája</div>
                  </div>
                  <div className="text-green-600 font-medium">Sikeres</div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <div className="font-medium">100 USDT → 0.041 ETH</div>
                    <div className="text-xs text-muted-foreground">5 órája</div>
                  </div>
                  <div className="text-green-600 font-medium">Sikeres</div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <div className="font-medium">1.2 ETH → 2,940 USDC</div>
                    <div className="text-xs text-muted-foreground">1 napja</div>
                  </div>
                  <div className="text-green-600 font-medium">Sikeres</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
