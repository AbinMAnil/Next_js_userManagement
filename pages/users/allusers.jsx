import { useState } from "react";
import { FiEdit3 } from 'react-icons/fi';
import { AiOutlineCloseCircle, AiFillDelete } from "react-icons/ai"
import { FcCheckmark } from 'react-icons/fc'
import { BiUserPlus } from 'react-icons/bi'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import AddUserModal from "../../components/AddUesrMadal";
import ReactTooltip from 'react-tooltip';

const ListAllUsers = ({ users: allUsers }) => {

     const userDataInitialStage = { userName: '', _id: '' }

     const [isEdit, setIsEdit] = useState("");
     const [users, setUsers] = useState(allUsers.reverse());
     const [showModal, setShowModal] = useState(false);

     const [userData, setUserData] = useState(userDataInitialStage);



     const editUserName = async (position) => {
          if (!userData.userName) return;

          if (users[position]?.userName === userData.userName) return;


          try {
               const { data } = await axios.post('http://localhost:5000/api/updateUser', { id: userData._id, newUserName: userData.userName })

               setUsers(users.map(user => user._id === userData._id ? userData : user))
               toast.success(data.message);

          } catch (err) {
               toast.warning(err.response.message)
          } finally {
               setIsEdit("")
               setUserData(userDataInitialStage)
          }
     }

     const deleteUser = id => {

          Swal.fire({
               title: 'Are you sure?',
               text: "You won't be able to revert this!",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes, delete it!'
          }).then(async (result) => {
               if (result.isConfirmed) {

                    try {
                         const { data } = await axios.delete('http://localhost:5000/api/deleteUser', { data: { id: id } });
                         toast.success("User Deleted !");
                         setUsers(preState => preState.filter(user => user._id !== id));
                    } catch (err) {
                         toast.error(err.response.data.message)
                         console.log(err.response)
                    }
               }
          })
     }

     return <>

          <ToastContainer />
          <ReactTooltip className="tooltip" />

          {showModal && <AddUserModal showModal={setShowModal} setUsers={setUsers} />}
          <div className="container">
               <div className="headerBox">
                    <center><h2> Manage User </h2> </center>
                    <button onClick={() => setShowModal(true)} ><BiUserPlus style={{ fontSize: '20px' }} /> Add uesrs </button>
               </div>
               <div className="listBody">
                    {
                         users.length ? users?.sort().map((user, i) => {
                              return <div className="box" key={user._id}>
                                   <div className="left">
                                        {
                                             user._id === isEdit ?
                                                  <input autoFocus type="text" value={userData.userName} onKeyUp={e => e.key === 'Enter' && editUserName(i)} onChange={e => setUserData(preState => { return { ...preState, userName: e.target.value } })} />
                                                  : <h2 className="bigString" data-tip={user.userName}  >{user.userName}</h2>

                                        }
                                   </div>
                                   <div className="right">
                                        <button className=''>
                                             {user._id === isEdit ? <AiOutlineCloseCircle onClick={() => { setIsEdit(userDataInitialStage) }} className="c_red" /> : <FiEdit3 onClick={() => { setIsEdit(user._id); setUserData(user) }} className="c_yellow" />}
                                        </button>
                                        <button>
                                             {user._id === isEdit ? <FcCheckmark onClick={() => editUserName(i)} /> : <AiFillDelete className="c_red" onClick={() => deleteUser(user._id)} />}
                                        </button>
                                   </div>
                              </div>
                         }
                         )
                              :
                              <div className="center" style={{ height: '50%' }}>
                                   <h1>Add more uesrs </h1>
                                   <button onClick={() => setShowModal(true)}> <BiUserPlus style={{ fontSize: '20px' }} /> Add user </button>
                              </div>
                    }
               </div>
          </div>
     </>
}

export default ListAllUsers;

export async function getServerSideProps() {

     const res = await fetch('http://localhost:5000/api/getUsers');
     const data = await res.json();



     if (!data.data)
          return {
               notFound: true,
          }

     return {
          props: {
               users: data.data
          }
     }
}