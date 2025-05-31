import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUserData } from '../features/authSlice'
import { useNavigate } from 'react-router-dom'
import { getChatsofUser } from '../services/servics'
import { setChats } from '../features/chatSlice'
const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        // post req to validate user
        try {
            const res = await axios.post('http://localhost:3000/api/v1/auth/login', formData)

            alert(res.data.message);
            if (res.data.status == 'success') {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('user', JSON.stringify(res.data.data || {}));
                const userData = {
                    user: res.data.data,
                    token: res.data.token
                }
                dispatch(setUserData(userData))

                const userChats = await getChatsofUser();
                dispatch(setChats(userChats))

                navigate('/new-chat')
            } else {
                navigate('/login')
            }
        } catch (err) {
            console.log('ERROR: ' + err.message)
            navigate('/login')

        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmitForm} className='p-7 py-10 rounded-2xl shadow-2xl'>
                <h1 className="multicolor-text text-4xl p-2 text-center mb-7 font-bold font-serif">Login Form</h1>

                <div className="mb-5">
                    <label className="text-gray-400">Enter Email</label><br />
                    <input type="email" name="email" className="text-xl border-2 rounded-lg p-2" placeholder="abc@gmail.com" onChange={handleChange} value={formData.email} />
                </div>
                <div className="mb-5">
                    <label className="text-gray-400">Enter Password</label><br />
                    <input type="password" name="password" className="text-xl border-2 rounded-lg p-2" placeholder="******" onChange={handleChange} value={formData.password} />
                </div>

                <div className="mb-5 flex justify-center">
                    <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 px-5 text-2xl rounded-lg cursor-pointer">Login</button>
                </div>
            </form>
        </div>
        /*
         <div className='flex justify-center items-center h-screen  '>
       <form action="" onSubmit={handleSubmitForm} className=' p-7 py-10 rounded-2xl shadow-2xl'>
        <h1 className='multicolor-text text-4xl p-2 text-center mb-7 font-bold font-serif' >User Login</h1>
        <div className='mb-5'>
            <label htmlFor="" className='text-gray-400'>Enter Email</label><br />
             <input type="email" name="email" id="" placeholder='Enter Email' className='text-2xl border-2 rounded-lg p-2'
             onChange={handleChange} value={formData.email} />
        </div> 
        <div className='mb-5'>
            <label htmlFor="" className='text-gray-400'>Enter Email</label><br />
             <input type="password" name="password" id="" placeholder='Enter Password'  className='text-2xl border-2 rounded-lg p-2' onChange={handleChange} value={formData.password}/>
        </div>
        <div className="mb-5 flex justify-center">
            <button type="button" className='bg-cyan-500 hover:bg-cyan-600 px-5 text-2xl rounded-lg cursor-pointer'>Login</button>
        </div>
       </form>
    </div>*/
    )
}


export default Login