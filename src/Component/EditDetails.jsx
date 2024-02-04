import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Data } from '../App';

function EditDetails() {

  let {Details, setDetails, EditID, setEditID, fetchData} = useContext(Data)

  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    address: '',
    phone: '',
    website: '',
    company: ''
  });

  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://65ba3b73b4d53c0665525c3c.mockapi.io/posts/users/${params.id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  
  async function handleSubmit (e) {
    e.preventDefault()
    let EditedObject={
      name: formData.name,
      username: formData.username,
      email: formData.email,
      address: formData.address,
      phone: formData.phone,
      website: formData.website,
      company: formData.company,
      id: params.id
    }
    try{
      let response = await axios.put(`https://65ba3b73b4d53c0665525c3c.mockapi.io/posts/users/${params.id}`, EditedObject)
      let getResponse = await axios.get(`https://65ba3b73b4d53c0665525c3c.mockapi.io/posts/users`)
      setDetails(getResponse.data)
      navigate('/card-details')
    }catch(error){
      console.log('Some Error in Edit Page', error)
    }

    
  };

  return (
    <div>
      <h1>EDIT/UPDATE</h1>
      <form onSubmit={handleSubmit}>
        <label>Name : <input type="text" name="name" value={formData.name} onChange={handleChange} /></label><br /><br />
        <label>User Name : <input type="text" name="username" value={formData.username} onChange={handleChange} /></label><br /><br />
        <label>Email : <input type="email" name="email" value={formData.email} onChange={handleChange} /></label><br /><br />
        <label>Address : <textarea name="address" cols="30" rows="10" value={formData.address} onChange={handleChange}></textarea></label><br /><br />
        <label>Phone Number : <input type="text" name="phone" value={formData.phone} onChange={handleChange} /></label><br /><br />
        <label>Website : <input type="text" name="website" value={formData.website} onChange={handleChange} /></label><br /><br />
        <label>Company : <input type="text" name="company" value={formData.company} onChange={handleChange} /></label>
        <br /><br />
        <button type="submit">Update Data</button>
      </form>
    </div>
  );
}

export default EditDetails;