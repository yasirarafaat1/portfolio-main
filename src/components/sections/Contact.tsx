import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { toast } = useToast();
  interface FormData {
    name: string;
    email: string;
    message: string;
  }

  interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
  }

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Add a timestamp before sending to Firestore
      const submissionData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        message: formData.message.trim(),
        status: 'unread',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, 'contactSubmissions'), submissionData);
      console.log('Document written with ID: ', docRef.id);
      
      toast({
        title: 'Success!',
        description: 'Your message has been sent successfully.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setFormErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // More detailed error handling
      let errorMessage = 'Failed to send message. Please try again later.';
      
      if (error.code) {
        switch (error.code) {
          case 'permission-denied':
            errorMessage = 'Permission denied. Please sign in to submit the form.';
            break;
          case 'unavailable':
            errorMessage = 'Network error. Please check your connection and try again.';
            break;
          case 'invalid-argument':
            errorMessage = 'Invalid data. Please check your input and try again.';
            break;
          default:
            errorMessage = `Error: ${error.message || 'Unknown error occurred'}`;
        }
      }
      
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Type guard to ensure name is a key of FormData
    if (name in formData) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Clear error when user starts typing
      if (formErrors[name as keyof FormErrors]) {
        setFormErrors(prev => {
          const newErrors = { ...prev };
          if (name === 'name' || name === 'email' || name === 'message') {
            delete newErrors[name];
          }
          return newErrors;
        });
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Get In Touch
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Let's work together to bring your ideas to life
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div variants={itemVariants} className="space-y-6">
              <Card className="glass-card p-6 hover:glow-effect transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-6 text-primary">
                  Let's Connect
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:mailforyasir@gmail.com" className="text-foreground/70 hover:text-primary transition-colors">
                        mailforyasir@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:+917905325078" className="text-foreground/70 hover:text-primary transition-colors">
                        +91 7905 3250 78
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-foreground/70">Farrukhabad, U.P., India 209749</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="glass-card p-6 hover:glow-effect transition-all duration-300">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="glass-card border-0 focus:ring-2 focus:ring-primary"
                    />
                    {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="glass-card border-0 focus:ring-2 focus:ring-primary"
                    />
                    {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="glass-card border-0 focus:ring-2 focus:ring-primary resize-none"
                    />
                    {formErrors.message && <p className="text-red-500">{formErrors.message}</p>}
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="w-full glass-card hover:glow-effect transition-all duration-300"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
