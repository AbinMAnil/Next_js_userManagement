import axios from "axios";
import { useState } from "react";

const AddUserModal = ({ showModal, setUsers }) => {

     const [error, setError] = useState('');
     const [name, setName] = useState('');

     const addUser = async () => {
          if (!name) { setError('Please Enter a valid name'); return };
          try {
               const { data } = await axios.post('http://localhost:5000/api/crateUser', { userName: name });
               setUsers(state => [{ userName: data.username, _id: data._id }, ...state])
               showModal(false)

          } catch ({ response }) {
               setError(response.data.message)
          }
     }



     return <div className="modalContainer">

          <form action="" className="addUserFrom" onSubmit={(e) => e.preventDefault()}>
               <center> <h2>Enter  the deatils of the user...</h2></center>
               <button onClick={() => showModal(false)} className="closeModal shadow-sm" type="button">X</button>
               <div className="inputWrap">
                    <label htmlFor="">UserName</label>
                    <br />
                    <input onKeyUp={e => e.key === 'Enter' && addUser()} value={name} autoFocus onChange={e => { setName(e.target.value); setError("") }} type="text" className="shadow-nice" />
               </div>
               <center>
                    <div className="inputWrap">
                         <button onClick={addUser} type="button">Add User</button>
                         <p className="error"> {error}</p>
                    </div>
               </center>
          </form>
     </div>
}


export default AddUserModal;