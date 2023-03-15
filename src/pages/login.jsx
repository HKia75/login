import { useAuth } from "contexts/Auth";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { loginAPI } from "services/api";

export const ERROR_MESSAGES = {
  "Cannot find user": "کاربری با این ایمیل یافت نشد!",
  "Incorrect password": "گذرواژه اشتباه می‌باشد!",
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onEmailInputChange = (event) => setEmail(event.target.value);
  const onPasswordInputChange = (event) => setPassword(event.target.value);
  const { toggleAuth, user } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (user.loggedIn) {
      history.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleLogin = (event) => {
    event.preventDefault();

    loginAPI({
      email,
      password,
    })
      .then(() => {
        toggleAuth();
        history.push("/dashboard");
      })
      .catch((err) => setError(() => err.response.data));
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-4">
          {error && (
            <div className="alert alert-danger" role="alert">
              {ERROR_MESSAGES[error] ?? error}
            </div>
          )}
          <div className="card">
            <form className="card-body" onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  ایمیل
                </label>
                <input
                  onChange={onEmailInputChange}
                  value={email}
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                {/*<div id="emailHelp" className="form-text text-danger">ایمیل معتبر نمی‌باشد!</div>*/}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  گذرواژه
                </label>
                <input
                  value={password}
                  onChange={onPasswordInputChange}
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
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
