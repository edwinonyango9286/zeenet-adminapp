import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword, resetUserState } from "../features/user/userSlice";

const RESET_PASSWORD_SCHEMA = Yup.object().shape({
  password: Yup.string()
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must have a mix of upper and lowercase letters, atleast one number and a special character,"
    )
    .required(),
  confirmPassword: Yup.string()
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must have a mix of upper and lowercase letters, atleast one number and a special character,"
    )
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required(),
});

const ResestPassword = () => {
  const location = useLocation();
  const getToken = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: RESET_PASSWORD_SCHEMA,
    onSubmit: (values) => {
      dispatch(resetUserState());
      dispatch(resetPassword({ token: getToken, password: values.password }));
    },
  });
  const isSuccess = useSelector((state) => state.user.isSuccess.resetPassword);
  const isLoading = useSelector((state) => state.user.isLoading.resetPassword);
  const newPassword = useSelector((state) => state.user.newPassword);
  useEffect(() => {
    if (isSuccess && newPassword) {
      formik.resetForm();
      navigate("/");
    }
  }, [isSuccess, newPassword, formik, navigate]);

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
            <h5 className="text-center title">Reset Password</h5>
            <p className="text-center">Create a new password.</p>

            <form action="" onSubmit={formik.handleSubmit}>
              <CustomInput
                type="password"
                label="New password"
                id="passowrd"
                onChng={formik.handleChange("password")}
                onBlr={formik.handleBlur("password")}
                val={formik.values.password}
              />
              <div className="error">
                {formik.touched.password && formik.errors.password}
              </div>
              <CustomInput
                type="password"
                label="Confirm password"
                id="confirm"
                onChng={formik.handleChange("confirmPassword")}
                onBlr={formik.handleBlur("confirmPassword")}
                val={formik.values.confirmPassword}
              />
              <div className="error">
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword}
              </div>
              <div className="d-flex align-item-center mt-4">
                <button
                  type="submit"
                  className="custom-button1 w-100 "
                  disabled={isLoading}
                >
                  {isLoading ? <div></div> : "Reset password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResestPassword;
