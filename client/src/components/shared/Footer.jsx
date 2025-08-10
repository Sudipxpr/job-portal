import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-indigo-50 text-gray-900 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h5 className="text-4xl font-bold text-indigo-600">Chakri</h5>
          <p className="mt-3 text-sm">
            Connecting talent with opportunity.  
           
          </p>
        </div>

        {/* About Us */}
        <div>
          <h6 className="text-lg font-semibold mb-3">About Us</h6>
          <p className="text-sm">
            Chakri is a modern job portal built to bridge the gap between skilled 
            professionals and top companies. Our mission is to make job hunting 
            and hiring simple, transparent, and efficient.
          </p>
          <Link 
            to="/about" 
            className="inline-block mt-3 text-indigo-600 font-medium hover:underline"
          >
            Learn More →
          </Link>
        </div>

        {/* Social Media */}
        <div className="md:text-right">
          <h6 className="text-lg font-semibold mb-3">Follow Us</h6>
          <div className="flex md:justify-end space-x-4">
            <a href="#" className="hover:text-blue-700 transition-colors duration-200">
              <FaFacebookF size={25} />
            </a>
            <a href="#" className="hover:text-gray-800 transition-colors duration-200">
              <FaXTwitter size={25} />
            </a>
            <a href="#" className="hover:text-blue-700 transition-colors duration-200">
              <FaLinkedinIn size={25} />
            </a>
            <a href="#" className="hover:text-gray-800 transition-colors duration-200">
              <FaGithub size={25} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-300 py-4 text-center text-sm">
        © {new Date().getFullYear()} Chakri. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
