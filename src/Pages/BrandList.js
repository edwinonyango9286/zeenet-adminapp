import React, { useEffect, useState } from "react";
import { Table, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Loading3QuartersOutlined } from "@ant-design/icons";

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
  const dispatch = useDispatch();

  const showModal = (e) => {
    setOpen(true);
    setBrandId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const brands = useSelector((state) => state?.brand?.brands);
  const isLoading = useSelector((state) => state?.brand?.isLoading?.getBrands);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, [dispatch]);

  const data = Array.isArray(brands)
    ? brands?.map((brand, index) => ({
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
      }))
    : [];

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
              className="text-white fs-6 fw-bold"
              style={{
                textDecoration: "none",
                border: "none",
                outline: "none",
                boxShadow: "none",
              }}
            >
              Add New Brand.
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
        </div>        )}

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
