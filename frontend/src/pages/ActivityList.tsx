import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useActivityStore } from '@/store/activityStore';
import ActivityCard from '@/components/ActivityCard';
import { toast } from 'sonner';

const ActivityList = () => {
  const { user } = useAuthStore();
  const { activities, joinedActivities, loading, fetchActivities, fetchJoinedActivities, joinActivity } = useActivityStore();

  useEffect(() => {
    fetchActivities();
    if (user?.role === 'student') {
      fetchJoinedActivities(user.id);
    }
  }, [user]);

  const isJoined = (activityId: number) =>
    joinedActivities.some((a) => a.id === activityId);

  const handleJoin = async (activityId: number) => {
    if (!user) return;
    try {
      await joinActivity(activityId, user.id);
      toast.success('Joined activity successfully');
      fetchJoinedActivities(user.id);
    } catch {
      toast.error('Failed to join activity');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-bold text-foreground">Activities</h1>
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : activities.length === 0 ? (
        <p className="text-sm text-muted-foreground">No activities available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activities.map((a) => (
            <ActivityCard
              key={a.id}
              activity={a}
              action={
                user?.role === 'student' ? (
                  isJoined(a.id) ? (
                    <span className="text-xs text-success font-medium">Joined</span>
                  ) : (
                    <button
                      onClick={() => handleJoin(a.id)}
                      className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded-md font-medium hover:opacity-90 transition-opacity"
                    >
                      Join
                    </button>
                  )
                ) : null
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityList;
