import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/Jobslice";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const JobDescription = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);

  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // Update the single job in the Redux store

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [dispatch, jobId, user?._id]);

  return (
    <>
      <motion.div
        className="max-w-4xl mx-auto my-10 p-4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.40, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-2xl ">{singleJob?.title}</h1>
            <div className="flex items-center gap-2 mt-4">
              <Badge className={"text-blue-700 font-bold"} variant="ghost">
                {singleJob?.position} positions
              </Badge>
              <Badge className={"text-red-500 font-bold"} variant="ghost">
                {singleJob?.jobType}
              </Badge>
              <Badge className={"text-purple-700 font-bold"} variant="ghost">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>

          <Button
            disabled={isApplied}
            className={`rounded-lg ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : " bg-indigo-600 hover:bg-indigo-700"
            }`}
            onClick={isApplied ? null : applyJobHandler}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
        <h1 className="border-b-2 border-b-gray-300 font-semibold py-4">
          Job Description
        </h1>
        <div className="">
          <h1 className="text-lg font-bold mt-4">
            Role:{" "}
            <span className="font-normal pl-4 text-gray-800">
              {singleJob?.title}
            </span>
          </h1>
          <h1 className="text-lg font-bold mt-4">
            Location:{" "}
            <span className="font-normal pl-4 text-gray-800">
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="text-lg font-bold mt-4">
            Description:
            <span className="font-normal pl-4 text-gray-800">
              {singleJob?.description}
            </span>
          </h1>
          <h1 className="text-lg font-bold mt-4">
            Experience:
            <span className="font-normal pl-4 text-gray-800">
              {" "}
              {singleJob?.experience} years
            </span>
          </h1>
          <h1 className="text-lg font-bold mt-4">
            Total Applications:
            <span className="font-normal pl-4 text-gray-800">
              {" "}
              {singleJob?.applications?.length}
            </span>
          </h1>
          <h1 className="text-lg font-bold mt-4">
            Posted On:
            <span className="font-normal pl-4 text-gray-800">
              {" "}
              {singleJob?.createdAt?.split("T")[0]}
            </span>
          </h1>
        </div>
      </motion.div>
    </>
  );
};

export default JobDescription;
