// AppLayout.jsx
import { Link, Outlet, useLocation } from "react-router";

export default function todoLayout() {
  const location = useLocation();

  const navItems = [
    { name: "목록", path: "/todo/list" },
    { name: "글쓰기", path: "/todo/add" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 text-gray-800">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">📝 TodoList</h1>
          <nav className="flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? "bg-blue-500 text-white"
                    : "text-blue-600 hover:bg-blue-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
