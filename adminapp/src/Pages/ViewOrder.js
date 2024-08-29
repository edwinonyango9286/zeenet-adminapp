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

const ViewOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAsingleOrder(orderId));
  }, [dispatch, orderId]);

  const orderState = useSelector((state) => state?.auth?.singleOrder?.order);
  console.log(orderState);

  const data1 = [];
  for (let i = 0; i < orderState?.orderedItems?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState?.orderedItems[i]?.product?.title,
      brand: orderState?.orderedItems[i]?.product.brand,
      count: orderState?.orderedItems[i]?.quantity,
      amount: orderState?.orderedItems[i]?.price,
    });
  }
  return (
    <>
      <div>
        <h5 className="mb-2">View Order</h5>
        <div>{<Table columns={columns} dataSource={data1} />}</div>
      </div>
    </>
  );
};

export default ViewOrder;
