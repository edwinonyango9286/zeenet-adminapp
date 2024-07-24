import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
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
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, []);

  
  const brandState = useSelector((state) => state?.brand?.brands);

  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i + 1,
      name: brandState[i].title,
      action: (
        <>
          <Link to={`/admin/brand/${brandState[i]?._id}`} className="fs-5">
            <FiEdit/>
          </Link>
          
          <button
            className="ms-3 fs-5 text-danger bg-transparent border-0"
            onClick={() => showModal(brandState[i]?._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

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
            className=" btn btn-success border-0 rounded-2 my-3 text-white"
            type="button"
          >
            <Link
              to={"/admin/brand"}
              className="text-white"
              style={{
                textDecoration: "none",
              }}
            >
              {" "}
              Add New Brand.
            </Link>
          </button>
        </div>

        <div>{<Table columns={columns} dataSource={data1} />}</div>
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
