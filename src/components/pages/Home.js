import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HomeView from './HomeView'
import products from '../Data/Data'
import featuredProducts from '../Data/FeaturedProductsData'
import FeaturedProductsView from './FeaturedProductsView'

function Home({ user }) {
    const store = useSelector(store => store)
    const dispatch = useDispatch()

    // event delegation for adding product to cart product
    function addToCart(e) {
        e.preventDefault()

        if (e.target.tagName === 'BUTTON') {
            // e.target.disabled = true
            e.target.textContent = "In Cart"
            const productId = e.target.parentElement.parentElement.parentElement.id
            dispatch({ type: "ADD_PRODUCT", payload: productId })
        }
    }

    // modal function
    let modalController = store.modal.modalState

    function terminateModal() {
        dispatch({
            type: "MODAL", payload: {
                imgURL: store.modal.imgURL, modalState: false
            }
        })
    }

    const show = {
        width: "35vw",
        height: "65vh"
    }
    const hide = {
        width: "0",
        height: "0"
    }

    return (
        <div>
            <div className='banner'>
                <div className='banner-text-wrapper'>
                    <div className='header-text'>
                        <h2>KINSMEN COLLECTION</h2>
                    </div>
                    <div className='shop-now'>
                        <h3> <a href='#product-section'>Shop Now</a></h3>
                    </div>
                </div>
            </div>

            {/* ---------modal--------- */}
            <div className='image-modal-wrapper' style={modalController ? show : hide}>
                <img src={store.modal.imgURL} alt='' className='modal-image' />
                <h4 className='cancel-modal' onClick={terminateModal}>X</h4>
            </div>
            {/* ---------modal Ends--------- */}

            {/* featured product */}
            <div className='featured-products-section'>
                <div className='featured-product-header'>
                    <h2>Featured Products</h2>
                </div>
                <div className='featured-products-container'>
                    {
                        featuredProducts.map((featuredProduct, index) => {
                            return (
                                <div className='single-featured-products' key={index}>
                                    <FeaturedProductsView featuredProduct={featuredProduct} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {/* featured product ends*/}

            <div className='products-section' id='product-section' onClick={addToCart}>
                <div className='products-section-header'>
                    <h1>All Products</h1>
                </div>
                <div className='products-wrapper'>
                    {
                        products.map((product, index) => {
                            return (
                                <div key={index} className='single-product-wrapper' id={product.id}>
                                    <HomeView product={product} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Home