import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import UseGetAllCompanies from "@/hooks/UseGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import AdminjobsTable from "./AdminjobsTable";
import UseGetAllAdminJobs from "@/hooks/UseGetAllAdminJobs";

const CompanyJobs = () => {
  UseGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [dispatch, input]);

  return (
    <div>
      <Navbar />
      <div className="pt-16">
        <div className=" max-w-6xl mx-auto my-10">
          <div className="flex items-center justify-between">
            <Input
              className="w-fit"
              placeholder="Filter by Name/Role"
              onChange={(e) => setInput(e.target.value)}
            />
            <Button className="" onClick={() => navigate("/admin/jobs/create")}>
              New Job
            </Button>
          </div>
          <AdminjobsTable />
        </div>
      </div>
    </div>
  );
};

export default CompanyJobs;
