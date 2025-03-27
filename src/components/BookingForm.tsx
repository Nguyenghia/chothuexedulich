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
const EMAILJS_SERVICE_ID = "service_xfzrb8j";
const EMAILJS_TEMPLATE_ID = "template_frqnaqs";
const EMAILJS_USER_ID = "mAcEmf5rBB_DTaV_H";

interface FormData {
  name: string;
  gender: string;
  phone: string;
  address: string;
  departureDate: Date | null;
  departureTime: string;
  returnDate: Date | null;
  returnTime: string;
  adults: number;
  children: number;
  carType: string;
  message: string;
  streetAddress: string;
  ward: string;
  district: string;
  city: string;
}

interface LocationData {
  [city: string]: {
    [district: string]: string[];
  };
}

const locationData: LocationData = {
  "TP. Hồ Chí Minh": {
    "Quận 1": [
      "Phường Bến Nghé", "Phường Bến Thành", "Phường Cầu Kho", "Phường Cầu Ông Lãnh",
      "Phường Cô Giang", "Phường Đa Kao", "Phường Nguyễn Cư Trinh", "Phường Nguyễn Thái Bình",
      "Phường Phạm Ngũ Lão", "Phường Tân Định"
    ],
    "Quận 2": [
      "Phường An Khánh", "Phường An Lợi Đông", "Phường An Phú", "Phường Bình An",
      "Phường Bình Khánh", "Phường Bình Trưng Đông", "Phường Bình Trưng Tây", "Phường Cát Lái",
      "Phường Thạnh Mỹ Lợi", "Phường Thảo Điền"
    ],
    "Quận 3": [
      "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7",
      "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14"
    ],
    "Quận 4": [
      "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 6", "Phường 8", "Phường 9",
      "Phường 10", "Phường 13", "Phường 14", "Phường 15", "Phường 16", "Phường 18"
    ],
    "Quận 5": [
      "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7",
      "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14",
      "Phường 15"
    ],
    "Quận 6": [
      "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7",
      "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14"
    ],
    "Quận 7": [
      "Phường Tân Thuận Đông", "Phường Tân Thuận Tây", "Phường Tân Kiểng", "Phường Tân Hưng",
      "Phường Bình Thuận", "Phường Tân Quy", "Phường Phú Thuận", "Phường Tân Phú",
      "Phường Tân Phong", "Phường Phú Mỹ"
    ],
    "Quận 8": [
      "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7",
      "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14",
      "Phường 15", "Phường 16"
    ],
    "Quận 9": [
      "Phường Long Bình", "Phường Long Thạnh Mỹ", "Phường Tân Phú", "Phường Hiệp Phú",
      "Phường Tăng Nhơn Phú A", "Phường Tăng Nhơn Phú B", "Phường Phước Long A", "Phường Phước Long B",
      "Phường Trường Thạnh", "Phường Long Phước", "Phường Long Trường", "Phường Phú Hữu"
    ],
    "Quận 10": [
      "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7",
      "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14",
      "Phường 15"
    ],
    "Quận 11": [
      "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7",
      "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14",
      "Phường 15", "Phường 16"
    ],
    "Quận 12": [
      "Phường Thạnh Xuân", "Phường Thạnh Lộc", "Phường Hiệp Thành", "Phường Thới An",
      "Phường Tân Chánh Hiệp", "Phường An Phú Đông", "Phường Tân Thới Hiệp", "Phường Trung Mỹ Tây",
      "Phường Tân Hưng Thuận", "Phường Đông Hưng Thuận", "Phường Tân Thới Nhất"
    ],
    "Quận Tân Bình": [
      "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7",
      "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14",
      "Phường 15"
    ],
    "Quận Tân Phú": [
      "Phường Tân Sơn Nhì", "Phường Tây Thạnh", "Phường Sơn Kỳ", "Phường Tân Quý",
      "Phường Tân Thành", "Phường Phú Thọ Hoà", "Phường Phú Thạnh", "Phường Phú Trung",
      "Phường Hoà Thạnh", "Phường Hiệp Tân", "Phường Tân Thới Hoà"
    ],
    "Quận Bình Thạnh": [
      "Phường 1", "Phường 2", "Phường 3", "Phường 5", "Phường 6", "Phường 7", "Phường 11",
      "Phường 12", "Phường 13", "Phường 14", "Phường 15", "Phường 17", "Phường 19", "Phường 21",
      "Phường 22", "Phường 24", "Phường 25", "Phường 26", "Phường 27", "Phường 28"
    ],
    "Quận Gò Vấp": [
      "Phường 1", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8",
      "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15",
      "Phường 16", "Phường 17"
    ],
    "Quận Phú Nhuận": [
      "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 7", "Phường 8",
      "Phường 9", "Phường 10", "Phường 11", "Phường 13", "Phường 15", "Phường 17"
    ],
    "Quận Bình Tân": [
      "Phường Bình Hưng Hoà", "Phường Bình Hưng Hoà A", "Phường Bình Hưng Hoà B",
      "Phường Bình Trị Đông", "Phường Bình Trị Đông A", "Phường Bình Trị Đông B",
      "Phường Tân Tạo", "Phường Tân Tạo A", "Phường An Lạc", "Phường An Lạc A"
    ],
    "Huyện Nhà Bè": [
      "Thị trấn Nhà Bè", "Xã Phước Kiển", "Xã Phước Lộc", "Xã Nhơn Đức", "Xã Phú Xuân",
      "Xã Long Thới", "Xã Hiệp Phước"
    ],
    "Huyện Bình Chánh": [
      "Thị trấn Tân Túc", "Xã Phạm Văn Hai", "Xã Vĩnh Lộc A", "Xã Vĩnh Lộc B", "Xã Bình Lợi",
      "Xã Lê Minh Xuân", "Xã Tân Nhựt", "Xã Tân Kiên", "Xã Bình Hưng", "Xã Phong Phú",
      "Xã An Phú Tây", "Xã Hưng Long", "Xã Đa Phước", "Xã Tân Quý Tây", "Xã Bình Chánh",
      "Xã Quy Đức"
    ],
    "Huyện Hóc Môn": [
      "Bà Điểm", "Đông Thạnh", "Hóc Môn (thị trấn)", "Nhị Bình", "Tân Hiệp", "Tân Thới Nhì",
      "Tân Xuân", "Thới Tam Thôn", "Trung Chánh", "Xuân Thới Đông", "Xuân Thới Sơn",
      "Xuân Thới Thượng"
    ],
    "Huyện Củ Chi": [
      "Thị trấn Củ Chi", "Xã Phú Mỹ Hưng", "Xã An Phú", "Xã Trung Lập Thượng", "Xã An Nhơn Tây",
      "Xã Nhuận Đức", "Xã Phạm Văn Cội", "Xã Phú Hòa Đông", "Xã Trung Lập Hạ", "Xã Trung An",
      "Xã Phước Thạnh", "Xã Phước Hiệp", "Xã Tân An Hội", "Xã Phước Vĩnh An", "Xã Thái Mỹ",
      "Xã Tân Thạnh Tây", "Xã Hòa Phú", "Xã Tân Thạnh Đông", "Xã Bình Mỹ", "Xã Tân Phú Trung",
      "Xã Tân Thông Hội"
    ],
    "Huyện Cần Giờ": [
      "Thị trấn Cần Thạnh", "Xã An Thới Đông", "Xã Bình Khánh", "Xã Long Hòa", "Xã Lý Nhơn",
      "Xã Tam Thôn Hiệp", "Xã Thạnh An"
    ],
    "TP. Thủ Đức": [
      "Phường Hiệp Bình Chánh", "Phường Hiệp Bình Phước", "Phường Linh Chiểu", "Phường Linh Tây",
      "Phường Linh Đông", "Phường Bình Chiểu", "Phường Bình Thọ", "Phường Trường Thọ",
      "Phường Long Bình", "Phường Long Thạnh Mỹ", "Phường Tân Phú", "Phường Hiệp Phú",
      "Phường Tăng Nhơn Phú A", "Phường Tăng Nhơn Phú B", "Phường Phước Long A", "Phường Phước Long B"
    ]
  },
  "Bình Dương": {
    "TP. Thủ Dầu Một": [
      "Phường Phú Cường", "Phường Phú Hòa", "Phường Phú Lợi", "Phường Phú Thọ", "Phường Chánh Nghĩa",
      "Phường Định Hòa"
    ],
    "TP. Dĩ An": [
      "Phường Dĩ An", "Phường Tân Bình", "Phường Tân Đông Hiệp", "Phường Bình An", "Phường Bình Thắng"
    ]
  },
  "Đồng Nai": {
    "TP. Biên Hòa": [
      "Phường Trảng Dài", "Phường Tân Phong", "Phường Tân Biên", "Phường Hố Nai", "Phường Tân Hòa",
      "Phường Tân Hiệp"
    ],
    "TP. Long Khánh": [
      "Phường Xuân An", "Phường Xuân Hoà", "Phường Phú Bình", "Phường Bình Lộc", "Phường Bảo Vinh"
    ]
  },
  "Long An": {
    "TP. Tân An": [
      "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7"
    ],
    "Huyện Bến Lức": [
      "Thị trấn Bến Lức", "Xã Thạnh Lợi", "Xã Lương Bình", "Xã Thạnh Hòa"
    ]
  },
  "Tây Ninh": {
    "TP. Tây Ninh": [
      "Phường 1", "Phường 2 gx", "Phường 3", "Phường 4", "Phường Hiệp Ninh", "Phường Ninh Sơn"
    ]
  }
};

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
    message: '',
    streetAddress: '',
    ward: '',
    district: '',
    city: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cities = Object.keys(locationData);

  const getDistricts = (city: string) => city ? Object.keys(locationData[city]) : [];
  const getWards = (city: string, district: string) => city && district ? locationData[city][district] : [];

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCity = e.target.value;
    setFormData(prev => ({ ...prev, city: newCity, district: '', ward: '' }));
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDistrict = e.target.value;
    setFormData(prev => ({ ...prev, district: newDistrict, ward: '' }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value.replace(/[^0-9]/g, '');
    setFormData(prev => ({ ...prev, [name]: numValue }));
  };

  const handleDateSelect = (date: Date | null, field: 'departureDate' | 'returnDate') => {
    if (!date) {
      setFormData(prev => ({ ...prev, [field]: null }));
      return;
    }
    if (isBefore(startOfDay(date), startOfDay(new Date()))) {
      toast.error('Không thể chọn ngày trong quá khứ');
      return;
    }
    if (field === 'returnDate' && formData.departureDate && !isAfter(date, formData.departureDate)) {
      toast.error('Ngày trở về phải sau ngày khởi hành');
      return;
    }
    setFormData(prev => ({ ...prev, [field]: date }));
  };

  const formatDate = (date: Date | null) => date ? format(date, 'dd-MM-yyyy') : '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.streetAddress || !formData.ward || !formData.district || !formData.city || !formData.departureDate || !formData.returnDate) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      toast.error('Số điện thoại phải có 10 chữ số');
      return;
    }
    if (!isAfter(formData.returnDate, formData.departureDate)) {
      toast.error('Ngày trở về phải sau ngày khởi hành');
      return;
    }

    setIsSubmitting(true);
    const fullAddress = `${formData.streetAddress}, ${formData.ward}, ${formData.district}, ${formData.city}`;

    const templateParams = {
      from_name: formData.name,
      tour_name: tourName || 'Custom Tour',
      gender: formData.gender,
      phone: formData.phone,
      street_address: formData.streetAddress,
      ward: formData.ward,
      district: formData.district,
      city: formData.city,
      full_address: fullAddress,
      departure_date: formatDate(formData.departureDate),
      departure_time: formData.departureTime,
      return_date: formatDate(formData.returnDate),
      return_time: formData.returnTime,
      adults: formData.adults,
      children: formData.children,
      car_type: `Xe ${formData.carType} chỗ`,
      message: formData.message,
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_USER_ID)
      .then((response) => {
        console.log('Gửi email thành công', response);
        toast.success('Đã gửi yêu cầu đặt chỗ thành công! Chúng tôi sẽ liên hệ với bạn sớm.');
        onClose();
      })
      .catch((error) => {
        console.error('Lỗi gửi email:', error);
        toast.error('Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau.');
      })
      .finally(() => setIsSubmitting(false));
  };

  if (!isOpen) return null;

  return (
    <div className={cn(
      "fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-2 sm:px-0",
      isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    )}>
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold">Đặt xe</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="min-h-[40px] min-w-[40px] sm:min-h-[48px] sm:min-w-[48px]">
            <X className="h-5 w-5 sm:h-6 w-6" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm sm:text-base">Họ và tên *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Nhập họ và tên"
              className="min-h-[40px] sm:min-h-[48px] text-sm sm:text-base p-2 sm:p-3"
            />
          </div>

          {/* Gender Field */}
          <div className="space-y-2">
            <Label className="text-sm sm:text-base">Giới tính *</Label>
            <RadioGroup
              name="gender"
              value={formData.gender}
              onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
              className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Nam" id="male" />
                <Label htmlFor="male" className="text-sm sm:text-base">Nam</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Nữ" id="female" />
                <Label htmlFor="female" className="text-sm sm:text-base">Nữ</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm sm:text-base">Số điện thoại *</Label>
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
              className="min-h-[40px] sm:min-h-[48px] text-sm sm:text-base p-2 sm:p-3"
            />
          </div>

          {/* Address Field */}
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Label htmlFor="streetAddress" className="text-sm sm:text-base">Số nhà, Đường *</Label>
              <Input
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                required
                placeholder="Nhập số nhà, tên đường"
                className="min-h-[40px] sm:min-h-[48px] text-sm sm:text-base p-2 sm:p-3"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm sm:text-base">Tỉnh/Thành phố *</Label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleCityChange}
                  className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base"
                  required
                >
                  <option value="">Chọn Tỉnh/Thành phố</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="district" className="text-sm sm:text-base">Quận/Huyện *</Label>
                <select
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleDistrictChange}
                  className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base"
                  required
                  disabled={!formData.city}
                >
                  <option value="">Chọn Quận/Huyện</option>
                  {getDistricts(formData.city).map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ward" className="text-sm sm:text-base">Phường/Xã *</Label>
                <select
                  id="ward"
                  name="ward"
                  value={formData.ward}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base"
                  required
                  disabled={!formData.district}
                >
                  <option value="">Chọn Phường/Xã</option>
                  {getWards(formData.city, formData.district).map(ward => (
                    <option key={ward} value={ward}>{ward}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Date and Time Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
            <div className="space-y-2">
              <Label className="text-sm sm:text-base">Ngày khởi hành *</Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal min-h-[40px] sm:min-h-[48px] text-sm sm:text-base",
                        !formData.departureDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
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
                    className="w-full sm:w-[140px] min-h-[40px] sm:min-h-[48px] text-sm sm:text-base"
                  />
                  <Clock className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 h-4 sm:h-5 w-4 sm:w-5 text-gray-500" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm sm:text-base">Ngày trở về *</Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal min-h-[40px] sm:min-h-[48px] text-sm sm:text-base",
                        !formData.returnDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
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
                    className="w-full sm:w-[140px] min-h-[40px] sm:min-h-[48px] text-sm sm:text-base"
                  />
                  <Clock className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 h-4 sm:h-5 w-4 sm:w-5 text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Number of People */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="adults" className="text-sm sm:text-base">Số người lớn</Label>
              <Input
                id="adults"
                name="adults"
                type="number"
                min="1"
                value={formData.adults}
                onChange={handleNumberChange}
                className="min-h-[40px] sm:min-h-[48px] text-sm sm:text-base p-2 sm:p-3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="children" className="text-sm sm:text-base">Số trẻ em</Label>
              <Input
                id="children"
                name="children"
                type="number"
                min="0"
                value={formData.children}
                onChange={handleNumberChange}
                className="min-h-[40px] sm:min-h-[48px] text-sm sm:text-base p-2 sm:p-3"
              />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <p className="text-xs sm:text-sm text-gray-600">
                Tổng số người: {Number(formData.adults) + Number(formData.children)} người
              </p>
            </div>
          </div>

          {/* Car Type */}
          <div className="space-y-2">
            <Label htmlFor="carType" className="text-sm sm:text-base">Loại xe</Label>
            <select
              id="carType"
              name="carType"
              value={formData.carType}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base"
            >
              <option value="4">Xe 4 chỗ</option>
              <option value="7">Xe 7 chỗ</option>
              <option value="16">Xe 16 chỗ</option>
              <option value="29">Xe 29 chỗ</option>
              <option value="45">Xe 45 chỗ</option>
            </select>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-2 space-y-1 sm:space-y-0">
              <p className="text-xs sm:text-sm text-gray-600">
                Số chỗ ngồi: {formData.carType} chỗ
              </p>
              {Number(formData.adults) + Number(formData.children) > Number(formData.carType) && (
                <p className="text-xs sm:text-sm text-red-500">
                  ⚠️ Vượt quá số chỗ cho phép
                </p>
              )}
            </div>
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm sm:text-base">Đặt xe đi đâu</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Nhập thông tin chi tiết về chuyến đi của bạn"
              rows={3}
              className="min-h-[80px] sm:min-h-[100px] text-sm sm:text-base p-2 sm:p-3"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full min-h-[40px] sm:min-h-[48px] text-sm sm:text-base"
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