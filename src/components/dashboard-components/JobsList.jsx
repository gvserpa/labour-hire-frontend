import React from "react";
import "../../pages/dashboard/index.css";

const JobsList = ({ jobs }) => {
  return (
    <section className="jobs-section">
      <h2>Available Jobs</h2>
      {jobs.map((job) => (
        <div key={job.id} className="job-card">
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <p>Rate: ${job.rate}/h</p>
          <p>Hours: {job.hours}</p>
          <p>Total: ${job.total}</p>
          <button>Take Job</button>
        </div>
      ))}
    </section>
  );
};

export default JobsList;
