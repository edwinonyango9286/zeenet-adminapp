import React, { useEffect, useState } from "react";
import { Table } from "antd";
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

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setProductId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, []);

  const productState = useSelector((state) => state?.product?.products);
  const data1 = [];
  for (let i = 0; i < productState?.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i]?.title,
      brand: productState[i]?.brand,
      category: productState[i]?.category,
      screensize: `${productState[i]?.screensize}"`,
      price: `Ksh    ${new Intl.NumberFormat("en-US", {
                    maximumFractionDigits: 0,
                  }).format(productState[i]?.price)}`,
      action: (
        <>
          <Link to={`/admin/product/${productState[i]?._id}`} className="fs-5">
            <FiEdit />
          </Link>

          <button
            className="ms-2 fs-5  text-danger border-0 bg-transparent"
            onClick={() => showModal(productState[i]?._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteProduct = async (e) => {
    await dispatch(deleteAProduct(e));
    setOpen(false);
    dispatch(getProducts());
  };
  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center ">
          <h5 className="title mb-2">Products</h5>
          <button
            className=" btn btn-success border-0 rounded-2 mb-2 text-white"
            type="button"
          >
            <Link to={"/admin/product"} className="text-white" style={{
              textDecoration: "none",
              
            }}> Add New Product.</Link>
          </button>
        </div>

        <div>{<Table columns={columns} dataSource={data1} />}</div>
        <CustomModal
          open={open}
          hideModal={hideModal}
          perfomAction={() => {
            deleteProduct(productId);
          }}
          title="Are you sure you want to delete this product?"
        />
      </div>
    </>
  );
};

export default ProductList;
