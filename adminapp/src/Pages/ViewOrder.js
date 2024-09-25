import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAsingleOrder } from "../features/auth/authSlice";
import { useLocation } from "react-router-dom";

const columns = [
  {
    title: "SNO",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
];

const formatKES = (amount) => {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(amount);
};

const ViewOrder = React.memo(() => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAsingleOrder(orderId));
  }, [orderId]);

  const order = useSelector((state) => state?.auth?.singleOrder?.order);
  const data = [];
  for (let i = 0; i < order.orderedItems?.length; i++) {
    data.push({
      key: i + 1,
      name: order.orderedItems[i]?.product?.title,
      brand: order.orderedItems[i]?.product?.brand,
      count: order.orderedItems[i]?.quantity,
      amount: formatKES(order.orderedItems[i]?.price),
    });
  }

  return (
    <>
      <div>
        <h5 className="mb-2">View Order</h5>
        <div>{<Table columns={columns} dataSource={data} />}</div>
      </div>
    </>
  );
});

export default ViewOrder;
