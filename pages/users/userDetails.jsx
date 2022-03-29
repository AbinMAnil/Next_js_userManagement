import { useState } from "react";
import { FiEdit3 } from 'react-icons/fi';
import { AiOutlineCloseCircle, AiFillDelete } from "react-icons/ai"
import { FcCheckmark } from 'react-icons/fc'
import { ImUsers } from 'react-icons/im'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import Swal from 'sweetalert2';
import { useRouter } from "next/router";

const UserDetails = ({ user }) => {

     const router = useRouter();
     const [isEdit, setIsEdit] = useState(false);
     const [userName, setUserName] = useState(user.userName);

     const editUserName = async () => {
          if (!userName) return
          if (userName === user.userName) return;
          try {
               const { data } = await axios.post('http://localhost:5000/api/updateUser', { id: user._id, newUserName: userName })
               toast.success(data.message);
               toast.warning(err.response.message)
          } finally {
               setIsEdit(false)
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
                         router.push("/")

                    } catch (err) {
                         toast.error(err?.response?.data?.message)
                    }
               }
          })
     }


     return <>

          <ToastContainer />
          <div className="container">
               <div className="headerBox">
                    <center><h2> Manage User </h2> </center>
                    <Link href="/users/allusers" ><button><ImUsers style={{ fontSize: '20px' }} /> All uesrs </button></Link>
               </div>
               <div className="box">
                    <div className="left">
                         {
                              isEdit ?
                                   <input type="text" value={userName} onChange={e => setUserName(e.target.value)} onKeyUp={e => e.key === 'Enter' && editUserName()} />
                                   : <h2>{userName}</h2>
                         }
                    </div>
                    <div className="right">
                         <button className=''>
                              {isEdit ? <AiOutlineCloseCircle onClick={() => { setIsEdit(false); setUserName(user.userName) }} className="c_red" /> : <FiEdit3 onClick={() => { setIsEdit(true); setUserName(userName) }} className="c_yellow" />}
                         </button>
                         <button>
                              {isEdit ? <FcCheckmark onClick={editUserName} /> : <AiFillDelete className="c_red" onClick={() => deleteUser(user._id)} />}
                         </button>
                    </div>
               </div>
          </div>
     </>

}

export default UserDetails;

export async function getServerSideProps({ query }) {

     const res = await fetch(`http://localhost:5000/api/getUserById?userId=${query.userId}`)
     const data = await res.json();

     console.log(JSON.stringify(data))

     if (!data.data) {
          return {
               notFound: true
          }
     }

     return {
          props: {
               user: data.data
          }
     }

}