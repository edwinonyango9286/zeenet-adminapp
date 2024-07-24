import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, resetState, UpdateAnOrder } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "SNO",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const Orders = () => {
  const getTokenFromLocalStorge = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const config3 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorge !== null ? getTokenFromLocalStorge.token : ""
      }`,
      Accept: "application/json",
    },
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(getOrders(config3));
  }, []);
  const orderState = useSelector((state) => state?.auth?.orders?.orders);
  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      name:
        orderState[i]?.user?.firstname + " " + orderState[i]?.user?.lastname,
      product: (
        <Link to={`/admin/order/${orderState[i]?._id}`}>view Order</Link>
      ),
      amount: orderState[i]?.totalPrice,
      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      action: (
        <>
          <select
            defaultValue={orderState[i]?.orderStatus}
            onChange={(e) => updateOrder(orderState[i]?._id, e.target.value)}
            className="form-control form-select"
            style={{}}
          >
            <option value="Ordered" disabled selected>
              Ordered
            </option>
            <option value="Processed">Processed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </>
      ),
    });
  }

  const updateOrder = (a, b) => {
    dispatch(UpdateAnOrder({ id: a, status: b }));
  };
  return (
    <>
      <div>
        <h5 className="mb-2">Orders</h5>
        <div>{<Table columns={columns} dataSource={data1} />}</div>
      </div>
    </>
  );
};

export default Orders;
