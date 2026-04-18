import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  subtitle?: string;
  variant?: 'default' | 'success' | 'warning' | 'destructive';
}

const variantStyles = {
  default: 'border-border',
  success: 'border-l-4 border-l-success',
  warning: 'border-l-4 border-l-warning',
  destructive: 'border-l-4 border-l-destructive',
};

const DashboardCard = ({ title, value, icon, subtitle, variant = 'default' }: DashboardCardProps) => {
  return (
    <div className={`bg-card rounded-lg border border-border p-5 ${variantStyles[variant]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="mt-2 text-2xl font-bold text-foreground font-mono">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="text-muted-foreground">{icon}</div>
      </div>
    </div>
  );
};

export default DashboardCard;
