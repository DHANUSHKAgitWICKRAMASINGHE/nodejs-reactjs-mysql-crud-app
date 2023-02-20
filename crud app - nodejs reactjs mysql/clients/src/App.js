import React,{ useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

const [name,setBookName]= useState("");
const [reviews,setReview]= useState("");
const [reviewList,setReviewList] =useState([]);
const [update,setupdateReviewList] =useState("");


useEffect(() => {
  Axios.get("http://localhost:3001/api/get").then((response) => {
    setReviewList(response.data);
  });
}, []);



const submitReview= ()=>{

  Axios.post("http://localhost:3001/api/insert",{
    name:name,
    reviews:reviews,
  });
  alert("Entered Your Review");

  setReviewList([
    ...reviewList,
    {name:name,reviews:reviews},

  ]);

};

const deleteReview = (Id)=>{
  Axios.delete(`http://localhost:3001/api/delete/${Id}`);
  alert("Are You sur?");
  window.location.reload();
  
  
};

const updateReview = (Id)=>{
  // Axios.put(`http://localhost:3001/api/update/${Id}`,{
  //   reviews:updateList,
  // });
  Axios.put("http://localhost:3001/api/update",{
    Id:Id,
    reviews:update,
  });
  
  alert("Are You sur to Update?");
  window.location.reload();
  
  
};

  return (
    <div className="App">
      <div>
        <h1 className='labl'>CRUD APPLICATION | BOOK REVIEWS</h1>
      </div>
      <div>
        <form>
          <ul className="form-style-1">
            <li>
              <label className='labl'>Book Name <span className="required">*</span></label>
              <input type="text" name ="bookName" className="field-divided" placeholder="" onChange={(e)=>{
                setBookName(e.target.value);
              }}/>
            </li>
            <li>
              <label className='labl'>Review <span className="required">*</span></label>
              <input type="text" name='review' className="field-long"  onChange={(e)=>{
                setReview(e.target.value);
              }}/>
            </li>
            <li>
              <input id='subInput' type="submit" value="Submit" onClick={submitReview}></input>
            </li>
          </ul>
        </form>

        <div className="container">
              {reviewList.map((val)=>{
                return  <div className="container">
                <div className="card">
                  <div className="box">
                    <div className="content">
                      <h2>0{val.Id}</h2>
                      <h3>{val.name}</h3>
                      <h5>Review</h5>
                      <p>{val.reviews}</p>
                      <div>
                      <button onClick={()=>{deleteReview(val.Id)}}>Delete</button>
                      <hr></hr>
                      <input type="text" id='updateInput' placeholder="  Enter your new Review" onChange={(e)=>{
                setupdateReviewList(e.target.value);
              }}/>
                      <button onClick={()=>{updateReview(val.Id)}}>Update</button>
                      </div>
                      
                    </div>
                  </div>
                </div> 
              </div>
              })}
        </div>
      </div>
    </div>
  );
}

export default App;
