import React, { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Table, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, resetState } from "../features/customers/customerSlice";

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
    title: "Mobile",
    dataIndex: "mobile",
  },
];

const Customers = React.memo(() => {
  const dispatch = useDispatch();
  const { customers, isLoading, isError, message } = useSelector(
    (state) => state?.customer
  );
  useEffect(() => {
    dispatch(resetState());
    dispatch(getUsers());
  }, []);

  const data =
    customers &&
    customers
      ?.filter((customer) => customer.role !== "admin")
      .map(
        (customer, index) =>
        ({
          key: index + 1,
          name: `${customer?.firstname} ${customer?.lastname}`,
          email: customer?.email,
          mobile: customer?.mobile,
        } || [])
      );

  return (
    <div className="container">
      <h5 className="mb-2 title">Customers</h5>

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
        <Table columns={columns} dataSource={data} />
      )}
    </div>
  );
});

export default Customers;
