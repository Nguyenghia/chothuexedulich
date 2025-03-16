
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Car, MapPin, Calendar, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const featuredTours = [
    {
      id: 'vung-tau',
      name: 'Vũng Tàu',
      image: 'https://images.pexels.com/photos/25852230/pexels-photo-25852230/free-photo-of-bi-n-binh-minh-hoang-hon-d-i-d-ng.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Vũng Tàu',
      duration: '2 ngày 1 đêm',
      price: '3,000,000 VND',
      rating: 4.8,
    },
    {
      id: 'nha-trang',
      name: 'Nha Trang ',
      image: 'https://images.unsplash.com/photo-1533002832-1721d16b4bb9?q=80&w=1578&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      location: 'Nha Trang',
      duration: '3 ngày 2 đêm',
      price: '6,500,000 VND',
      rating: 4.9,
    },
    {
      id: 'da-lat',
      name: 'Đà Lạt',
      image: 'https://images.unsplash.com/photo-1626608017817-211d7c48177d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      location: 'Đà Lạt',
      duration: '4 ngày 3 đêm',
      price: '7,000,000 VND',
      rating: 4.7,
    },
  ];

  const carOptions = [
    {
      name: 'Xe 4 chỗ',
      description: 'Xe 4 chỗ nhỏ gọn, lý tưởng cho việc di chuyển trong thành phố',
      image: 'https://static.wixstatic.com/media/b4dcef_6264737c43814c71898de6bbe29f2903~mv2.png/v1/crop/x_55,y_0,w_1256,h_608/fill/w_560,h_292,al_c,q_95,enc_avif,quality_auto/vios-2021-92aa.png',
      price: 'From $25/day'
    },
    {
      name: 'Xe 7 chỗ',
      description: 'Xe SUV 7 chỗ rộng rãi cho chuyến đi của gia đình',
      image: 'https://toyotanamdinh5s.com/wp-content/uploads/2023/11/toyota-innova-zenix-indonesia-17s-6621-1669105185498-16691051887792036977523-1.webp',
      price: 'From $45/day'
    },
    {
      name: 'Xe 16 chỗ',
      description: 'Xe ô tô sang trọng 16 chỗ ngồi cho du lịch theo nhóm',
      image: 'https://saigonford.com.vn/public/upload/images/hinhsanpham/ford-transit-3691720175240.png',
      price: 'From $80/day'
    },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 bg-gradient-to-b from-sky-50 to-white relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 ${isLoaded ? 'animate-slide-up' : ''}`}>
              <div className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                Explore Vietnam with Comfort
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Journey Beyond <br />
                <span className="text-primary">Ordinary Travel</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Premium tour packages and car rental services tailored to create unforgettable travel experiences throughout Vietnam.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 btn-hover"
                  onClick={() => setShowBookingForm(true)}
                >
                  Đặt tour
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="btn-hover"
                  asChild
                >
                  <Link to="/rentals">
                    Thuê xe
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className={`relative ${isLoaded ? 'animate-fade-in' : ''}`}>
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Scenic Vietnam landscape" 
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 glass rounded-lg p-4 shadow-lg animate-float">
                <div className="flex items-center space-x-3">
                  <div className="bg-white p-2 rounded-full">
                    <MapPin className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Top Destinations</p>
                    <p className="text-xs text-white/80">Explore amazing places</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 glass rounded-lg p-4 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-3">
                  <div className="bg-white p-2 rounded-full">
                    <Car className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Premium Fleet</p>
                    <p className="text-xs text-white/80">Comfort guaranteed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Tours Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-sm font-medium text-primary mb-2">TOUR ĐẶC SẮC</h2>
              <h3 className="text-3xl font-bold">Các gói du lịch phổ biến</h3>
            </div>
            <Link to="/tours" className="group mt-4 md:mt-0 inline-flex items-center text-primary font-medium">
              Tất cả Tours
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTours.map((tour, index) => (
              <Link 
                key={tour.id} 
                to={`/tours/${tour.id}`}
                className={`group ${isLoaded ? 'reveal reveal-delay-' + (index + 1) : ''}`}
              >
                <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={tour.image} 
                      alt={tour.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="flex items-center">
                        <Star className="h-3.5 w-3.5 text-yellow-500 mr-1 fill-yellow-500" />
                        <span className="text-sm font-medium">{tour.rating}</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center text-muted-foreground text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {tour.location}
                      <div className="mx-2">•</div>
                      <Calendar className="h-4 w-4 mr-1" />
                      {tour.duration}
                    </div>
                    <h4 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {tour.name}
                    </h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-muted-foreground">Chỉ từ</span>
                        <span className="text-xl font-bold text-primary ml-1">{tour.price}</span>
                      </div>
                      <Button size="sm" variant="ghost" className="group-hover:bg-primary/10 group-hover:text-primary transition-all">
                        Chi tiết <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Car Rental Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-sm font-medium text-primary mb-2">Dịch vụ thu xe</h2>
            <h3 className="text-3xl font-bold mb-4">Xe cao cấp cho chuyến đi của bạn</h3>
            <p className="text-muted-foreground">
              Hãy lựa chọn đội xe được bảo dưỡng tốt của chúng tôi để có trải nghiệm du lịch thoải mái và an toàn trên khắp Việt Nam.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {carOptions.map((car, index) => (
              <Card key={index} className={`border-0 shadow-md hover:shadow-xl transition-all ${isLoaded ? 'reveal reveal-delay-' + (index + 1) : ''}`}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-full object-cover img-hover"
                  />
                </div>
                <CardContent className="p-5">
                  <h4 className="text-xl font-semibold mb-2">{car.name}</h4>
                  <p className="text-muted-foreground mb-3">{car.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-semibold">{car.price}</span>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/rentals">Xem chi tiết</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 btn-hover" asChild>
              <Link to="/rentals">
                Khám phá tất cả các loại xe
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">Bạn đã sẵn sàng bắt đầu hành trình chưa?</h2>
                <p className="text-muted-foreground mb-8 max-w-md">
                  Hãy liên hệ với nhóm chuyên gia du lịch của chúng tôi để lên kế hoạch cho chuyến đi hoàn hảo hoặc đặt xe phù hợp với nhu cầu của bạn.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 btn-hover"
                    onClick={() => setShowBookingForm(true)}
                  >
                    Đặt Ngay
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="btn-hover"
                    asChild
                  >
                    <Link to="/contact">
                      Liên hệ với chúng tôi
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-64 lg:h-auto">
                <img 
                  src="https://images.pexels.com/photos/31150309/pexels-photo-31150309/free-photo-of-di-b-bu-i-sang.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Scenic Vietnam landscape" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      
      <BookingForm 
        isOpen={showBookingForm} 
        onClose={() => setShowBookingForm(false)} 
      />
    </div>
  );
};

export default HomePage;
