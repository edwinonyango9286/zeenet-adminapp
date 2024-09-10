import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
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
    dataIndex: "screensize",
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

const ProductList = React.memo(() => {
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
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product ?? {}
  );

  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, [ getProducts, resetState]);

  const data1 =
    products &&
    products.map(
      (product, index) =>
      ({
        key: index + 1,
        title: product.title,
        brand: product.brand,
        category: product.category,
        screensize: `${product.screensize}"`,
        price: `Ksh ${formatKES(product.price)}`,
        action: (
          <>
            <Link to={`/admin/product/${product._id}`} className="fs-5">
              <FiEdit />
            </Link>
            <button
              className="ms-2 fs-5 text-danger border-0 bg-transparent"
              onClick={() => showModal(product._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      } || [])
    );

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
              className="text-white"
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
              size="large"
              indicator={
                <LoadingOutlined style={{ fontSize: 40, fontWeight: 700 }} />
              }
            />
          </div>
        ) : (
          <Table columns={columns} dataSource={data1} />
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
});

export default ProductList;
