import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import {
  getAEnquiry,
  resetState,
  updateAEnquiry,
} from "../features/enquiry/enquirySlice";
import { IoMdArrowBack } from "react-icons/io";
import { Spin } from "antd";

const ViewEnquiry = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getEngId = location.pathname.split("/")[3];
  const enqState = useSelector((state) => state?.enquiry);
  const { enquiryName, enquiryEmail, enquiryPhone, enquiry, enquiryStatus } =
    enqState;
  const getEnquiryLoading = useSelector(
    (state) => state?.enquiry?.isLoading?.getAEnquiry
  );

  useEffect(() => {
    dispatch(getAEnquiry(getEngId));
  }, [getEngId, dispatch]);

  const goBack = () => {
    navigate(-1);
  };

  const handleEnquiryStatusUpdate = (status, enquiryId) => {
    const data = { id: enquiryId, enquiryData: status };
    dispatch(updateAEnquiry(data)).then(() => {
      dispatch(resetState());
      dispatch(getAEnquiry(getEngId));
    });
  };

  return (
    <div>
      {getEnquiryLoading ? (
        <div className="text-center mt-5">
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
              <h6 className="mb-0">Enquiry:</h6>
              <p className="mb-0">{enquiry}</p>
            </div>
            <div className="d-flex align-items-center gap-3">
              <h6 className="mb-0">Status:</h6>
              <p className="mb-0">{enquiryStatus}</p>
            </div>

            <div className="d-flex align-items-center gap-3">
              <h6 className="mb-0">Change Status:</h6>
              <select
                defaultValue={enquiryStatus}
                className="form-control form-select"
                onChange={(e) =>
                  handleEnquiryStatusUpdate(e.target.value, getEngId)
                }
              >
                <option value="Submitted">Submitted</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewEnquiry;
