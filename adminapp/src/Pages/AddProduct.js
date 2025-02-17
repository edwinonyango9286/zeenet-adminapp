import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brands/brandSlice";
import { getProductCategories } from "../features/category/categorySlice";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import {
  createProduct,
  getAProduct,
  resetState,
  updateAProduct,
} from "../features/product/productSlice";
import { useLocation, useNavigate } from "react-router-dom";
import CustomTextarea from "../Components/CustomTextarea";
import { MdCloudUpload } from "react-icons/md";

const schema = Yup.object().shape({
  title: Yup.string().trim().required("Please add the product name."),
  description: Yup.string()
    .trim()
    .required("Please add the product description."),
  price: Yup.number()
    .positive("The price must be a positive number.")
    .required("Please add the product price."),
  brand: Yup.string().trim().required("Please add the product brand."),
  category: Yup.string().trim().required("Please add the product category."),
  tags: Yup.string().trim().required("Please select the product tag."),
  quantity: Yup.number()
    .positive("The quantity must be a positive number.")
    .integer("The quantity must be an integer.")
    .required("Please add the product quantity."),
  screenSize: Yup.number()
    .positive("The screen size must be a positive number.")
    .required("Please add the product screen size."),
  images: Yup.array()
    .min(1, "Please upload at least one image.")
    .required("Please upload at least one image."),
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
  const uploading = useSelector((state) => state?.upload?.isLoading?.uploadImg);

  const isSuccess = useSelector(
    (state) => state?.product?.isSuccess?.createProduct
  );
  const isLoading = useSelector(
    (state) => state?.product?.isLoading?.createProduct
  );

  const isErrorCreatingProduct = useSelector(
    (state) => state?.product?.isError?.createProduct
  );

  const isErrorUpdatingAProduct = useSelector(
    (state) => state?.product?.isError?.updateAProduct
  );

  useEffect(() => {
    if (isErrorCreatingProduct || isErrorUpdatingAProduct) {
      dispatch(getBrands());
      dispatch(getProductCategories());
    }
  }, [isErrorCreatingProduct, isErrorUpdatingAProduct, dispatch]);

  const {
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
  }, [productId, dispatch]);

  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      formik.resetForm();
      navigate("/admin/product-list");
    }
    if (isSuccess && updatedProduct) {
      formik.resetForm();
      navigate("/admin/product-list");
    }
  }, [isSuccess, createdProduct, updatedProduct]);

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
    initialValues: {
      title: productName || "",
      description: productDescription || "",
      price: productPrice || "",
      brand: productBrand || "",
      category: productCategory || "",
      quantity: productQuantity || "",
      images: [],
      tags: productTag || "",
      screenSize: productScreenSize || "",
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      if (!values.images || values.images.length === 0) {
        formik.setFieldError("images", "Please upload at least one image.");
        return;
      }
      if (productId) {
        const data = { id: productId, productData: values };
        dispatch(resetState());
        dispatch(updateAProduct(data));
      } else {
        dispatch(resetState());
        dispatch(createProduct(values));
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
              className="text-white fw-bold fs-6"
              style={{
                textDecoration: "none",
                border: "none",
                outline: "none",
                boxShadow: "none",
              }}
            >
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
            label="Enter product title."
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>

          <div className="form-floating mt-2">
            <CustomTextarea
              type="text"
              name="description"
              label="Enter product description."
              id="description"
              onChange={formik.handleChange("description")}
              onBlur={formik.handleBlur("description")}
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
            {brandState?.map((i, j) => {
              return (
                <option key={j} value={i?._id}>
                  {i?.title}
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
                <option key={j} value={i?._id}>
                  {i?.title}
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
            <option value="Featured">Featured</option>
            <option value="Popular">Popular</option>
            <option value="Special">Special</option>
          </select>

          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>

          <CustomInput
            type="number"
            label="Add a product Screen size. eg. 14.6"
            name="screenSize"
            id="screenSize"
            min={2}
            max={30}
            step={0.1}
            onChng={formik.handleChange("screenSize")}
            onBlr={formik.handleBlur("screenSize")}
            val={formik.values.screenSize}
          />
          <div className="error">
            {formik.touched.screenSize && formik.errors.screenSize}
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

          <div className="bg-white text-center border-1 p-4 border rounded cusor-pointer">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {uploading ? (
                      "Please wait.."
                    ) : (
                      <div className="d-flex flex-column align-items-center justify-content-between gap-1">
                        <MdCloudUpload style={{ fontSize: "44px" }} />
                        <p>
                          Drag and Drop some files here,or Click to select
                          files.
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="error">
            {formik.touched.images && formik.errors.images}
          </div>

          <div className="showImages d-flex flex-wrap gap-3">
            {imgState.map((i, j) => {
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
                    className="image-fluid rounded-3"
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
              ? "Please wait..."
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
