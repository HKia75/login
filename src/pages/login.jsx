import axios from "axios";
import { useAuth } from "contexts/Auth";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { loginAPI } from "services/api";

export const ERROR_MESSAGES = {
  "Cannot find user": "کاربری با این ایمیل یافت نشد!",
  "Incorrect password": "گذرواژه اشتباه می‌باشد!",
};

const LoginPage = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuth()


  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        setAuth(response)
      })
      .catch((error) => {
        if (error.response.data == "Incorrect password") {
          setError("گذرواژه اشتباه می‌باشد!");
        } else if (error.response.data == "Cannot find user") {
          setError("کاربری با این ایمیل یافت نشد!");
        }
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-4">
          {error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : (
            ""
          )}

          <div className="card">
            <form className="card-body" onSubmit={onSubmit}>
              <label className="mb-3" htmlFor="email">
                ایمیل
              </label>
              <br />
              <input
                className="w-100 mb-3"
                type="email"
                value={email}
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <label className="mb-2" htmlFor="password">
                گذرواژه
              </label>
              <br />
              <input
                className="w-100"
                type="password"
                value={password}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button
                type="submit"
                className="btn btn-primary mt-3"
                disabled={!email && !password}
              >
                ورود
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
