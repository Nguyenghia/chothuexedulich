
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Calendar, Star, Clock, Users, Car, List, CheckCircle, ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';

// Tours data
const toursData = {
  'vung-tau': {
    name: 'Vũng Tàu',
    images: [
      'https://media.istockphoto.com/id/1864669952/vi/anh/nh%C3%ACn-t%E1%BB%AB-tr%C3%AAn-kh%C3%B4ng-th%C3%A0nh-ph%E1%BB%91-v%C5%A9ng-t%C3%A0u-vi%E1%BB%87t-nam-to%C3%A0n-c%E1%BA%A3nh-th%C3%A0nh-ph%E1%BB%91-bi%E1%BB%83n-y%C3%AAn-b%C3%ACnh-v%C3%A0-xinh-%C4%91%E1%BA%B9p.jpg?s=612x612&w=0&k=20&c=cLH08PwHVeTsH6g2WP8pWY-sm9OhBDUDWT_9_6ceH0o=',
      'https://media.istockphoto.com/id/1858701564/vi/anh/th%C3%A0nh-ph%E1%BB%91-v%C3%A0-b%E1%BB%9D-bi%E1%BB%83n-v%C5%A9ng-t%C3%A0u-vi%E1%BB%87t-nam.jpg?s=612x612&w=0&k=20&c=vHpjAwDC8schol6rWByz2UcmCbEqNP_TOjylRyimQJQ=',
      'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQvL8rp8-JFaWvTwhXGdJtGq8sVqlkK0xtn9gleiTjvxXNLp2gUAWVp_fV7kB2A5lJVEMqMpmBwztoIAip4FYblN1878LFkEJiC_4vmttA',
    ],
    location: 'Vũng Tàu',
    duration: '2 ngày 1 đêm',
    price: '3,000,000đ',
    rating: 4.8,
    description: "Hãy đến thành phố biển xinh đẹp Vũng Tàu để tận hưởng kỳ nghỉ thư giãn trên bãi biển. Tận hưởng những bãi biển nguyên sơ, hải sản ngon và quang cảnh đại dương ngoạn mục. Tour này bao gồm phương tiện di chuyển thoải mái, chỗ ở chất lượng và các hoạt động có hướng dẫn cho một kỳ nghỉ cuối tuần hoàn hảo.",
    highlights: [
      "Thư giãn tại Bãi Trước và Bãi Sau nguyên sơ",
      "Thăm tượng Chúa Ki-tô Vua",
      "Khám phá ngọn hải đăng lịch sử Vũng Tàu",
      "Thưởng thức hải sản tươi ngon tại nhà hàng địa phương",
      "Phương tiện di chuyển thoải mái từ TP. Hồ Chí Minh"
    ],
  },
  'nha-trang': {
    name: 'Nha Trang ',
    images: [
      'https://images.unsplash.com/photo-1617857995575-d102f16fd3e7?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1533002832-1721d16b4bb9?q=80&w=1578&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1527241868-2a14a600b05c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    location: 'Nha Trang',
    duration: '3 ngày 2 đêm',
    price: '6,500,000đ',
    rating: 4.9,
    description: "Trải nghiệm thiên đường nhiệt đới Nha Trang với nước biển trong xanh, bãi biển cát trắng và đời sống biển phong phú. Gói tour toàn diện này bao gồm thăm quan các hòn đảo, cơ hội lặn biển và trải nghiệm văn hóa tại một trong những điểm đến biển hàng đầu của Việt Nam.",
    highlights: [
      "Tour khám phá hòn đảo Nha Trang",
      "Lặn biển khám phá rạn san hô và đời sống biển",
      "Thăm tháp Po Nagar của văn hóa Chăm",
      "Thư giãn tại khu nghỉ dưỡng Tháp Bà và bùn khoáng",
      "Chỗ ở thoải mái với tiện nghi truy cập biển"
    ],
  },
  'da-lat': {
    name: 'Đà Lạt',
    images: [
      'https://images.unsplash.com/photo-1626608017817-211d7c48177d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    ],
    location: 'Đà Lạt',
    duration: '4 ngày 3 đêm',
    price: '7,000,000đ',
    rating: 4.7,
    description: "Khám phá vẻ đẹp của Đà Lạt, được biết đến với cái tên 'Thành phố Mùa Xuân Vĩnh Cửu'. Nằm ở trung tâm cao nguyên của Việt Nam, tour này đưa bạn qua những ngọn núi sương mù, rừng thông, hồ nước tuyệt đẹp và vườn hoa rực rỡ. Trải nghiệm khí hậu độc đáo và kiến trúc châu Âu ảnh hưởng của điểm đến hấp dẫn này.",
    highlights: [
      "Thăm thác nước Đatanla tuyệt đẹp",
      "Khám phá hồ Tuyền Lâm lãng mạng",
      "Tour vườn hoa đầy màu sắc và thăm vườn cà phê",
      "Thăm ngôi nhà điên rồ với kiến trúc độc đáo",
      "Đi cáp treo với tầm nhìn toàn cảnh núi rừng"
    ],
  },
  'mui-ne': {
    name: 'Mũi Né',
    images: [
      'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    ],
    location: 'Mũi Né',
    duration: '2 ngày 1 đêm',
    price: '2,500,000đ',
    rating: 4.6,
    description: "Mũi Né là điểm đến biển nổi tiếng với cát trắng, gió biển mạnh mẽ và cảnh đẹp hoang sơ. Tour này mang đến trải nghiệm thư giãn trên bãi biển, thăm quan các điểm du lịch nổi tiếng và thưởng thức hải sản tươi ngon. Đi cùng với phương tiện di chuyển thoải mái và chỗ ở tiện nghi, tour Mũi Né sẽ làm hài lòng mọi du khách.",
    highlights: [
      "Thư giãn tại bãi biển cát trắng Mũi Né",
      "Thăm quan đồi cát bay và hồ cát đỏ",
      "Thưởng thức hải sản tươi ngon tại nhà hàng địa phương",
      "Thăm tháp Chăm Poshanu cổ kính",
      "Phương tiện di chuyển thoải mái từ TP. Hồ Chí Minh"
    ],
  },
  'can-tho': {
    name: 'Cần Thơ',
    images: [
      'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
      'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    ],
    location: 'Cần Thơ',
    duration: '2 ngày 1 đêm',
    price: '2,500,000đ',
    rating: 4.6,
    description: "Cần Thơ là điểm đến văn hóa nổi tiếng với sông nước, chợ nổi và ẩm thực phong phú. Tour này mang đến trải nghiệm thăm quan các điểm du lịch nổi tiếng, thưởng thức ẩm thực địa phương và thăm chợ nổi Cái Răng sôi động. Đi cùng với phương tiện di chuyển thoải mái và chỗ ở tiện nghi, tour Cần Thơ sẽ làm hài lòng mọi du khách.",
    highlights: [
      "Thăm chợ nổi Cái Răng sôi động",
      "Tour tham quan vườn trái cây Cần Thơ",
      "Thăm quan nhà cổ Bình Thủy cổ kính",
      "Thưởng thức ẩm thực địa phương ngon miệng",
      "Phương tiện di chuyển thoải mái từ TP. Hồ Chí Minh"
    ],
  },
  'tay-ninh': {
    name: 'Tây Ninh',
    images: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
      'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
      'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    ],
    location: 'Tây Ninh',
    duration: '2 ngày 1 đêm',
    price: '2,000,000đ',
    rating: 4.5,
    description: "Tây Ninh là điểm đến tâm linh nổi tiếng với đền Cao Đài và nhịp sống văn hóa độc đáo. Tour này mang đến trải nghiệm thăm quan các điểm du lịch tâm linh, tham gia lễ hội và thưởng thức ẩm thực địa phương. Đi cùng với phương tiện di chuyển thoải mái và chỗ ở tiện nghi, tour Tây Ninh sẽ làm hài lòng mọi du khách.",
    highlights: [
      "Thăm đền Cao Đài tâm linh",
      "Tham gia lễ hội truyền thống",
      "Thăm chùa Bà Đen linh thiêng",
      "Thưởng thức ẩm thực địa phương ngon miệng",
      "Phương tiện di chuyển thoải mái từ TP. Hồ Chí Minh"
    ],
  },
};

const TourDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoaded(true);
  }, [id]);

  if (!id || !toursData[id as keyof typeof toursData]) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Tour không tìm thấy</h2>
            <p className="text-muted-foreground mb-6">Chuyến tham quan bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Button asChild>
              <Link to="/tours">Browse All Tours</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const tour = toursData[id as keyof typeof toursData];

  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <Navbar />
      
      <div className="pt-24 flex-grow">
        {/* Back Navigation */}
        <div className="container mx-auto max-w-6xl px-6 py-4">
          <Link to="/tours" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tours
          </Link>
        </div>
        
        {/* Tour Gallery */}
        <section className="pb-8 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <div className="relative overflow-hidden rounded-lg h-[400px] animate-fade-in">
                  <img 
                    src={tour.images[activeImageIndex]} 
                    alt={tour.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                {tour.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`relative overflow-hidden rounded-lg h-[120px] lg:h-[126px] cursor-pointer transition-all ${
                      activeImageIndex === index 
                        ? 'ring-2 ring-primary ring-offset-2' 
                        : 'opacity-90 hover:opacity-100'
                    } ${isLoaded ? 'animate-fade-in' : ''}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${tour.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div className="lg:col-span-1 col-span-2">
                  <Button 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90 btn-hover"
                    onClick={() => setShowBookingForm(true)}
                  >
                    Đặt tour này
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Tour Information */}
        <section className="py-8 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className={`space-y-4 ${isLoaded ? 'animate-slide-up' : ''}`}>
                  <h1 className="text-3xl md:text-4xl font-bold">{tour.name}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {tour.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {tour.duration}
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 mr-1 fill-yellow-500" />
                      <span>{tour.rating}/5</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{tour.description}</p>
                </div>
                
                <Tabs defaultValue="highlights" className={`${isLoaded ? 'animate-slide-up' : ''}`} style={{ animationDelay: '100ms' }}>
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="highlights">Highlights</TabsTrigger>
                    <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="highlights" className="space-y-4">
                    <h3 className="text-xl font-semibold">Điểm nổi bật của chuyến du lịch</h3>
                    <ul className="space-y-3">
                      {tour.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  
                  
                  
                  <TabsContent value="details" className="space-y-6">
                    <h3 className="text-xl font-semibold">Thông tin chi tiết</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-lg font-medium">Bao gồm</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                            <span>Professional English-speaking guide</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                            <span>Accommodation as listed in the itinerary</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                            <span>Meals as mentioned in the itinerary</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                            <span>Transportation in air-conditioned vehicles</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                            <span>All entrance fees as mentioned in the itinerary</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                            <span>Bottled water during tours</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-lg font-medium">Not Included</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="text-red-500 font-bold mr-2">×</span>
                            <span>International and domestic flights</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-red-500 font-bold mr-2">×</span>
                            <span>Travel insurance</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-red-500 font-bold mr-2">×</span>
                            <span>Personal expenses (laundry, telephone, drinks, etc.)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-red-500 font-bold mr-2">×</span>
                            <span>Tips for guides and drivers</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-red-500 font-bold mr-2">×</span>
                            <span>Any other items not mentioned as included</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="space-y-6">
                <div className={`bg-primary/5 rounded-xl p-6 space-y-4 ${isLoaded ? 'animate-slide-up' : ''}`} style={{ animationDelay: '150ms' }}>
                  <h3 className="text-xl font-semibold">Giá chi tiết</h3>
                  <div className="flex justify-between items-center border-b pb-4">
                    <span>Bắt đầu từ</span>
                    <span className="text-2xl font-bold text-primary">{tour.price}</span>
                  </div>
                  <div className="space-y-3 py-2">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-primary mr-2" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-primary mr-2" />
                      <span>Tối đa 12 du khách</span>
                    </div>
                    <div className="flex items-center">
                      <Car className="h-5 w-5 text-primary mr-2" />
                      <span>Xe có điều hòa</span>
                    </div>
                    <div className="flex items-center">
                      <List className="h-5 w-5 text-primary mr-2" />
                      <span>Hành trình có thể tùy chỉnh</span>
                    </div>
                  </div>
                  <Button 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90 btn-hover"
                    onClick={() => setShowBookingForm(true)}
                  >
                    Đặt ngay
                  </Button>
                </div>
                
                <div className={`rounded-xl border p-6 space-y-4 ${isLoaded ? 'animate-slide-up' : ''}`} style={{ animationDelay: '200ms' }}>
                  <h3 className="text-xl font-semibold">Cần hỗ trợ</h3>
                  <p className="text-muted-foreground">Bạn có thắc mắc về tour này không? Các chuyên gia du lịch của chúng tôi luôn sẵn sàng hỗ trợ bạn.</p>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/contact">Liên lạc với chúng tôi</Link>
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">Hoặc gọi</p>
                    <a href="tel:+84123456789" className="flex items-center justify-center text-primary font-medium">
                      +84 123 456 789
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
      
      <BookingForm 
        tourName={tour.name}
        isOpen={showBookingForm} 
        onClose={() => setShowBookingForm(false)} 
      />
    </div>
  );
};

export default TourDetail;
