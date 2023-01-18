import { Button } from 'bootstrap'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import index from 'toastify'

function HomeView({ product }) {
    const [btnText, setBtnText] = useState('Add To Cart')
    const [bgcolor, setBgColor] = useState("red")
    const store = useSelector(store => store)


    useEffect(() => {
        let inCart = store.cart.find((item) => item.id === product.id)
        if (inCart) {
            setBtnText("In Cart")
            setBgColor('yellowgreen')
        }
    }, [])

    const dispatch = useDispatch()

    function modal() {
        dispatch({
            type: "MODAL", payload: {
                imgURL: product.imageURL, modalState: true
            }
        })
    }



    return (
        <div className='single-product'>
            <div className='image'><img src={product.imageURL} alt='' onClick={modal} /></div>

            <div className='divider'></div>

            <div className='product-details-wrapper'>
                <div className='product-details'>
                    <h4>{product.name}</h4>
                    <h5>{product.price}</h5>
                </div>
                <button style={{ backgroundColor: bgcolor }} className='to-cart-btn'>{btnText}</button>
            </div>


        </div >
    )
}

export default HomeView