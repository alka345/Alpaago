import React from 'react'
import SignIn from '../components/auth/SignIn'
import SignUp from '../components/auth/SignUp'
import AuthDetails from '../components/AuthDetails'
// import bgImg from './left-bg.png';

function authPage() {
  return (
    <>
        <div className='grid grid-cols-2 divide-x text-white'>
            <div className='bg-black'>
            {/* w-full h-screen */}
      <SignIn/>
      <SignUp/>
      <AuthDetails/>
      </div>
     <div className='w-full h-screen bg-slate-600'>
        <img className='w-full h-screen relative' src="left-bg.png" alt="BG" />
     </div>
      </div>
    </>
  )
}
// npm run dev

export default authPage
