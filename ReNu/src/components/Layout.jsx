import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="bg-gray-100 p-4 sticky top-0 shadow-lg z-10">
        <div className="w-full mx-auto flex justify-between items-center">
          <ul className="flex space-x-6 text-gray-800 font-sans">
            <li>
              <Link
                to="/"
                style={{
                  color: '#006F61',
                  fontFamily: 'Inter, sans-serif',
                }}
                className="hover:text-gray-400 transition duration-300 ease-in-out text-3xl font-bold"
              >
                ReNu
              </Link>
            </li>
          </ul>
          <ul className="flex space-x-6 text-gray-800 font-sans ml-auto">
            <li>
              <Link
                to="/map"
                style={{
                  fontFamily: 'Inter, sans-serif',
                }}
                className="hover:text-gray-400 transition duration-300 ease-in-out text-xl"
              >
                Map
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                style={{
                  fontFamily: 'Inter, sans-serif',
                }}
                className="hover:text-gray-400 transition duration-300 ease-in-out text-xl"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
