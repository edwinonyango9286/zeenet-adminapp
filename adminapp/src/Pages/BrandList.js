import React, { useEffect, useState } from "react";
import { Table, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

import {
  deleteABrand,
  getBrands,
  resetState,
} from "../features/brands/brandSlice";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import CustomModal from "../Components/CustomModal";

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

const BrandList = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBrandId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const { brands, isLoading, isError, message } = useSelector(
    (state) => state?.brand ?? {}
  );

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, []);

  const data =
    brands &&
    brands?.map(
      (brand, index) =>
        ({
          key: index + 1,
          name: brand?.title,
          action: (
            <>
              <Link to={`/admin/brand/${brand?._id}`} className="fs-5">
                <FiEdit />
              </Link>
              <button
                className="ms-3 fs-5 text-danger bg-transparent border-0"
                onClick={() => showModal(brand?._id)}
                style={{ border: "none", outline: "none", boxShadow: "none" }}
              >
                <AiFillDelete />
              </button>
            </>
          ),
        } || [])
    );

  const deleteBrand = async (e) => {
    await dispatch(deleteABrand(e));
    setOpen(false);
    dispatch(getBrands());
  };

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center ">
          <h5 className="mb-2 title">Product Brands</h5>
          <button
            className=" btn btn-primary border-0 rounded-2 my-3 text-white"
            type="button"
            style={{ border: "none", outline: "none", boxShadow: "none" }}
          >
            <Link
              to={"/admin/brand"}
              className="text-white"
              style={{
                textDecoration: "none",
              }}
            >
              Add New Brand.
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
        ) :  (
          <Table columns={columns} dataSource={data} />
        )}

        <CustomModal
          open={open}
          hideModal={hideModal}
          perfomAction={() => {
            deleteBrand(brandId);
          }}
          title="Are you sure you want to delete this brand?"
        />
      </div>
    </>
  );
};
export default BrandList;
