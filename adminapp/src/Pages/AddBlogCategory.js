import React, { useEffect, useState } from "react";
import CustomInput from "../Components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLocation, useNavigate,Link } from "react-router-dom";
import {
  createBlogCategory,
  getABlogCat,
  resetState,
  updateABLogCat,
} from "../features/blogcategory/blogCategorySlice";

const schema = Yup.object().shape({
  title: Yup.string().required("Blog Category Name is required"),
});

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const blogCategoryId = location.pathname.split("/")[3];
  const newBlogCategory = useSelector((state) => state.bCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBlogCategory,
    updatedBlogCat,
    blogCatName,
  } = newBlogCategory;

  useEffect(() => {
    if (blogCategoryId) {
      dispatch(getABlogCat(blogCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [blogCategoryId]);


  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success("Blog category added successfully.");
    }
    if (isSuccess && updatedBlogCat) {
      toast.success("Blog category updated successfully.");
      navigate("/admin/blog-category-list");
    }
    if (isError) {
      toast.error("Something went wrong. Please try again.");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCatName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (blogCategoryId) {
        const data = { id: blogCategoryId, blogCatData: values };
        dispatch(updateABLogCat(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogCategory(values));
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
            {blogCategoryId? "Edit" : "Add"} Blog Category
          </h5>{" "}
          <button
            className=" btn btn-primary border-0 rounded-2 my-3 text-white"
            type="button"
          >
            <Link
              to={"/admin/blog-category-list"}
              className="text-white"
              style={{
                textDecoration: "none",
              }}
            >
              {" "}
              View Blog Categories.
            </Link>
          </button>
        </div>

        <div>
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              label="Enter Blog Category"
              name="title"
              onChng={formik.handleChange("title")}
              onBlr={formik.handleBlur("title")}
              val={formik.values.title}
              id="blogcat"
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>

            <button
              type="submit"
              className="btn btn-primary border-0 mt-3 rounded-3 my-2 "
            >
              {blogCategoryId ? "Edit" : "Add"} Blog Category
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlogCategory;
