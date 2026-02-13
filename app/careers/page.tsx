"use client";

import { useState } from "react";

/* ---- Current Open Vacancies ---- */
const jobs = [
  {
    title: "Banner Designer",
    location: "Pune / Remote",
    type: "Full Time",
    experience: "1–3 Years",
    description:
      "Design marketing banners, landing creatives, and campaign visuals aligned with fintech branding.",
  },
  {
    title: "Digital Marketing Executive",
    location: "Pune",
    type: "Full Time",
    experience: "1–3 Years",
    description:
      "Handle SEO, paid campaigns, social media marketing and lead generation strategies.",
  },
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openApplyModal = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  return (
    <main className="bg-gray-50 min-h-screen mt-10">
      {/* HERO */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Build Your Career With EzyLoan
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Join our growing fintech team and help create smarter financial
            solutions for thousands of customers.
          </p>
        </div>
      </section>

      {/* OPEN ROLES */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          Current Openings
        </h2>

        <div className="mt-10 space-y-6">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl p-6 hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {job.location} • {job.type} • {job.experience}
                  </p>
                  <p className="text-gray-600 mt-3 text-sm max-w-2xl">
                    {job.description}
                  </p>
                </div>

                <button
                  onClick={() => openApplyModal(job)}
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* APPLY MODAL */}
      {showModal && selectedJob && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 relative">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-gray-900">
              Apply for {selectedJob.title}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Application Submitted (Backend connect later)");
                closeModal();
              }}
              className="mt-6 space-y-4"
            >
              <input required placeholder="Full Name" className="w-full border rounded-lg px-4 py-2.5 text-sm" />
              <input type="email" required placeholder="Email Address" className="w-full border rounded-lg px-4 py-2.5 text-sm" />
              <input required placeholder="Mobile Number" className="w-full border rounded-lg px-4 py-2.5 text-sm" />
              <input placeholder="Total Experience" className="w-full border rounded-lg px-4 py-2.5 text-sm" />
              <input type="file" required className="w-full border rounded-lg px-4 py-2.5 text-sm" />

              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
