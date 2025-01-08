import React, { useEffect, useState } from "react";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Table, Spin } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAProduct,
  getProducts,
  resetState,
} from "../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../Components/CustomModal";
import { FiEdit } from "react-icons/fi";

const columns = [
  {
    title: "SNO",
    dataIndex: "key",
  },

  {
    title: "Product Image",
    dataIndex: "image",
    render: (text, record) => (
      <img
        src={record.image}
        alt={record.title}
        width={60}
        height={60}
        className="rounded-3 border border-1"
      />
    ),
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Screen size",
    dataIndex: "screenSize",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setProductId(e);
  };

  const formatKES = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const products = useSelector((state) => state?.product?.products);
  const isLoading = useSelector(
    (state) => state?.product?.isLoading?.getProducts
  );

  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, [dispatch]);

  const data = Array.isArray(products)
    ? products.map((product, index) => ({
        key: index + 1,
        image: product?.images[0]?.url,
        title: product?.title,
        brand: product?.brand?.title,
        category: product?.category?.title,
        screenSize: `${product?.screenSize}"`,
        price: `${formatKES(product?.price)}`,
        action: (
          <>
            <Link to={`/admin/product/${product?._id}`} className="fs-5">
              <FiEdit />
            </Link>
            <button
              className="ms-2 fs-5 text-danger border-0 bg-transparent"
              onClick={() => showModal(product?._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      }))
    : [];

  const deleteProduct = async (id) => {
    await dispatch(deleteAProduct(id));
    setOpen(false);
    dispatch(getProducts());
  };

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="title mb-2">Products</h5>
          <button
            className="btn btn-primary border-0 rounded-2 mb-2 text-white"
            type="button"
          >
            <Link
              to="/admin/product"
              className="text-white fs-6 fw-bold"
              style={{
                textDecoration: "none",
                border: "none",
                outline: "none",
                boxShadow: "none",
              }}
            >
              Add New Product
            </Link>
          </button>
        </div>

        {isLoading ? (
          <div className="text-center">
            <Spin
              indicator={
                <Loading3QuartersOutlined
                  style={{
                    fontSize: 40,
                    fontWeight: "bold",
                    color: "#000",
                  }}
                  spin
                />
              }
            />
          </div>
        ) : (
          <Table columns={columns} dataSource={data} />
        )}
        <CustomModal
          open={open}
          hideModal={hideModal}
          perfomAction={() => deleteProduct(productId)}
          title="Are you sure you want to delete this product?"
        />
      </div>
    </>
  );
};

export default ProductList;
