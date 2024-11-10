import { Card } from "@/components/ui/card";

export const DashboardCard = ({ children, title }) => {
  return (
    <Card className="p-6 shadow-neo bg-gradient-to-br from-muted/95 to-accent/95 backdrop-blur-sm border-none transition-transform hover:scale-[1.02] hover:shadow-neo-hover">
      {title && (
        <h2 className="text-xl font-semibold mb-4 text-catYellow">{title}</h2>
      )}
      {children}
    </Card>
  );
};