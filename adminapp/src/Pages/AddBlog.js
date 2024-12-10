import React, { useEffect, useState } from "react";
import CustomInput from "../Components/CustomInput";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createBlog,
  getABlog,
  resetState,
  updateABlog,
} from "../features/blogs/blogSlice";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { getAllBlogCategories } from "../features/blogcategory/blogCategorySlice";
import CustomTextarea from "../Components/CustomTextarea";

const schema = Yup.object().shape({
  title: Yup.string().required("Blog Name is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const blogId = location.pathname.split("/")[3];

  const isSuccessCreateBlog = useSelector(
    (state) => state.blog.isSuccess.createBlog
  );
  const blogCategories = useSelector(
    (state) => state?.blogCategory?.blogCategories
  );
  const imgState = useSelector((state) => state?.upload?.images);
  const newBlog = useSelector((state) => state?.blog);

  const isSuccessUpdateABlog = useSelector(
    (state) => state.blog.isSuccess.updateABlog
  );
  const isLoading = useSelector(
    (state) => state.blogCategory.isLoading.getAllBlogCategories
  );
  const {
    createdBlog,
    blogName,
    blogDescription,
    blogCategory,
    blogImages,
    updatedBlog,
  } = newBlog;

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, [imgState]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || "",
      description: blogDescription || "",
      category: blogCategory || "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (blogId) {
        const data = { id: blogId, blogData: values };
        dispatch(resetState());
        dispatch(updateABlog(data));
      } else {
        dispatch(resetState());
        dispatch(createBlog(values));
      }
    },
  });

  useEffect(() => {
    if (isSuccessCreateBlog && createdBlog) {
      formik.resetForm();
      navigate("/admin/blog-list");
    }
    if (isSuccessUpdateABlog && updatedBlog) {
      formik.resetForm();
      navigate("/admin/blog-list");
    }
  }, [isSuccessCreateBlog, createBlog, updatedBlog, isSuccessUpdateABlog]);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllBlogCategories());
  }, [dispatch]);

  useEffect(() => {
    if (blogId) {
      dispatch(getABlog(blogId));
      img.push(blogImages);
    } else {
      dispatch(resetState());
    }
  }, [blogId, dispatch]);

  useEffect(() => {
    dispatch(getAllBlogCategories());
  }, [dispatch]);

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center ">
          <h5 className="mb-2 title">{blogId ? "Update" : "Add"} Blog</h5>
          <button
            className=" btn btn-primary border-0 rounded-2 my-3 text-white"
            type="button"
            style={{
              border: "none",
              outline: "none",
              boxShadow: "none",
            }}
          >
            <Link
              to={"/admin/blog-list"}
              className="text-white"
              style={{
                textDecoration: "none",
              }}
            >
              View Blogs.
            </Link>
          </button>
        </div>
        <div className="">
          <form
            onSubmit={formik.handleSubmit}
            className="d-flex gap-3 flex-column"
          >
            <CustomInput
              type="text"
              label="Enter Blog Title"
              name="title"
              onChng={formik.handleChange("title")}
              onBlr={formik.handleBlur("title")}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
            <select
              name="category"
              className="form-control py-3 mt-3"
              onChange={formik.handleChange("category")}
              onBlur={formik.handleBlur("category")}
              value={formik.values.category}
            >
              <option>Select blog Category</option>
              {Array.isArray(blogCategories)
                ? blogCategories?.map((i, j) => {
                    return (
                      <option key={j} value={i.title}>
                        {i.title}
                      </option>
                    );
                  })
                : []}
            </select>
            <div className="error">
              {formik.touched.category && formik.errors.category}
            </div>

            <div className="form-floating mt-2">
              <CustomTextarea
                type="text"
                label="Enter blog description."
                name="description"
                id="description"
                onChange={formik.handleChange("description")}
                onBlur={formik.handleChange("description")}
                value={formik.values.description}
              />
            </div>
            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>

            <div className="bg-white text-center boder-1 p-4  ">
              <Dropzone
                onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>
                        Drag and Drop some files here, or Click to select files
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>

            <div className="showImages d-flex flex-wrap gap-3">
              {imgState?.map((i, j) => {
                return (
                  <div className="position-relative" key={j}>
                    <button
                      type="button"
                      onClick={() => dispatch(delImg(i.public_id))}
                      className="btn-close position-absolute"
                      style={{
                        top: "10px",
                        right: "10px",
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                      }}
                    ></button>
                    <img
                      src={i.url}
                      alt="productImage"
                      width={200}
                      height={200}
                    />
                  </div>
                );
              })}
            </div>

            <button
              type="submit"
              className="btn btn-primary border-0 rounded-3 mt-3"
              style={{
                width: 140,
                border: "none",
                outline: "none",
                boxShadow: "none",
              }}
            >
              {isLoading ? "Creating..." : blogId ? "Update Blog" : "Add blog"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
