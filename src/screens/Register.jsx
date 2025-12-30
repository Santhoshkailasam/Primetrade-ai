import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // ✅ CORRECT API PATH
      const res = await API.post("/api/auth/register", {
        name,
        email,
        password,
      });

      // Optional: auto-login after register
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      {/* Company Name */}
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-wide">
        PrimeTrade<span className="text-indigo-500">.ai</span>
      </h1>

      {/* Register Card */}
      <div className="w-full max-w-md bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6 text-center">
          Create Account
        </h2>

        {error && (
          <p className="mb-4 text-red-400 text-sm text-center">
            {error}
          </p>
        )}

        {/* Name */}
        <input
          placeholder="Name"
          className="w-full mb-3 px-4 py-3 rounded-md bg-gray-800 text-white
                     border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-4 py-3 rounded-md bg-gray-800 text-white
                     border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-4 py-3 pr-12 rounded-md bg-gray-800 text-white
                       border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-600
                     text-white py-3 rounded-md transition"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        {/* Footer */}
        <p className="text-gray-400 text-sm text-center mt-5">
          Already have an account?{" "}
          <Link to="/" className="text-indigo-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
