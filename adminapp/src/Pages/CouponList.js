import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Table, Spin, Alert } from "antd";
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

const CouponList = React.memo(() => {
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
  }, [dispatch]);

  const { coupons, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.coupon ?? {}
  );
  const data =  coupons && coupons.map(
    (coupon, index) =>
      ({
        key: index + 1,
        name: coupon.name,
        expiry: new Date(coupon.expiry).toLocaleString(),
        discount: coupon.discount,

        action: (
          <>
            <Link to={`/admin/coupon/${coupon._id}`} className="fs-5">
              <FiEdit />
            </Link>
            <button
              onClick={() => showModal(coupon._id)}
              className="ms-2 text-danger bg-transparent border-0 fs-5"
            >
              <AiFillDelete />
            </button>
          </>
        ),
      } || [])
  );

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
            style={{ border: "none", outline: "none", boxShadow: "none" }}
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

        {isLoading ? (
          <div className="text-center">
            <Spin
              size="large"
              indicator={
                <LoadingOutlined style={{ fontSize: 40, fontWeight: 700 }} />
              }
            />
            <p className="">Loading coupons...</p>
          </div>
        ) : isError ? (
          <Alert message="Error" description={message} type="error" showIcon />
        ) : (
          <Table columns={columns} dataSource={data} />
        )}
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
});
export default CouponList;
