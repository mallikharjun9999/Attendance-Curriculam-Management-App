import { CalendarDays } from 'lucide-react';

interface Activity {
  id: number;
  title: string;
  description: string;
  activity_date: string;
}

interface ActivityCardProps {
  activity: Activity;
  action?: React.ReactNode;
}

const ActivityCard = ({ activity, action }: ActivityCardProps) => {
  return (
    <div className="bg-card rounded-lg border border-border p-5">
      <h3 className="font-semibold text-foreground text-sm">{activity.title}</h3>
      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{activity.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <CalendarDays className="h-3.5 w-3.5" />
          {activity.activity_date}
        </div>
        {action}
      </div>
    </div>
  );
};

export default ActivityCard;
