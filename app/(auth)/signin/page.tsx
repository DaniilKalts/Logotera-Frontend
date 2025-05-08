'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5117/api/User/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();

        // ✅ Сохраняем токен и роль из data
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.userRole);

        // ✅ Проверяем в консоли
        console.log('Login response data:', data);
        console.log('Saved token:', data.token);
        console.log('Saved role:', data.userRole);

        alert('Login successful!');
        router.push('/');
      } else {
        alert('Login failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to server');
    }
  };

  return (
      <>
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Sign in to your account</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                  id="email"
                  className="form-input w-full py-2"
                  type="email"
                  placeholder="you@example.com"
                  onChange={handleChange}
                  required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                  id="password"
                  className="form-input w-full py-2"
                  type="password"
                  autoComplete="on"
                  placeholder="••••••••"
                  onChange={handleChange}
                  required
              />
            </div>
          </div>
          <div className="mt-6">
            <button className="btn w-full bg-blue-600 text-white py-2 rounded shadow-sm hover:bg-blue-700">
              Sign In
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <Link className="text-sm text-gray-700 underline hover:no-underline" href="/reset-password">
            Forgot password?
          </Link>
        </div>
      </>
  );
}
