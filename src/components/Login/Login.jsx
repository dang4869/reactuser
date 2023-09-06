import { useContext, useEffect, useState } from "react";
import "./Login.scss";
import { toast } from "react-toastify";
import { loginApi } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UseContext";
function Login() {
  const { loginContext } = useContext(UserContext);
  const navigate = useNavigate();
  const [type, setType] = useState("password");
  const [eye, setEye] = useState("fa-eye-slash");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);
  const handleType = () => {
    if (type === "password") {
      setType("text");
      setEye("fa-eye");
    }
    if (type === "text") {
      setType("password");
      setEye("fa-eye-slash");
    }
  };
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Không được để trống email hoặc password");
      return;
    }
    setLoading(true);
    let res = await loginApi(email, password);
    if (res && res.token) {
      loginContext(email, res.token);
      toast.success("Đăng nhập thành công");
      navigate("/");
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setLoading(false);
  };
  const handlePressEnter = (event) => {
    if(event && event.key === 'Enter') {
       handleLogin()
    }
  }
  return (
    <>
      <div className="login-wrapper">
        <div className="login-container">
          <h2 className="title">Login</h2>

          <div class="mb-3">
            <label for="email" class="form-label">
              Email
            </label>
            <input
              type="email"
              class="form-control"
              id="email"
              value={email}
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="mb-3 password">
            <label for="password" class="form-label">
              Password
            </label>
            <input
              type={type}
              class="form-control"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(event)=>handlePressEnter(event)}
            />
            <div className="eye" onClick={handleType}>
              <i class={`fa-solid ${eye}`}></i>
            </div>
          </div>
          <button
            type="submit"
            class="submit btn btn-danger"
            disabled={email && password ? false : true}
            onClick={handleLogin}
          >
            {loading && <i class="fa-solid fa-sync fa-spin"></i>}
            &nbsp; Login
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
