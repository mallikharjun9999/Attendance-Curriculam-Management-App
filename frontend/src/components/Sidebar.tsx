import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  User,
  GraduationCap,
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuthStore();
  const location = useLocation();
  const role = user?.role;

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', roles: ['student', 'teacher'] },
    { label: 'Students', icon: Users, path: '/students', roles: ['teacher'] },
    { label: 'Activities', icon: BookOpen, path: '/activities', roles: ['student', 'teacher'] },
    { label: 'Profile', icon: User, path: '/profile', roles: ['student', 'teacher'] },
  ];

  const filtered = menuItems.filter((item) => role && item.roles.includes(role));

  return (
    <aside className="w-60 min-h-screen bg-card border-r border-border flex flex-col">
      <div className="h-16 flex items-center gap-2 px-6 border-b border-border">
        <GraduationCap className="h-6 w-6 text-primary" />
        <span className="font-semibold text-foreground text-sm tracking-tight">SmartCurriculum</span>
      </div>
      <nav className="flex-1 py-4 px-3 space-y-1">
        {filtered.map((item) => {
          const active = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
