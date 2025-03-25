import { useState } from 'react';
import { toast } from 'sonner';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CalendarIcon, X, Clock } from 'lucide-react';
import { format, isBefore, startOfDay, isAfter } from 'date-fns';
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
    departureTime: '08:00',
    returnDate: null as Date | null,
    returnTime: '17:00',
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
    // Chỉ cho phép nhập số
    const numValue = value.replace(/[^0-9]/g, '');
    setFormData(prev => ({ ...prev, [name]: numValue }));
  };

  const handleDateSelect = (date: Date | null, field: 'departureDate' | 'returnDate') => {
    if (!date) {
      setFormData(prev => ({ ...prev, [field]: null }));
      return;
    }

    // Kiểm tra ngày có phải là ngày trong quá khứ không
    if (isBefore(startOfDay(date), startOfDay(new Date()))) {
      toast.error('Không thể chọn ngày trong quá khứ');
      return;
    }

    // Nếu là ngày trở về, kiểm tra phải sau ngày khởi hành
    if (field === 'returnDate' && formData.departureDate) {
      if (!isAfter(date, formData.departureDate)) {
        toast.error('Ngày trở về phải sau ngày khởi hành');
        return;
      }
    }

    setFormData(prev => ({ ...prev, [field]: date }));
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return format(date, 'dd-MM-yyyy');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.phone || !formData.address || !formData.departureDate || !formData.returnDate) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    // Validate phone number
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      toast.error('Số điện thoại phải có 10 chữ số');
      return;
    }

    // Validate dates
    if (!isAfter(formData.returnDate, formData.departureDate)) {
      toast.error('Ngày trở về phải sau ngày khởi hành');
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
      departure_date: formatDate(formData.departureDate),
      departure_time: formData.departureTime,
      return_date: formatDate(formData.returnDate),
      return_time: formData.returnTime,
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
          departureTime: '08:00',
          returnDate: null,
          returnTime: '17:00',
          adults: 1,
          children: 0,
          carType: '4',
          message: ''
        });
      })
      .catch((error) => {
        console.error('Lỗi gửi email:', error);
        toast.error('Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (!isOpen) return null;

  return (
    <div className={cn(
      "fixed inset-0 bg-black/50 z-50 flex items-center justify-center",
      isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    )}>
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Đặt xe</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Họ và tên *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Nhập họ và tên"
            />
          </div>

          {/* Gender Field */}
          <div className="space-y-2">
            <Label>Giới tính *</Label>
            <RadioGroup
              name="gender"
              value={formData.gender}
              onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Nam" id="male" />
                <Label htmlFor="male">Nam</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Nữ" id="female" />
                <Label htmlFor="female">Nữ</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              pattern="[0-9]*"
              inputMode="numeric"
              maxLength={10}
              value={formData.phone}
              onChange={handleNumberChange}
              required
              placeholder="Nhập số điện thoại"
            />
          </div>

          {/* Address Field */}
          <div className="space-y-2">
            <Label htmlFor="address">Địa chỉ *</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Nhập địa chỉ đón khách"
            />
          </div>

          {/* Date and Time Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Ngày khởi hành *</Label>
              <div className="flex gap-2">
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
                      {formData.departureDate ? formatDate(formData.departureDate) : "Chọn ngày"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.departureDate}
                      onSelect={(date) => handleDateSelect(date, 'departureDate')}
                      initialFocus
                      disabled={(date) => isBefore(startOfDay(date), startOfDay(new Date()))}
                      fromDate={new Date()}
                    />
                  </PopoverContent>
                </Popover>
                <div className="relative">
                  <Input
                    type="time"
                    value={formData.departureTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, departureTime: e.target.value }))}
                    className="w-[120px]"
                  />
                  <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Ngày trở về *</Label>
              <div className="flex gap-2">
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
                      {formData.returnDate ? formatDate(formData.returnDate) : "Chọn ngày"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.returnDate}
                      onSelect={(date) => handleDateSelect(date, 'returnDate')}
                      initialFocus
                      disabled={(date) => 
                        isBefore(startOfDay(date), startOfDay(new Date())) || 
                        (formData.departureDate && !isAfter(date, formData.departureDate))
                      }
                      fromDate={formData.departureDate || new Date()}
                    />
                  </PopoverContent>
                </Popover>
                <div className="relative">
                  <Input
                    type="time"
                    value={formData.returnTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, returnTime: e.target.value }))}
                    className="w-[120px]"
                  />
                  <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Number of People */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="adults">Số người lớn</Label>
              <Input
                id="adults"
                name="adults"
                type="number"
                min="1"
                value={formData.adults}
                onChange={handleNumberChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="children">Số trẻ em</Label>
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

          {/* Car Type */}
          <div className="space-y-2">
            <Label htmlFor="carType">Loại xe</Label>
            <select
              id="carType"
              name="carType"
              value={formData.carType}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="4">Xe 4 chỗ</option>
              <option value="7">Xe 7 chỗ</option>
              <option value="16">Xe 16 chỗ</option>
              <option value="29">Xe 29 chỗ</option>
              <option value="45">Xe 45 chỗ</option>
            </select>
          </div>

          {/* Message Field */}
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

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
