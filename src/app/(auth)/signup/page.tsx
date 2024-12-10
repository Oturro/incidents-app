import React from 'react'
import SignUpForm from '../_components/SignUpForm'

export default function LoginPage() {
  return (
    <main className='w-full min-h-[100vh] bg-no-repeat bg-cover bg-center flex items-center justify-center' style={{ 
        backgroundImage: "url('body.jpg')"
     }}>
        <div 
            className='w-full sm:w-[348px] md:w-[405px] p-6 bg-white/70 sm:rounded-lg backdrop:blur-3xl'
            style={{
                backdropFilter: 'blur(5px)'
            }}
        >
            <SignUpForm />
        </div>
    </main>
  )
}
