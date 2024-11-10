import { Card } from "@/components/ui/card";

export const DashboardCard = ({ children, title }) => {
  return (
    <Card className="p-6 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] bg-gradient-to-br from-muted to-accent/10 backdrop-blur-sm border-none transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_30px_60px_rgba(8,_112,_184,_0.8)]">
      {title && (
        <h2 className="text-xl font-semibold mb-4 text-catYellow">{title}</h2>
      )}
      {children}
    </Card>
  );
};