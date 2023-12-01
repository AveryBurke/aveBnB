import React from 'react'
import Image from "next/image";

const logo = () => {
  return (
    <Image 
        alt='"Logo'
        className='hidden md:block cursor-pointer'
        height="50"
        width="50"
        src="/images/logo.png"
    />
  )
}

export default logo