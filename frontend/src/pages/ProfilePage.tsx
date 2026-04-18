import { useAuthStore } from '@/store/authStore';
import { User, Mail, Shield } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-lg font-bold text-foreground">Profile</h1>
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="font-semibold text-foreground">{user.name}</h2>
            <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Name:</span>
            <span className="text-foreground font-medium">{user.name}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Email:</span>
            <span className="text-foreground font-medium">{user.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Role:</span>
            <span className="text-foreground font-medium capitalize">{user.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
