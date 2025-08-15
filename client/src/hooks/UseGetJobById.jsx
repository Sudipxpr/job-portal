// src/hooks/UseGetJobById.js
import { useEffect } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setSingleJob } from "@/redux/Jobslice";

const UseGetJobById = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJobById = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    if (id) {
      fetchJobById();
    }
  }, [id, dispatch]);
};

export default UseGetJobById;
