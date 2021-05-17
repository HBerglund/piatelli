import AliceCarousel from "react-alice-carousel";
import { CSSProperties } from "react";
import { Box } from "@material-ui/core";
import "react-alice-carousel/lib/alice-carousel.css";
import alternativeCursor from "../assets/alternativeCursor.png";
import bag1 from "../assets/bags/bag-1.png";
import bag2 from "../assets/bags/bag-2.png";
import bag3 from "../assets/bags/bag-3.png";
import bag4 from "../assets/bags/bag-4.png";
import bag5 from "../assets/bags/bag-5.png";

const handleDragStart = (e: any) => e.preventDefault();

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

function Carousel() {
  const items = [
    <img src={bag1} onDragStart={handleDragStart} alt="bag1" />,
    <img src={bag2} onDragStart={handleDragStart} alt="bag2" />,
    <img src={bag3} onDragStart={handleDragStart} alt="bag3" />,
    <img src={bag4} onDragStart={handleDragStart} alt="bag4" />,
    <img src={bag5} onDragStart={handleDragStart} alt="bag5" />,
  ];
  return (
    <Box style={customCursor}>
      <AliceCarousel
        activeIndex={1}
        items={items}
        mouseTracking
        responsive={responsive}
        autoWidth={true}
        autoPlay={true}
        autoPlayInterval={5000}
        infinite={true}
        disableDotsControls={true}
      />
    </Box>
  );
}

const customCursor: CSSProperties = {
  cursor: `url(${alternativeCursor}) 9 7, auto`,
};

export default Carousel;
