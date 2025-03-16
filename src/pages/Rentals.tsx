
import { useState, useEffect } from 'react';
import { Calendar, Car, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import { describe } from 'node:test';

const Rentals = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [activeVehicle, setActiveVehicle] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const carCategories = [
    {
      id: 'economy',
      name: 'Xe 4 chỗ tiết kiệm',
      description: 'Xe 4 chỗ tiết kiệm, phù hợp cho việc di chuyển trong thành phố và các chuyến đi ngắn.',
      vehicles: [
        {
          id: 'econ-1',
          name: 'Toyota Vios',
          image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
          seats: 4,
          features: ['Air conditioning', 'Bluetooth audio', 'Fuel efficient'],
          price: '$25/day',
        },
        {
          id: 'econ-2',
          name: 'Honda City',
          image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
          seats: 4,
          features: ['Air conditioning', 'USB charging', 'Navigation system'],
          price: '$28/day',
        },
      ]
    },
    {
      id: 'family',
      name: 'SUVs & MPVs gia đình',
      description: 'SUVs rộng rãi và MPVs với 7 chỗ ngồi trở lên, hoàn hảo cho chuyến đi gia đình và nhóm.',
      vehicles: [
        {
          id: 'fam-1',
          name: 'Toyota Innova',
          image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
          seats: 7,
          features: ['Air conditioning', 'Spacious trunk', 'Entertainment system'],
          price: '$45/day',
        },
        {
          id: 'fam-2',
          name: 'Honda CR-V',
          image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
          seats: 7,
          features: ['Air conditioning', 'USB charging', 'Roof rack'],
          price: '$50/day',
        },
      ]
    },
    {
      id: 'premium',
      name: 'Xe 16 chỗ cao cấp',
      describe: 'Xe 16 chỗ cao cấp cho nhóm, gia đình và sự kiện đặc biệt.',
      vehicles: [
        {
          id: 'prem-1',
          name: 'Huyndai Solati',
          image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
          seats: 16,
          features: ['Air conditioning', 'Comfortable seating', 'Large luggage space'],
          price: '$80/day',
        },
        {
          id: 'prem-2',
          name: 'Ford Transit',
          image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
          seats: 16,
          features: ['Air conditioning', 'Entertainment system', 'Spacious interior'],
          price: '$85/day',
        },
      ]
    },
    {
      id: 'buses',
      name: 'Xe 29 chỗ và 45 chỗ',
      description: 'Xe 29 chỗ và 45 chỗ cho nhóm lớn, sự kiện và chuyến đi dài ngày.',
      vehicles: [
        {
          id: 'bus-1',
          name: 'Xe 29 chỗ',
          image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
          seats: 29,
          features: ['Air conditioning', 'Comfortable seating', 'Onboard entertainment'],
          price: '$120/day',
        },
        {
          id: 'bus-2',
          name: 'Xe 45 chỗ',
          image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
          seats: 45,
          features: ['Air conditioning', 'Reclining seats', 'Onboard restroom'],
          price: '$180/day',
        },
      ]
    },
  ];

  const rentalServices = [
    {
      title: "Thuê Xe Tự Lái",
      description: "Thuê xe tự lái với nhiều lựa chọn xe mới, bảo dưỡng định kỳ và giá cả phải chăng.",
      features: [
        "Bảo hiểm bao gồm",
        "Hỗ trợ cứu hộ 24/7",
        "Thời gian thuê linh hoạt",
        "Không phí ẩn",
      ]
    },
    {
      title: "Dịch Vụ Hướng Dẫn Viên",
      description: "Hướng dẫn viên chuyên nghiệp sẽ hỗ trợ bạn khám phá những điểm đến tuyệt vời nhất của Việt Nam.",
      features: [
        "Hướng dẫn viên nhiều kinh nghiệm",
        "Chương trình tham quan linh hoạt",
        "Hỗ trợ đặt chỗ khách sạn",
        "Hỗ trợ đặt vé tham quan",
      ]
    },
    {
      title: "Thuê Xe Dài Hạn",
      description: "Thuê xe dài hạn với giá ưu đãi hàng tuần và hàng tháng, bảo dưỡng miễn phí và nhiều ưu đãi khác.",
      features: [
        "Giảm giá theo tuần và theo tháng",
        "Bảo dưỡng xe miễn phí",  
        "Hỗ trợ cứu hộ 24/7",
        "Hỗ trợ đổi xe linh hoạt",
      ]
    },
    {
      title: "Đưa đón sân bay",
      description: "Dịch vụ đưa đón sân bay chuyên nghiệp, an toàn và tiện lợi, giúp bạn di chuyển một cách dễ dàng.",
      features: [
        "Theo dõi chuyến bay",
        "Dịch vụ đón tiếp",
        "Hỗ trợ hành lý",
        "Giá cả cố định, minh bạch",
        "Dịch vụ có sẵn 24/7"
      ]
    },
  ];

  const handleBookNow = (vehicleId: string) => {
    setActiveVehicle(vehicleId);
    setShowBookingForm(true);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-primary/10 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className={`text-center max-w-3xl mx-auto ${isLoaded ? 'animate-slide-up' : ''}`}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Dịch vụ cho thuê xe cao cấp tại Việt Nam
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Hãy lựa chọn đội xe đa dạng được bảo dưỡng tốt của chúng tôi để có trải nghiệm di chuyển thoải mái và an toàn trên khắp Việt Nam.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 btn-hover"
                onClick={() => setShowBookingForm(true)}
              >
                Đặt xe
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="btn-hover"
                onClick={() => document.getElementById('rental-services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Xem dịch vụ
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Car Categories */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-sm font-medium text-primary mb-2">ĐỘI XE CỦA CHÚNG TÔI</h2>
            <h3 className="text-3xl font-bold">Chọn chiếc xe hoàn hảo của bạn</h3>
          </div>
          
          <Tabs defaultValue={carCategories[0].id} className="space-y-10">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
              {carCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {carCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-8">
                <div className="text-center max-w-2xl mx-auto mb-6">
                  <h3 className="text-2xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {category.vehicles.map((vehicle, index) => (
                    <Card key={vehicle.id} className={`border overflow-hidden shadow-md hover:shadow-xl transition-all ${isLoaded ? 'reveal reveal-delay-' + (index + 1) : ''}`}>
                      <div className="relative h-56 overflow-hidden">
                        <img 
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-xl font-semibold">{vehicle.name}</h4>
                          <div className="flex items-center text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{vehicle.seats} chỗ</span>
                          </div>
                        </div>
                        
                        <ul className="mb-5 space-y-1">
                          {vehicle.features.map((feature, i) => (
                            <li key={i} className="flex items-center text-muted-foreground">
                              <CheckCircle className="h-4 w-4 text-primary mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-primary">{vehicle.price}</span>
                          <Button 
                            onClick={() => handleBookNow(vehicle.id)}
                            className="bg-primary hover:bg-primary/90"
                          >
                            Đặt ngay
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
      
      {/* Rental Services */}
      <section id="rental-services" className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-sm font-medium text-primary mb-2">DỊCH VỤ CỦA CHÚNG TÔI</h2>
            <h3 className="text-3xl font-bold">Dịch vụ cho thuê chúng tôi cung cấp</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rentalServices.map((service, index) => (
              <Card key={index} className={`border-0 shadow-md hover:shadow-xl transition-all ${isLoaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold mb-3">{service.title}</h4>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-6 bg-primary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="rounded-2xl bg-white shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-4">Bạn đã sẵn sàng đặt xe chưa?</h2>
                <p className="text-muted-foreground mb-6">
                Đội ngũ của chúng tôi sẵn sàng hỗ trợ bạn tìm được chiếc xe hoàn hảo cho nhu cầu của bạn. Liên hệ với chúng tôi ngay để được phục vụ theo yêu cầu.
                </p>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center p-4 bg-primary/5 rounded-lg">
                      <Car className="h-10 w-10 text-primary mr-4" />
                      <div>
                        <h3 className="font-semibold">Lựa chọn rộng rãi</h3>
                        <p className="text-sm text-muted-foreground">Nhiều lựa chọn xe</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-primary/5 rounded-lg">
                      <Calendar className="h-10 w-10 text-primary mr-4" />
                      <div>
                        <h3 className="font-semibold">Đặt chỗ linh hoạt</h3>
                        <p className="text-sm text-muted-foreground">Thay đổi ngày nếu cần</p>
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 btn-hover"
                    onClick={() => setShowBookingForm(true)}
                  >
                    Đặt xe ngay
                  </Button>
                </div>
              </div>
              <div className="relative h-64 lg:h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
                  alt="Premium vehicle" 
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

export default Rentals;
