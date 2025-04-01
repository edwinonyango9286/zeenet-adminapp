import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { useLocation, useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  createABrand,
  getABrand,
  resetState,
  updateABrand,
} from "../features/brands/brandSlice";

const BRAND_SCHEMA = Yup.object().shape({
  title: Yup.string().required("Brand Name is required"),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const brandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state?.brand);
  const isSuccessCreateABrand = useSelector(
    (state) => state?.brand?.isSuccess?.createABrand
  );
  const isSuccessUpdateABrand = useSelector(
    (state) => state?.brand?.isSuccess?.updateABrand
  );

  const isLoadingCreateABrand = useSelector(
    (state) => state?.brand?.isLoading?.createABrand
  );

  const isLoadingUpdateABrand = useSelector(
    (state) => state?.brand?.isLoading?.updateABrand
  );
  const { createdBrand, brandName, updatedBrand } = newBrand;

  useEffect(() => {
    if (brandId) {
      dispatch(getABrand(brandId));
    } else {
      dispatch(resetState());
    }
  }, [brandId, dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: BRAND_SCHEMA,
    onSubmit: (values) => {
      if (brandId) {
        const data = { id: brandId, brandData: values };
        dispatch(resetState());
        dispatch(updateABrand(data));
      } else {
        dispatch(resetState());
        dispatch(createABrand(values));
      }
    },
  });

  useEffect(() => {
    if (isSuccessCreateABrand && createdBrand) {
      formik.resetForm();
      navigate("/admin/brand-list");
    }
    if (isSuccessUpdateABrand && updatedBrand) {
      formik.resetForm();
      navigate("/admin/brand-list");
    }
  }, [
    isSuccessCreateABrand,
    isSuccessUpdateABrand,
    createdBrand,
    updatedBrand,
  ]);

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
              className="text-white fw-bold fs-6"
              style={{
                textDecoration: "none",
                border: "none",
                outline: "none",
                boxShadow: "none",
              }}
            >
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
              {isLoadingCreateABrand || isLoadingUpdateABrand
                ? "Please wait..."
                : brandId
                ? "Edit Brand"
                : "Add Brand"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBrand;
