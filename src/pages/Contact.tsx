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
import emailjs from '@emailjs/browser';

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
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        message: data.message,
        email: data.email,
      };

      await emailjs.send(
        'service_okybtpc', // Thay thế bằng Service ID của bạn
        'template_frqnaqs', // Thay thế bằng Template ID của bạn
        templateParams,
        'mAcEmf5rBB_DTaV_H' // Thay thế bằng Public Key của bạn
      );

      toast({
        title: "Gửi tin nhắn thành công",
        description: "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.",
      });
      
      form.reset();
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                      <a className="text-muted-foreground" href="https://maps.app.goo.gl/hHZjqkV4w7aVTRNm9" target="_blank">
                        C.C Hoàng Anh Thanh Bình, 2 Đường D4, Phường Tân Hưng, Quận 7, TP.HCM
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Số điện thoại</h3>
                      <p className="text-muted-foreground">
                          <a href="tel:+84983644335">+84 983 644 335 (Anh Sương)</a> 
                      </p>
                      <p className="text-muted-foreground">
                          <a href="tel:+84909934335">+84 909 934 335 (Anh Sương)</a> 
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Địa chỉ email</h3>
                      <p className="text-muted-foreground">
                        <a href="mailto:ducnghianguyen3004@gmail.com">ducnghianguyen3004@gmail.com</a>
                      </p>
                      <p className="text-muted-foreground"></p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Giờ làm việc</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>Thứ 2 - Thứ 6: 8:00 AM - 6:00 PM</p>
                    <p>Thứ 7: 9:00 AM - 5:00 PM</p>
                    <p>Chủ nhật: Đóng cửa</p>
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
                            <Input placeholder="Nhập tên của bạn" {...field} />
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
                              <Input placeholder="Nhập email của bạn" {...field} />
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
                              <Input placeholder="Nhập số điện thoại của bạn" {...field} />
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
                              placeholder="Nhập nội dung tin nhắn của bạn.." 
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
    <div className="bg-gray-100 rounded-lg overflow-hidden h-[400px] animate-slide-up" style={{ animationDelay: "200ms" }}>
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.8604772499557!2d106.69654307480442!3d10.745234689401613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9a36aab581%3A0x4f97b8b0d5574120!2zQ2h1bmcgY8awIEhvw6BuZyBBbmggVGhhbmggQsOsbmg!5e0!3m2!1svi!2s!4v1742874440009!5m2!1svi!2s"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
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
