import React, { useEffect, useState } from "react";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Table, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCustomers,
  resetState,
} from "../features/customers/customerSlice";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../Components/CustomModal";
import { blockAUser, deleteAUser } from "../features/user/userSlice";
import { ImBlocked } from "react-icons/im";
import { IoEllipsisVertical } from "react-icons/io5";
import { dateFormatter } from "../utils/dateFormatter";

const columns = [
  {
    title: "SNO",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    render: (text, record) => {
      const [firstName, lastName] = text?.split("  ");
      return (
        <>
          <div className="d-flex flex-row gap-2">
            <div>
              <img
                src={record.avatar}
                alt={record.title}
                width={40}
                height={40}
                className="rounded-circle border border-1"
              />
            </div>
            <div className="d-flex flex-column ">
              <div className="d-flex flex-row firstName">
                <span className="text-capitalize">{firstName}</span>
                <span className="text-capitalize">{lastName}</span>
              </div>
              <div className="email">{record?.email}</div>
            </div>
          </div>
        </>
      );
    },
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Registered",
    dataIndex: "registered",
    sorter: (a, b) => new Date(a.registered) - new Date(b.registered),
  },
  {
    title: "Country",
    dataIndex: "country",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Group",
    dataIndex: "group",
  },
  {
    title: "Spent",
    dataIndex: "spent",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const CustomersList = () => {
  const [open, setOpen] = useState(false);
  const [openBlockModal, setOpenBlockModal] = useState(false);
  const [customerId, setCustomerId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setCustomerId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const showBlockModal = (e) => {
    setOpenBlockModal(true);
    setCustomerId(e);
  };

  const hideBlockModal = () => {
    setOpenBlockModal(false);
  };

  const dispatch = useDispatch();
  const customers = useSelector((state) => state?.customer?.customers);
  const isLoading = useSelector(
    (state) => state?.customer?.isLoading?.getAllCustomers
  );
  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllCustomers());
  }, []);

  const data = (Array.isArray(customers) ? customers : [])
    .filter((customer) => customer?.role !== "admin")
    .map((customer, index) => ({
      key: index + 1,
      avatar: customer?.avatar,
      name: `${customer?.firstName} ${customer?.lastName}`,
      email: customer?.email,
      registered: dateFormatter(customer?.createdAt),
      country: customer?.country,
      group: customer?.customerGroup,
      spent: customer?.spent,
      phone: customer?.phoneNumber,
      action: (
        <>
          <div className="d-flex flex-row gap-2">
            <button
              onClick={() => showModal(customer?._id)}
              className="ms-2 text-danger bg-transparent border-0 fs-5"
            >
              <AiFillDelete />
            </button>
            <button
              onClick={() => showBlockModal(customer?._id)}
              className="ms-2 text-danger bg-transparent border-0 fs-6"
            >
              <ImBlocked />
            </button>
            <button className="ms-2  bg-transparent border-0 fs-5">
              <IoEllipsisVertical />
            </button>
          </div>
        </>
      ),
    }));

  const deleteCustomerHandler = async (customerId) => {
    await dispatch(deleteAUser(customerId));
    setOpen(false);
    dispatch(getAllCustomers());
  };

  const handleBlockCustomer = async (customerId) => {
    await dispatch(blockAUser(customerId));
    setOpenBlockModal(false);
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
        title="Are You sure you want to delete this user?"
      />
      <CustomModal
        open={openBlockModal}
        hideModal={hideBlockModal}
        perfomAction={() => {
          handleBlockCustomer(customerId);
        }}
        title="Are You sure you want to block this user?"
      />
    </div>
  );
};

export default CustomersList;
