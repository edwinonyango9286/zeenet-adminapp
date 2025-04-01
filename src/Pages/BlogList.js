import React, { useEffect, useState } from "react";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Table, Spin } from "antd";
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
  }, [dispatch]);

  const blogs = useSelector((state) => state?.blog?.blogs);
  const isLoading = useSelector((state) => state?.blog?.isLoading?.getBlogs);

  const data = Array.isArray(blogs)
    ? blogs.map((blog, index) => ({
        key: index + 1,
        image: blog?.images[0]?.url,
        name: blog?.title,
        category: blog?.category?.title,
        action: (
          <>
            <Link to={`/admin/blog/${blog?._id}`} className="fs-5">
              <FiEdit />
            </Link>
            <button
              className="ms-2 fs-5 text-danger bg-transparent border-0"
              onClick={() => showModal(blog?._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      }))
    : [];

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
            style={{ border: "none", outline: "none", boxShadow: "none" }}
          >
            <Link
              to={"/admin/blog"}
              className="text-white fw-bold fs-6"
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
            deleteBlog(blogId);
          }}
          title="Are you sure you want to delete this blog?"
        />
      </div>
    </>
  );
};

export default BlogList;
