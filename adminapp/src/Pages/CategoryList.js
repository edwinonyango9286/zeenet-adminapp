import React, { useEffect, useState } from "react";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Table, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import {
  deleteACategory,
  getProductCategories,
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

const CategoryList = () => {
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
  const categories = useSelector((state) => state?.productCategory?.categories);
  const isLoading = useSelector(
    (state) => state?.productCategory?.isLoading?.getProductCategories
  );

  useEffect(() => {
    dispatch(getProductCategories());
  }, [dispatch]);

  const data = Array.isArray(categories)
    ? categories?.map((category, index) => ({
        key: index + 1,
        name: category?.title,
        action: (
          <>
            <Link to={`/admin/category/${category?._id}`} className="fs-5">
              <FiEdit />
            </Link>
            <button className=" ms-2 fs-5  text-danger bg-transparent border-0">
              <AiFillDelete onClick={() => showModal(category?._id)} />
            </button>
          </>
        ),
      }))
    : [];

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
              className="text-white fw-bold fs-6"
              style={{
                textDecoration: "none",
                border: "none",
                outline: "none",
                boxShadow: "none",
              }}
            >
              Add New Product Category.
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
          <div style={{ overflowX: "auto", width: "100%" }}>
            <Table
              columns={columns}
              dataSource={data}
              scroll={{ x: "max-content" }}
            />
          </div>
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
};

export default CategoryList;
