import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRegisterMutation } from '../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../pages/Loader';


const Register = () => {
    
    //show-hide password
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(faEyeSlash);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const togglePassword = () => {
        if(type === 'password') {
            setIcon(faEye);
            setType('text')
        }else {
            setIcon(faEyeSlash);
            setType('password')
        }
    };
    
    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            toast.error('Unmatched Password!')
        }else {
            try{
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate('/')
            }
            catch(err){
                toast.error(err?.data?.message || err.error)
            }
        }
    };

    //form state
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ register, { isLoading } ] = useRegisterMutation();

    const { userInfo }  = useSelector((state) => state.auth);

    useEffect(() => {
        if(userInfo) {
            navigate('/');
        }
    },[navigate, userInfo]);

    return (
   
        <div className="">
          <div className="">
            <h1 className="mt-6 text-center text-2xl font-semibold">
              Create a New Account
            </h1>
          </div>
          {/* container for form submission starts here */}
          <div className="formContainer mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10 shadow-lg">
              <form onSubmit={submitHandler}>
                <div className="relative">
                  <label className="block text-sm font-semibold tracking-wide mb-2">
                    Name
                  </label>
                  <div className="mb-3">
                    <input
                      type="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      name="name"
                      required
                      placeholder="Type your name here"
                      //autoComplete="name" required
                      className="appearance-none rounded-md relative block w-full px-3  py-2 border border-gray-200 shadow-sm text-gray-700 focus:outline-none focus:ring-blue-50 placeholder:text-gray-300"
                    />
                  </div>
                  <label className="block text-md tracking-wide text-sm font-semibold mb-2">
                    Email
                  </label>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Type your email here"
                      autoComplete="email"
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-200 text-gray-700 shadow-sm focus:outline-none focus:ring-blue-50 placeholder:text-gray-300"
                    />
                  </div>
                  <label className="block text-md tracking-wide text-sm font-semibold mb-2">
                    Password
                  </label>
                  <div className="mb-3">
                    <input
                      type={type}
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Type your password here"
                      autoComplete="password"
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-200 text-gray-700 placeholder-gray-300 shadow-sm focus:outline-none focus:ring-blue-50"
                    />
                  </div>
                  <label className="block text-md tracking-wide text-sm font-semibold mb-2">
                    Confirm Password
                  </label>
                  <div className="mb-3">
                    <input
                      type={type}
                      name="confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Type your password here"
                      autoComplete="password"
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-200 text-gray-700 placeholder-gray-300 shadow-sm focus:outline-none focus:ring-blue-50"
                    />
                  </div>
                  <span className="absolute flex bottom-3 right-5 text-gray-500">
                    <FontAwesomeIcon
                      onClick={togglePassword}
                      icon={icon}
                      size="lg"
                      className="text-sm cursor-pointer text-gray-400"
                    />
                  </span>
                </div>
                {/* <button onClick={togglePassword}>show password</button> */}
                {/* remembering your account */}
                <div className="flex items-center justify-between pt-3">
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="checkbox"
                        className="h-4 w-4 text-indigo-300 focus:ring-indigo-400"
                      />
                      <label className="ml-2 block text-sm ">
                        Stay signed in
                      </label>
                    </div>
                    <div>
                      <h1 className="text-sm">
                        By creating an account&#44; I agree to the
                        <Link to="/terms">
                          <span className="font-semibold text-orange-400">Terms and</span>
                        </Link>
                        <Link to="/terms">
                          <span className="font-semibold text-orange-400">
                            Privacy Policy.
                          </span>
                        </Link>
                      </h1>
                    </div>
                  </div>
                </div>
                {/* button submission */}
                <div className="submitBtn mt-2">
                  <button
                    type="submit"
                    name="button"
                    className="relative w-full flex justify-center bg-indigo-400 text-white py-2 px-4 border border-transparent text-sm focus:outline-none hover:bg-indigo-600 duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign in
                  </button>
                </div>
                {isLoading && <Loader />}
                <div className="text-sm mt-7 flex justify-center">
                  <h1>
                    {/* Don&#8242;t have an account? */}
                    Already a Member?
                  </h1>
                  <Link
                    to="/login"
                    className="text-sm text-indigo-600 font-bold pl-2"
                  >
                    Sign in
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>

    );
};
 
export default Register;