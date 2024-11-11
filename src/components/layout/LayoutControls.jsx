import { Globe, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ThemeSelector from "./ThemeSelector";
import LogoUploader from "./LogoUploader";

const LayoutControls = ({ 
  isAdmin, 
  isPowerUser, 
  onThemeChange, 
  currentTheme,
  onLogoChange,
  i18n,
  logout 
}) => (
  <div className="fixed bottom-4 right-4 flex gap-2">
    {(isAdmin || isPowerUser) && (
      <>
        <ThemeSelector 
          isAdmin={isAdmin} 
          isPowerUser={isPowerUser} 
          onThemeChange={onThemeChange}
          currentTheme={currentTheme}
        />
        <LogoUploader 
          isAdmin={isAdmin} 
          isPowerUser={isPowerUser} 
          onLogoChange={onLogoChange}
        />
      </>
    )}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-xl shadow-neo-xl transform transition hover:scale-105 hover:shadow-neo-3d bg-gradient-to-br from-muted to-accent/10">
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-xl shadow-neo-xl backdrop-blur-sm bg-background/95">
        <DropdownMenuItem onClick={() => i18n.changeLanguage('pt')}>
          Português
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => i18n.changeLanguage('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => i18n.changeLanguage('es')}>
          Español
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <Button
      variant="outline"
      size="icon"
      onClick={logout}
      className="text-red-500 hover:text-red-700 rounded-xl shadow-neo-xl transform transition hover:scale-105 hover:shadow-neo-3d bg-gradient-to-br from-muted to-accent/10"
    >
      <LogOut className="h-4 w-4" />
    </Button>
  </div>
);

export default LayoutControls;