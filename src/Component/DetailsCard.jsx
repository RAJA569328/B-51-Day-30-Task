import React, { useContext, useEffect } from "react";
import { Data } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DetailsCard() {
  let { Details, setDetails, EditID, setEditID, fetchData } = useContext(Data);

  let navigate = useNavigate();

 async function handleDelete(id) {    
    try {
        let del = await axios.delete(`https://65ba3b73b4d53c0665525c3c.mockapi.io/posts/users/${id}`);
        const response = await axios.get('https://65ba3b73b4d53c0665525c3c.mockapi.io/posts/users');
        setDetails(response.data);
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }

      fetchData()
    }

    useEffect(()=>{
      fetchData()
    },[])

  return (
    <>
      <br />
      <div className="container-fluid row">
        {
            Details.map((value) => {
                return (
                    <div key={value.id} className="card" style={{width: "18rem",border: "2px solid black", padding: "20px",margin: "15px",}}>
                        <div className="card-body">
                            <h5 className="card-title">
                            Name : <br /> {value.name}
                            </h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            contact :
                            <li className="list-group-item"> Email : {value.email}</li>
                            <li className="list-group-item"> Address : {value.address}</li>
                            <li className="list-group-item">Phone Number : {value.phone}</li>
                        </ul>
                        <ul className="list-group list-group-flush">
                            Working Details :
                            <li className="list-group-item"> Company : {value.company}</li>
                            <li className="list-group-item"> Website : {value.website}</li>
                        </ul>
                        <div>
                            <button className="btn btn-primary" onClick={() => navigate(`/edit/${value.id}`)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(value.id)}>Delete</button>
                        </div>
                    </div>
          );
        })}
        </div>
        </>
        )
        
     
}

export default DetailsCard;


