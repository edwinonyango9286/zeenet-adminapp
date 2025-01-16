import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { useLocation, useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  getACategory,
  resetState,
  updateACategory,
} from "../features/category/categorySlice";

const schema = Yup.object().shape({
  title: Yup.string().trim().required("Product Category Name is Required"),
});

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const categoryId = location.pathname.split("/")[3];
  const newCategory = useSelector((state) => state?.productCategory);

  const isSuccess = useSelector(
    (state) => state?.productCategory?.isSuccess?.createCategory
  );
  const isSuccessUpdateACategory = useSelector(
    (state) => state?.productCategory?.isSuccess?.updateACategory
  );
  const isLoadingCreateACategory = useSelector(
    (state) => state?.productCategory?.isLoading?.createCategory
  );
  const isLoadingUpdateACategory = useSelector(
    (state) => state?.productCategory?.isLoading?.updateACategory
  );
  const { createdCategory, categoryName, updatedCategory } = newCategory;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (categoryId) {
        const data = { id: categoryId, categoryData: values };
        dispatch(resetState());
        dispatch(updateACategory(data));
      } else {
        dispatch(resetState());
        dispatch(createCategory(values));
      }
    },
  });

  useEffect(() => {
    if (categoryId) {
      dispatch(getACategory(categoryId));
    } else {
      dispatch(resetState());
    }
  }, [categoryId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdCategory) {
      formik.resetForm();
      navigate("/admin/category-list");
    }
    if (isSuccessUpdateACategory && updatedCategory) {
      formik.resetForm();
      navigate("/admin/category-list");
    }
  }, [isSuccess, createdCategory, isSuccessUpdateACategory, updatedCategory]);

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center ">
          <h5 className="mb-2 title">{categoryId ? "Edit" : "Add"} Category</h5>{" "}
          <button
            className=" btn btn-primary border-0 rounded-2 my-3 text-white"
            type="button"
            style={{ border: "none", outline: "none", boxShadow: "none" }}
          >
            <Link
              to={"/admin/category-list"}
              className="text-white fw-bold fs-6 "
              style={{
                textDecoration: "none",
                border: "none",
                outline: "none",
                boxShadow: "none",
              }}
            >
              View Product Categories.
            </Link>
          </button>
        </div>

        <div>
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              label="Enter Product Category"
              name="title"
              onChng={formik.handleChange("title")}
              onBlr={formik.handleBlur("title")}
              val={formik.values.title}
              id="category"
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>

            <button
              type="submit"
              className="btn btn-primary border-0 rounded-3 mt-3 "
              style={{ border: "none", outline: "none", boxShadow: "none" }}
            >
              {isLoadingCreateACategory || isLoadingUpdateACategory
                ? "Please wait..."
                : categoryId
                ? "Edit Category"
                : "Add Category"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
