import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createCoupon,
  getACoupon,
  resetState,
  updateACoupon,
} from "../features/coupon/couponSlice";
import { useLocation, useNavigate, Link } from "react-router-dom";

const ADD_COUPON_SCHEMA = Yup.object().shape({
  name: Yup.string().required("Coupon Name is required"),
  expiry: Yup.date().required("Select an expiry date required"),
  discount: Yup.number().required("Discount Percentage required"),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const couponId = location.pathname.split("/")[3];
  const coupon = useSelector((state) => state?.coupon);
  const isLoadingCreateCoupon = useSelector(
    (state) => state.isLoading.createCoupon
  );

  const isSuccessCreateCoupon = useSelector(
    (state) => state.isLoading.createCoupon
  );

  const isSuccessUpdateACoupon = useSelector(
    (state) => state.isSuccess.updateACoupon
  );

  const isErrorCreateCoupon = useSelector(
    (state) => state.isError.createCoupon
  );

  const {
    createdCoupon,
    updatedCoupon,
    couponName,
    couponExpiry,
    couponDiscount,
  } = coupon;

  useEffect(() => {
    if (couponId) {
      dispatch(getACoupon(couponId));
    } else {
      dispatch(resetState());
    }
  }, [couponId]);

  useEffect(() => {
    if (isSuccessCreateCoupon && createdCoupon) {
      toast.success("Coupon added Successfully.");
    }
    if (isSuccessUpdateACoupon && updatedCoupon) {
      toast.success("Coupon Updated Successfully.");
      navigate("/admin/coupon-list");
    }
    if (isErrorCreateCoupon) {
      toast.error("Something went Wrong. Please Try Again.");
    }
  }, [isSuccessCreateCoupon, isSuccessUpdateACoupon, isErrorCreateCoupon]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      expiry: couponExpiry
        ? new Date(couponExpiry).toISOString().split("T")[0]
        : "",
      discount: couponDiscount || "",
    },
    validationSchema: ADD_COUPON_SCHEMA,

    onSubmit: (values) => {
      if (couponId) {
        const data = { id: couponId, couponData: values };
        dispatch(updateACoupon(data));
        dispatch(resetState());
      } else {
        dispatch(createCoupon(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 500);
      }
    },
  });

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center ">
          <h5 className="mb-4 title">{couponId ? "Edit" : "Add"} Coupon</h5>
          <button
            className=" btn btn-primary border-0 rounded-2 my-3 text-white"
            type="button"
            style={{ border: "none", outline: "none", boxShadow: "none" }}
          >
            <Link
              to={"/admin/coupon-list"}
              className="text-white"
              style={{
                textDecoration: "none",
              }}
            >
              {" "}
              View Coupons.
            </Link>
          </button>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Coupon Name"
            name="name"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
            id="name"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>

          <CustomInput
            type="date"
            label="Select expiry date  price"
            name="expiry"
            onChng={formik.handleChange("expiry")}
            onBlr={formik.handleBlur("expiry")}
            val={formik.values.expiry}
            id="expiry"
          />

          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>

          <CustomInput
            type="number"
            label="Enter discount "
            name="discount"
            min={1}
            max={100}
            onChng={formik.handleChange("discount")}
            onBlr={formik.handleBlur("discount")}
            val={formik.values.discount}
            id="discount"
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button
            className="btn btn-primary border-0 rounded-3 mt-3"
            style={{
              width: 140,
              border: "none",
              outline: "none",
              boxShadow: "none",
            }}
          >
            {isLoadingCreateCoupon
              ? "Creating..."
              : couponId
              ? "Edit Coupon"
              : "Add Coupon"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCoupon;
