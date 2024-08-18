import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { toast } from "react-toastify";
import { useLocation, useNavigate ,Link} from "react-router-dom";
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
  title: Yup.string().required("Product Category Name is Required"),
});

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const categoryId = location.pathname.split("/")[3];
  const newCategory = useSelector((state) => state.productCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    categoryName,
    updatedCategory,
  } = newCategory;

  useEffect(() => {
    if (categoryId) {
      dispatch(getACategory(categoryId));
    } else {
      dispatch(resetState());
    }
  }, [categoryId]);

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Product category added successfully.");
      navigate("/admin/category-list");
    }
    if (isSuccess && updatedCategory) {
      toast.success("Category updated successfully.");
      navigate("/admin/category-list");
    }
    if (isError) {
      toast.error("Something went wrong. Please try again later.");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (categoryId) {
        const data = { id: categoryId, categoryData: values };
        dispatch(updateACategory(data));
        dispatch(resetState());
      } else { 
        dispatch(createCategory(values));
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
          <h5 className="mb-2 title">
            {categoryId  ? "Edit" : "Add"} Category
          </h5>{" "}
          <button
            className=" btn btn-primary border-0 rounded-2 my-3 text-white"
            type="button"
          >
            <Link
              to={"/admin/category-list"}
              className="text-white"
              style={{
                textDecoration: "none",
              }}
            >
              {" "}
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
            >
              {categoryId ? "Edit" : "Add"} Category
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
