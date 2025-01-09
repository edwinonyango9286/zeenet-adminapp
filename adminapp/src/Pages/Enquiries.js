import React, { useEffect, useState } from "react";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Table, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAEnquiry,
  getAllEnquiries,
  resetState,
  updateAEnquiry,
} from "../features/enquiry/enquirySlice";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa6";
import CustomModal from "../Components/CustomModal";

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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
  },
  {
    title: "Status",
    dataIndex: "status",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];
const Enquiries = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedEnquiryId, setSelectedEnquiryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setSelectedEnquiryId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllEnquiries());
  }, [dispatch]);

  const enquiries = useSelector((state) => state?.enquiry?.enquiries);
  const isLoading = useSelector(
    (state) => state?.enquiry?.isLoading?.getAllEnquiries
  );

  const handleStatusUpdate = (status, enquiryId) => {
    const data = { id: enquiryId, enquiryData: status };
    dispatch(updateAEnquiry(data));
  };

  const dataSource =
    Array.isArray(enquiries) &&
    enquiries.map(
      (enquiry, index) =>
        ({
          key: index + 1,
          name: enquiry?.name,
          email: enquiry?.email,
          phoneNumber: enquiry?.phoneNumber,
          status: (
            <>
              <select
                defaultValue={enquiry?.status}
                className="form-control form-select shadow-none outline-none"
                onChange={(e) =>
                  handleStatusUpdate(e.target.value, enquiry?._id)
                }
              >
                <option value="Submitted">Submitted</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </>
          ),
          action: (
            <>
              <Link
                to={`/admin/enquiries/${enquiry?._id}`}
                className="fs-5 ms-2 text-danger "
              >
                <FaRegEye />
              </Link>
              <button
                className="ms-2 fs-5 text-danger bg-transparent border-0"
                onClick={() => showModal(enquiry._id)}
                style={{ border: "none", outline: "none", boxShadow: "none" }}
              >
                <AiFillDelete />
              </button>
            </>
          ),
        } || [])
    );

  const deleteEnquiry = async (e) => {
    await dispatch(deleteAEnquiry(e));
    setOpen(false);
    dispatch(getAllEnquiries());
  };

  return (
    <>
      <div>
        <h5 className="mb-2 title">Enquiries</h5>
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
          <Table columns={columns} dataSource={dataSource} />
        )}
        <CustomModal
          open={open}
          hideModal={hideModal}
          perfomAction={() => {
            deleteEnquiry(selectedEnquiryId);
          }}
          title="Are you sure you want to delete this enquiry?"
        />
      </div>
    </>
  );
};

export default Enquiries;
