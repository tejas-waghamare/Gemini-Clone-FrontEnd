
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../features/authSlice";

const Navbar = () => {
  const { chatId } = useParams();
  const chats = useSelector(state => state.chats.value);
  const chat = chats.find(c => c._id === chatId); // Assuming `_id` is correct key
  const loggedInUser = useSelector(state => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="flex justify-between h-18 items-center bg-black px-6 py-3 shadow-md border-b border-gray-800">
      <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500 font-mono">
        ReactBot
      </span>

      {loggedInUser && (
        <div className="flex items-center gap-3 text-lg bg-white text-black px-4 py-2 rounded-full shadow hover:bg-gray-100 transition duration-200 ">
          <FaUser className="text-blue-600" />
          <span>{loggedInUser.name || "User"}</span>
          <button
            onClick={logoutUser}
            className="ml-2 px-3 py-1 cursor-pointer bg-red-500 text-white text-sm rounded hover:bg-red-600 transition duration-150"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;






// import { FaUser } from "react-icons/fa"
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { Navigate, useNavigate, useParams } from "react-router-dom"
// import { logout } from "../features/authSlice";

// const Navbar = () => {

//   const { chatId } = useParams();
//   const chats = useSelector(state => state.chats.value)
//   const chat = chats.find(c => c.id == chatId)
//   const loggedInUser = useSelector(state => state.auth.user);

//   const disoatch = useDispatch();
//   const Navigate = useNavigate()
//   const logoutUser = () => {
//     disoatch(logout);
//     Navigate('/login')

//   }

//   return (
//     <nav className="flex justify-between items-center text-2xl bg-black p-2">
//       <span className="ml-10 font-bold font-serif text-red-300 text-4xl underline decoration-pink-400">ReactBot</span>

//       {/* <div  className="text-white font-mono"> {chat?.name} </div> */}
//       {
//         loggedInUser ?
//         <div className="text-3xl flex bg-amber-50 p-1 rounded-lg">
//           <FaUser />
//           <button type="button" onClick={logoutUser} className="cursor-pointer mx-3">Logout</button>
//         </div>
//         : ''
//       }
//     </nav>
//   )
// }

// export default Navbar