import React from "react";

export default function AboutSection() {
  return (
    <section className="relative py-16 px-8 bg-[#f6f7ff] flex justify-center mt-40 font-joan text-[#162850] overflow-hidden">
      {/* Blob 1 - Positioned behind the title */}
      <img
        src="/blob1.svg"
        alt="Decorative blob"
        className="absolute -top-40 left-1/4 w-full md:w-3/4 lg:w-2/3 z-0"
        style={{ transform: "translate(-30%, -10%)" }}
      />

      {/* Blob 2 - Positioned behind the bottom section */}
      <img
        src="/blob2.svg"
        alt="Decorative blob"
        className="absolute bottom-48 right-2/12 w-full md:w-3/4 lg:w-2/3 z-0"
        style={{ transform: "translate(25%, 20%)" }}
      />

      <div className="max-w-screen-lg w-full z-10">
        <h2 className="text-center text-3xl font-medium mb-16">
          Why you should choose our platform?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16 text-center">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-medium mb-4">Match with buddies</h3>
            <p className="text-sm">
              Automatically find peers based on subjects, goals, language,
              location, and interests. Or you can find them by searching, using
              personal code or filters.
            </p>
            <img
              src="/about1.svg"
              alt="Match with buddies icon"
              className="mx-auto mt-12 h-32 w-auto"
            />
          </div>

          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-medium mb-4">Social media</h3>
            <p className="text-sm">
              You can talk with your buddies right here, without other social
              media, so you will be safe from crooks as our admins are always
              ready to help you.
            </p>
            <img
              src="/about2.svg"
              alt="Talk with buddies icon"
              className="mx-auto mt-16 h-36 w-auto"
            />
          </div>

          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-medium mb-4">Collaborative tools</h3>
            <p className="text-sm">
              Special ranks of buddies, to find the best of them. Access tools,
              saving your projects where you can work in real-time with your
              buddies.
            </p>
            <img
              src="/about3.svg"
              alt="Collaborative tools icon"
              className="mx-auto mb-4 mt-8 h-20 w-auto"
            />
          </div>

          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-medium mb-4">Resource hub</h3>
            <p className="text-sm">
              Study Buddy groups, so you can find more friends and share your
              projects, as well as methods of better learning.
            </p>
            <img
              src="/about4.svg"
              alt="Resource hub icon"
              className="mx-auto mb-4 h-40 w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
