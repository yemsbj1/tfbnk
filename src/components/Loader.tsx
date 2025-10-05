import React from 'react'
import { SvgSpinners12DotsScaleRotate } from './svgIcons'

export default function Loader() {
  return (
    <div className='h-screen flex bg-white items-center justify-center fixed z-50 w-full left-0 right-0 top-0'>
        <div className="text-[#de996f] flex flex-col items-center justify-center text-base sm:text-xl text-center p-3">
          <SvgSpinners12DotsScaleRotate className="fill-[#de996f] w-[70px] h-[70px]" />
          <span>Please wait while your data load.</span>  
        </div>
    </div>
  )
}
