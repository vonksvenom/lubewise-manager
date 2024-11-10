import { Button } from "../ui/button";
import { Palette } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { themes } from "@/config/themes";
import { toast } from "sonner";

const ThemeSelector = ({ isAdmin, isPowerUser, onThemeChange, currentTheme }) => {
  const handleThemeChange = (theme) => {
    if (isAdmin() || isPowerUser()) {
      onThemeChange(theme);
    } else {
      toast.error("Apenas administradores podem alterar o tema!");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl shadow-lg transform transition hover:scale-105 hover:shadow-xl bg-gradient-to-br from-muted to-accent/10"
        >
          <Palette className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-xl shadow-lg backdrop-blur-sm bg-background/95">
        {Object.entries(themes).map(([key, theme]) => (
          <DropdownMenuItem 
            key={key} 
            onClick={() => handleThemeChange(key)}
            className={currentTheme === key ? "bg-accent" : ""}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: theme.colors.primary }}
              />
              {theme.name}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;