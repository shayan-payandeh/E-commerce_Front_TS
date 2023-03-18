import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import NextLink from 'next/link';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import styles from '@/styles/component/CardSlider.module.scss';
import { url } from '@/utils/values';
import { IProduct } from '@/utils/interface/product';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1201 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1200, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1023, min: 660 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 659, min: 0 },
    items: 1,
  },
};

type HomeProps = {
  products: IProduct[];
  title: string;
};

function CardSlider({ products, title }: HomeProps) {
  return (
    <>
      {products && (
        <div className={styles.carouselContainer}>
          <div className={styles.titleContainer}>
            <span>{title}</span>
          </div>
          <Carousel
            arrows={true}
            removeArrowOnDeviceType={['tablet', 'mobile', 'desktop']}
            showDots={false}
            responsive={responsive}
            className={styles.carousel}
            autoPlay={true}
            infinite={true}
          >
            {products.map((product) => (
              <NextLink
                key={product.slug}
                href={`${url.productsUrl}/${product.slug}`}
                passHref
              >
                <Card className={styles.carouselCard}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      style={{
                        height: '250px',
                        width: '100%',
                        objectFit: 'fill',
                      }}
                      image={product.image}
                    />
                    <CardContent>
                      <Typography>
                        <strong>{product.name}</strong>
                      </Typography>
                      <br />
                      <Typography color="textSecondary">
                        <em>{product.description}</em>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </NextLink>
            ))}
          </Carousel>
        </div>
      )}
    </>
  );
}

export default CardSlider;
