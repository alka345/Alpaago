import React ,{useState}from 'react';
import {auth} from '../../firebase';
import {signInWithEmailAndPassword} from 'firebase/auth'

const SignIn = () => {
    const [email , setEmail] = useState('');
    const [password ,setPassword] = useState('');

const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredientail) => {
        console.log(userCredientail);
    }).catch((error) => {
        console.log(error);
    });
}

  return (
    <div className='flex justify-center'>
      <form onSubmit={signIn}>
        <h1  className='font-mono text-2xl pt-11'>Login</h1>
        <label 
        className='flex pt-5'
        >Email</label>
        <input
        className='border rounded-3xl p-1.5 mt-1.5 '
        type="email"
        placeholder='mail@website.com' 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <label
        className='flex pt-5'
        >Password</label>
        <input
        className='border rounded-3xl p-1.5 mt-1.5' 
        type="password" 
        placeholder='Min. 8 character' 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <div className='mx-auto'>
        <button 
        className='flex mx-auto  border rounded-3xl pl-5 py-1.5 w-1/2  bg-blue-600 my-7 '
        type='submit'
        >Log In</button>
        </div>
      </form>
    </div>
  )
}

export default SignIn
