import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signInUser, resetUserState } from "../features/user/userSlice";

const SIGNIN_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .email("Please provide a valid email address.")
    .required("Please provide your email."),
  password: Yup.string()
    .min(8, "Password must be atleast 8 characters long.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must have a mix of upper and lowercase letters, atleast one number and a special character."
    )
    .required("Please provide your password."),
});

const SigIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SIGNIN_SCHEMA,
    onSubmit: (values) => {
      dispatch(resetUserState());
      dispatch(signInUser(values));
    },
  });

  const adminUser = useSelector((state) => state?.user?.adminUser);
  const isSuccess = useSelector((state) => state?.user?.isSuccess?.signInUser);
  const isLoading = useSelector((state) => state?.user?.isLoading?.signInUser);

  useEffect(() => {
    if (adminUser && isSuccess) {
      formik.resetForm();
      navigate("admin");
      dispatch(resetUserState());
    }
  }, [adminUser, isSuccess]);

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
            <h5 className="text-center title">Sign In</h5>
            <p className="text-center">Sign In to your account to continue.</p>
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
                  className="custom-button1 w-100 "
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="d-flex flex-row gap-1 align-items-center justify-content-center">
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span>Please wait...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
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
export default SigIn;
