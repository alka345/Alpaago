import {createUserWithEmailAndPassword } from "firebase/auth";
import React, {useState} from "react";
// import {auth} from '../../firebase';
// Import the named export 'auth' from the 'firebase.js' module
// import { auth } from './src/firebase.js';
import { auth } from "../../firebase";

// Now you can use 'auth' in your code


const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword]=useState("");

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            console.log(userCredential);
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className=' flex  justify-center'>
            <form onSubmit={signUp}>
                <h1 className='font-mono text-2xl pt-8'>Create Account</h1>
                <label className='flex pt-5'>Email</label>
                <input
                className="p-1 border rounded-3xl mt-1.5"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ></input>
                <label className='flex pt-5'>Password</label>
                <input
                className="p-1 border rounded-3xl mt-1.5"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button
                className='flex mx-auto border rounded-3xl px-5 py-1 mt-5 bg-blue-600'
                type="submit"
                >Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;