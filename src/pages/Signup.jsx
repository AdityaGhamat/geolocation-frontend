import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../assets/apiService";
import { toast } from "react-toastify";

const Signup = () => {
  const history = useNavigate();

  const [formData, setFormdata] = useState({
    Name: "",
    Phone_Number: "",
    Email: "",
    Password: "",
  });
  const [isRegistered, setIsRegistered] = useState(false);

  const changeHandler = (event) => {
    setFormdata((prevstate) => {
      return {
        ...prevstate,
        [event.target.name]: event.target.value,
      };
    });
  };
  const notifySuccess = () => {
    toast("Registration Completed Successfuly");
  };
  const notifyFailure = () => {
    toast("Failure Occured during Registration");
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const result = await register(formData);

      // Assuming the registration was successful,  navigate to the home page
      console.log("Registration successful:", result);
      setIsRegistered(true);
      console.log(isRegistered);
      notifySuccess();
      history("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setIsRegistered(false);
        notifyFailure();
        console.error("Bad Request:", error.response.data);
      } else {
        setIsRegistered(false);
        console.error("Error while signing up:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-900">
          Sign Up
        </h1>
        <form onSubmit={submitHandler} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="Name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Your Name"
                value={formData.Name}
                id="Name"
                name="Name"
                onChange={changeHandler}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="Phone_Number" className="sr-only">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="Enter Your Number"
                value={formData.Phone_Number}
                id="Phone_Number"
                name="Phone_Number"
                onChange={changeHandler}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="Email" className="sr-only">
                Email
              </label>
              <input
                type="text"
                placeholder="Enter Your Email"
                value={formData.Email}
                id="Email"
                name="Email"
                onChange={changeHandler}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="Password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Your Password"
                value={formData.Password}
                id="Password"
                name="Password"
                onChange={changeHandler}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already registered?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
