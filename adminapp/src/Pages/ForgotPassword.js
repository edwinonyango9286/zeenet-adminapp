import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetPasswordToken, resetUserState } from "../features/user/userSlice";

const FORGOT_PASSWORD_SCHEMA = Yup.object().shape({
  email: Yup.string().email().required("Please provide your email address."),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: FORGOT_PASSWORD_SCHEMA,
    onSubmit: (values) => {
      dispatch(resetUserState());
      dispatch(resetPasswordToken(values));
    },
  });

  const isSuccess = useSelector(
    (state) => state.user.isSuccess.resetPasswordToken
  );
  const token = useSelector((state) => state.user.token);

  const isLoading = useSelector(
    (state) => state.user.isLoading.resetPasswordToken
  );

  useEffect(() => {
    if (isSuccess && token) {
      formik.resetForm();
      dispatch(resetUserState())
      navigate("/");
    }
  }, [isSuccess, token, formik, navigate,dispatch]);

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
                    "Submit"
                  )}
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
};

export default ForgotPassword;
