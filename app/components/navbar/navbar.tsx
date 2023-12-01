import React from 'react'
import Container from "../container";
import Logo from "../logo";

function navbar() {
  return (
    <div className='w-full bg-white z-10'>
        <div className='border-[1px]'>
            <Container>
                <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                    <Logo />
                </div>
            </Container>
        </div>
    </div>
  )
}

export default navbar