import React from 'react'
import '../../styles/Blog.css'
import CarouselCategory from './CarouselCategory'

export default function Blog() {
    return (
        <div className='main-box'>
            <div className='mission-Container'>
                <h1>MindGrow Mission</h1>
                <p>
                    MindGrow is centered around our core values of diversity, equity and inclusion. Its purpose is to bring awareness to the power of medical cannabis through education and community enrichment. By continuing to educate about the benefits of Cannabinoids on health applications, we can begin to break the stigmas attached to cannabis, provide a greater understanding on the benefits of this incredible plant, and help deliver a positive impact within the communities in which we operate. Our purpouse is to invest in the medical industry to uncover more benefits and help people improving their quality of life through the usage of this kind of products.
                </p>
            </div>
            <div className='publications-box'>
                <h2 className='cat-title'>Categories</h2>
                <CarouselCategory />
            </div>
        </div>
    )
}
