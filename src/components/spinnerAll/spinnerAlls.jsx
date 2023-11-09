import React from 'react'
import { PulseLoader ,MoonLoader,BounceLoader,ClipLoader} from "react-spinners"
import "./spinnerAlls.css"

function SpinnerAlls() {
  return (
    <div className='container-spinner'>
         <ClipLoader size={60} color="#091945" />
    </div>
  )
}

export default SpinnerAlls