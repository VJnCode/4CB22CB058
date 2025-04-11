import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Trending", path: "/trending" },
    { name: "Top Users", path: "/top-users" },
    { name: "Feed", path: "/" },
  ];

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">SocialMedia Analytics</div>
      <ul className="flex space-x-6">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`font-medium hover:text-blue-600 transition-colors ${
                location.pathname === item.path ? "text-blue-600" : "text-gray-700"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
