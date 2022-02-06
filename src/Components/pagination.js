import React  from "react";

import "./pagination.css"

const Pagination=({data,pageHandler})=>{
    let pageNumbers=[]
    for (let i=1; i<Math.ceil(data.length/10)+1;i++){
        pageNumbers.push(i);
        }
    return(
        <div className="d-flex flex-row justify-content-center ">
           
            {pageNumbers.map(page=><div className="pagebutton btn btn-primary m-3" onClick={()=>pageHandler(page)}>{page}</div>)}
        </div>
    )
}

export default Pagination