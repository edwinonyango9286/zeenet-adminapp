import React, { useEffect, useState } from "react";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Table, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCustomers,
  resetState,
} from "../features/customers/customerSlice";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../Components/CustomModal";
import { deleteAUser } from "../features/user/userSlice";

const columns = [
  {
    title: "SNO",
    dataIndex: "key",
  },
  {
    title: "Avatar",
    dataIndex: "avatar",
    render: (text, record) => (
      <img
        src={record.avatar}
        alt={record.title}
        width={40}
        height={40}
        className="rounded-circle border border-1"
      />
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    render: (text, record) => {
      const [firstName, lastName] = text?.split("  ");
      return (
        <span>
          <span className="text-capitalize">{firstName}</span>
          <span className="text-capitalize">{lastName}</span>
        </span>
      );
    },

    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Customers = () => {
  const [open, setOpen] = useState(false);
  const [customerId, setCustomerId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setCustomerId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const customers = useSelector((state) => state?.customer?.customers);
  const isLoading = useSelector(
    (state) => state?.customer?.isLoading?.getAllCustomers
  );
  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllCustomers());
  }, [dispatch]);

  const data = (Array.isArray(customers) ? customers : [])
    .filter((customer) => customer?.role !== "admin")
    .map((customer, index) => ({
      key: index + 1,
      avatar: customer?.avatar,
      name: `${customer?.firstName} ${customer?.lastName}`,
      email: customer?.email,
      phone: customer?.phoneNumber,
      action: (
        <>
          <Link to={`/admin/coupon/${customer._id}`} className="fs-5">
            <FiEdit />
          </Link>
          <button
            onClick={() => showModal(customer._id)}
            className="ms-2 text-danger bg-transparent border-0 fs-5"
          >
            <AiFillDelete />
          </button>
        </>
      ),
    }));

  const deleteCustomerHandler = async () => {
    await dispatch(deleteAUser(customerId));
    setOpen(false);
    dispatch(getAllCustomers());
  };

  
  return (
    <div>
      <h5 className="mb-2 title">Customers</h5>
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
          deleteCustomerHandler(customerId);
        }}
        title="Are You sure you want to delete this Coupon"
      />
    </div>
  );
};

export default Customers;
