
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useVisitorStore } from '@/lib/visitorStore';

export function Subscribe() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { addSubscriber } = useVisitorStore();
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      const result = addSubscriber(email);
      
      toast({
        title: result.success ? 'Success!' : 'Subscription Failed',
        description: result.message,
        variant: result.success ? 'default' : 'destructive',
      });
      
      if (result.success) {
        setEmail('');
      }
      
      setIsSubmitting(false);
    }, 800);
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium">Subscribe to our Newsletter</h3>
        <p className="text-sm text-muted-foreground">
          Get the latest posts delivered right to your inbox
        </p>
      </div>
      
      <form onSubmit={handleSubscribe} className="flex gap-2">
        <div className="flex-1 relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-10"
          />
        </div>
        <Button type="submit" disabled={isSubmitting} className="dark:glow-btn">
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 border-2 border-current border-t-transparent animate-spin rounded-full mr-2"></div>
              Subscribing...
            </>
          ) : (
            'Subscribe'
          )}
        </Button>
      </form>
    </div>
  );
}
