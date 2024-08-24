import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getABrand, getBrands } from "../features/brands/brandSlice";
import {
  getACategory,
  getProductCategories,
} from "../features/category/categorySlice";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import {
  createProduct,
  getAProduct,
  resetState,
  updateAProduct,
} from "../features/product/productSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
  title: Yup.string().required("Add product name."),
  description: Yup.string().required("Add product description."),
  price: Yup.number().required("Add product price."),
  brand: Yup.string().required("Add product brand."),
  category: Yup.string().required("Add product category."),
  tags: Yup.string().required("Select product tag."),
  quantity: Yup.number().required("Add product quantity."),
  screensize: Yup.number().required("Add product screen size."),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const productId = location.pathname.split("/")[3];
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getProductCategories());
  }, [dispatch]);

  const brandState = useSelector((state) => state?.brand?.brands);
  const categoryState = useSelector(
    (state) => state?.productCategory?.categories
  );
  const imgState = useSelector((state) => state?.upload?.images);
  const newProduct = useSelector((state) => state?.product);

  const {
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    productName,
    productDescription,
    productPrice,
    productCategory,
    productBrand,
    productQuantity,
    productImages,
    productTag,
    productScreenSize,
    updatedProduct,
  } = newProduct;

  useEffect(() => {
    if (productId) {
      dispatch(getAProduct(productId));
      img.push(productImages);
    } else {
      dispatch(resetState());
    }
  }, [productId]);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getACategory());
    dispatch(getABrand());
  }, []);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product added successfully.");
      navigate("/admin/product-list");
    }
    if (isSuccess && updatedProduct) {
      toast.success("Product updated successfully.");
      navigate("/admin/product-list");
    }
    if (isError) {
      toast.error("Something went wrong. Please try again later.");
    }
  }, [isSuccess, isError, isLoading]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, [img]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: productName || "",
      description: productDescription || "",
      price: productPrice || "",
      brand: productBrand || "",
      category: productCategory || "",
      quantity: productQuantity || "",
      images: "",
      tags: productTag || "",
      screensize: productScreenSize || "",
    },

    validationSchema: schema,
    onSubmit: (values) => {
      if (productId) {
        const data = { id: productId, productData: values };
        dispatch(updateAProduct(data));
        dispatch(resetState());
      } else {
        dispatch(createProduct(values));
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
          <h5 className="mb-2 title">{productId ? "Update" : "Add"} Product</h5>
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
              to={"/admin/product-list"}
              className="text-white"
              style={{
                textDecoration: "none",
              }}
            >
              {" "}
              View Products.
            </Link>
          </button>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-2 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter product name."
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div>
            <ReactQuill
              theme="snow"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <CustomInput
            type="number"
            label="Enter product price."
            name="price"
            min={1}
            onChng={formik.handleChange("price")}
            onBlr={formik.handleBlur("price")}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            name="brand"
            className="form-control py-3 mb-2 shadow-none outline-none"
            id="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
          >
            <option>Select Brand</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select
            name="category"
            className="form-control py-3 mb-2 shadow-none outline-none "
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
          >
            <option>Select Category</option>
            {categoryState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>

          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <select
            name="tags"
            className="form-control py-3 mb-2 shadow-none outline-none"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
          >
            <option value="" disabled>
              Select Tag
            </option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>

          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>

          <CustomInput
            type="number"
            label="Add a product Screen size. eg. 14.6"
            name="screensize"
            id="screensize"
            min={10}
            max={17}
            step={0.1}
            onChng={formik.handleChange("screensize")}
            onBlr={formik.handleBlur("screensize")}
            val={formik.values.screensize}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.screensize}
          </div>

          <CustomInput
            type="number"
            label="Enter product quantity."
            name="quantity"
            min={1}
            onChng={formik.handleChange("quantity")}
            onBlr={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>

          <div className="bg-white text-center boder-1 p-5">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag and Drop some files here, or Click to select files.
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>

          <div className="showImages d-flex flex-wrap gap-3">
            {imgState.map((i, j) => {
              return (
                <div className="position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
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
            className="btn btn-primary border-0 rounded-3 mt-3 border-0 focus:outline-none focus:ring-0"
            style={{
              width: 140,
              border: "none",
              outline: "none",
              boxShadow: "none",
            }}
          >
            {isLoading
              ? "Creating..."
              : productId
              ? "Update Product"
              : "Add Product"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
