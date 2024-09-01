import React, { useState, useEffect } from "react";
import { BsArrowDownRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Spin, Table, Alert } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import {
  getMonthWiseOrders,
  getOrders,
  getYearlyStatistics,
} from "../features/auth/authSlice";

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
    title: "Products",
    dataIndex: "product",
  },
  {
    title: "Total Price",
    dataIndex: "price",
  },
  {
    title: "Price After Discount",
    dataIndex: "discountedPrice",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const Dashboard = React.memo(() => {
  const dispatch = useDispatch();
  const monthlyDataState = useSelector((state) => state.auth.monthlyData);
  const yearlyDataState = useSelector((state) => state.auth.yearlyData);
  const { isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const { orders } = useSelector((state) => state.auth.orders);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);
  const [orderData, setOrderData] = useState([]);

  const formatKES = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    dispatch(getMonthWiseOrders());
    dispatch(getYearlyStatistics());
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let data = [];
    let mothlyOrderCount = [];
    for (let index = 0; index < monthlyDataState?.length; index++) {
      const element = monthlyDataState[index];
      data.push({
        type: monthNames[element._id.month],
        income: element.amount,
      });
      setDataMonthly(data);
      mothlyOrderCount.push({
        type: monthNames[element._id.month],
        sales: element.count,
      });
    }
    setDataMonthlySales(mothlyOrderCount);
  }, [monthlyDataState]);

  useEffect(() => {
    const data =
      orders &&
      orders.map(
        (order, index) =>
          ({
            key: index + 1,
            name: order.user.firstname + " " + order.user.lastname,
            product: order.orderedItems?.length,

            price: formatKES(order.totalPrice),
            discountedPrice: formatKES(order.totalPriceAfterDiscount),
            status: order.orderStatus,
          } || [])
      );
    setOrderData(data);
  }, [orders]);

  const config = {
    data: dataMonthly,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#0d6efd";
    },
    label: {
      position: "top",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  const config2 = {
    data: dataMonthlySales,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#0d6efd";
    },
    label: {
      position: "top",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };
  return (
    <>
      <div className="container">
        <h5 className="mb-2 title">Dashboard</h5>
        <div className="d-flex justify-content-between align-items-center gap-4 flex-wrap">
          <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-4 rounded-2">
            <div>
              <p className="desc">Total Income</p>
              <h6 className="mb-0 sub-title">
                Ksh{" "}
                {formatKES(
                  yearlyDataState && yearlyDataState[0].amount
                    ? yearlyDataState && yearlyDataState[0].amount
                    : 0
                )}
              </h6>
            </div>
            <div className="d-flex flex-column align-items-end">
              <h6>
                <BsArrowDownRight />
                32%
              </h6>
              <p className="mb-0 desc">Income from the last year.</p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-end  flex-grow-1 bg-white p-4 rounded-2">
            <div>
              <p className="desc">Total Sales</p>
              <h6 className="mb-0 sub-title">
                Products sold{" "}
                {new Intl.NumberFormat("en-KE", {
                  maximumFractionDigits: 0,
                }).format(
                  yearlyDataState && yearlyDataState[0].count
                    ? yearlyDataState && yearlyDataState[0].count
                    : 0
                )}
              </h6>
            </div>
            <div className="d-flex flex-column align-items-end">
              <h6 className="red">
                <BsArrowDownRight />
                32%
              </h6>
              <p className="mb-0 desc">Sales in the last year from today.</p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-end  flex-grow-1 bg-white p-4 rounded-2">
            <div>
              <p className="desc">Total Expesence</p>
              <h6 className="mb-0 sub-title">
                Ksh{" "}
                {formatKES(
                  yearlyDataState && yearlyDataState[0]?.amount
                    ? yearlyDataState && yearlyDataState[0]?.amount
                    : 0
                )}
              </h6>
            </div>
            <div className="d-flex flex-column align-items-end">
              <h6 className="green">
                <BsArrowDownRight />
                32%
              </h6>
              <p className="mb-0 desc">Expesence from in last year. </p>
            </div>
          </div>
        </div>

        <div className="d-flex  justify-content-between gap-2">
          <div className="mt-4 flex-grow-1 w-50">
            <h5 className="mb-2 title">Income Statistics</h5>
            <div>
              <Column {...config} />
            </div>
          </div>

          <div className="mt-4 flex-grow-1 w-50">
            <h5 className="mb-2 title">Sales Statistics</h5>
            <div>
              <Column {...config2} />
            </div>
          </div>
        </div>
        <div className="mt-2">
          <h4 className="mb-2 title">Recent Orders</h4>
          <div>
            {isLoading ? (
              <div className="text-center">
                <Spin
                  size="large"
                  indicator={
                    <LoadingOutlined
                      style={{ fontSize: 40, fontWeight: 800 }}
                    />
                  }
                />
                <p className="">Loading recent orders...</p>
              </div>
            ) : isError ? (
              <Alert
                message="Error"
                description={message}
                type="error"
                showIcon
              />
            ) : (
              <Table columns={columns} dataSource={orderData} />
            )}{" "}
          </div>
        </div>
      </div>
    </>
  );
});

export default Dashboard;
