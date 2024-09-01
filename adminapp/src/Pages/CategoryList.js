import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Table, Spin, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import {
  deleteACategory,
  getProductCategories,
  resetState,
} from "../features/category/categorySlice";
import CustomModal from "../Components/CustomModal";
import { FiEdit } from "react-icons/fi";

const columns = [
  {
    title: "SNO",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const CategoryList = React.memo(() => {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setCategoryId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const { categories, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.productCategory ?? {}
  );

  useEffect(() => {
    dispatch(resetState());
    dispatch(getProductCategories());
  }, [dispatch]);

  const data =
    categories &&
    categories?.map(
      (category, index) =>
        ({
          key: index + 1,
          name: category.title,
          action: (
            <>
              <Link to={`/admin/category/${category._id}`} className="fs-5">
                <FiEdit />
              </Link>
              <button className=" ms-2 fs-5  text-danger bg-transparent border-0">
                <AiFillDelete onClick={() => showModal(category._id)} />
              </button>
            </>
          ),
        } || [])
    );

  const deleteCategory = async (e) => {
    await dispatch(deleteACategory(e));
    setOpen(false);
    dispatch(getProductCategories());
  };

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center ">
          <h5 className="mb-2 title"> Product Categories</h5>
          <button
            className=" btn btn-primary border-0 rounded-2 my-3 text-white"
            type="button"
            style={{ border: "none", outline: "none", boxShadow: "none" }}
          >
            <Link
              to={"/admin/category"}
              className="text-white"
              style={{
                textDecoration: "none",
              }}
            >
              {" "}
              Add New Product Category.
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
            <p className="">Loading Categories...</p>
          </div>
        ) : isError ? (
          <Alert message="Error" description={message} type="error" showIcon />
        ) : (
          <Table columns={columns} dataSource={data} />
        )}
        <CustomModal
          open={open}
          hideModal={hideModal}
          perfomAction={() => {
            deleteCategory(categoryId);
          }}
          title="Are you sure you want to delete this product category?"
        />
      </div>
    </>
  );
});

export default CategoryList;
