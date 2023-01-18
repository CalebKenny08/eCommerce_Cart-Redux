import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signin from './components/form/Signin'
import SignUp from './components/form/SignUp'
import Cart from './components/pages/Cart'
import Home from './components/pages/Home'

// custom stylings
import "./components/styles/Styles.css"

//redux - state management
import { createStore } from "redux"
import CartReducer from './components/reducer/CartReducer'
import { Provider } from "react-redux"
import NavBar from './components/inc/NavBar'

function App() {

  const [storeUser, setStoreUser] = useState({})

  useEffect(() => {
    const user = localStorage.getItem('kinsmenUser')
    if (!user) {
      // window.location.href = "/signup"
      console.log('no active account')
    }
    else {
      setStoreUser(JSON.parse(localStorage.getItem('kinsmenUser')))
    }
  }, [])


  const store = createStore(CartReducer)

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='parent-container'>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home user={storeUser.userName} />} />
            <Route path='cart' element={<Cart />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='signin' element={<Signin />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App