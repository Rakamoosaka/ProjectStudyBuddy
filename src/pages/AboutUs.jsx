import React from "react";
import Header from "../components/Header";
import aboutUsImage from "../assets/ben-omar.png"; // Add an appropriate image to your assets folder
import omarWhite from "../assets/omar-whitest-form.png";
import aitoreTheWizard from "../assets/aitore-wizard.png";

const AboutUs = () => {
  return (
    <div className="bg-[#f6f7ff] font-josefinSans min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="w-11/12 mx-auto mt-10 text-[#162850]">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">About Study Buddy</h1>
          <p className="text-lg mt-4 max-w-2xl mx-auto">
            Study Buddy is a collaborative platform designed to empower students
            and professionals to connect, learn, and grow together. Our mission
            is to create a supportive learning environment for everyone.
          </p>
        </div>

        {/* Image and Text Section */}
        <div className="flex flex-col md:flex-row items-center mb-16">
          <img
            src={aboutUsImage}
            alt="About Study Buddy"
            className="w-full md:w-1/2 rounded-lg shadow-lg mb-8 md:mb-0 md:mr-10"
          />
          <div className="text-left">
            <h2 className="text-2xl font-semibold mb-4">
              Why Choose Study Buddy?
            </h2>
            <p className="mb-4">
              We believe that collaboration is the key to success. Whether
              you're tackling a challenging subject, preparing for an exam, or
              brainstorming a group project, Study Buddy connects you with the
              right people and resources.
            </p>
            <ul className="list-disc ml-6">
              <li>Find study partners and mentors easily.</li>
              <li>Access academic tools and resources.</li>
              <li>Collaborate on projects and share knowledge.</li>
            </ul>
          </div>
        </div>

        {/* Mission and Features Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-[#f6f7ff] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p>
              At Study Buddy, our mission is to foster a collaborative and
              inclusive learning environment. We aim to connect learners of all
              backgrounds and empower them to achieve their academic and
              personal goals.
            </p>
          </div>
          <div className="bg-[#f6f7ff] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <ul className="list-disc ml-6">
              <li>Personalized recommendations for study partners.</li>
              <li>Tools to manage academic strengths and weaknesses.</li>
              <li>A platform to explore and collaborate on projects.</li>
              <li>Secure communication and resource sharing.</li>
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-6">Meet Our Team</h2>
          <p className="mb-6">
            Study Buddy was created by a passionate team of educators,
            developers, and lifelong learners. We're committed to helping you
            succeed in your academic journey.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {/* Add team members dynamically or statically */}
            <div className="flex flex-col items-center">
              <img
                src={aitoreTheWizard}
                alt=""
                className="w-24 h-24 rounded-full object-cover"
              />
              <p className="font-semibold">Aitore</p>
              <p className="text-sm text-gray-500">The Frontend Wizard</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={omarWhite}
                alt=""
                className="w-24 h-24 rounded-full object-cover"
              />

              <p className="font-semibold">Omar</p>
              <p className="text-sm text-gray-500">backend dev and design</p>
            </div>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Join Us Today!</h2>
          <p className="mb-6">
            Ready to take your learning experience to the next level? Join Study
            Buddy and connect with a world of knowledge.
          </p>
          <button
            onClick={() => (window.location.href = "/signup")}
            className="px-8 py-3 bg-[#162850] text-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            Sign Up Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
