import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { themeCategories } from "@/config/themes";

const ThemeSelector = () => {
  const { setTheme, theme: currentTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Temas</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themeCategories.map((category) => (
          <DropdownMenuGroup key={category.name}>
            <DropdownMenuLabel className="text-sm text-muted-foreground">
              {category.name}
            </DropdownMenuLabel>
            {category.themes.map((theme) => (
              <DropdownMenuItem
                key={theme.value}
                onClick={() => setTheme(theme.value)}
                className={currentTheme === theme.value ? "bg-accent" : ""}
              >
                {theme.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;