import React from 'react'

const Header = () => {
  return (
    <>
        <div className="bg-gradient-to-r from-sky-200 to-pink-100 h-40 bg-opacity-[1px] bg-fixed ">
            <div className='flex items-center justify-center pt-3'>
                <header className='header1 font-Montserrat text-8xl text-[#fabecdd0] italic'>
                    A
                </header>
                <header className='header2 font-Montserrat text-4xl text-[#8b89898c] tracking-wide italic pt-9'>
                    rtHub
                </header>
            </div>
            <div className="subheading flex items-center justify-center">
                Where shop meets it's customers
            </div>
        </div>
    </>
  )
}

export default Header