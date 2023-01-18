import React from 'react'

function FeaturedProductsView({ featuredProduct }) {
  return (
    <div className='single-featured-products-child-container'>
      <div className='image-container'>
        <img src={featuredProduct.imageURL} alt='' />
      </div>
    </div>
  )
}

export default FeaturedProductsView