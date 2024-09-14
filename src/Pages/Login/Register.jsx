import axios from 'axios';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import './Login.css';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const handleFormChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }
    const handleFormSubmit = async () => {
        try {

            const { data } = await axios.post('http://localhost:3001/api/user/register', { formData });
            if (data.status) {
                toast.success("Successfully Register, please log in to play the game.", {
                    position: "top-right",
                    autoClose: 7000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                navigate('/');
            }
            else {
                toast.error(data.message, {
                    position: "top-right",
                    autoClose: 7000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }

        } catch (error) {
            toast.error("Register failed!", {
                position: "top-right",
                autoClose: 7000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const handleLoginClick = () => {
        navigate("/");
    }
    return (
        <div className='login-page'>
            <div className='login-controller'>
                <form onSubmit={handleFormSubmit} className='login-child'>
                    <h1>Register</h1>
                    <input className='login-inputs' name='username' type='text' placeholder='Enter RegdNo' value={formData.username} onChange={handleFormChange} required />
                    <input className='login-inputs' value={formData.password} name='password' type='password' onChange={handleFormChange} placeholder='Enter password' required />
                    <button type='submit' className='login-btn'>Register</button>
                    <div className='login-link'>
                        <p>Already have an account?</p>
                        <button onClick={handleLoginClick} >Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register