import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { toast } from "react-toastify";
import { useLocation, useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrand,
  getABrand,
  resetState,
  updateABrand,
} from "../features/brands/brandSlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Brand Name is required"),
});

const AddBrand = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const brandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state?.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand;
  useEffect(() => {
    if (brandId) {
      dispatch(getABrand(brandId));
    } else {
      dispatch(resetState());
    }
  }, [brandId]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand added successfully.");
      navigate("/admin/brand-list");
    }
    if (isSuccess && updatedBrand) {
      toast.success("Brand updated successfully.");
      navigate("/admin/brand-list");
    }
    if (isError) {
      toast.error("Something went wrong. Please try again.");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (brandId) {
        const data = { id: brandId, brandData: values };
        dispatch(updateABrand(data));
        dispatch(resetState());
      } else {
        dispatch(createBrand(values));
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
          <h5 className="mb-4 title">{brandId ? "Edit" : "Add"} Brand</h5>
          <button
            className=" btn btn-primary border-0 rounded-2 my-3 text-white"
            type="button"
            style={{ border: "none", outline: "none", boxShadow: "none" }}
          >
            <Link
              to={"/admin/brand-list"}
              className="text-white"
              style={{
                textDecoration: "none",
              }}
            >
              {" "}
              View Brands.
            </Link>
          </button>
        </div>

        <div>
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              label="Enter Brand"
              name="title"
              onChng={formik.handleChange("title")}
              onBlr={formik.handleBlur("title")}
              val={formik.values.title}
              id="brand"
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
            <button
              type="submit"
              className="btn btn-primary border-0 mt-3 rounded-3"
              style={{ border: "none", outline: "none", boxShadow: "none" }}
            >
              {isLoading ? "Creating..." : brandId ? "Edit Brand" : "Add Brand"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
});

export default AddBrand;
