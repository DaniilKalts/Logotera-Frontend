import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./logo";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if JWT token exists in localStorage or sessionStorage
    const token = localStorage.getItem("token"); // or sessionStorage.getItem('token')
    setIsLoggedIn(!!token); // Set true if token exists, else false
  }, []);

  const handleLogout = () => {
    // Clear token from storage and update state
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
      <header className="fixed top-2 z-30 w-full md:top-6">
        <div className="max-w-6xl">
          <div
              className={`
        relative flex h-14 items-center justify-center gap-6
        rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03]
        backdrop-blur-xs
        before:pointer-events-none before:absolute before:inset-0
        before:rounded-[inherit] before:border before:border-transparent
        before:[background:linear-gradient(var(--color-gray-100),var(--color-gray-200))_border-box]
        before:[mask-composite:exclude_!important]
        before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]
      `}
          >
            {/* Combined wrapper so logo + links stay centered as one group */}
            <div className="flex justify-between items-center w-full gap-8">
              <Logo />

              <ul className="flex items-center gap-3">
                {!isLoggedIn ? (
                    <>
                      <li>
                        <Link
                            href="/signin"
                            className="btn-sm bg-white text-gray-800 shadow-sm hover:bg-gray-50"
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                            href="/signup"
                            className="btn-sm bg-gray-800 text-gray-200 shadow-sm hover:bg-gray-900"
                        >
                          Register
                        </Link>
                      </li>
                    </>
                ) : (
                    <>
                      <li>
                        <Link
                            href="/profile"
                            className="btn-sm bg-white text-gray-800 shadow-sm hover:bg-gray-50"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                            onClick={handleLogout}
                            className="btn-sm bg-red-500 text-white shadow-sm hover:bg-red-600"
                        >
                          Logout
                        </button>
                      </li>
                    </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>
  );
}
