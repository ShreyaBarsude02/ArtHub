import React from 'react'

const GeneralHeader = (props) => {
  return (
    <>
        <div className="bg-gradient-to-r from-sky-200 to-pink-100 h-40 bg-opacity-[1px] bg-fixed">
            <div className='flex items-center justify-center pt-3'>
                <header className='header2 font-Montserrat text-5xl text-[#8b89898c] tracking-wide italic pt-9'>
                    {props.heading}
                </header>
            </div>
            <div className="subheading flex items-center justify-center">
                {props.subheading}
            </div>
            </div>
    </>
  )
}

export default GeneralHeader