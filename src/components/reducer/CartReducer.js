import products from "../Data/Data"

const initialData = {
    cart: [],
    name: "",
    modal: {
        imgURL: '', modalState: false
    }
}

// code snippets to maintain products in cart after page refresh or reload
const checkLocalStorage = localStorage.getItem("cartItems")
if (!checkLocalStorage) {
    localStorage.setItem('cartItems', JSON.stringify([]))
}
else {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"))

    for (let x = 0; x < storedCartItems.length; x++) {
        initialData.cart = [...initialData.cart, storedCartItems[x]]
    }
}


function CartReducer(state = initialData, action) {

    // Add item to Cart
    function addToCart(productId) {
        const exist = state.cart.find((item) => { return item.id === productId })
        if (!exist) {
            let item = products.find((item) => {
                return item.id === productId
            })

            const updatedCart = [...state.cart, item]
            localStorage.setItem('cartItems', JSON.stringify(updatedCart))
            return updatedCart
        }

        else {
            alert(`product already in cart`)
            return state.cart
        }
    }

    // Remove item from Cart
    function removeItem(productId) {
        const filteredCart = state.cart.filter((cartItem) => cartItem.id !== productId)
        localStorage.setItem("cartItems", JSON.stringify
            (filteredCart))
        // window.location.reload(true)
        return filteredCart
    }


    // Reducer actions
    switch (action.type) {
        case "ADD_PRODUCT": return {
            ...state,
            cart: addToCart(action.payload)
        }

        case "REMOVE_PRODUCT": return {
            cart: removeItem(action.payload)
        }

        case "UPDATE_CARTITEMS": return {
            cart: action.payload
        }

        case "MODAL": return {
            ...state,
            modal: action.payload
        }

        default: {
            return state
        }
    }

}

export default CartReducer