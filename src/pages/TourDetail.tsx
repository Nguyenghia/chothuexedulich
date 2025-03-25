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
    tourOptions: [
      {
        id: 'day-trip',
        name: 'Tour trong ngày',
        duration: 'Sáng đi chiều về',
        price: '1,200,000đ',
        description: 'Phù hợp cho chuyến đi ngắn, tham quan các điểm chính của Vũng Tàu'
      },
      {
        id: '2d1n',
        name: 'Tour 2 ngày 1 đêm',
        duration: '2 ngày 1 đêm',
        price: '2,500,000đ',
        description: 'Trải nghiệm đầy đủ Vũng Tàu với đêm nghỉ tại khách sạn'
      },
      {
        id: '3d2n',
        name: 'Tour 3 ngày 2 đêm',
        duration: '3 ngày 2 đêm',
        price: '3,500,000đ',
        description: 'Khám phá Vũng Tàu theo nhịp độ thư thái'
      },
      {
        id: '4d3n',
        name: 'Tour 4 ngày 3 đêm',
        duration: '4 ngày 3 đêm',
        price: '4,500,000đ',
        description: 'Trải nghiệm trọn vẹn Vũng Tàu và các điểm lân cận'
      }
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
    tourOptions: [
      {
        id: '2d1n',
        name: 'Tour 2 ngày 1 đêm',
        duration: '2 ngày 1 đêm',
        price: '3,500,000đ',
        description: 'Tour ngắn khám phá Nha Trang'
      },
      {
        id: '3d2n',
        name: 'Tour 3 ngày 2 đêm',
        duration: '3 ngày 2 đêm',
        price: '5,500,000đ',
        description: 'Tour tiêu chuẩn khám phá Nha Trang'
      },
      {
        id: '4d3n',
        name: 'Tour 4 ngày 3 đêm',
        duration: '4 ngày 3 đêm',
        price: '7,500,000đ',
        description: 'Tour trọn gói trải nghiệm Nha Trang'
      }
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
    tourOptions: [
      {
        id: '2d1n',
        name: 'Tour 2 ngày 1 đêm',
        duration: '2 ngày 1 đêm',
        price: '2,800,000đ',
        description: 'Tour ngắn khám phá Đà Lạt'
      },
      {
        id: '3d2n',
        name: 'Tour 3 ngày 2 đêm',
        duration: '3 ngày 2 đêm',
        price: '4,500,000đ',
        description: 'Tour tiêu chuẩn khám phá Đà Lạt'
      },
      {
        id: '4d3n',
        name: 'Tour 4 ngày 3 đêm',
        duration: '4 ngày 3 đêm',
        price: '6,500,000đ',
        description: 'Tour trọn gói trải nghiệm Đà Lạt'
      }
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
    tourOptions: [
      {
        id: 'day-trip',
        name: 'Tour trong ngày',
        duration: 'Sáng đi chiều về',
        price: '1,500,000đ',
        description: 'Tour ngắn khám phá Mũi Né'
      },
      {
        id: '2d1n',
        name: 'Tour 2 ngày 1 đêm',
        duration: '2 ngày 1 đêm',
        price: '2,500,000đ',
        description: 'Tour tiêu chuẩn khám phá Mũi Né'
      },
      {
        id: '3d2n',
        name: 'Tour 3 ngày 2 đêm',
        duration: '3 ngày 2 đêm',
        price: '3,500,000đ',
        description: 'Tour trọn gói trải nghiệm Mũi Né'
      }
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
    tourOptions: [
      {
        id: 'day-trip',
        name: 'Tour trong ngày',
        duration: 'Sáng đi chiều về',
        price: '1,200,000đ',
        description: 'Tour chợ nổi Cái Răng'
      },
      {
        id: '2d1n',
        name: 'Tour 2 ngày 1 đêm',
        duration: '2 ngày 1 đêm',
        price: '2,200,000đ',
        description: 'Tour khám phá Cần Thơ'
      },
      {
        id: '3d2n',
        name: 'Tour 3 ngày 2 đêm',
        duration: '3 ngày 2 đêm',
        price: '3,200,000đ',
        description: 'Tour trọn gói miền Tây'
      }
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
    tourOptions: [
      {
        id: 'day-trip',
        name: 'Tour trong ngày',
        duration: 'Sáng đi chiều về',
        price: '900,000đ',
        description: 'Tour tham quan Tòa Thánh và núi Bà Đen'
      },
      {
        id: '2d1n',
        name: 'Tour 2 ngày 1 đêm',
        duration: '2 ngày 1 đêm',
        price: '1,800,000đ',
        description: 'Tour trọn gói Tây Ninh'
      }
    ],
  },
  'tien-giang': {
    name: 'Tiền Giang',
    images: [
      'https://images.unsplash.com/photo-cai-be-floating-market',
      'https://images.unsplash.com/photo-vinh-trang-pagoda',
      'https://images.unsplash.com/photo-dong-thap-muoi',
    ],
    location: 'Tiền Giang',
    price: '1,500,000đ',
    rating: 4.6,
    description: "Khám phá vùng đất Tiền Giang với chợ nổi Cái Bè, làng nghề truyền thống và vườn trái cây xanh mát. Tour mang đến trải nghiệm văn hóa sông nước miền Tây độc đáo.",
    highlights: [
      "Tham quan chợ nổi Cái Bè sầm uất",
      "Thưởng thức trái cây tại vườn",
      "Ghé thăm làng nghề truyền thống",
      "Viếng chùa Vĩnh Tràng cổ kính",
      "Trải nghiệm đi đò trong vườn",
    ],
    tourOptions: [
      {
        id: 'day-trip',
        name: 'Tour trong ngày',
        duration: 'Sáng đi chiều về',
        price: '890,000đ',
        description: 'Tour ngắn khám phá Tiền Giang'
      },
      {
        id: '2d1n',
        name: 'Tour 2 ngày 1 đêm',
        duration: '2 ngày 1 đêm',
        price: '1,500,000đ',
        description: 'Tour trọn gói Tiền Giang'
      }
    ],
  },
  'ben-tre': {
    name: 'Bến Tre',
    images: [
      'https://images.unsplash.com/photo-coconut-land',
      'https://images.unsplash.com/photo-ben-tre-river',
      'https://images.unsplash.com/photo-traditional-craft',
    ],
    location: 'Bến Tre',
    price: '1,800,000đ',
    rating: 4.7,
    description: "Bến Tre - xứ dừa với những khu vườn xanh mát, những con sông hiền hòa và làng nghề truyền thống. Tour mang đến trải nghiệm về cuộc sống miền sông nước và văn hóa địa phương.",
    highlights: [
      "Tham quan vườn dừa xanh mát",
      "Trải nghiệm làm kẹo dừa",
      "Đi thuyền trên sông Bến Tre",
      "Thăm làng nghề thủ công mỹ nghệ",
      "Thưởng thức đặc sản địa phương",
    ],
    tourOptions: [
      {
        id: 'day-trip',
        name: 'Tour trong ngày',
        duration: 'Sáng đi chiều về',
        price: '950,000đ',
        description: 'Tour ngắn khám phá Bến Tre'
      },
      {
        id: '2d1n',
        name: 'Tour 2 ngày 1 đêm',
        duration: '2 ngày 1 đêm',
        price: '1,800,000đ',
        description: 'Tour trọn gói Bến Tre'
      }
    ],
  },
  'an-giang': {
    name: 'An Giang',
    images: [
      'https://images.unsplash.com/photo-tra-su-forest',
      'https://images.unsplash.com/photo-cam-mountain',
      'https://images.unsplash.com/photo-floating-season',
    ],
    location: 'An Giang',
    price: '2,500,000đ',
    rating: 4.8,
    description: "An Giang - vùng đất của núi rừng, đồng bằng và di tích văn hóa lịch sử. Tour mang đến trải nghiệm độc đáo về cảnh quan thiên nhiên và văn hóa tâm linh.",
    highlights: [
      "Khám phá rừng tràm Trà Sư",
      "Chinh phục núi Cấm hùng vĩ",
      "Viếng miếu Bà Chúa Xứ",
      "Tham quan làng Chăm",
      "Trải nghiệm mùa nước nổi",
    ],
    tourOptions: [
      {
        id: '2d1n',
        name: 'Tour 2 ngày 1 đêm',
        duration: '2 ngày 1 đêm',
        price: '2,500,000đ',
        description: 'Tour cơ bản An Giang'
      },
      {
        id: '3d2n',
        name: 'Tour 3 ngày 2 đêm',
        duration: '3 ngày 2 đêm',
        price: '3,500,000đ',
        description: 'Tour trọn gói An Giang'
      }
    ],
  },
  'soc-trang': {
    name: 'Sóc Trăng',
    images: [
      'https://images.unsplash.com/photo-clay-pagoda',
      'https://images.unsplash.com/photo-bat-pagoda',
      'https://images.unsplash.com/photo-khmer-culture',
    ],
    location: 'Sóc Trăng',
    price: '2,000,000đ',
    rating: 4.5,
    description: "Sóc Trăng - vùng đất của văn hóa Khmer với những ngôi chùa cổ kính và ẩm thực đặc sắc. Tour giới thiệu về văn hóa đa dạng và cuộc sống của người dân địa phương.",
    highlights: [
      "Tham quan chùa Dơi độc đáo",
      "Viếng chùa Mã Tộc",
      "Khám phá văn hóa Khmer",
      "Thưởng thức ẩm thực địa phương",
      "Tham quan làng nghề truyền thống",
    ],
    tourOptions: [
      {
        id: 'day-trip',
        name: 'Tour trong ngày',
        duration: 'Sáng đi chiều về',
        price: '1,200,000đ',
        description: 'Tour ngắn Sóc Trăng'
      },
      {
        id: '2d1n',
        name: 'Tour 2 ngày 1 đêm',
        duration: '2 ngày 1 đêm',
        price: '2,000,000đ',
        description: 'Tour trọn gói Sóc Trăng'
      }
    ],
  },
  'ca-mau': {
    name: 'Cà Mau',
    images: [
      'https://images.unsplash.com/photo-ca-mau-cape',
      'https://images.unsplash.com/photo-u-minh-forest',
      'https://images.unsplash.com/photo-dat-mui',
    ],
    location: 'Cà Mau',
    price: '3,500,000đ',
    rating: 4.6,
    description: "Khám phá Cà Mau - điểm cực nam của Tổ quốc với hệ sinh thái rừng ngập mặn độc đáo, món ăn đặc sản và văn hóa địa phương đặc sắc.",
    highlights: [
      "Tham quan Mũi Cà Mau - cực nam của Tổ quốc",
      "Khám phá rừng U Minh Hạ",
      "Trải nghiệm chợ nổi Cà Mau",
      "Thưởng thức hải sản tươi ngon",
      "Tham quan làng nghề truyền thống"
    ],
    tourOptions: [
      {
        id: '2d1n',
        name: 'Tour 2 ngày 1 đêm',
        duration: '2 ngày 1 đêm',
        price: '3,500,000đ',
        description: 'Tour cơ bản khám phá Cà Mau'
      },
      {
        id: '3d2n',
        name: 'Tour 3 ngày 2 đêm',
        duration: '3 ngày 2 đêm',
        price: '4,500,000đ',
        description: 'Tour trọn gói Cà Mau'
      }
    ]
  },
  'bac-lieu': {
    name: 'Bạc Liêu',
    images: [
      'https://images.unsplash.com/photo-bac-lieu-mansion',
      'https://images.unsplash.com/photo-cao-van-lau',
      'https://images.unsplash.com/photo-wind-power'
    ],
    location: 'Bạc Liêu',
    price: '2,200,000đ',
    rating: 4.5,
    description: "Bạc Liêu - vùng đất của những công trình kiến trúc độc đáo, âm nhạc đờn ca tài tử và văn hóa ẩm thực đặc sắc của vùng Nam Bộ.",
    highlights: [
      "Tham quan Nhà công tử Bạc Liêu",
      "Viếng chùa Xiêm Cán cổ kính",
      "Khám phá Khu điện gió Bạc Liêu",
      "Thưởng thức văn hóa đờn ca tài tử",
      "Trải nghiệm ẩm thực địa phương"
    ],
    tourOptions: [
      {
        id: 'day-trip',
        name: 'Tour trong ngày',
        duration: 'Sáng đi chiều về',
        price: '1,500,000đ',
        description: 'Tour ngắn khám phá Bạc Liêu'
      },
      {
        id: '2d1n',
        name: 'Tour 2 ngày 1 đêm',
        duration: '2 ngày 1 đêm',
        price: '2,200,000đ',
        description: 'Tour trọn gói Bạc Liêu'
      }
    ]
  },
  'rach-gia': {
    name: 'Rạch Giá',
    images: [
      'https://images.unsplash.com/photo-rach-gia-beach',
      'https://images.unsplash.com/photo-hon-tre',
      'https://images.unsplash.com/photo-night-market'
    ],
    location: 'Rạch Giá',
    price: '2,300,000đ',
    rating: 4.4,
    description: "Rạch Giá - thành phố biển năng động với bãi biển đẹp, hải sản tươi ngon và là cửa ngõ đến với đảo Phú Quốc.",
    highlights: [
      "Tham quan bãi biển Rạch Giá",
      "Khám phá chợ đêm Rạch Sỏi",
      "Viếng chùa Tam Bảo",
      "Thưởng thức hải sản tươi sống",
      "Du ngoạn đảo Hòn Trẻ"
    ],
    tourOptions: [
      {
        id: 'day-trip',
        name: 'Tour trong ngày',
        duration: 'Sáng đi chiều về',
        price: '1,800,000đ',
        description: 'Tour ngắn khám phá Rạch Giá'
      },
      {
        id: '2d1n',
        name: 'Tour 2 ngày 1 đêm',
        duration: '2 ngày 1 đêm',
        price: '2,300,000đ',
        description: 'Tour trọn gói Rạch Giá'
      }
    ]
  },
  'ha-tien': {
    name: 'Hà Tiên',
    images: [
      'https://images.unsplash.com/photo-ha-tien-beach',
      'https://images.unsplash.com/photo-thach-dong',
      'https://images.unsplash.com/photo-mui-nai'
    ],
    location: 'Hà Tiên',
    price: '2,800,000đ',
    rating: 4.7,
    description: "Hà Tiên - thành phố biển xinh đẹp với những hang động kỳ bí, đền chùa cổ kính và bãi biển hoang sơ.",
    highlights: [
      "Tham quan Thạch Động",
      "Khám phá Mũi Nai",
      "Viếng chùa Phù Dung",
      "Thưởng thức đặc sản địa phương",
      "Du ngoạn đảo Hải Tặc"
    ],
    tourOptions: [
      {
        id: '2d1n',
        name: 'Tour 2 ngày 1 đêm',
        duration: '2 ngày 1 đêm',
        price: '2,800,000đ',
        description: 'Tour cơ bản Hà Tiên'
      },
      {
        id: '3d2n',
        name: 'Tour 3 ngày 2 đêm',
        duration: '3 ngày 2 đêm',
        price: '3,800,000đ',
        description: 'Tour trọn gói Hà Tiên'
      }
    ]
  },
  'chau-doc': {
    name: 'Châu Đốc',
    images: [
      'https://images.unsplash.com/photo-ba-chua-xu',
      'https://images.unsplash.com/photo-floating-village',
      'https://images.unsplash.com/photo-tra-su'
    ],
    location: 'Châu Đốc',
    price: '2,100,000đ',
    rating: 4.6,
    description: "Châu Đốc - vùng đất của tín ngưỡng, làng nổi và ẩm thực đặc sắc vùng biên giới Tây Nam.",
    highlights: [
      "Viếng Miếu Bà Chúa Xứ",
      "Tham quan làng cá bè",
      "Khám phá rừng tràm Trà Sư",
      "Thưởng thức đặc sản mắm Châu Đốc",
      "Trải nghiệm chợ Châu Đốc"
    ],
    tourOptions: [
      {
        id: 'day-trip',
        name: 'Tour trong ngày',
        duration: 'Sáng đi chiều về',
        price: '1,500,000đ',
        description: 'Tour ngắn Châu Đốc'
      },
      {
        id: '2d1n',
        name: 'Tour 2 ngày 1 đêm',
        duration: '2 ngày 1 đêm',
        price: '2,100,000đ',
        description: 'Tour trọn gói Châu Đốc'
      }
    ]
  },
  'dong-nai': {
    name: 'Đồng Nai',
    images: [
      'https://images.unsplash.com/photo-dong-nai-forest',
      'https://images.unsplash.com/photo-long-thanh',
      'https://images.unsplash.com/photo-dong-nai-river'
    ],
    location: 'Đồng Nai',
    price: '1,900,000đ',
    rating: 4.5,
    description: "Đồng Nai - vùng đất của những khu rừng nguyên sinh, thác nước và di tích lịch sử. Tour mang đến trải nghiệm về thiên nhiên hoang dã và văn hóa địa phương.",
    highlights: [
      "Khám phá Vườn Quốc gia Nam Cát Tiên",
      "Tham quan thác Giang Điền",
      "Viếng chùa Bửu Phong cổ kính",
      "Trải nghiệm văn hóa dân tộc bản địa",
      "Thăm làng nghề truyền thống"
    ],
    tourOptions: [
      {
        id: 'day-trip',
        name: 'Tour trong ngày',
        duration: 'Sáng đi chiều về',
        price: '900,000đ',
        description: 'Tour ngắn khám phá Đồng Nai'
      },
      {
        id: '2d1n',
        name: 'Tour 2 ngày 1 đêm',
        duration: '2 ngày 1 đêm',
        price: '1,900,000đ',
        description: 'Tour trọn gói Đồng Nai'
      }
    ]
  },
  'binh-duong': {
    name: 'Bình Dương',
    images: [
      'https://images.unsplash.com/photo-dai-nam',
      'https://images.unsplash.com/photo-hoi-khanh',
      'https://images.unsplash.com/photo-lac-canh'
    ],
    location: 'Bình Dương',
    price: '1,200,000đ',
    rating: 4.4,
    description: "Bình Dương - điểm đến hấp dẫn với khu du lịch Đại Nam, các ngôi chùa cổ kính và làng nghề truyền thống. Tour giới thiệu về văn hóa và lịch sử địa phương.",
    highlights: [
      "Khám phá Khu du lịch Đại Nam",
      "Viếng chùa Hội Khánh",
      "Tham quan làng gốm Lái Thiêu",
      "Thăm Bảo tàng Bình Dương",
      "Trải nghiệm ẩm thực địa phương"
    ],
    tourOptions: [
      {
        id: 'day-trip',
        name: 'Tour trong ngày',
        duration: 'Sáng đi chiều về',
        price: '800,000đ',
        description: 'Tour ngắn Bình Dương'
      },
      {
        id: '2d1n',
        name: 'Tour 2 ngày 1 đêm',
        duration: '2 ngày 1 đêm',
        price: '1,200,000đ',
        description: 'Tour trọn gói Bình Dương'
      }
    ]
  },
  'binh-phuoc': {
    name: 'Bình Phước',
    images: [
      'https://images.unsplash.com/photo-bu-gia-map',
      'https://images.unsplash.com/photo-thac-mo',
      'https://images.unsplash.com/photo-ta-thiet'
    ],
    location: 'Bình Phước',
    price: '2,000,000đ',
    rating: 4.5,
    description: "Bình Phước - vùng đất của rừng xanh, thác nước và di tích lịch sử. Tour mang đến trải nghiệm về thiên nhiên hoang dã và văn hóa dân tộc.",
    highlights: [
      "Khám phá Vườn Quốc gia Bù Gia Mập",
      "Tham quan thác Mơ",
      "Viếng địa đạo Tà Thiết",
      "Trải nghiệm văn hóa Xtiêng",
      "Thưởng thức đặc sản địa phương"
    ],
    tourOptions: [
      {
        id: '2d1n',
        name: 'Tour 2 ngày 1 đêm',
        duration: '2 ngày 1 đêm',
        price: '2,000,000đ',
        description: 'Tour cơ bản Bình Phước'
      },
      {
        id: '3d2n',
        name: 'Tour 3 ngày 2 đêm',
        duration: '3 ngày 2 đêm',
        price: '2,800,000đ',
        description: 'Tour trọn gói Bình Phước'
      }
    ]
  },
  'quy-nhon': {
    name: 'Quy Nhơn',
    images: [
      'https://images.unsplash.com/photo-ky-co',
      'https://images.unsplash.com/photo-eo-gio',
      'https://images.unsplash.com/photo-ghenh-rang'
    ],
    location: 'Quy Nhơn',
    price: '4,500,000đ',
    rating: 4.8,
    description: "Quy Nhơn - thành phố biển với những bãi biển hoang sơ, tháp Chăm cổ kính và ẩm thực độc đáo. Tour mang đến trải nghiệm về biển đảo và văn hóa Chăm.",
    highlights: [
      "Tắm biển Kỳ Co - Eo Gió",
      "Khám phá Tháp đôi Quy Nhơn",
      "Thăm Ghềnh Ráng - Tiên Sa",
      "Trải nghiệm làng chài Nhơn Lý",
      "Thưởng thức hải sản tươi ngon"
    ],
    tourOptions: [
      {
        id: '3d2n',
        name: 'Tour 3 ngày 2 đêm',
        duration: '3 ngày 2 đêm',
        price: '4,500,000đ',
        description: 'Tour tiêu chuẩn Quy Nhơn'
      },
      {
        id: '4d3n',
        name: 'Tour 4 ngày 3 đêm',
        duration: '4 ngày 3 đêm',
        price: '5,500,000đ',
        description: 'Tour trọn gói Quy Nhơn'
      }
    ]
  },
  'phu-yen': {
    name: 'Phú Yên',
    images: [
      'https://images.unsplash.com/photo-ganh-da-dia',
      'https://images.unsplash.com/photo-bai-xep',
      'https://images.unsplash.com/photo-mui-dien'
    ],
    location: 'Phú Yên',
    price: '4,200,000đ',
    rating: 4.7,
    description: "Phú Yên - vùng đất của những bãi biển hoang sơ, gành đá độc đáo và văn hóa địa phương đặc sắc. Tour mang đến trải nghiệm về thiên nhiên và cuộc sống miền biển.",
    highlights: [
      "Khám phá Gành Đá Đĩa",
      "Tham quan Bãi Xép",
      "Chinh phục Mũi Điện - Hải đăng Đại Lãnh",
      "Thăm đầm Ô Loan",
      "Thưởng thức hải sản tươi ngon"
    ],
    tourOptions: [
      {
        id: '3d2n',
        name: 'Tour 3 ngày 2 đêm',
        duration: '3 ngày 2 đêm',
        price: '4,200,000đ',
        description: 'Tour cơ bản Phú Yên'
      },
      {
        id: '4d3n',
        name: 'Tour 4 ngày 3 đêm',
        duration: '4 ngày 3 đêm',
        price: '5,200,000đ',
        description: 'Tour trọn gói Phú Yên'
      }
    ]
  },
  'ninh-thuan': {
    name: 'Ninh Thuận',
    images: [
      'https://images.unsplash.com/photo-vinh-hy',
      'https://images.unsplash.com/photo-po-klong-garai',
      'https://images.unsplash.com/photo-ninh-chu'
    ],
    location: 'Ninh Thuận',
    price: '3,800,000đ',
    rating: 4.6,
    description: "Ninh Thuận - vùng đất của nắng gió, những vườn nho xanh mát và văn hóa Chăm độc đáo. Tour mang đến trải nghiệm về văn hóa và thiên nhiên đặc sắc.",
    highlights: [
      "Tham quan Vịnh Vĩnh Hy",
      "Khám phá Tháp Po Klong Garai",
      "Trải nghiệm làng gốm Bàu Trúc",
      "Thăm vườn nho và làm rượu vang",
      "Tắm biển Ninh Chữ"
    ],
    tourOptions: [
      {
        id: '2d1n',
        name: 'Tour 2 ngày 1 đêm',
        duration: '2 ngày 1 đêm',
        price: '3,800,000đ',
        description: 'Tour cơ bản Ninh Thuận'
      },
      {
        id: '3d2n',
        name: 'Tour 3 ngày 2 đêm',
        duration: '3 ngày 2 đêm',
        price: '4,800,000đ',
        description: 'Tour trọn gói Ninh Thuận'
      }
    ]
  },
  'buon-me-thuot': {
    name: 'Buôn Mê Thuột',
    images: [
      'https://images.unsplash.com/photo-coffee-plantation',
      'https://images.unsplash.com/photo-dray-sap',
      'https://images.unsplash.com/photo-buon-don'
    ],
    location: 'Buôn Mê Thuột',
    price: '3,500,000đ',
    rating: 4.7,
    description: "Buôn Mê Thuột - thủ phủ cà phê với những đồi chè xanh mát, thác nước hùng vĩ và văn hóa Tây Nguyên đặc sắc. Tour mang đến trải nghiệm về văn hóa và thiên nhiên Tây Nguyên.",
    highlights: [
      "Tham quan đồi cà phê",
      "Khám phá thác Dray Sap - Dray Nur",
      "Trải nghiệm làng đồng bào Ê Đê",
      "Thăm Buôn Đôn - cưỡi voi",
      "Thưởng thức cà phê chồn"
    ],
    tourOptions: [
      {
        id: '2d1n',
        name: 'Tour 2 ngày 1 đêm',
        duration: '2 ngày 1 đêm',
        price: '3,500,000đ',
        description: 'Tour cơ bản Buôn Mê Thuột'
      },
      {
        id: '3d2n',
        name: 'Tour 3 ngày 2 đêm',
        duration: '3 ngày 2 đêm',
        price: '4,500,000đ',
        description: 'Tour trọn gói Buôn Mê Thuột'
      },
      {
        id: '4d3n',
        name: 'Tour 4 ngày 3 đêm',
        duration: '4 ngày 3 đêm',
        price: '5,500,000đ',
        description: 'Tour khám phá trọn vẹn Tây Nguyên'
      }
    ]
  },
};

const TourDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedTourOption, setSelectedTourOption] = useState(toursData[id as keyof typeof toursData].tourOptions[0].id);
  
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

  // Tìm tour option được chọn
  const currentTourOption = tour.tourOptions.find(option => option.id === selectedTourOption);

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
                      {currentTourOption.duration}
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
                  <h3 className="text-xl font-semibold">Lựa chọn tour</h3>
                  
                  <div className="space-y-3">
                    {tour.tourOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`p-4 rounded-lg cursor-pointer transition-all ${
                          selectedTourOption === option.id
                            ? 'bg-primary text-white'
                            : 'bg-white border hover:border-primary'
                        }`}
                        onClick={() => setSelectedTourOption(option.id)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{option.name}</h4>
                            <p className={`text-sm ${selectedTourOption === option.id ? 'text-white/90' : 'text-muted-foreground'}`}>
                              {option.duration}
                            </p>
                          </div>
                          <span className="text-lg font-bold">{option.price}</span>
                        </div>
                        <p className={`text-sm mt-2 ${selectedTourOption === option.id ? 'text-white/90' : 'text-muted-foreground'}`}>
                          {option.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-primary mr-2" />
                        <span>{currentTourOption.duration}</span>
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
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90 btn-hover"
                    onClick={() => setShowBookingForm(true)}
                  >
                    Đặt ngay với giá {currentTourOption.price}
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
