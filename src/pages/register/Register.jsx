import { useState } from "react";
import MainContent from "../../components/login-register/MainContent";
import "./index.css";
import { Navigate } from "react-router-dom";
import { registerUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await registerUser(email, password);
    if (!result) {
      setError("Signup failed. Please try again.");
      setPassword("");
      setEmail("");
    } else {
      alert("Account created");
      navigate("/", {state: {message: "Account created successfully. Please log in."}});
    }
  };

  return (
    <main>
      <MainContent
        title="Simply all the tools that my team and I need."
        name="Karen Yue"
        jobtitle="Director of Digital Marketing Technology"
      />
      <div className="main-content">
        <div className="form-title">
          <h2>Create an account</h2>
          <p>
            Get ready for LabourHIRE
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">E-mail</label>
          </div>

          <div className="input-container">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="forgot-p">
            <Link to="/">Forgot your password?</Link>
          </div>

          <button type="submit">Create Account</button>
          <div className="divider">
            <hr />
            or
            <hr />
          </div>
        </form>
        <button>Continue with Google</button>
        <p className="signup">
          Already registered?<Link to="/">Log in</Link>
        </p>
        <div className="error"> {error && <p>{error}</p>} </div>
      </div>
    </main>
  );
}

export default Register;
