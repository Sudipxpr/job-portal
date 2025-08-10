import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authslice";
import { Loader, Loader2 } from "lucide-react";




const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

const navigate= useNavigate();

  const {loading,user}=useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if(input.file){
      formData.append("file", input.file);
    }
   try {
    dispatch(setLoading(true));
    const res=await axios.post(`${USER_API_END_POINT}/register`, formData,{
      headers:{
        "Content-Type":"multipart/form-data"
      },
      withCredentials: true,
    })
    if(res.data.success){
      navigate("/login");
      toast.success(res.data.message);
      };
   } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
   }
   finally {
    dispatch(setLoading(false));
   }
  };
useEffect(()=>{
  if(user){
    navigate("/");
  }
}, [user, navigate]);
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto ">
        <form
          onSubmit={submitHandler}
          className="w-2/5 shadow-2xl border-gray-200 rounded-md p-10 my-10 "
        >
          <h1 className="font-bold text-4xl mb-5 text-center text-indigo-500">
            Sign Up
          </h1>

          {/* Full Name */}
          <div className="my-2">
            <Label className="p-2">Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Your Full Name"
            />
          </div>

          {/* Email */}
          <div className="my-2">
            <Label className="p-2">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="you@gmail.com"
            />
          </div>

          {/* Phone Number */}
          <div className="my-2">
            <Label className="p-2">Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Enter Phone Number"
            />
          </div>

          {/* Password */}
          <div className="my-2">
            <Label className="p-2">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Set Password"
            />
          </div>

          {/* Role */}
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  checked={input.role === "Job Seeker"}
                  onChange={changeEventHandler}
                  value="Job Seeker"
                  className="cursor-pointer"
                />
                <Label>Job Seeker</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  value="Recruiter"
                  className="cursor-pointer"
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {/* File */}
          <div className="flex items-center gap-2">
            <Label className="p-2">Profile</Label>
            <Input
              accept="image/*"
              type="file"
              name="file"
              onChange={changeFileHandler}
              className="cursor-pointer"
            />
          </div>

          {/* Submit */}
         {
          loading?<Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</Button>:<Button
            type="submit"
            className="w-full my-4 bg-indigo-500 shadow-lg shadow-indigo-500/50 hover:bg-indigo-500/90 font-bold"
          >
            Sign Up
          </Button>
        }

          {/* Login Link */}
          <div>
            <span>
              Already Have an Account?{" "}
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
