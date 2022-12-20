export const prevSlide = (totalImg, slide, setSlide) => {
  if (slide === 0) {
    setSlide(totalImg - 1);
  } else {
    setSlide(slide - 1);
  }
};
