import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
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
  const newBlogCategory = useSelector((state) => state?.blogCategory);
  const isSuccess = useSelector(
    (state) => state.blogCategory.isSuccess.createBlogCategory
  );
  const isLoading = useSelector(
    (state) => state.blogCategory.isLoading.createBlogCategory
  );

  const { createdBlogCategory, updatedBlogCat, blogCatName } = newBlogCategory;

  useEffect(() => {
    if (blogCategoryId) {
      dispatch(resetState());
      dispatch(getABlogCat(blogCategoryId));
    }
  }, [blogCategoryId, dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCatName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (blogCategoryId) {
        const data = { id: blogCategoryId, blogCatData: values };
        dispatch(resetState());
        dispatch(updateABLogCat(data));
      } else {
        dispatch(resetState());
        dispatch(createBlogCategory(values));
      }
    },
  });

  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      formik.resetForm();
      navigate("/admin/blog-category-list");
    }
    if (isSuccess && updatedBlogCat) {
      formik.resetForm();
      navigate("/admin/blog-category-list");
    }
  }, [isSuccess, createdBlogCategory, updatedBlogCat, formik, navigate]);

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center ">
          <h5 className="mb-2 title">
            {blogCategoryId ? "Edit" : "Add"} Blog Category
          </h5>
          <button
            className=" btn btn-primary border-0 rounded-2 my-3 text-white"
            type="button"
            style={{ border: "none", outline: "none", boxShadow: "none" }}
          >
            <Link
              to={"/admin/blog-category-list"}
              className="text-white fw-bold f-6"
              style={{
                textDecoration: "none",
                border: "none",
                outline: "none",
                boxShadow: "none",
              }}
            >
              View Blog Categories.
            </Link>
          </button>
        </div>

        <div>
          <form onSubmit={formik.handleSubmit}>
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
              style={{ border: "none", outline: "none", boxShadow: "none" }}
            >
              {isLoading
                ? "Please wait..."
                : blogCategoryId
                ? "Edit Blog category"
                : "Add Blog Category"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlogCategory;
