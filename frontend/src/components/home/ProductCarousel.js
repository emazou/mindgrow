import { Carousel } from 'antd';
import React from 'react';
import '../../styles/Carousel.css'

const ProductCarousel = () => (
  <div className='carousel-container'>
    <h2 className='carousel-title'>Our products</h2>
    <Carousel autoplay className='carousel'>
      <div className='carousel-div'>
        <img src="https://weedmaps.com/learn/wp-content/uploads/2020/05/181210_Nugs_017.jpg" alt="flowers" />
        <h3 className='carousel-title'>Cannabis</h3>
      </div>
      <div className='carousel-div'>
        <img src="https://fh1w93s8iw-flywheel.netdna-ssl.com/wp-content/uploads/2016/02/cannabistopical.jpg" alt="topicals" />
        <h3 className='carousel-title'>Topicals</h3>
      </div>
      <div className='carousel-div'>
        <img src="https://static.wikileaf.com/uploads/2020/03/vaporizer-down-picture-id861451686.jpg" alt="Vapers" />
        <h3 className='carousel-title'>Vapers</h3>
      </div>
      <div className='carousel-div'>
        <img src="https://cdn-prod.medicalnewstoday.com/content/images/articles/327/327420/picture-of-cannabis-cookies.jpg" alt="edibles" />
        <h3 className='carousel-title'>Edibles</h3>
      </div>
      <div className='carousel-div'>
        <img src="https://i.ibb.co/mD1Ntyh/pets.png" alt="pets" />
        <h3 className='carousel-title'>Pets</h3>
      </div>
    </Carousel>
  </div>
);

export default ProductCarousel;