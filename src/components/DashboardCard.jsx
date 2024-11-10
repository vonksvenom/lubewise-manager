import { Card } from "@/components/ui/card";

export const DashboardCard = ({ children, title }) => {
  return (
    <Card className="p-6 shadow-neo bg-gradient-to-br from-muted to-accent/10 backdrop-blur-sm border-none transition-transform hover:scale-[1.02]">
      {title && (
        <h2 className="text-xl font-semibold mb-4 text-catYellow">{title}</h2>
      )}
      {children}
    </Card>
  );
};