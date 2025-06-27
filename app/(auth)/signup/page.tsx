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


  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
        alert('Регистрация прошла успешно!');
        console.log(data);
        router.push('/');

      } else {
        alert('Ошибка регистрации!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ошибка подключения к серверу');
    }
  };

  return (
      <>
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Создайте аккаунт</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                Имя
              </label>
              <input
                  id="name"
                  className="form-input w-full py-2"
                  type="text"
                  placeholder="Имя"
                  value={formData.name}
                  onChange={handleChange}
                  required
              />
            </div>
            <div>
              <label htmlFor="surname" className="mb-1 block text-sm font-medium text-gray-700">
                Фамилия
              </label>
              <input
                  id="surname"
                  className="form-input w-full py-2"
                  type="text"
                  placeholder="Фамилия"
                  value={formData.surname}
                  onChange={handleChange}
                  required
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                Электронная почта
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
                Пароль
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
              Зарегистрироваться
            </button>
          </div>
        </form>

        {/* Bottom link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Регистрируясь, вы соглашаетесь с нашими
            <a className="underline" href="#0"> Условиями использования</a> и
            <a className="underline" href="#0"> Политикой конфиденциальности</a>.
          </p>
        </div>
      </>
  );
}
