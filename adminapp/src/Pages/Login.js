import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login, resetState } from "../features/user/userSlice";

const LOGIN_SCHEMA = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must have a mix of upper and lowercase letters, atleast one number and a special character,"
    )
    .required(),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LOGIN_SCHEMA,
    onSubmit: (values) => {
      dispatch(resetState());
      dispatch(login(values));
    },
  });

  const message = useSelector((state) => state.user.message);
  const adminUser = useSelector((state) => state.user.adminUser);
  const isError = useSelector((state) => state.user.isError.login);
  const isSuccess = useSelector((state) => state.user.isSuccess.login);
  const isLoading = useSelector((state) => state.user.isLoading.login);

  useEffect(() => {
    if (adminUser && isSuccess) {
      navigate("admin");
    } else {
      navigate("/");
    }
  }, [adminUser, isSuccess]);

  useEffect(() => {
    if (isError) {
      dispatch(resetState());
    }
  }, []);

  return (
    <>
      <div
        className=""
        style={{
          background: "#232f3e",
          minHeight: "100vh",
        }}
      >
        <div className="col-12 d-flex items-center justify-content-center">
          <div
            className="my-4 w-full bg-white rounded p-4"
            style={{ width: "360px", height: "auto", borderRadius: "10px" }}
          >
            <h5 className="text-center title">Login</h5>
            <p className="text-center">Login to your account to continue.</p>
            <div className="error text-center">
              {isError && message
                ? message || "Something went wrong. Please try again later."
                : ""}
            </div>
            <form action="" onSubmit={formik.handleSubmit}>
              <CustomInput
                type="email"
                label="email"
                name="email"
                id="email"
                onChng={formik.handleChange("email")}
                onBlr={formik.handleBlur("email")}
                val={formik.values.email}
              />
              <div className="error">
                {formik.touched.email && formik.errors.email}
              </div>

              <CustomInput
                type="password"
                name="password"
                label="password"
                id="pass"
                onChng={formik.handleChange("password")}
                onBlr={formik.handleBlur("password")}
                val={formik.values.password}
              />
              <div className="error">
                {formik.touched.password && formik.errors.password}
              </div>
              <div className="d-flex align-item-center mt-4">
                <button
                  type="submit"
                  className="button signup text-white w-100 "
                  disabled={isLoading}
                >
                  {isLoading ? "Please wait..." : "Login"}
                </button>
              </div>
              <div className="mt-3 text-end">
                <Link
                  to="/forgot-password"
                  className="text-decoration-none text-dark"
                >
                  Forgot password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
