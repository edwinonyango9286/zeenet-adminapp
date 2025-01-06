import React, { useState } from "react";
import { Layout, Menu, Button, theme } from "antd";
import { MdDashboardCustomize } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { SiBrandfolder } from "react-icons/si";
import { TbCategory } from "react-icons/tb";
import { FaClipboardList } from "react-icons/fa";
import { ImBlogger2 } from "react-icons/im";
import { LiaBlogSolid } from "react-icons/lia";
import { BiSolidMessageEdit } from "react-icons/bi";
import { Outlet } from "react-router-dom";
import { MdNotificationsNone } from "react-icons/md";
import { Link } from "react-router-dom";
import { RiCoupon5Fill } from "react-icons/ri";
import { SiMarketo } from "react-icons/si";
import { GrCatalog } from "react-icons/gr";
import { IoLogOutOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { TfiMenu } from "react-icons/tfi";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const adminUser = useSelector((state) => state?.user?.adminUser);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: "#fff" }}
      >
        <div className="logo">
          <h2 className="text-center items-center text-white mb-0 fs-4 py-3">
            <span className="sm-logo">ZN</span>
            <span className="lg-logo">ZeeNet</span>
          </h2>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => {
            if (key === "signout") {
              localStorage.removeItem("adminUser");
              localStorage.removeItem("adminToken");
              navigate("/");
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "dashboard",
              icon: <MdDashboardCustomize className="fs-5" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <BsPeople className="fs-5" />,
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <GrCatalog className="fs-5 " />,
              label: "Catalog",
              children: [
                  {
                  key: "product-list",
                  icon: <BsCart3 className="fs-5" />,
                  label: "Product List",
                },
                {
                  key: "product",
                  icon: <BsCart3 className="fs-5" />,
                  label: " Add Product",
                },
                 {
                  key: "brand-list",
                  icon: <SiBrandfolder className="fs-5" />,
                  label: "Brand List",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className="fs-5" />,
                  label: " Add Brand",
                },
                 {
                  key: "category-list",
                  icon: <TbCategory className="fs-5" />,
                  label: "Category List",
                },
                {
                  key: "category",
                  icon: <TbCategory className="fs-5" />,
                  label: " Add Category",
                },
               
              ],
            },

            {
              key: "orders",
              icon: <FaClipboardList className="fs-5" />,
              label: "Orders",
            },
            {
              key: "marketing",
              icon: <SiMarketo className="fs-5" />,
              label: "Marketing",
              children: [
                   {
                  key: "coupon-list",
                  icon: <RiCoupon5Fill className="fs-5" />,
                  label: " Coupon List ",
                },
                {
                  key: "coupon",
                  icon: <RiCoupon5Fill className="fs-5" />,
                  label: " Add Coupon ",
                },
             
              ],
            },
            {
              key: "blogs",
              icon: <ImBlogger2 className="fs-5" />,
              label: "Blogs",
              children: [

                   {
                  key: "blog-category-list",
                  icon: <ImBlogger2 className="fs-5" />,
                  label: "Blog Category List",
                },

                  {
                  key: "blog-category",
                  icon: <LiaBlogSolid className="fs-5" />,
                  label: "Add Blog Category",
                },
                 {
                  key: "blog-list",
                  icon: <ImBlogger2 className="fs-5" />,
                  label: "Blog List",
                },
                {
                  key: "blog",
                  icon: <LiaBlogSolid className="fs-5" />,
                  label: " Add Blog ",
                },
               
              ],
            },
            {
              key: "enquiries",
              icon: <BiSolidMessageEdit className="fs-5" />,
              label: "Enquiries",
            },
            {
              key: "signout",
              icon: <IoLogOutOutline className="fs-5" />,
              label: "Signout",
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
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <MdNotificationsNone className="fs-4" />
              <span className="badge bg-primary rounded-circle p-1 position-absolute">
                2
              </span>
            </div>

            <div className="d-flex gap-10 align-items-center justify-content-between ">
              <img
                width={34}
                height={34}
                src={adminUser?.avatar}
                alt="userimage"
                className="rounded-circle"
              ></img>
            </div>
            <div
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <p className=" mb-0 text-capitalize">
                {adminUser?.firstname} {adminUser?.lastname}
              </p>
              <p className="mb-0">{adminUser?.email}</p>
            </div>
            <div
              className="dropdown-menu"
              aria-labelledby="dropdownMenuLink"
              style={{ height: "auto", lineHeight: "20px" }}
            >
              <li>
                <Link to="/" className="dropdown-item py-1 mb-1">
                  View Profile
                </Link>
              </li>

              <li>
                <Link to="/" className="dropdown-item py-1 mb-1">
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
      </Layout>
    </Layout>
  );
};

export default MainLayout;
