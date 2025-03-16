
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Star, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Tours = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const tours = [
    {
      id: 'vung-tau',
      name: 'Vũng Tàu',
      image: 'https://images.pexels.com/photos/25852230/pexels-photo-25852230/free-photo-of-bi-n-binh-minh-hoang-hon-d-i-d-ng.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Vũng Tàu',
      duration: '2 ngày 1 đêm',
      price: '3,000,000đ',
      rating: 4.8,
      category: 'beach'
    },
    {
      id: 'nha-trang',
      name: 'Nha Trang',
      image: 'https://images.unsplash.com/photo-1533002832-1721d16b4bb9?q=80&w=1578&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      location: 'Nha Trang',
      duration: '3 ngày 2 đêm',
      price: '6,500,000đ',
      rating: 4.9,
      category: 'beach'
    },
    {
      id: 'da-lat',
      name: 'Đà Lạt',
      image: 'https://images.unsplash.com/photo-1565859144920-27e9cddac505?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fCVDNCU5MSVDMyVBMCUyMGwlRTElQkElQTF0fGVufDB8fDB8fHww',
      location: 'Đà Lạt',
      duration: '4 ngày 3 đêm',
      price: '7,000,000đ',
      rating: 4.7,
      category: 'mountain'
    },
    {
      id: 'can-tho',
      name: 'Cần Thơ',
      image: 'https://images.pexels.com/photos/2134829/pexels-photo-2134829.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Cần Thơ',
      duration: '2 ngày 1 đêm',
      price: '2,500,000đ',
      rating: 4.6,
      category: 'cultural'
    },
    
    {
      id: 'tay-ninh',
      name: 'Tây Ninh',
      image: 'https://images.pexels.com/photos/28797297/pexels-photo-28797297/free-photo-of-toa-thanh-tay-ninh.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Tây Ninh',
      duration: '2 ngày 1 đêm',
      price: '2,000,000đ',
      rating: 4.5,
      category: 'cultural'
    },
    {
      id: 'mui-ne',
      name: 'Mũi Né',
      image: 'https://images.unsplash.com/photo-1716479852874-22742b84fef5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGhhbiUyMHRoaSVFMSVCQSVCRnR8ZW58MHx8MHx8fDA%3D',
      location: 'Mũi Né',
      duration: '2 ngày 1 đêm',
      price: '2,500,000đ',
      rating: 4.6,
      category: 'beach'
    },
  ];

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        tour.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || tour.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const categories = [
    { id: 'all', name: 'All Tours' },
    { id: 'beach', name: 'Beach' },
    { id: 'mountain', name: 'Mountain' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'cruise', name: 'Cruise' },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-primary/10 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className={`text-center max-w-3xl mx-auto ${isLoaded ? 'animate-slide-up' : ''}`}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tour trọn gói
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
            Khám phá các gói du lịch được thiết kế cẩn thận của chúng tôi để trải nghiệm những điều tuyệt vời nhất của cảnh quan đa dạng và nền văn hóa phong phú của Việt Nam.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search tours..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="relative">
                <select
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                  className="appearance-none flex h-10 w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tours Grid */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          {filteredTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTours.map((tour, index) => (
                <Link 
                  key={tour.id} 
                  to={`/tours/${tour.id}`}
                  className={`group ${isLoaded ? 'reveal reveal-delay-' + ((index % 3) + 1) : ''}`}
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
                          Xem chi tiết
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No tours found</h3>
              <p className="text-muted-foreground mb-6">Try changing your search criteria or filters</p>
              <Button onClick={() => { setSearchTerm(''); setActiveFilter('all'); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Tours;
