import React, { useContext, useRef } from 'react'
import { Data } from '../App'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateForm() {

  let { Details, setDetails, EditID, setEditID, fetchData} = useContext(Data)

  let navigate= useNavigate()

  let NameRef = useRef(null);
  let userNameRef = useRef(null);
  let EmailRef = useRef(null);
  let AddressRef = useRef(null);
  let PhoneNumberRef = useRef(null);
  let WebsiteRef = useRef(null);
  let CompanyRef = useRef(null);
  
  async function handleClick(event){
      try {
        event.preventDefault()
      let CreateObject = {
            name: NameRef.current.value,
            username: userNameRef.current.value,
            email: EmailRef.current.value,
            address: AddressRef.current.value,
            phone: PhoneNumberRef.current.value,
            website: WebsiteRef.current.value,
            company: CompanyRef.current.value,
            id: +Details[Details.length - 1].id + 1
            }
        let add = await axios.post('https://65ba3b73b4d53c0665525c3c.mockapi.io/posts/users',CreateObject)
        const response = await axios.get('https://65ba3b73b4d53c0665525c3c.mockapi.io/posts/users');
        setDetails(response.data);

        NameRef.current.value = '';
        userNameRef.current.value = '';
        EmailRef.current.value = '';
        AddressRef.current.value = '';
        PhoneNumberRef.current.value = '';
        WebsiteRef.current.value = '';
        CompanyRef.current.value = ''

        navigate('/card-details')

      } catch (error) {
        console.error('Error fetching data:', error);
      }

      fetchData()
  }

  return (<>
  <div>
    <h1>CREATE DATA</h1>
    <form onSubmit={()=> handleSubmit()}>
      <label>Name : <input type="text" ref={NameRef} /></label><br /><br />
      <label>User Name : <input type="text" ref={userNameRef}/></label><br /><br />
      <label>Email : <input type="email" ref={EmailRef}/></label><br /><br />
      <label>Address : <textarea name="address" cols="30" rows="10" ref={AddressRef}></textarea></label><br /><br />
      <label>Phone Number : <input type="number" ref={PhoneNumberRef}/></label><br /><br />
      <label>Website : <input type="text" ref={WebsiteRef}/></label><br /><br />
      <label>Company : <input type="text" ref={CompanyRef}/></label>
    </form><br />
    <button onClick={(e) => handleClick(e)}>Create Data</button>
  </div>
  </>
  )
}

export default CreateForm