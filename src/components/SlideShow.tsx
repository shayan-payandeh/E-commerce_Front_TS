import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Image from 'next/legacy/image';
import slideImage1 from '@/assets/images/slideImage1.jpg';
import slideImage6 from '@/assets/images/slideImage6.jpg';
import slideImage7 from '@/assets/images/slideImage7.jpg';
import slideImage8 from '@/assets/images/slideImage8.jpg';
import slideImage9 from '@/assets/images/slideImage9.jpg';
import styles from '@/styles/Home.module.scss';

const images = [
  slideImage1,
  slideImage6,
  slideImage7,
  slideImage8,
  slideImage9,
];

function SlideShow() {
  return (
    <div className={`slide-container  ${styles.slideShow}`}>
      <Fade>
        {images.map((image, index) => (
          <div className="each-slide" key={index}>
            <Image
              src={image}
              width={740}
              height={405}
              alt={`image${index + 1}`}
              layout="responsive"
            />
          </div>
        ))}
      </Fade>
    </div>
  );
}

export default SlideShow;
