import Carousel from 'react-multi-carousel';
import CAT777GCarousel from '@assets/customer/carouselUnit/CAT777GCarousel.png'
import KomatsuHD785Carousel from '@assets/customer/carouselUnit/KomatsuHD785Carousel.png'
import LoaderCAT972MCarousel from '@assets/customer/carouselUnit/LoaderCAT972MCarousel.png'
import { Box, Typography } from '@mui/material';
import { Face, PersonOutlineOutlined } from '@mui/icons-material'
import { flexCenter, flexStart, flexEnd } from '@themes/commonStyles';
import 'react-multi-carousel/lib/styles.css';


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};


const CarouselItems = () => [
  { img: KomatsuHD785Carousel, name: "Off-Highway Truck", type: "Komatsu HD785", padding:"0 10% 20% 0"},
  { img: LoaderCAT972MCarousel, name: "Loader", type: "CAT 972 M", padding:"15% 70% 0 0"},
  { img: CAT777GCarousel, name: "Off-Highway Truck", type: "CAT 777G", padding:"0 10% 20% 0"  }
]
const CarouselSection = () => {
  return (
    <Box>
      <Carousel
        responsive={responsive}
        swipeable={true}
        autoPlay={true}
        autoPlaySpeed={10000}
        infinite={true}
        arrows={true}
      // customButtonGroup={}
      >
        {CarouselItems().map((item, index) => (
          <Box key={index} sx={{
            ...flexEnd, backgroundImage: `url(${item.img})`, backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '650px', flexDirection: "column",
            backgroundSize: "cover", backgroundPosition: "bottom", borderRadius:"3%"
          }}>
            <Box sx={{ display: "flex", justifyContent: "flex-start",flexDirection:"column", alignItems: "flex-end", width: "100%", p: item.padding}}>
              <Typography sx={{ fontSize: "32px", color: "#D9D630", fontWeight: "400", marginBottom: "5px", textShadow: "0 1px 1px rgba(0, 0, 0, 1)" }}>
                {item.name}
              </Typography>
              <Typography sx={{ fontSize: "46px", color: "#D9D630", fontWeight: "bold", marginTop: "5px", textShadow: "0 1px 1px rgba(0, 0, 0, 1)" }}>
                {item.type}
              </Typography>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  )
}

export default CarouselSection