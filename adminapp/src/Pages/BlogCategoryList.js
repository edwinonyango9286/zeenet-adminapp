import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteABlogCat,
  getBlogCategory,
  resetState,
} from "../features/blogcategory/blogCategorySlice";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
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


const BlogCategoryList = () => {
  const [open, setOpen] = useState(false);
  const [blogCatId, setBlogCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBlogCatId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogCategory());
  }, []);
  const blogCategoryState = useSelector((state) => state.bCategory.bCategories);
  const data1 = [];
  for (let i = 0; i < blogCategoryState.length; i++) {
    data1.push({
      key: i + 1,
      name: blogCategoryState[i].title,
      action: (
        <>
          <Link
            to={`/admin/blog-category/${blogCategoryState[i]._id}`}
            className="fs-5"
          >
            <FiEdit />
          </Link>
          <button
            onClick={() => showModal(blogCategoryState[i]._id)}
            className="ms-2 text-danger bg-transparent border-0 fs-5"
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteBlogcategory = async (e) => {
   await  dispatch(deleteABlogCat(e));
    setOpen(false);
      dispatch(getBlogCategory());
  };
  

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center ">
          <h5 className="mb-2 title title">Blog Category</h5>
          <button
            className=" btn btn-primary border-0 rounded-2 my-3 text-white"
            type="button"
          >
            <Link
              to={"/admin/blog-category"}
              className="text-white"
              style={{
                textDecoration: "none",
              }}
            >
              {" "}
              Add New Blog Category.
            </Link>
          </button>
        </div>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          open={open}
          hideModal={hideModal}
          perfomAction={() => {
            deleteBlogcategory(blogCatId);
          }}
          title="Are you sure you want to delete this blog?"
        />
      </div>
    </>
  );
};

export default BlogCategoryList;
