import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import {
  deleteACategory,
  getCategories,
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
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);

  const categoryState = useSelector((state) => state.pCategory.categories);
  const data1 = [];
  for (let i = 0; i < categoryState.length; i++) {
    data1.push({
      key: i + 1,
      name: categoryState[i].title,
      action: (
        <>
          <Link to={`/admin/category/${categoryState[i]._id}`} className="fs-5">
            <FiEdit />
          </Link>
          <button className=" ms-2 fs-5  text-danger bg-transparent border-0">
            <AiFillDelete onClick={() => showModal(categoryState[i]._id)} />
          </button>
        </>
      ),
    });
  }

  const deleteCategory = async (e) => {
    await dispatch(deleteACategory(e));
    setOpen(false);
    dispatch(getCategories());
  };

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center ">
          <h5 className="mb-2 title"> Product Categories</h5>
          <button
            className=" btn btn-success border-0 rounded-2 my-3 text-white"
            type="button"
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
        <div>{<Table columns={columns} dataSource={data1} />}</div>
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
