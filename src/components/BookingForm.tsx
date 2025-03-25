
import { useState } from 'react';
import { toast } from 'sonner';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import emailjs from 'emailjs-com';

interface BookingFormProps {
  tourName?: string;
  isOpen: boolean;
  onClose: () => void;
}

// EmailJS configuration
const EMAILJS_SERVICE_ID = "service_xfzrb8j"; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = "template_frqnaqs"; // Replace with your EmailJS template ID
const EMAILJS_USER_ID = "mAcEmf5rBB_DTaV_H"; // Replace with your EmailJS user ID

const BookingForm = ({ tourName = '', isOpen, onClose }: BookingFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'Nam',
    phone: '',
    address: '',
    departureDate: null as Date | null,
    returnDate: null as Date | null,
    adults: 1,
    children: 0,
    carType: '4',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value) || 0;
    setFormData(prev => ({ ...prev, [name]: numValue }));
  };

  const handleDateSelect = (date: Date | null, field: 'departureDate' | 'returnDate') => {
    setFormData(prev => ({ ...prev, [field]: date }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.phone || !formData.address || !formData.departureDate || !formData.returnDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Prepare the template parameters
    const templateParams = {
      from_name: formData.name,
      tour_name: tourName || 'Custom Tour',
      gender: formData.gender,
      phone: formData.phone,
      address: formData.address,
      departure_date: formData.departureDate ? format(formData.departureDate, 'PPP') : '',
      return_date: formData.returnDate ? format(formData.returnDate, 'PPP') : '',
      adults: formData.adults,
      children: formData.children,
      car_type: formData.carType,
      message: formData.message,
    };

    // Send email using EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_USER_ID)
      .then((response) => {
        console.log('Gửi email thành công', response);
        toast.success('Đã gửi yêu cầu đặt chỗ thành công! Chúng tôi sẽ liên hệ với bạn sớm.');
        
        // Close the form
        onClose();
        
        // Reset form
        setFormData({
          name: '',
          gender: 'Nam',
          phone: '',
          address: '',
          departureDate: null,
          returnDate: null,
          adults: 1,
          children: 0,
          carType: '4',
          message: ''
        });
      })
      .catch((error) => {
        console.error('Lỗi gửi email:', error);
        toast.error('Có lỗi khi gửi biểu mẫu. Vui lòng thử lại hoặc liên hệ trực tiếp với chúng tôi.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="p-6 bg-primary/5 border-b flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {tourName ? `Book Tour: ${tourName}` : 'Đặt Xe'}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên <span className="text-red-500">*</span></Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Điền tên của bạn"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Giới tính <span className="text-red-500">*</span></Label>
              <RadioGroup 
                value={formData.gender}
                onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                className="flex space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Nam" id="male" />
                  <Label htmlFor="Nam">Nam</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Nữ" id="female" />
                  <Label htmlFor="Nữ">Nữ</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Số Điện Thoại <span className="text-red-500">*</span></Label>
              <Input 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="Điền số điện thoại của bạn"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Địa chỉ <span className="text-red-500">*</span></Label>
              <Input 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                placeholder="Điền địa chỉ của bạn"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Ngày đi <span className="text-red-500">*</span></Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.departureDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.departureDate ? format(formData.departureDate, "PPP") : "Select departure date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.departureDate || undefined}
                    onSelect={(date) => handleDateSelect(date, 'departureDate')}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>Ngày về <span className="text-red-500">*</span></Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.returnDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.returnDate ? format(formData.returnDate, "PPP") : "Select return date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.returnDate || undefined}
                    onSelect={(date) => handleDateSelect(date, 'returnDate')}
                    initialFocus
                    disabled={(date) => date < (formData.departureDate || new Date())}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>Số lượng hành khách</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="adults" className="text-sm text-muted-foreground">Người lớn</Label>
                  <Input 
                    id="adults" 
                    name="adults" 
                    type="number" 
                    min="1"
                    value={formData.adults} 
                    onChange={handleNumberChange}
                  />
                </div>
                <div>
                  <Label htmlFor="children" className="text-sm text-muted-foreground">Trẻ em</Label>
                  <Input 
                    id="children" 
                    name="children" 
                    type="number"
                    min="0" 
                    value={formData.children} 
                    onChange={handleNumberChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="carType">Loại xe</Label>
              <select
                id="carType"
                name="carType"
                value={formData.carType}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="4">4 chỗ</option>
                <option value="7">7 chỗ</option>
                <option value="16">16 chỗ</option>
                <option value="29">29 chỗ</option>
                <option value="45">45 chỗ</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Đặt xe đi đâu</Label>
            <Textarea 
              id="message" 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              placeholder="Nhập thông tin chi tiết về chuyến đi của bạn"
              rows={3}
            />
          </div>
          
          <div className="pt-2 flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Booking'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
