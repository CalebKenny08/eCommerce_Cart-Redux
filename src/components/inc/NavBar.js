import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AiOutlineLogout } from "react-icons/ai";

function NavBar() {
    const [userName, setUserName] = useState("")


    function clearUser() {
        setUserName("")
        // window.location.reload(true)
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("kinsmenUser"))
        console.log(user)
        if (!user) {
            setUserName("User")
        }
        else if (user && window.location.href === 'http://localhost:3000/') {
            setUserName(user.userName)
            console.log(user.userName)
        }
        console.log(userName)
    }, [])


    const store = useSelector(store => store)
    return (
        <div className='nav-wrapper'>
            <nav>
                <div className='nav-contents-wrapper'>
                    <div className='brand'>
                        <h1> <Link to="/" style={{ color: "white" }}>Brand</Link></h1>
                    </div>

                    <div className='brand-caption'>
                        <h2> <Link to="/" style={{ color: "white" }}>Luxury Collections</Link></h2>
                    </div>

                    <div className='cart'>
                        <h3>
                            <Link to="./cart" style={{ color: "white" }}>Cart
                                {store.cart.length === 0 ? <></> : <span id='cart-badge'>{store.cart.length}</span>}
                            </Link>
                        </h3>&nbsp;&nbsp;&nbsp;&nbsp;
                        <h4><Link to="" style={{ color: "rgba(129, 255, 23, 0.7)" }}>{userName.toUpperCase()}</Link></h4>&nbsp;&nbsp;
                        <Link to="/signin" onClick={clearUser}><AiOutlineLogout size={"1.5rem"} style={{ color: "rgba(255,0,0,0.9)" }} /></Link>
                    </div>
                </div>
            </nav>
        </div>

    )
}

export default NavBar