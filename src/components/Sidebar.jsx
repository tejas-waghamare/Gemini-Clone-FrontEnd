import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineChatAlt2, HiOutlinePlusCircle, HiMenu, HiX } from "react-icons/hi";

const Sidebar = () => {
  const chats = useSelector(state => state.chats.value);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-black text-white shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 to-black text-white w-64
          transform transition-transform duration-300 ease-in-out
          shadow-lg border-r border-gray-800 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex-shrink-0
          flex flex-col p-6
        `}
      >
        <h2 className="text-3xl font-bold mb-8 text-center tracking-wide select-none">
          ReactBot
        </h2>

        <nav className="flex flex-col space-y-3 overflow-y-auto">
          <Link
            to="/new-chat"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition ${
              location.pathname === "/new-chat" ? "bg-blue-700" : ""
            }`}
          >
            <HiOutlinePlusCircle size={24} />
            New Chat
          </Link>

          <div className="mt-4 flex-grow overflow-y-auto">
            {chats.length === 0 && (
              <p className="px-4 py-3 text-gray-400 text-sm">No chats available</p>
            )}

            {chats.map(chat => (
              <Link
                key={chat._id}
                to={`/${chat._id}`}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer truncate hover:bg-gray-700 transition
                  ${
                    location.pathname === `/${chat._id}`
                      ? "bg-blue-700 text-white"
                      : "text-gray-300"
                  }
                `}
                title={chat.name}
              >
                <HiOutlineChatAlt2 size={20} />
                <span className="truncate">{chat.name}</span>
              </Link>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;





// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// const Sidebar = () => {

//    const chats = useSelector(state => state.chats.value)

//    return (
//       <div className='bg-black w-1/5 overflow-y-scroll p-5 text-white'>
//          <div className=''>
//             <Link to="/new-chat">
//                <div className='hover:bg-gray-700 cursor-pointer rounded-2xl text-2xl p-2 font-bold'>New Chat </div>
//             </Link>
//             {
//                chats.map(c => (
//                   <Link to={`${c._id}`} key={c._id}>
//                      <div className='hover:bg-gray-700 rounded-2xl cursor-pointer p-2'>
//                         {c.name}
//                      </div>
//                   </Link>
//                ))
//             }
//          </div>
//       </div>
//    )
// }

// export default Sidebar