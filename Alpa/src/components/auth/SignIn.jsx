import React ,{useState}from 'react';
import auth from '../../firebase';
import {signInWithEmailAndPassword} from 'firebase/auth'

const SignIn = () => {
    const [email , setEmail] = useState('');
    const [password ,setPassword] = useState('');

const signIn = () => {
    // TODO:sign In
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredientail) => {
        console.log(userCredientail)
    }).catch((error) => {
        console.log(error);
    });
}

  return (
    <div>
      <form onSubmit={signIn}>
        <h1>Log In to your Account</h1>
        <input type="email"
        placeholder='Enter your email' 
        value={email}
        onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Enter your password' value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Log In</button>
      </form>
    </div>
  )
}

export default SignIn
