'use client';
import React, { useState } from 'react';
import {useRouter} from "next/navigation";



export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
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

  const handleSubmit = async (e:React.ChangeEvent<HTMLFormElement> ) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5117/api/User/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        alert('Registration successful!');
        console.log(data);
        router.push('/');

      } else {
        alert('Registration failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to server');
    }
  };

  return (
      <>
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Create your account</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                  id="name"
                  className="form-input w-full py-2"
                  type="text"
                  placeholder="Corey"
                  value={formData.name}
                  onChange={handleChange}
                  required
              />
            </div>
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                Surname
              </label>
              <input
                  id="surname"
                  className="form-input w-full py-2"
                  type="text"
                  placeholder="Barker"
                  value={formData.surname}
                  onChange={handleChange}
                  required
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                  id="email"
                  className="form-input w-full py-2"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                  id="password"
                  className="form-input w-full py-2"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="on"
                  value={formData.password}
                  onChange={handleChange}
                  required
              />
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <button type="submit" className="btn w-full bg-blue-600 text-white">
              Register
            </button>
            <div className="text-center text-sm italic text-gray-400">Or</div>
            <button type="button" className="btn w-full bg-gray-900 text-white">
              Continue with GitHub
            </button>
          </div>
        </form>

        {/* Bottom link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            By signing up, you agree to the{" "}
            <a className="underline" href="#0">Terms of Service</a> and{" "}
            <a className="underline" href="#0">Privacy Policy</a>.
          </p>
        </div>
      </>
  );
}
