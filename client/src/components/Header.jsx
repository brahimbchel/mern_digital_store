import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut, selectCurrentToken } from '../redux/auth/authSlice';
import { useSendLogoutMutation } from '../redux/auth/authApiSlice';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';

const Header = () => {
  const dispatch = useDispatch();
  const [sendLogout] = useSendLogoutMutation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await sendLogout().unwrap();
      dispatch(logOut());
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  const currentToken = useSelector(selectCurrentToken);

  let GlobalUserInfo;

  if (currentToken) {
    const decodedToken = jwtDecode(currentToken);
    const { UserInfo } = decodedToken;
    GlobalUserInfo = UserInfo;
  }

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          MyApp
        </Link>
        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/products" className="hover:text-gray-400">
            Products
          </Link>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          {GlobalUserInfo ? (
            <>
              <Link to="/profile" className="hover:text-gray-400">
                <span>{GlobalUserInfo.username}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-2 rounded hover:bg-red-700"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-blue-600 px-3 py-2 rounded hover:bg-blue-700">
                Log In
              </Link>
              <Link to="/register" className="bg-green-600 px-3 py-2 rounded hover:bg-green-700">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      {/* Sidebar for Mobile */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="absolute top-0 left-0 w-64 bg-gray-800 h-full shadow-xl p-4">
          <button
            className="text-white mb-4"
            onClick={() => setIsOpen(false)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <nav className="flex flex-col space-y-4">
            {GlobalUserInfo && (
              <Link to="/profile" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>
                <span>{GlobalUserInfo.username}</span>
              </Link>
            )}
            <Link to="/" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/products" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>
              Products
            </Link>
            {GlobalUserInfo ? (
              <>
                {/* <Link to="/profile" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>
                  <span>{GlobalUserInfo.username}</span>
                </Link> */}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="bg-red-600 px-3 py-2 rounded hover:bg-red-700"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="bg-blue-600 px-3 py-2 rounded hover:bg-blue-700" onClick={() => setIsOpen(false)}>
                  Log In
                </Link>
                <Link to="/register" className="bg-green-600 px-3 py-2 rounded hover:bg-green-700" onClick={() => setIsOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
