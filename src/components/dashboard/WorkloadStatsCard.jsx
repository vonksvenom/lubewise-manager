import { Card } from "@/components/ui/card";

export const WorkloadStatsCard = ({ icon: Icon, title, value, color, onClick }) => {
  const bgColorClass = `bg-${color}-500/10`;
  const textColorClass = `text-${color}-500`;

  return (
    <div 
      className={`flex items-center gap-4 ${onClick ? 'cursor-pointer hover:bg-accent/5 p-2 rounded-lg transition-colors' : ''}`}
      onClick={onClick}
    >
      <div className={`p-3 ${bgColorClass} rounded-lg`}>
        <Icon className={`h-6 w-6 ${textColorClass}`} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className={`text-2xl font-bold ${textColorClass}`}>{value}</p>
      </div>
    </div>
  );
};