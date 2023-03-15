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
  const { toggleAuth, user } = useAuth()
  const history = useHistory()

  useEffect(() => {
    if (user.loggedIn) {
      history.push('/dashboard')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])


  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        toggleAuth()
        history.push('/dashboard')
      })
      .catch((err) => setError(() => err.response.data))
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-4">
          {error &&  (
            <div className="alert alert-danger" role="alert">
               {ERROR_MESSAGES[error] ?? error}
            </div>
          ) }

          <div className="card">
            <form className="card-body" onSubmit={onSubmit}>
              <label className="mb-3" htmlFor="email">
                ایمیل
              </label>
              <br />
              <input
                className="form-control"
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
                className="form-control"
                type="password"
                value={password}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button
                type="submit"
                className="btn btn-primary mt-3"
                disabled={!email || !password}
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
