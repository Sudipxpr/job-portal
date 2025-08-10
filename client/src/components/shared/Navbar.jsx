import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Menu, X, LogOut, UserCircle2Icon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { logoutUser } from "@/redux/authslice"; //  use the new action

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(logoutUser()); //  clear Redux + persisted storage
        navigate("/");
        toast.success(res.data.message || "Logout successful");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-white transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-10">
        <h1 className="text-indigo-600 text-4xl sm:text-4xl font-bold">
          <Link to="/">Chakri</Link>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5 cursor-pointer">
            {user && user.role === "Recruiter" ? (
              <>
                <li className="hover:text-indigo-600">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="hover:text-indigo-600">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-indigo-600">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-indigo-600">
                  <Link to="/jobs">Jobs</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" className="font-bold rounded-lg">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-indigo-600 font-medium hover:bg-indigo-700 rounded-lg">
                  Sign up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                    alt="User avatar"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4">
                <div className="flex gap-4 items-center">
                  <Avatar>
                    <AvatarImage
                      src={
                        user.profile?.profilePhoto ||
                        "https://github.com/shadcn.png"
                      }
                      alt="User avatar"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  {user && user.role === "Job Seeker" && (
                    <div className="flex w-fit items-center cursor-pointer">
                      <UserCircle2Icon />
                      <Button variant="ghost">
                        <Link to="/profile">View profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex w-fit items-center cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="ghost">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-3 space-y-3">
          {user && user.role === "Recruiter" ? (
            <>
              <Link
                to="/admin/companies"
                className="block hover:text-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Companies
              </Link>
              <Link
                to="/admin/jobs"
                className="block hover:text-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Jobs
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="block hover:text-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/jobs"
                className="block hover:text-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Jobs
              </Link>
            </>
          )}

          {!user ? (
            <div className="flex flex-col gap-2">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Sign up
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={
                      user.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                    alt={`${user.fullname} avatar`}
                  />
                </Avatar>
                <p className="font-medium">{user.fullname}</p>
              </div>
              {user.role !== "Recruiter" && (
                <Button
                  variant="ghost"
                  className="w-full text-left"
                  asChild
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to="/profile">View profile</Link>
                </Button>
              )}
              <Button
                onClick={() => {
                  logoutHandler();
                  setIsMenuOpen(false);
                }}
                variant="ghost"
                className="w-full text-left"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
