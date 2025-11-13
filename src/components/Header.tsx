import { Trophy, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import walletIcon from "@assets/pngtree-futuristic-wallet-icon-with-neon-blue-lighting-png-image_15938082_1763018361451.png";

interface HeaderProps {
  userName?: string;
  userPoints?: number;
  userAvatar?: string;
  onMenuClick?: () => void;
}

export default function Header({ userName = "Guest", userPoints = 0, userAvatar, onMenuClick }: HeaderProps) {
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Button
            size="icon"
            variant="ghost"
            onClick={onMenuClick}
            data-testid="button-menu"
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>CatKitSune</h1>
        </div>

        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="gap-1.5 px-3" data-testid="badge-points">
            <Trophy className="h-3.5 w-3.5" />
            <span className="font-semibold">{userPoints.toLocaleString()}</span>
          </Badge>
          <img src={walletIcon} alt="Wallet" className="h-9 w-9" />
        </div>
      </div>
    </header>
  );
}
