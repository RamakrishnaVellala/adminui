import React,{useEffect,useState} from "react"
import './App.css';

import Pagination from "./Components/pagination";

import axios from "axios"
import { AiFillEdit,AiFillDelete } from "react-icons/ai";

const App=()=>{
  const [data,setData]=useState([])
  const [perpage,setPerpage]=useState([])
  const [searchTerm,setSearchTerm]=useState("");
  useEffect(()=>{
    axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json").then(
      res=>{setData(res.data);setPerpage(res.data.slice(0,10));}
    )
  },[])
  const pageHandler=(pageNumber)=>{
    setPerpage(data.slice((pageNumber*10)-10,pageNumber*10))
  }
  return(
    <div className="App">
      <div>
        <input type="search" placeholder="search by name,email or role" className="form-control p-3 m-3"
          onChange={(event)=> setSearchTerm(event.target.value)}
        />
      </div>
      {data.length>1?
      <div>
      
      <table className="table table-striped m-3 border border-dark">
      <tr className="m-5">
        <th><input type="checkbox"/></th>
        <th>name</th>
        <th>email</th>
        <th>role</th>
        <th>Action</th>
      </tr>
     
 
      {perpage.filter((val)=> {
        if(searchTerm===""){
          return val
        }else if (val.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
          return val
        }
      })
      .map((post)=>
        <tr>
        <td><input type="checkbox"/></td>
        <td>{post.name}</td>
        <td>{post.email}</td>
        <td>{post.role}</td>
        <td><div>
           <AiFillEdit className="icon-red"/>
          <AiFillDelete className="icon-red"/>




        </div></td>
      </tr>

     )} <br/>
     </table>
     <div className="d-flex justify-content-evenly">
     <button className="btn btn-danger button1  rounded-pill">Delete selected</button>
     
      <Pagination data={data} pageHandler={pageHandler}/>
      </div>
      </div>:<p>Data not Loaded</p>}
    </div>
  )

}
  
export default App;
