
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Initialize form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  // Form submission handler
  const onSubmit = (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', data);
      setIsSubmitting(false);
      
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you shortly.",
      });
      
      form.reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Liên hệ</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hãy liên hệ với chúng tôi nếu bạn cần hỗ trợ, có yêu cầu đặc biệt hoặc cần tư vấn về hành trình du lịch.
              Bạn có thắc mắc về các gói tour du lịch hoặc dịch vụ cho thuê xe của chúng tôi không? 
              Đội ngũ của chúng tôi sẵn sàng hỗ trợ bạn với bất kỳ thắc mắc hoặc yêu cầu đặc biệt nào. Hãy liên hệ với chúng tôi thông qua bất kỳ kênh nào sau đây.
            </p>
          </div>
        </section>
        
        {/* Contact Info & Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8 animate-slide-up">
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Liên lạc</h2>
                  <p className="text-muted-foreground mb-8">
                  Đội ngũ hỗ trợ khách hàng tận tâm của chúng tôi luôn sẵn sàng hỗ trợ bạn với bất kỳ
                  câu hỏi, yêu cầu đặc biệt hoặc nhu cầu lập kế hoạch du lịch nào. Hãy liên hệ với chúng tôi
                  thông qua bất kỳ kênh nào sau đây.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Địa chỉ văn phòng</h3>
                      <p className="text-muted-foreground">
                        123 Travel Street, District 1, Ho Chi Minh City, Vietnam
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Số điện thoại</h3>
                      <p className="text-muted-foreground">+84 123 456 789</p>
                      <p className="text-muted-foreground">+84 987 654 321</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Địa chỉ email</h3>
                      <p className="text-muted-foreground">info@travelwheels.com</p>
                      <p className="text-muted-foreground">support@travelwheels.com</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Giờ làm việc</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 5:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="bg-white rounded-lg shadow-sm border p-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
                <h2 className="text-2xl font-semibold mb-6">Gửi tin nhắn cho chúng tôi</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tên</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Địa chỉ email</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Số điện thoại</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Đặt xe đi đâu</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please write your message here..." 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full btn-hover" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Gửi tin nhắn'}
                      {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            <div className="bg-gray-100 rounded-lg overflow-hidden h-[400px] animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <p className="text-muted-foreground text-center p-6">
                  Interactive map would be displayed here. <br />
                  For integration, use Google Maps or similar map services.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
