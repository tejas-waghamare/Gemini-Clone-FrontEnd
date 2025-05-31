import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Register = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        dob: '',
        city: ''
    })

    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        // validation
        if (formData.name == '' || formData.email == '' || formData.password == '' || formData.dob == '' || formData.city == '') {
            alert('📌Fill all the fields');
            return;
        }

        if (formData.password != confirmPassword) {
            alert(' ❌Password and confirm password should be same!');
            return
        }

        // post req with axios
        try {
            const res = await axios.post('http://localhost:3000/api/v1/auth/register', formData)
            // const res = await axios.post('https://gemini-clone-backend-sandy.vercel.app/api/v1/auth/register', formData)
            alert(res.data.message);
            if (res.data.status == 'success') {
                navigate('/login');
            }
        } catch (err) {
            console.log('ERROR: ' + err.message)
        }
    }

    return (
        <div className='flex justify-center items-center h-screen  '>
            <form action="" onSubmit={handleSubmitForm} className=' p-7 py-10 rounded-2xl shadow-2xl'>
                <h1 className='multicolor-text text-4xl p-2 text-center mb-7 font-bold font-serif' >Create An Account</h1>

                <div className='mb-5'>
                    <label htmlFor="" className='text-gray-400'>Enter Name</label><br />
                    <input type="name" name="name" placeholder='Enter Name' className='text-2xl border-2 rounded-lg p-2'
                        onChange={handleChange} value={formData.name} />
                </div>

                <div className='mb-5'>
                    <label htmlFor="" className='text-gray-400'>Enter Email</label><br />
                    <input type="email" name="email" placeholder='Enter email' className='text-2xl border-2 rounded-lg p-2' onChange={handleChange} value={formData.email} />
                </div>
                <div className='mb-5'>
                    <label htmlFor="" className='text-gray-400'>Enter DOB</label><br />
                    <input type="date" name="dob" placeholder='Enter DOB' className='text-2xl border-2 rounded-lg p-2' onChange={handleChange} value={formData.dob} />
                </div>
                <div className='mb-5'>
                    <label htmlFor="" className='text-gray-400'>Enter City</label><br />
                    <input type="text" name="city" placeholder='Enter City' className='text-2xl border-2 rounded-lg p-2' onChange={handleChange} value={formData.city} />
                </div>

                <div className='mb-5'>
                    <label htmlFor="" className='text-gray-400'>Enter Password</label><br />
                    <input type="password" name="password" placeholder='******' className='text-2xl border-2 rounded-lg p-2' onChange={handleChange} value={formData.password} />
                </div>

                <div className='mb-5'>
                    <label htmlFor="" className='text-gray-400'>Confirm Password</label><br />
                    <input type="password" name="password" placeholder='******' className='text-2xl border-2 rounded-lg p-2' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                </div>

                <div className="mb-5 flex justify-center">
                    <button type="submit" className='bg-cyan-500 hover:bg-cyan-600 px-5 text-2xl rounded-lg cursor-pointer'>Register</button>
                </div>

            </form>
        </div>
    )
}


export default Register