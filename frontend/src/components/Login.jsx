import {faFacebook, faGoogle, faTwitter} from '@fortawesome/free-brands-svg-icons';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'; 
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import FormContainer from './FormContainer';
import { toast } from 'react-toastify';
import Loader from '../pages/Loader';


const Login = () => {

  //show-hide password
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(faEyeSlash);

    const togglePassword = () => { 
      if(type === 'password') {
        setIcon(faEye)
        setType('text')
      }else {
        setIcon(faEyeSlash)
        setType('password')
      }
    }

  //state for form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login,{ isLoading } ] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if(userInfo) {
      navigate('/')
    }
  },[navigate, userInfo]);

  //FORM SUBMISSION
  const submitHandler = async (e) => {
    e.preventDefault();
    try{
      const res = await login({ email, password}).unwrap();
      dispatch(setCredentials({...res}))
      navigate('/')
    }catch(err){
      //toastify
      toast.error(err?.data?.message || err.error)
      //console.log(err?.data?.message || err.error)
    }
  };
   
    return (
      <FormContainer>
      <div className="flex flex-col">
        <div className="mt-6 text-center">
          <h1 className="text-2xl font-semibold">LOGIN</h1>
        </div>
        {/* container for form submission starts here */}
        <div className="formContainer mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10 shadow-lg">
            <form onSubmit={submitHandler}>
              <div className='relative'>
                <label className="block text-sm tracking-wide font-semibold mb-2">
                  Email address
                </label>
                <div className="mb-3">
                  <input
                    type='email'
                    value={email}
                    onChange={(e) =>setEmail(e.target.value)} 
                    name="email"
                    placeholder="Type your email here"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-200 text-gray-700 placeholder-gray-300 shadow-sm focus:outline-none focus:ring-blue-50"
                  />
                </div>
                <label className="block text-sm tracking-wide font-semibold mb-3">
                  Password
                </label>
                <div className="mb-3">
                  <input
                    type={type}
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    placeholder="Type your password here"
                    autoComplete="password"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-200 text-gray-700 placeholder-gray-300 shadow-sm focus:outline-none focus:ring-blue-50"
                  />
                </div>
                <span className='absolute flex cursor-pointer text-gray-500 right-5 bottom-3'>
                <FontAwesomeIcon
                  onClick={togglePassword}
                  icon={icon}
                  className='text-md'
                />
                </span>
              </div>
              {/* remembering your account */}
              <div className="flex items-center justify-between pt-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="checkbox"
                    className="h-4 w-4 text-indigo-300 focus:ring-indigo-400"
                  />
                  <label className="ml-2 block text-sm ">Remember me</label>
                </div>
                <div className="">
                  <Link to="/register" className="text-sm text-indigo-600">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              { isLoading && <Loader />}
              {/* button submission */}
              <div className="submitBtn mt-5">
                <button
                  type="submit"
                  name="button"
                  className="relative w-full flex justify-center bg-indigo-400 text-white py-2 px-4 border border-transparent text-sm focus:outline-none hover:bg-indigo-600 duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
              <div className="text-sm mt-7 flex justify-center">
                <h1>Don&#8242;t have an account?</h1>
                <Link
                  to="/register"
                  className="text-sm text-indigo-600 font-bold pl-2"
                >
                  Sign up
                </Link>
              </div>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className='px-2 bg-white text-gray-400'>Or continue with</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-5">
                <div className="flex justify-between items-center">
                  <Link to='/facebook'>
                    <div className='w-full flex items-center justify-center px-8 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-700 bg-white hover:bg-blue-200'>
                      <FontAwesomeIcon
                        icon={faFacebook}
                        className='text-2xl'
                      /> 
                    </div>
                  </Link>
                  <Link to='/google'>
                    <div className='w-full flex items-center justify-center px-8 py-2 border border-gray-300 rounded-lg shadow-sm text-orange-500 text-sm font-medium bg-white hover:bg-orange-200'>
                      <FontAwesomeIcon
                        icon={faGoogle}
                        className='text-2xl'
                      />
                    </div>
                  </Link>
                  <Link to='/twitter'>
                    <div className='flex w-full items-center justify-center px-8 py-2 border border-gray-300 rounded-lg shadow-sm text-blue-400 text-sm font-medium bg-white hover:bg-blue-200'>
                      <FontAwesomeIcon
                        icon={faTwitter}
                        className='text-2xl'
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </FormContainer> 
    ); 
}
 
export default Login;