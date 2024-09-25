import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Table, Spin} from "antd";
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

const BlogCategoryList = React.memo(() => {
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
  }, [dispatch]);

  const { blogCategories, isError, isLoading, isSuccess, message } =
    useSelector((state) => state?.blogCategory ?? {});

  const data =
    blogCategories &&
    blogCategories?.map(
      (blogCategory, index) =>
      ({
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
      } || [])
    );
  const deleteBlogcategory = async (e) => {
    await dispatch(deleteABlogCat(e));
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
            style={{ border: "none", outline: "none", boxShadow: "none" }}
          >
            <Link
              to={"/admin/blog-category"}
              className="text-white"
              style={{
                textDecoration: "none",
              }}
            >
              Add New Blog Category.
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
          <Table scroll={{ x: '100vw' }}
            columns={columns} dataSource={data} />
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
});

export default BlogCategoryList;
