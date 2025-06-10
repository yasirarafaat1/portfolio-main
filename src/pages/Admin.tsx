import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  Timestamp, 
  onSnapshot,
  serverTimestamp,
  getDoc,
  setDoc
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { Loader2 } from 'lucide-react';

type Submission = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'read' | 'unread';
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export default function Admin() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const { signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubmissions();
    // Set up real-time listener
    const unsubscribe = setupRealtimeListener();
    return () => unsubscribe();
  }, []);

  const setupRealtimeListener = useCallback(() => {
    try {
      const submissionsRef = collection(db, 'contactSubmissions');
      const q = query(submissionsRef, orderBy('createdAt', 'desc'));
      
      // Return the unsubscribe function
      return onSnapshot(q, 
        (snapshot) => {
          const updatedSubmissions = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.name || 'Unknown',
              email: data.email || 'No email',
              message: data.message || 'No message',
              status: data.status || 'unread',
              createdAt: data.createdAt || serverTimestamp(),
              updatedAt: data.updatedAt || serverTimestamp()
            } as Submission;
          });
          
          setSubmissions(updatedSubmissions);
          setLoading(false);
        },
        (error) => {
          console.error('Error in real-time listener:', error);
          setLoading(false);
          
          // Check for permission denied error
          if (error.code === 'permission-denied') {
            toast({
              title: 'Permission Denied',
              description: 'You do not have permission to view submissions.',
              variant: 'destructive',
            });
            signOut();
            navigate('/admin/login');
            return;
          }
          
          toast({
            title: 'Connection Error',
            description: 'There was an issue with the real-time updates. Refreshing in 5 seconds...',
            variant: 'destructive',
          });
          
          // Attempt to reconnect after a delay
          const timeoutId = setTimeout(fetchSubmissions, 5000);
          return () => clearTimeout(timeoutId);
        }
      );
    } catch (error) {
      console.error('Error setting up real-time listener:', error);
      setLoading(false);
      return () => {}; // Return empty cleanup function
    }
  }, [navigate, signOut, toast]);

  const fetchSubmissions = useCallback(async () => {
    try {
      setLoading(true);
      const submissionsRef = collection(db, 'contactSubmissions');
      const q = query(
        submissionsRef,
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const submissionsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || 'Unknown',
          email: data.email || 'No email',
          message: data.message || 'No message',
          status: data.status || 'unread',
          createdAt: data.createdAt || serverTimestamp(),
          updatedAt: data.updatedAt || serverTimestamp()
        } as Submission;
      });
      
      setSubmissions(submissionsData);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      
      if (error.code === 'permission-denied') {
        toast({
          title: 'Permission Denied',
          description: 'You do not have permission to view submissions.',
          variant: 'destructive',
        });
        signOut();
        navigate('/admin/login');
        return;
      }
      
      toast({
        title: 'Error',
        description: 'Failed to load submissions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [navigate, signOut, toast]);

  const markAsRead = async (id: string) => {
    try {
      const submissionRef = doc(db, 'contactSubmissions', id);
      await updateDoc(submissionRef, {
        status: 'read',
        updatedAt: serverTimestamp()
      });

      toast({
        title: 'Success',
        description: 'Submission marked as read.',
      });

      setSubmissions(prev =>
        prev.map(sub =>
          sub.id === id ? { ...sub, status: 'read' as const } : sub
        )
      );
    } catch (error) {
      console.error('Error updating submission:', error);
      toast({
        title: 'Error',
        description: 'Failed to mark as read. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) return;
    
    try {
      await deleteDoc(doc(db, 'contactSubmissions', id));
      
      setSubmissions(prev => prev.filter(sub => sub.id !== id));
      
      toast({
        title: 'Success',
        description: 'Submission deleted successfully.',
      });
    } catch (error) {
      console.error('Error deleting submission:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete submission. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (date: Timestamp) => {
    return format(date.toDate(), 'MMM d, yyyy h:mm a');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Contact Form Submissions</h1>
        <p className="text-muted-foreground">
          View and manage all contact form submissions
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Submissions</CardTitle>
            <Button 
              onClick={fetchSubmissions} 
              variant="outline"
              disabled={loading}
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No submissions found
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((submission) => (
                    <TableRow 
                      key={submission.id} 
                      className={submission.status === 'unread' ? 'bg-muted/50' : ''}
                    >
                      <TableCell className="whitespace-nowrap">
                        {formatDate(submission.createdAt)}
                      </TableCell>
                      <TableCell className="font-medium">{submission.name}</TableCell>
                      <TableCell>
                        <a 
                          href={`mailto:${submission.email}`}
                          className="text-primary hover:underline"
                        >
                          {submission.email}
                        </a>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        <div className="truncate" title={submission.message}>
                          {submission.message}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          submission.status === 'unread' 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {submission.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        {submission.status === 'unread' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => markAsRead(submission.id)}
                          >
                            Mark as Read
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-destructive border-destructive hover:bg-destructive/10"
                          onClick={() => deleteSubmission(submission.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
