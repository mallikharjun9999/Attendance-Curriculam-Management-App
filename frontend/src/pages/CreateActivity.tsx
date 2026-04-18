import { useState } from 'react';
import { useActivityStore } from '@/store/activityStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CreateActivity = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [activityDate, setActivityDate] = useState('');
  const { createActivity } = useActivityStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createActivity(title, description, activityDate);
      toast.success('Activity created successfully');
      navigate('/activities');
    } catch {
      toast.error('Failed to create activity');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-lg font-bold text-foreground">Create Activity</h1>
      <div className="bg-card rounded-lg border border-border p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-[80px] resize-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">Activity Date</label>
            <input
              type="date"
              value={activityDate}
              onChange={(e) => setActivityDate(e.target.value)}
              className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-9 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Activity'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateActivity;
