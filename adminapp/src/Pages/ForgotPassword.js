import React from "react";
import CustomInput from "../Components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resetPasswordToken, resetState } from "../features/auth/authSlice";

const FORGOT_PASSWORD_SCHEMA = Yup.object().shape({
  email: Yup.string().email().required(),
});

const ForgotPassword = React.memo(() => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: FORGOT_PASSWORD_SCHEMA,
    onSubmit: (values) => {
      dispatch(resetState())
      dispatch(resetPasswordToken(values));
    },
  });
  const { adminUser, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth ?? {}
  );

  return (
    <>
      <div
        className="py-2"
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
            <h5 className="text-center title">Forgot password</h5>
            <p className="text-center">
              Please enter a registered email to proceed.
            </p>
            <div className="error text-center">
              {isError && message
                ? message || "Something went wrong. Please try again later."
                : ""}
            </div>

            <form action="" onSubmit={formik.handleSubmit}>
              <CustomInput
                type="email"
                label="email"
                id="email"
                onChng={formik.handleChange("email")}
                onBlr={formik.handleBlur("email")}
                val={formik.values.email}
              />
              <div className="error">
                {formik.touched.email && formik.errors.email}
              </div>

              <div className="d-flex  align-item-center mt-4">
                <button
                  className="button signup text-white w-100"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
              <div className="mt-3 text-center ">
                <Link to="/" className="text-decoration-none text-dark">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
});

export default ForgotPassword;
