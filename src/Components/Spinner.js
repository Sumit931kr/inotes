import React  from "react";
import loading from '../image/ajax-loader.gif'

const Spinner = ()=> {
           return (
               <div id="cont">
               <div className="text-center" id="spin">
                <img className="my-3" src={loading} alt="loading" />
            </div>
               </div>
        )
    
}
export default Spinner