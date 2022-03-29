import { useState, useEffect } from "react";
import Link from 'next/link';


const SearchUser = ({ users }) => {

     const [user, setUser] = useState(users.data);
     const [searchKey, setSearchKey] = useState('');


     useEffect(() => {

          const regx = new RegExp(searchKey);
          setUser(users.data.filter(user => user.userName.match(regx)))
     }, [searchKey]);

     return <>
          <div className="container">
               <div className="serchbar">
                    <input type="text" autoFocus onChange={(e) => setSearchKey(e.target.value)} />
                    <button className="searchButton"> <img src="https://www.creativefabrica.com/wp-content/uploads/2019/02/Search-icon-by-Kanggraphic-1.jpg" alt="" /> </button>
               </div>
               <div className="listBody">
                    {
                         searchKey && user.map(singleUser => (
                              <Link key={singleUser._id} href={`/users/userDetails?userId=${singleUser._id}`} >
                                   <div className="userPill">
                                        <p>user</p>
                                        <h4> {singleUser.userName} </h4>
                                   </div>
                              </Link>
                         ))
                    }
                    {
                         searchKey && (
                              <Link href="/users/allusers" >
                                   <div className="userPill">
                                        <p>user</p>
                                        <h4> All users </h4>
                                   </div>
                              </Link>
                         )
                    }

               </div>
          </div>


     </>
}
export default SearchUser;


export async function getServerSideProps() {

     const response = await fetch("http://localhost:5000/api/getUsers");
     const data = await response.json();


     return {
          props: {
               users: data
          }
     }
}
