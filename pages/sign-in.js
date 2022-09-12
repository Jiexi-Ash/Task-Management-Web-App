import { useState, useEffect } from "react";
import { registerUser, signInUser } from "redux/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Loader from "components/UI/Loader";

function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const loading = useSelector((state) => state.auth.loading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const [hasSession, setHasSession] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.push("/");
      } else {
        setHasSession(false);
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "" || !email.includes("@") || !email) {
      setError("Please fill in all fields");
    }

    const userData = {
      email,
      password,
    };

    if (hasAccount) {
      console.log("Sign in");
      dispatch(signInUser({ userData, router }));
    }

    if (!hasAccount) {
      console.log("Sign up");
      dispatch(registerUser({ userData, router }));
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      {!hasSession ? (
        <div className="max-w-sm bg-white px-6 py-8 border border-gray-100 shadow-sm rounded-md">
          <h1 className="text-[24px] font-bold lg:text-2xl text-center font-PlusJakartaSans">
            {hasAccount ? "Sign In" : "Sign Up"}
          </h1>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mt-4">
              <label className="block text-[14px] font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-200 focus:ring-0"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4 mb">
              <label className="block text-[14px] font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-200 focus:ring-0"
                placeholder="**************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="py-4">
              {hasAccount ? (
                <p
                  className="text-[12px] text-center text-paleGrey hover:cursor-pointer hover:underline"
                  onClick={() => setHasAccount(false)}
                >
                  {"Don't have an account? sign up"}
                </p>
              ) : (
                <p
                  className="text-[12px] text-center text-paleGrey hover:cursor-pointer hover:underline"
                  onClick={() => setHasAccount(true)}
                >
                  {"Already have an account? sign in"}
                </p>
              )}
            </div>
            <button
              className="btn bg-primaryPurple rounded-md w-full"
              disabled={loading}
            >
              {loading ? (
                <Loader size="small" />
              ) : hasAccount ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>
      ) : (
        <Loader size="large" align="center" position="center" color="primary" />
      )}
    </div>
  );
}

export default Login;
