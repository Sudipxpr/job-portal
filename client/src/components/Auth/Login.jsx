import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authslice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "Job Seeker", // Default role to avoid empty value
  });

  const { loading, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.role) {
      toast.error("Please select a role");
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);

        // Navigate based on role
        if (res.data.user.role === "Recruiter") {
          navigate("/admin/jobs");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      // Redirect if already logged in
      if (user.role === "Recruiter") {
        navigate("/admin/jobs");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-2/5 shadow-2xl border-gray-200 rounded-md p-10 my-10"
        >
          <h1 className="font-bold text-4xl mb-5 text-center text-indigo-500">
            Login
          </h1>

          <div className="my-2">
            <Label className="p-2">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="you@gmail.com"
              required
            />
          </div>

          <div className="my-2">
            <Label className="p-2">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter Your Password"
              required
            />
          </div>

          <div className="my-2">
            <RadioGroup
              value={input.role}
              onValueChange={(value) => setInput({ ...input, role: value })}
              className="flex items-center gap-4 my-5"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Job Seeker" id="jobseeker" />
                <Label htmlFor="jobseeker">Job Seeker</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Recruiter" id="recruiter" />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-indigo-500 shadow-lg shadow-indigo-500/50 hover:bg-indigo-500/90 font-bold"
            >
              Login
            </Button>
          )}

          <div>
            <span>
              Don't Have an Account?{" "}
              <Link to="/signup" className="text-blue-600">
                Sign Up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
