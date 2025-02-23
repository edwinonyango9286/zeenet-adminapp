import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, theme } from "antd";
import { RiDashboard2Fill } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { SiBrandfolder } from "react-icons/si";
import { TbCategory } from "react-icons/tb";
import { FaCartArrowDown } from "react-icons/fa";
import { ImBlogger2 } from "react-icons/im";
import { LiaBlogSolid } from "react-icons/lia";
import { BiSolidMessageEdit } from "react-icons/bi";
import { Outlet } from "react-router-dom";
import { MdNotificationsNone } from "react-icons/md";
import { Link } from "react-router-dom";
import { RiCoupon5Fill } from "react-icons/ri";
import { SiMarketo } from "react-icons/si";
import { FaDatabase } from "react-icons/fa";
import { TfiMenu } from "react-icons/tfi";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getAllEnquiries } from "../features/enquiry/enquirySlice";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Footer } from "antd/es/layout/layout";
import { logoutAUser } from "../features/user/userSlice";

const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, SetAvatar] = useState("");

  useEffect(() => {
    const adminFirstName = Cookies.get("adminFirstName");
    const adminLastName = Cookies.get("adminLastName");
    const adminEmail = Cookies.get("adminEmail");
    const adminAvatar = Cookies.get("adminAvatar");
    if (adminFirstName) setFirstName(adminFirstName);
    if (adminLastName) setLastName(adminLastName);
    if (adminEmail) setEmail(adminEmail);
    if (adminAvatar) SetAvatar(adminAvatar);
  }, []);

  useEffect(() => {
    dispatch(getAllEnquiries());
  }, [dispatch]);

  const enquiries = useSelector((state) => state?.enquiry?.enquiries);
  const submittedEnquiriesCount =
    Array.isArray(enquiries) &&
    enquiries?.filter((enquiry) => enquiry?.status === "Submitted")?.length;
  const handleLogout = () => {
    dispatch(logoutAUser());
  };

  const logoutIsSuccess = useSelector(
    (state) => state.user.isSuccess.logoutAUser
  );

  // navigate to the sign in page when logout is success
  useEffect(() => {
    if (logoutIsSuccess) {
      navigate("/");
    }
  }, [logoutIsSuccess]);

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: "#3d464d" }}
      >
        <div className="logo">
          <div className="mb-0 py-2">
            <span className="sm-logo fw-bold ">ZN</span>
            <div className="d-flex flex-row justify-content-center align-items-center ">
              <span className="lg-logo fw-bold pl-2 ">ZEENET</span>
              <span>
                <button
                  type="button"
                  style={{
                    width: "78px",
                    height: "26px",
                    fontWeight: "600",
                    fontSize: "12px",
                  }}
                  className="custom-button3 mx-1 lg-logo"
                >
                  Admin
                </button>
              </span>
            </div>
          </div>
        </div>
        <Menu
          theme="light"
          mode="inline"
          style={{ backgroundColor: "#3d464d" }}
          selectedKeys={[selectedKey]}
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => {
            if (key === "signout") {
              dispatch(logoutAUser());
            } else {
              navigate(key);
              setSelectedKey(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <RiDashboard2Fill className="fs-6 fw-bold text-white " />,
              label: <p className="menuItemsText m-0 p-0">Dashboard</p>,
            },

            {
              key: "catalog",
              icon: <FaDatabase className="fs-6 fw-bold text-white" />,
              label: <p className="menuItemsText m-0 p-0">Catalog</p>,
              children: [
                {
                  key: "product-list",
                  icon: <BsCart3 className="fs-6 fw-bold text-white" />,
                  label: <p className="menuItemsText m-0 p-0">Products List</p>,
                },
                {
                  key: "product",
                  icon: <BsCart3 className="fs-6 fw-bold text-white" />,
                  label: <p className="menuItemsText m-0 p-0">Add product</p>,
                },
                {
                  key: "brand-list",
                  icon: <SiBrandfolder className="fs-6 fw-bold text-white" />,
                  label: <p className="menuItemsText m-0 p-0">Brands List</p>,
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className="fs-6 fw-bold text-white" />,
                  label: <p className="menuItemsText m-0 p-0">Add Brand</p>,
                },
                {
                  key: "category-list",
                  icon: <TbCategory className="fs-6 fw-bold text-white" />,
                  label: (
                    <p className="menuItemsText m-0 p-0">Categories List</p>
                  ),
                },
                {
                  key: "category",
                  icon: <TbCategory className="fs-6 fw-bold text-white" />,
                  label: <p className="menuItemsText  m-0 p-0">Add category</p>,
                },
              ],
            },

            {
              key: "",
              icon: <FiUsers className="fs-6 fw-bold text-white" />,
              label: <p className="menuItemsText m-0 p-0">Customers</p>,
              children: [
                {
                  key: "customers",
                  label: (
                    <p className="menuItemsText  m-0 p-0">Customers List</p>
                  ),
                },
                {
                  key: "view-customer",
                  label: <p className="menuItemsText  m-0 p-0">Customer</p>,
                },
              ],
            },
            {
              key: "orders",
              icon: <FaCartArrowDown className="fs-6 fw-bold text-white" />,
              label: <p className="menuItemsText m-0 p-0">Orders</p>,
            },

            {
              key: "blogs",
              icon: <ImBlogger2 className="fs-6 fw-bold text-white" />,
              label: <p className="menuItemsText m-0 p-0">Blogs</p>,
              children: [
                {
                  key: "blog-category-list",
                  icon: <ImBlogger2 className="fs-6 fw-bold text-white" />,
                  label: (
                    <p className="menuItemsText  m-0 p-0">Blog categories</p>
                  ),
                },

                {
                  key: "blog-category",
                  icon: <LiaBlogSolid className="fs-6 fw-bold text-white" />,
                  label: (
                    <p className="menuItemsText m-0 p-0">Add blog category</p>
                  ),
                },
                {
                  key: "blog-list",
                  icon: <ImBlogger2 className="fs-6 fw-bold text-white " />,
                  label: <p className="menuItemsText m-0 p-0">Blogs</p>,
                },
                {
                  key: "blog",
                  icon: <LiaBlogSolid className="fs-6 fw-bold text-white" />,
                  label: <p className="menuItemsText m-0 p-0">Add blog</p>,
                },
              ],
            },

            {
              key: "marketing",
              icon: <SiMarketo className="fs-6 fw-bold text-white" />,
              label: <p className="menuItemsText m-0 p-0">Marketing</p>,
              children: [
                {
                  key: "coupon-list",
                  icon: <RiCoupon5Fill className="fs-6 fw-bold text-white" />,
                  label: <p className="menuItemsText m-0 p-0">Coupons</p>,
                },
                {
                  key: "coupon",
                  icon: <RiCoupon5Fill className="fs-6 fw-bold text-white" />,
                  label: <p className="menuItemsText m-0 p-0">Add coupon</p>,
                },
              ],
            },
            {
              key: "enquiries",
              icon: <BiSolidMessageEdit className="fs-6 fw-bold text-white " />,
              label: <p className="menuItemsText m-0 p-0">Enquiries</p>,
            },

            {
              key: "signout",
              icon: <RiLogoutBoxRLine className="fs-6 fw-bold text-white" />,
              label: <p className="menuItemsText m-0 p-0">Sign out</p>,
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{ padding: 0, background: colorBgContainer }}
        >
          <Button
            type="text"
            icon={collapsed ? <TfiMenu /> : <TfiMenu />}
            onClick={() => setCollapsed(!collapsed)}
            className="trigger"
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-3 align-items-center">
            <div className="position-relative">
              <MdNotificationsNone className="fs-3 fw-bold" />
              <span className="badge bg-primary rounded-circle py-1 position-absolute">
                {submittedEnquiriesCount}
              </span>
            </div>

            <div
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="d-flex flex-row align-items-center gap-2">
                <div className="d-flex gap-2 align-items-center justify-content-center">
                  <img
                    width={30}
                    height={30}
                    src={avatar}
                    alt="userimage"
                    className="rounded-circle"
                  />
                </div>
                <div>
                  <p
                    className="mb-0 text-capitalize"
                    style={{ fontSize: "14px", fontWeight: "500" }}
                  >
                    {firstName} {lastName}
                  </p>
                  <p
                    className="mb-0"
                    style={{
                      fontSize: "13px",
                      fontWeight: "400px",
                      color: "#6c757d",
                    }}
                  >
                    {email}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="dropdown-menu"
              aria-labelledby="dropdownMenuLink"
              style={{ height: "auto", lineHeight: "14px", fontSize: "15px" }}
            >
              <li>
                <Link to="/profile" className="dropdown-item py-1 mb-1">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/inbox" className="dropdown-item py-1 mb-1">
                  Inbox
                </Link>
              </li>
              <li>
                <Link to="/settings" className="dropdown-item py-1 mb-1">
                  Settings
                </Link>
              </li>
              <hr />
              <li>
                <Link onClick={handleLogout} className="dropdown-item">
                  Signout
                </Link>
              </li>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
        <Footer>
          <div className="d-flex justify-content-center align-items-center">
            <p>
              {String.fromCharCode(169)} {new Date().getFullYear()} Zeenet
              limited. All rights reserved.
            </p>
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
