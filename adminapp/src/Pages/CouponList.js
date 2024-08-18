import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import {
  deleteACoupon,
  getCoupons,
  resetState,
} from "../features/coupon/couponSlice";
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
    title: "Expiry Date",
    dataIndex: "expiry",
  },
  {
    title: "Discount",
    dataIndex: "discount",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const CouponList = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setCouponId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCoupons());
  }, []);

  const couponState = useSelector((state) => state.coupon.coupons);
  const data1 = [];
  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: i + 1,
      name: couponState[i].name,
      expiry: new Date(couponState[i].expiry).toLocaleString(),
      discount: couponState[i].discount,

      action: (
        <>
          <Link to={`/admin/coupon/${couponState[i]._id}`} className="fs-5">
            <FiEdit />
          </Link>
          <button
            onClick={() => showModal(couponState[i]._id)}
            className="ms-2 text-danger bg-transparent border-0 fs-5"
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteCoupon = async (e) => {
    await dispatch(deleteACoupon(e));

    setOpen(false);
    dispatch(getCoupons());
  };

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center ">
          <h5 className="mb-2 title">Coupon List</h5>
          <button
            className=" btn btn-primary border-0 rounded-2 my-3 text-white"
            type="button"
          >
            <Link
              to={"/admin/coupon"}
              className="text-white"
              style={{
                textDecoration: "none",
              }}
            >
              {" "}
              Add New Coupon.
            </Link>
          </button>
        </div>
        <div>{<Table columns={columns} dataSource={data1} />}</div>
        <CustomModal
          open={open}
          hideModal={hideModal}
          perfomAction={() => {
            deleteCoupon(couponId);
          }}
          title="Are You sure you want to delete this Coupon"
        />
      </div>
    </>
  );
};
export default CouponList;
