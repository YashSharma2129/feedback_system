import React from "react";
import PropTypes from "prop-types";
import "../styles/Form.css";
const Step1Form = ({ formData, handleInputChange, goToNextStep }) => {
  return (
    <form className="student-form">
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your name"
          required
          aria-label="Student Name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="branch">Branch *</label>
        <select
          id="branch"
          value={formData.branch}
          onChange={handleInputChange}
          required
          aria-label="Choose Branch"
        >
          <option value="">Choose Branch</option>
          <option value="cs">Computer Science</option>
          <option value="it">Information Technology</option>
          <option value="me">Mechanical</option>
          <option value="entc">Electronics and Telecommunication</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="class">Class *</label>
        <select
          id="class"
          value={formData.class}
          onChange={handleInputChange}
          required
        >
          <option value="">Choose Class</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="division">Division *</label>
        <select
          id="division"
          value={formData.division}
          onChange={handleInputChange}
          required
        >
          <option value="">Choose Division</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="rollNo">Roll No *</label>
        <input
          type="text"
          id="rollNo"
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
          value={formData.universityRollNo}
          onChange={handleInputChange}
          placeholder="Enter your University Roll Number"
          required
          aria-label="University Roll Number"
        />
      </div>

      <div className="form-buttons">
        <button type="button" className="btn next" onClick={goToNextStep}>
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
