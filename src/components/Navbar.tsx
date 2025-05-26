import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/userSelectors";
import { setUserDetails } from "../store/userActions";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
    
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); // Clear localStorage
        let initialUserState = {
            username: '',
            role: ''
        };
        setUserDetails(dispatch)(initialUserState); // Reset user state in Redux store
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <strong>Job Portal</strong>
                </Link>
                <div className="container mx-auto flex justify-between items-center">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <span className="nav-link text-dark">
                                {user.username ? `Welcome, ${user.username}` : 'Welcome, Guest'}
                            </span>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-danger" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;