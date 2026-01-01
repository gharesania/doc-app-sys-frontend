import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../api/userApi";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });




  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);

      if (res.data.success) {
        toast.success(res.data.msg);
        localStorage.setItem("token6163", res.data.token);
        navigate("/dashboard");
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Login failed. Try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header text-center">
              <h4>Login</h4>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>

                <p className="text-center mt-3">
                  Don’t have an account?{" "}
                  <Link to="/register" className="text-decoration-none">
                    Register
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
