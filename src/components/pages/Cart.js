import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Cart() {
    const store = useSelector(store => store)
    const dispatch = useDispatch()
    let cartItems = store.cart

    // remove item
    function removeItem(e) {
        const productId = e.target.id
        dispatch({ type: "REMOVE_PRODUCT", payload: productId })
    }

    let total = 0

    // function to increase Qty
    const updateItemQty = (e) => {
        const productId = e.target.id
        let modifiedCartItems = cartItems.map((item) => {
            if (item.id === productId && e.target.textContent === "+") {
                item = { ...item, qty: item.qty + 1 }
            }

            else if (item.id === productId && e.target.textContent === "-" && item.qty > 1) {
                item = { ...item, qty: item.qty - 1 }
            }
            return item
        })

        // saving changes to localStorage
        localStorage.setItem('cartItems', JSON.stringify(modifiedCartItems))

        // sending updated cart to store
        dispatch({ type: "UPDATE_CARTITEMS", payload: modifiedCartItems })
    }



    return (
        <div id='cart'>
            <div className='cart-container'>
                {cartItems.length === 0 ? <h2 style={{ marginTop: "2em" }}>Empty Cart</h2> : ""}
                {
                    cartItems.map((item, index) => {
                        return (
                            <div key={index} className='single-item-span-across'>
                                <div className='image-details'>
                                    <div className='cart-item-image'>
                                        <img src={item.imageURL} alt={item.name} />
                                    </div>


                                    <div className='details'>
                                        <h4>{item.name}</h4>
                                        <h5>${item.price}</h5>
                                        <h5 className='remove-item-btn' id={item.id} onClick={removeItem}>X</h5>
                                    </div>
                                </div>

                                <div className='description'> <strong> {item.name} </strong> sit amet consectetur adipisicing elit. Aperiam recusandae volu, numquam ducimus ipsam maiores <strong style={{ color: "red" }}> {item.price} </strong> </div>

                                <div className='qty'>
                                    <h5 onClick={updateItemQty} id={item.id}>+</h5>
                                    <h4>{cartItems[cartItems.indexOf(item)].qty}</h4>  {/* my js one liner */}
                                    <h5 onClick={updateItemQty} id={item.id}>-</h5>
                                </div>
                                <h6 style={{ display: 'none' }}>${total += item.qty * Number(item.price)}</h6>
                            </div>
                        )
                    })
                }

            </div>
            <h3 style={{ marginTop: "1em" }}>Total : ${total.toFixed(2)}</h3>
        </div >
    )
}

export default Cart