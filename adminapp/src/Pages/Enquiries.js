import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAEnquiry,
  getEnquiries,
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
    title: "Mobile",
    dataIndex: "mobile",
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
  const [enquiryId, setEnquiryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setEnquiryId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, []);

  const enquiryState = useSelector((state) => state?.enquiry?.enquiries);

  const data1 = [];
  for (let i = 0; i < enquiryState?.length; i++) {
    data1.push({
      key: i + 1,
      name: enquiryState[i]?.name,
      email: enquiryState[i]?.email,
      mobile: enquiryState[i]?.mobile,
      status: (
        <>
          <select
            name=""
            defaultValue={
              enquiryState[i]?.status ? enquiryState[i]?.status : "Submitted"
            }
            className="form-control form-select shadow-none outline-none"
            id=""
            onChange={(e) =>
              setEnquiryStatus(e.target.value, enquiryState[i]?._id)
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
            to={`/admin/enquiries/${enquiryState[i]?._id}`}
            className="fs-5 ms-2 text-danger "
          >
            <FaRegEye />
          </Link>
          <button
            className="ms-2 fs-5 text-danger bg-transparent border-0"
            onClick={() => showModal(enquiryState[i]?._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enquiryData: e };
    dispatch(updateAEnquiry(data));
  };

  const deleteEnquiry = async (e) => {
    await dispatch(deleteAEnquiry(e));
    setOpen(false);
    dispatch(getEnquiries());
  };

  return (
    <>
      <div className="container">
        <h5 className="mb-2 title">Enquiries</h5>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          open={open}
          hideModal={hideModal}
          perfomAction={() => {
            deleteEnquiry(enquiryId);
          }}
          title="Are you sure you want to delete this enquiry?"
        />
      </div>
    </>
  );
};

export default Enquiries;
