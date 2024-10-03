import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAEnquiry,
  resetState,
  updateAEnquiry,
} from "../features/enquiry/enquirySlice";
import { IoMdArrowBack } from "react-icons/io";

const ViewEnquiry = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getEngId = location.pathname.split("/")[3];
  const enqState = useSelector((state) => state?.enquiry);
  const {
    enquiryName,
    enquiryEmail,
    enquiryPhone,
    enquiryComment,
    enquiryStatus,
  } = enqState;

  useEffect(() => {
    dispatch(getAEnquiry(getEngId));
  }, [getEngId]);

  const goBack = () => {
    navigate(-1);
  };

  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enqData: e };
    dispatch(updateAEnquiry(data));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getAEnquiry(getEngId));
    }, 100);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">View Enquiry</h3>
        <button
          onClick={goBack}
          className="bg-transparent border-0 fs-6 mb-0 d-flex align-items-center gap-1 "
        >
          <IoMdArrowBack
            className="fs-5"
            style={{ border: "none", outline: "none", boxShadow: "none" }}
          />
          Go Back
        </button>
      </div>

      <div className="mt-5 bg-white p-4 rounded-3 d-flex gap-3 flex-column ">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Name:</h6>
          <p className="mb-0">{enquiryName}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Phone:</h6>
          <p className="mb-0">
            <a href={`tel:+254${enquiryPhone}`}>{enquiryPhone}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Email:</h6>
          <p className="mb-0">
            <a href={`mailto:{enquiryEmail}`}> {enquiryEmail}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Comment:</h6>
          <p className="mb-0">{enquiryComment}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Status:</h6>
          <p className="mb-0">{enquiryStatus}</p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Change Status:</h6>
          <select
            name=""
            defaultValue={enquiryStatus ? enquiryStatus : "Submitted"}
            className="form-control form-select"
            id=""
            onChange={(e) => setEnquiryStatus(e.target.value, getEngId)}
          >
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ViewEnquiry;
