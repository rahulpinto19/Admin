import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const secret = "secretword";

  const [credentials, setcredentials] = useState({
    id: "",
    password: "",
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    const { id, password } = credentials;

    console.log({ id, password }, "entered in the backend");
    try {
      const response = await axios.post("http://localhost:5000/signin", {
        id,
        password,
      });
      console.log(response);
      if (response.status === 200) {
        alert("successfully logged in");
        localStorage.setItem("admintoken", response.data.authtoken);
        window.location.reload();
      } else {
        alert("invalid credentials");
      }
    } catch (err) {
      alert("Invalid credentials");
    }
  };
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed">
      <div className=" ">
        <p className=" relative text-5xl   left-[13%]  ">Welcome to Vconnect Admin page</p>
      </div>
      <div>
        <div>
          <section className="relative left-[20%]">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                    Sign in to your account
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                    <div>
                      <label
                        for="id"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                      >
                        Enter your id
                      </label>
                      <input
                        type="id"
                        name="id"
                        onChange={onChange}
                        id="id"
                        required={true}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                      />
                    </div>
                    <div>
                      <label
                        for="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        required={true}
                        onChange={onChange}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                            required=""
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            for="remember"
                            className="text-gray-500 dark:text-blue-grey"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-dark w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Log in
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Login;
