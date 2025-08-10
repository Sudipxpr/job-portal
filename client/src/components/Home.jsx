/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Herosection from "./Herosection";
import JobCatagories from "./JobCatagory";
import LatestJobs from "./LatestJobs";

import UseGetAlljobs from "@/hooks/UseGetAlljobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "./shared/Footer";
import { motion } from "framer-motion";

const Homepage = () => {
  UseGetAlljobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  const fadeSlideDown = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, ease: "easeOut" } // animation
  };

  return (
    <>
      <Navbar />
      <div className="pt-16">
        <motion.div {...fadeSlideDown}>
          <Herosection />
        </motion.div>

        <motion.div
          {...fadeSlideDown}
          transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
        >
          <JobCatagories />
        </motion.div>

        <motion.div
          {...fadeSlideDown}
          transition={{ duration: 0.35, delay: 0.16, ease: "easeOut" }}
        >
          <LatestJobs />
        </motion.div>

        <motion.div
          {...fadeSlideDown}
          transition={{ duration: 0.35, delay: 0.24, ease: "easeOut" }}
        >
          <Footer />
        </motion.div>
      </div>
    </>
  );
};

export default Homepage;
