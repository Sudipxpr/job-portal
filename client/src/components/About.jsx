import React from "react";

const About = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-6 lg:px-20">
      <div className="max-w-5xl mx-auto">
        
        {/* Heading */}
        <h1 className="text-4xl font-bold text-indigo-600 mb-6">About Us</h1>
        
        {/* Intro */}
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Welcome to <span className="font-semibold">Chakri Job Portal</span> — 
          your trusted platform for connecting talented professionals with 
          top companies. We aim to make job hunting and hiring as smooth, 
          transparent, and efficient as possible.
        </p>

        {/* Mission Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At Chakri, our mission is to empower individuals by providing them 
            with access to quality job opportunities, while helping companies 
            discover the best talent. We believe in creating a fair and equal 
            platform for everyone, regardless of background or experience.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Easy-to-use job search and application process</li>
            <li>Verified company profiles for trust and transparency</li>
            <li>Advanced filtering to find the perfect match</li>
            <li>Regular updates with the latest job postings</li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="bg-indigo-50 p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">
            Ready to take the next step in your career?
          </h3>
          <p className="text-gray-700 mb-4">
            Browse jobs, connect with companies, and land your dream role today.
          </p>
         
        </section>
      </div>
    </div>
  );
};

export default About;
