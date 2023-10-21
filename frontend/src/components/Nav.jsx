import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { NavDropdown, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from '../slices/authSlice';

const Nav = () => {
    //fetch links from utilities
    const [nav, setNav] = useState(false);
    const links = [
        {id: 1, link: 'Login'},
        {id: 2, link: 'Register'},
    ];

    const { userInfo } = useSelector((state) => state.auth);

    //logout user
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const [ logoutUserCall ] = useLogoutMutation();

    const logouthandler = async () => {
        try{
            await logoutUserCall().unwrap();
            dispatch(logout());
            navigate('/');
        }
        catch(err){
            console.log(err)
        }
    };

    return (
      <div className="navi bg-orange-500 h-[50px] flex justify-center">
        <div className="naviContainer w-full max-w-5xl flex justify-between items-center">
           <div className="logo ml-3">
            <Link to='/'>
            <h1>Company Logo</h1>
            </Link>
           </div>
           <div className="hidden md:flex">
            {userInfo ? (
                <>
                <NavDropdown title = {userInfo.name} id="username">
                    <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                        <NavDropdown.Item onClick={logouthandler}>Logout</NavDropdown.Item>
                </NavDropdown>
                </>
            ) : (
                <>
                {links.map(({id, link})=>(
                    <Link
                        to={link}
                        key={id}
                        className="cursor-pointer px-6 opacity-70 hover:opacity-100 duration-200"
                    >
                    {link}
                    </Link>
                ))}
                </>
            )}
           </div>
           <div onClick={() => setNav(!nav)}
                className="cursor-pointer sm:hidden pr-3 text-orange-300 z-30"
           >
            {nav ? (
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    size={25}
                    className="text-2xl"
                />
            ): (
                <FontAwesomeIcon
                    icon={faBarsStaggered}
                    size={25}
                    className="text-2xl"
                />
            )} 
           </div>
        </div>
        {nav && (
            <div className="absolute inset-0 z-20 bg-gradient-to-b from-gray-500 to-gray-200 text-white flex flex-col items-center justify-center">
                {links.map(({id, link})=> (
                    <Link
                        to={link}
                        key={id}
                        className="cursor-pointer py-2 text-2xl opacity-60 hover:opacity-100 duration-200"
                    >
                    {link}
                    </Link>
                ))}
            </div>
        )}
      </div>
    );
}
 
export default Nav;