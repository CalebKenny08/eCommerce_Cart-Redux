import React, { useState } from 'react'

function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [errorState, setErrorState] = useState(false)

    // validation

    function signinForm(e) {
        e.preventDefault()


        if (email === '' && password === '') {
            setError('Fields cannot be empty')
        }
        else if (email === '') {
            setError('email cannot be empty')
        }

        else if (password === '') {
            setError('password cannot be empty')
        }
        else {
            const getUser = JSON.parse(localStorage.getItem("kinsmenUser"))
            if (getUser === null) {
                setError("Invalid credentials, no match found")
            }
            else if (getUser.email !== email || getUser.password !== password) {
                setError("invalid email or password")

            }

            else {
                setErrorState(true)
                setError("Validated...")
                window.location.href = "http://localhost:3000/"
            }
        }
    }






    return (
        <div>
            <div className='form-container'>
                <form className='login-form' onSubmit={signinForm}>
                    <h3 style={errorState ? { color: "green" } : { color: "red" }}>{error}</h3>

                    <div>
                        <input type='text' placeholder='email' onChange={(e) => { setEmail(e.target.value) }} />
                    </div>

                    <div>
                        <input type='password' placeholder='password' onChange={(e) => { setPassword(e.target.value) }} />
                    </div>

                    <div className='signup-option'>Don't have an account ? <a href='http://localhost:3000/signUp/'>SignUp</a> instead</div>

                    <button type='submit'>Sign-in</button>
                </form>
            </div>
        </div>
    )
}

export default Signin