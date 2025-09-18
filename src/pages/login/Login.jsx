import { useState } from "react";
import MainContent from "../../components/login-register/MainContent";
import "./index.css";
import { Navigate } from "react-router-dom";
import { loginUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await loginUser(email, password);
    if (!result || !result.token) {
      setError("Invalid email or password");
      setPassword("");
      setEmail("");
      return;
    } else {
      alert("Login success!");
      navigate("/dashboard");
    }
  };

  return (
    <div className="main">
        <MainContent
          title="Simply all the tools that my team and I need."
          name="Karen Yue"
          jobtitle="Director of Digital Marketing Technology"
        />
        <div className="main-content">
          <div className="form-title">
            <h2>Welcome to LabourHIRE</h2>
            <p>The most convenient way to hire and get hired.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="email"
                placeholder="E-mail"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">E-mail</label>
            </div>
            <div className="input-container">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
              <label htmlFor="password">Password</label>
            </div>

            <div className="forgot-p">
              <a href="#">Forgot password?</a>
            </div>

            <div className="remember-d">
              <p>Remember sign in details</p>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
            <button type="submit">Login</button>
            <div className="divider">
              <hr />
              or
              <hr />
            </div>
          </form>
          <button>Continue with Google</button>
          <p className="signup">
            Dont have an account?<Link to="/register">Sign up</Link>
          </p>
          <div className="error"> {error && <p>{error}</p>} </div>
        </div>
    </div>
  );
}

export default Login;
