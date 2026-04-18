import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useActivityStore } from '@/store/activityStore';
import ActivityCard from '@/components/ActivityCard';

const JoinedActivities = () => {
  const { user } = useAuthStore();
  const { joinedActivities, loading, fetchJoinedActivities } = useActivityStore();

  useEffect(() => {
    if (user) fetchJoinedActivities(user.id);
  }, [user]);

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-bold text-foreground">Joined Activities</h1>
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : joinedActivities.length === 0 ? (
        <p className="text-sm text-muted-foreground">You haven't joined any activities yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {joinedActivities.map((a) => (
            <ActivityCard key={a.id} activity={a} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JoinedActivities;
