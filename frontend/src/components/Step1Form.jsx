import React from "react";
import PropTypes from "prop-types";
import "../styles/Form.css";

const Step1Form = ({ formData, handleInputChange, goToNextStep }) => {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    goToNextStep();
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name" // Add name attribute
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="branch">Branch *</label>
        <select
          id="branch"
          name="branch" // Add name attribute
          value={formData.branch}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Branch</option>
          <option value="cs">Computer Science</option>
          <option value="it">Information Technology</option>
          <option value="mechanical">Mechanical</option>
          {/* Add other branches as needed */}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="class">Year *</label>
        <select
          id="class"
          name="class" // Add name attribute
          value={formData.class}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Year</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="rollNo">Roll No *</label>
        <input
          type="text"
          id="rollNo"
          name="rollNo" // Add name attribute
          value={formData.rollNo}
          onChange={handleInputChange}
          placeholder="Enter your Roll Number"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="universityRollNo">University Roll No *</label>
        <input
          type="text"
          id="universityRollNo"
          name="universityRollNo" // Add name attribute
          value={formData.universityRollNo}
          onChange={handleInputChange}
          placeholder="Enter your University Roll Number"
          required
        />
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn next">
          Next
        </button>
      </div>
    </form>
  );
};

Step1Form.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  goToNextStep: PropTypes.func.isRequired,
};

export default Step1Form;
