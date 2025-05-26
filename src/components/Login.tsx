import axios from "axios";
import { useState } from "react";
import { setUserDetails } from "../store/userActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BACKEND_API_URL } from "../config/backend";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch(); // dispatch hook from redux to dispatch actions to the Redux store
    const navigate = useNavigate(); // useNavigate hook from react router dom to programmatically navigate

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        try {
            // Make a POST request to the login endpoint with Basic Auth
            // Password is encoded in Base64 format
            const response = await axios.post(`${BACKEND_API_URL}/api/auth/login`, {},
                {
                    headers: {
                    'Authorization': `Basic ${window.btoa(`${username}:${password}`)}`
                    }
                }
            );
            let token = response.data.token;
            // Store the token in localStorage
            localStorage.setItem('token', token);
            console.log('Token received:', token);

            const userResponse = await axios.get(`${BACKEND_API_URL}/api/auth/details`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            let user = {
                username: userResponse.data.username,
                role: userResponse.data.roles[0]
            }
            console.log('User:', user);

            // Call Action function to dispatch the user details to the Redux store
            setUserDetails(dispatch)(user);

            // Redirect user to appropriate dashboard based on role
            switch (user.role) {
                case 'ROLE_ADMIN':
                    navigate('/admin-dashboard');
                    break;
                case 'ROLE_APPLICANT':
                    navigate('/applicant-dashboard');
                    break;
                default:
                    console.error('Unknown role:', user.role);
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            alert('Login failed. Please check your credentials.');
        }
    };

    const handleGoogleLogin = () => {
        // Redirect to Google OAuth login
        window.location.href = 'http://localhost:8081/oauth2/authorization/google';
    }

    return (
        <div className="container" style={{ marginTop: '8%' }}>
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-lg-9">
                    <div className="card shadow p-4">
                        <div className="card-header bg-white text-center">
                            <h3 className="text-center">Welcome to the Login Page</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Email" id="email" 
                                    onChange={(e)=>setUsername(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control" placeholder="Password" id="password"
                                    onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary w-75">Login</button>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <p className="mb-0">Or</p>
                            <button type="button" onClick={handleGoogleLogin} className="btn btn-success">Sign in with Google</button>
                        </div>
                        <div className="card-footer text-center">
                            <p className="mb-0">Don't have an account? <a href="/register">Register here</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;