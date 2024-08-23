import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Table, Spin, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteABlog, getBlogs, resetState } from "../features/blogs/blogSlice";
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
    title: "Tittle",
    dataIndex: "name",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BlogList = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBlogId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, [dispatch, getBlogs, resetState]);

  const { blogs, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.blog ?? {}
  );

  const data1 = blogs.map(
    (blog, index) =>
      ({
        key: index + 1,
        name: blog.title,
        category: blog.category,
        action: (
          <>
            <Link to={`/admin/blog/${blog._id}`} className="fs-5">
              <FiEdit />
            </Link>
            <button
              className="ms-2 fs-5 text-danger bg-transparent border-0"
              onClick={() => showModal(blog._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      } || [])
  );

  const deleteBlog = async (e) => {
    await dispatch(deleteABlog(e));
    setOpen(false);
    dispatch(getBlogs());
  };
  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-2 title">Blog List</h5>
          <button
            className=" btn btn-primary border-0 rounded-2 my-3 text-white"
            type="button"
          >
            <Link
              to={"/admin/blog"}
              className="text-white"
              style={{
                textDecoration: "none",
                border: "none",
                outline: "none",
                boxShadow: "none",
              }}
            >
              Add New Blog.
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
            <p className="">Loading products...</p>
          </div>
        ) : isError ? (
          <Alert message="Error" description={message} type="error" showIcon />
        ) : (
          <Table columns={columns} dataSource={data1} />
        )}
        <CustomModal
          open={open}
          hideModal={hideModal}
          perfomAction={() => {
            deleteBlog(blogId);
          }}
          title="Are you sure you want to delete this blog?"
        />
      </div>
    </>
  );
};

export default BlogList;
