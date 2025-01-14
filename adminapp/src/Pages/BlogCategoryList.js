import React, { useEffect, useState } from "react";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Table, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteABlogCategory,
  getAllBlogCategories,
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
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [blogCatId, setBlogCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBlogCatId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllBlogCategories());
  }, [dispatch]);

  const isLoading = useSelector(
    (state) => state?.blogCategory?.isLoading?.getAllBlogCategories
  );
  const blogCategories = useSelector(
    (state) => state?.blogCategory?.blogCategories
  );

  const data = Array.isArray(blogCategories)
    ? blogCategories.map((blogCategory, index) => ({
        key: index + 1,
        name: blogCategory?.title,
        action: (
          <>
            <Link
              to={`/admin/blog-category/${blogCategory?._id}`}
              className="fs-5"
            >
              <FiEdit />
            </Link>
            <button
              onClick={() => showModal(blogCategory?._id)}
              className="ms-2 text-danger bg-transparent border-0 fs-5"
              style={{}}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      }))
    : [];

  const deleteBlogcategory = async (e) => {
    await dispatch(deleteABlogCategory(e));
    setOpen(false);
    dispatch(getAllBlogCategories());
  };
  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center ">
          <h5 className="mb-2 title title">Blog Category</h5>
          <button
            className=" btn btn-primary border-0 rounded-2 my-3 text-white"
            type="button"
            style={{ border: "none", outline: "none", boxShadow: "none" }}
          >
            <Link
              to={"/admin/blog-category"}
              className="text-white fw-bold fs-6"
              style={{
                textDecoration: "none",
                border: "none",
                outline: "none",
                boxShadow: "none",
              }}
            >
              Add New Blog Category.
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
            deleteBlogcategory(blogCatId);
          }}
          title="Are you sure you want to delete this blog?"
        />
      </div>
    </>
  );
};

export default BlogCategoryList;
