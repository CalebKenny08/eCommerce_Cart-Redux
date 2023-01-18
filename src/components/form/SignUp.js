import React, { useState } from 'react'


function SignUp() {

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorState, setErrorState] = useState(false)
    const [error, setError] = useState('')




    // form validation
    function myForm(e) {
        e.preventDefault()

        setErrorState(false)
        if (userName === '' && email === '' && password === '' && confirmPassword === '') {
            setError("*Fields cannot be empty")
        }

        else if (userName === '') {
            setError("*Username cannot be empty")
        }

        else if (email === '') {
            setError("*email cannot be empty")
        }

        else if (password === '') {
            setError("*Password cannot be empty")
        }

        else if (confirmPassword === '') {
            setError("* confirm password")
        }

        else if (confirmPassword !== password) {
            setError("*Password mismatched")
        }

        else {

            const kinsmenUser = {
                userName,
                email,
                password
            }

            if (localStorage.getItem("kinsmenUser") === null) {
                localStorage.setItem("kinsmenUser", JSON.stringify(kinsmenUser))
            }

            else {
                let users = JSON.parse(localStorage.getItem("kinsmenUser"))

                if (email === users.email) {
                    setError("email already taken")
                }

                else {
                    setErrorState(true)
                    setError('Validated...')
                    localStorage.setItem("kinsmenUser", JSON.stringify(kinsmenUser))

                    // redirecting
                    window.location.href = '/signIn'

                }
            }

        }





    }

    return (
        <div className='form-container'>
            <form className='signup-form' onSubmit={myForm}>

                <h3 style={errorState ? { color: "green" } : { color: "red" }} >{error}</h3>

                <div className='form-inputs-wrapper'>
                    <input type="text" placeholder='Username' onChange={(e) => { setUserName(e.target.value) }} />
                </div>

                <div className='form-inputs-wrapper'>
                    <input type="email" placeholder='email' onChange={(e) => { setEmail(e.target.value) }} />
                </div>

                <div className='form-inputs-wrapper'>
                    <input type="password" placeholder='password' onChange={(e) => { setPassword(e.target.value) }} />
                </div>

                <div className='form-inputs-wrapper'>
                    <input type="password" placeholder='confirm password' onChange={(e) => { setConfirmPassword(e.target.value) }} />
                </div>

                <div className='signin-option'>Already have an account ? <a href='http://localhost:3000/signIn/'>SignIn</a> instead</div>

                <button type='submit'>SignUp</button>
            </form>
        </div >
    )
}

export default SignUp