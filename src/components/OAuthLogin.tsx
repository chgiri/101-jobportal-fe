import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { setUserDetails } from '../store/userActions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const OAuthLogin: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        // Extract the authorization code from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            // Exchange the code for an access token
            axios.post('http://localhost:8081/api/oauth/exchange-token', { code })
                .then(response => {

                    let token = response.data.token;
                    // Store the token in localStorage
                    localStorage.setItem('token', token);
                    console.log('Token received:', token);

                    /* const userResponse = await axios.get('http://localhost:8081/api/auth/details', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }); */
                    let user = {
                        username: response.data.email,
                        role: response.data.role
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

                    /* if (token) {
                        axios.get('http://localhost:8081/api/oauth/user-details', {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        .then(userResponse => {
                            const user = {
                                username: userResponse.data.email,
                                role: "ROLE_APPLICANT" // Assuming the role is always 'ROLE_APPLICANT' for OAuth users
                            };
                            setUserDetails(dispatch)(user);
                            // Redirect to the applicant dashboard after successful login
                            navigate('/applicant-dashboard');

                        })
                        .catch(error => {
                            console.error('Error fetching user details:', error);
                            navigate('/login'); // Redirect to login on error
                        });
                    }
                    */
                })
                .catch(error => {
                    console.error('Error exchanging code for token:', error);
                    alert('Login failed. Please try again.');
                    localStorage.removeItem('token'); // Clear token on error
                    navigate('/login'); // Redirect to login on error
                });
        } else {
            console.error('No authorization code found in the URL');
        }
    }, []);

    return (
        <h2>Logging in with OAuth...</h2>
    );
};

export default OAuthLogin;