import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import banner1 from "@/assets/images/1.webp";
import banner2 from "@/assets/images/2.avif";
import banner3 from "@/assets/images/3.webp";
import banner4 from "@/assets/images/4.webp";

const Banner = () => {
  const sortedImages = [banner1, banner2, banner3, banner4];

  //-------------------------------------------------------------
  const [presentImageIndex, setPresentImageIndex] = useState(0);

  const handlePrevImage = () => {
    if (sortedImages) {
      setPresentImageIndex((prev) =>
        prev === 0 ? sortedImages.length - 1 : prev - 1
      );
    }
  };
  const handleNextImage = () => {
    if (sortedImages) {
      setPresentImageIndex((prev) =>
        prev === sortedImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  useEffect(() => {
    const timer = setTimeout(handleNextImage, 3500);
    return () => clearTimeout(timer);
  }, [presentImageIndex]);
  //-------------------------------------------------------------

  return (
    <section
      aria-label="배너"
      className="relative w-full h-80 bg-gray-300 overflow-hidden"
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${presentImageIndex * 100}%)`,
        }}
      >
        {sortedImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`carousel-${index}`}
            className="h-80 w-full flex-shrink-0 object-cover"
          />
        ))}
      </div>
      <div className="absolute top-32 w-full flex flex-row justify-between items-center p-5">
        <Button
          variant="outline"
          type="button"
          onClick={handlePrevImage}
          className="rounded-full size-12 opacity-40"
          aria-label="이전 배너 보기 버튼"
        >
          <div>
            <ChevronLeftIcon className="size-8" />
          </div>
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={handleNextImage}
          className="rounded-full size-12 opacity-40"
          aria-label="다음 배너 보기 버튼"
        >
          <div>
            <ChevronRightIcon className="size-8" />
          </div>
        </Button>
      </div>
    </section>
  );
};

export default Banner;
