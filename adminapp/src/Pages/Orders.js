import React, { useEffect } from "react";
import { Table, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { getAllOrders, UpdateAnOrder } from "../features/user/userSlice";
import { Link } from "react-router-dom";

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
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state) => state?.user?.isLoading?.getAllOrders
  );
  const orders = useSelector((state) => state?.user?.orders);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const formatKES = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const data = Array.isArray(orders)
    ? orders?.map((order, index) => ({
        key: index + 1,
        name: `${order?.user?.firstname} ${order?.user?.lastname}`,
        product: <Link to={`/admin/order/${order._id}`}>view Order</Link>,
        amount: formatKES(order?.totalPrice),
        date: new Date(order?.createdAt).toLocaleString(),
        action: (
          <>
            <select
              defaultValue={order?.orderStatus}
              onChange={(e) => updateOrder(order?._id, e.target.value)}
              className="form-control form-select"
              style={{}}
            >
              <option value="Ordered" disabled>
                Ordered
              </option>
              <option value="Processed">Processed</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </>
        ),
      }))
    : [];

  const updateOrder = (a, b) => {
    dispatch(UpdateAnOrder({ id: a, status: b }));
  };

  return (
    <>
      <div>
        <h5 className="mb-2">Orders</h5>
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
          <Table columns={columns} dataSource={data} />
        )}
      </div>
    </>
  );
};

export default Orders;
