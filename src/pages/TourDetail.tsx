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
import { describe } from 'node:test';

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
      'https://cdn3.ivivu.com/2023/10/du-lich-Da-Lat-ivivu1.jpg',
      'https://media.vneconomy.vn/images/upload/2023/07/06/1688465738-grasp-the-rainy-season-travel-tips-to-da-lat.jpg',
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
      'https://ik.imagekit.io/tvlk/blog/2022/03/dia-diem-du-lich-mui-ne-cover.jpg',
      'https://tripmap.vn/wp-content/uploads/2025/03/mui-ne-va-bai-toan-giu-gin-thuong-hieu-du-lich-truoc-ke-hoach-sap-nhap-hanh-chinh-1742546645597-768x474.webp',
      'https://vcdn1-dulich.vnecdn.net/2022/04/03/MuiNeVNExpress3075891542181990-8691-6492-1648974014.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=E-1Y-hG3RxXRjUXHFvKQ6Q',
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
      'https://media.loveitopcdn.com/35545/cho-noi.jpg',
      'https://thamhiemmekong.com/wp-content/uploads/2019/05/caudibo-cantho.jpg',
      'https://ik.imagekit.io/tvlk/blog/2021/11/dia-diem-du-lich-can-tho-cover.jpg',
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
      'https://i2.ex-cdn.com/crystalbay.com/files/content/2025/01/22/du-xuan-tay-ninh-2025-top-7-dia-diem-du-xuan-hap-dan-khong-the-bo-lo-1-1136.jpg',
      'https://danviet.ex-cdn.com/files/f1/296231569849192448/2024/8/14/saigontouristnui-bd-17236334801551352657748.jpg',
      'https://i2.ex-cdn.com/crystalbay.com/files/content/2024/11/08/noc-nha-nam-bo-1448.jpg',
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
      'https://cdn.tgdd.vn/Files/2023/12/04/1556689/toa-do-du-lich-cai-be-tien-giang-co-gi-de-kham-pha-202312042359110019.jpg',
      'https://vietnamdiscovery.com/wp-content/uploads/2020/02/Vinh-Trang-Pagoda.jpg',
      'data:image/jpeg;base64,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',
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
      'https://www.homecredit.vn/static/2b8c7bae047d087c6ac95c3eb0d806a9/ab7c8/00_canh_dep_an_giang_banner_55f30a26f8.webp',
      'https://bizweb.dktcdn.net/100/094/983/files/1-copy-6a8701e1-f45f-4b92-a71e-fb636ebc881a.jpg?v=1584784707877',
      'https://sakos.vn/wp-content/uploads/2023/05/rung-tra-su-an-giang.jpg',
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
      'https://i2.ex-cdn.com/crystalbay.com/files/content/2024/06/26/du-lich-soc-trang-1-1628.jpg',
      'https://media.vneconomy.vn/w800/images/upload/2022/11/10/ghe-ngo.jpg',
      'https://danviet.mediacdn.vn/296231569849192448/2021/5/7/base64-16203812910081711050338.png',
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
      'https://i2.ex-cdn.com/crystalbay.com/files/content/2024/06/26/du-lich-ca-mau-1-1430.jpg',
      'https://halophuot.com/static/uploads/blog/1737958354_muicamau-.jpg',
      'https://ik.imagekit.io/tvlk/blog/2021/10/du-lich-ca-mau-1.jpg',
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
      'https://i2.ex-cdn.com/crystalbay.com/files/content/2024/06/18/du-lich-bac-lieu-1-1006.jpg',
      'https://www.sunrisehotelbaclieu.com/files/images/bac-lieu-co-gi.jpg',
      'https://mia.vn/media/uploads/blog-du-lich/bien-bac-lieu-hoang-hon-tuyet-dep-1699487868.jpg'
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
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpZdB4ijkTvSeYRz_pbaX6cab6telpO9ZWxQ&s',
      'https://static.vinwonders.com/2022/04/rach-gia-co-gi-choi-1-700x435.jpg',
      'https://static.vinwonders.com/production/hon-tre-kien-giang-3.jpg'
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
      'https://vcdn1-dulich.vnecdn.net/2024/05/15/hatienTT-6402-1715768610.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=ehX2HABb57GqP4098c7ylg',
      'https://static.vinwonders.com/production/thach-dong-2.jpeg',
      'https://ik.imagekit.io/tvlk/blog/2022/12/khu-du-lich-mui-nai-9.jpg'
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
      'https://tinviettravel.com/uploads/tours/2020_07/tham-quan-mieu-ba-chua-xu.593ac59194ba8ad60822d2a03acdcd6b.jpg',
      'https://i2.ex-cdn.com/crystalbay.com/files/content/2024/06/10/du-lich-chau-doc-1-1135.jpg',
      'https://zoomtravel.vn/upload/product/tour-chau-doc-rung-tram-tra-su30201.jpg'
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
      'https://cattiennationalpark.com.vn/wp-content/uploads/2023/03/word-image-6772-3-768x512.jpeg',
      'https://leutraihanoi.com/wp-content/uploads/2023/07/nui-chua-chan-1.png',
      'https://housevnstorage.blob.core.windows.net/media/bien-hoa-20230320111349661.jpeg'
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
      'https://i2.ex-cdn.com/crystalbay.com/files/content/2024/06/11/du-lich-binh-duong-1-1340.jpg',
      'https://www.homepaylater.vn/static/cb5a95191dfaae20243fe36f1041bce4/6433b/khu_du_lich_lac_canh_dai_nam_van_hien_la_mot_trong_nhung_khu_du_lich_hap_dan_ma_ai_cung_ao_uoc_duoc_dat_chan_den_mot_lan_d2d3323e2c.webp',
      'https://khudulichdainam.com.vn/thumbs/1920x894x1/upload/photo/banner-dainam-4964.jpg'
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
      'https://media.baobinhphuoc.com.vn/upload/news/9_2023/6ec96c9c3ffdeba3b2ec_1_09232626092023.jpg',
      'https://luhanhvietnam.com.vn/du-lich/vnt_upload/news/07_2020/vuon_quoc_gia_bu_gia_map_binh_phuoc_co_gi-min.jpg',
      'https://52hz.vn/wp-content/uploads/2023/06/thac-mo-binh-phuoc-nhu-thao-nguyen-xanh.jpg'
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
      'https://benhvienquynhon.gov.vn/wp-content/uploads/2023/05/bai-tam-quy-nhon.jpg',
      'https://ik.imagekit.io/tvlk/blog/2024/02/ky-co-cover.jpg',
      'https://bizweb.dktcdn.net/100/349/716/files/eo-gio-quy-nhon-2.png?v=1728658998803'
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
      'https://svhttdl.phuyen.gov.vn/wps/wcm/connect/svhttdl/9fe7cf17-0bf8-4af7-b0bd-f0a9417eb5ec/1.jpg?MOD=AJPERES&CACHEID=9fe7cf17-0bf8-4af7-b0bd-f0a9417eb5ec',
      'https://i2.ex-cdn.com/crystalbay.com/files/content/2024/08/27/bai-xep-phu-yen-2-1420.jpg',
      'https://tuyhoago.com/wp-content/uploads/2020/08/du-lich-hai-dang-mui-dien-dong-hoa-phu-yen-768x632.jpg'
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
      'https://media.dantocmiennui.vn/images/5c0c54f95c9777a45a8f5910a7a986a52e951568afe1311fc12ebc3f56f3d2ea55a4efac236c377cad7dc4d4cc91ec624357de0c1c3bbfd526d2da24a3ac9493/ninhthuan-1.jpg.webp',
      'https://i2.ex-cdn.com/crystalbay.com/files/content/2023/12/25/tour-ninh-thuan-4-ngay-3-dem-1-2057.jpg',
      'https://cdn.tgdd.vn/Files/2021/06/21/1361927/top-10-dia-diem-du-lich-ninh-thuan-dep-noi-tieng-nhat-202309271512142938.jpg'
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
      'https://cdn3.ivivu.com/2022/09/bu%C3%B4n-ma-thu%E1%BB%99t.jpeg',
      'https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/shutterstock1571845630hugebuonmathuot-1710985878573.jpg',
      'https://longvanlimousine.vn/wp-content/uploads/2025/01/IMG_8738.jpeg'
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
            Quay lại Tours
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
                    <TabsTrigger value="highlights">Nổi bật</TabsTrigger>
                    <TabsTrigger value="itinerary">Lịch trình</TabsTrigger>
                    <TabsTrigger value="details">Chi tiết</TabsTrigger>
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
                            <span>Tài xế chuyên nghiệp, nhiều kinh nghiệm</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                            <span>Xe đời mới, hiện đại, đầy đủ tiện nghi (máy lạnh, ghế ngả, wifi…)</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                            <span>Nhiên liệu và phí cầu đường trong suốt hành trình</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                            <span> Bảo hiểm hành khách theo quy định</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                            <span>Đưa đón tận nơi theo yêu cầu (tại nhà, sân bay, bến xe, khách sạn…)</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                            <span>Hỗ trợ hành lý và tư vấn lộ trình tối ưu</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-lg font-medium">Không bao gồm</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="text-red-500 font-bold mr-2">×</span>
                            <span>Chi phí ăn uống, nghỉ ngơi của tài xế nếu thuê dài ngày</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-red-500 font-bold mr-2">×</span>
                            <span>Vé tham quan tại các điểm đến (nếu có)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-red-500 font-bold mr-2">×</span>
                            <span>Chi phí phát sinh ngoài hợp đồng (nếu có)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-red-500 font-bold mr-2">×</span>
                            <span>Thuế VAT (nếu có yêu cầu xuất hóa đơn)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-red-500 font-bold mr-2">×</span>
                            <span>Tiền tip cho tài xế (tùy ý khách hàng)</span>
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
                    <a href="tel:+84909924335" className="flex items-center justify-center text-primary font-medium">
                      +84 909 924 335
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
