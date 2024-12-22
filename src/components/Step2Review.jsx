import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Step2Review = ({
  formData,
  setFormData,
  goToPreviousStep,
  goToNextStep,
}) => {
  const [availableSubjects, setAvailableSubjects] = useState([]);

  // Subjects Data (static for now, replace with API data if necessary)
  const subjectsData = {
    cs: ["Data Structures", "Algorithms", "Operating Systems", "DBMS", "AI"],
    it: ["Web Development", "Cyber Security", "Cloud Computing", "AI"],
    me: ["Thermodynamics", "Fluid Mechanics", "Machine Design"],
    entc: ["Signal Processing", "Microcontrollers", "Analog Circuits"],
  };

  useEffect(() => {
    // Load subjects dynamically based on branch
    if (formData.branch) {
      setAvailableSubjects(subjectsData[formData.branch] || []);
    }
  }, [formData.branch]);

  // Handle subject type selection
  const handleSubjectTypeChange = (subject, type) => {
    setFormData((prevState) => ({
      ...prevState,
      subjects: { ...prevState.subjects, [subject]: type },
    }));
  };

  return (
    <form className="student-form">
      <h3>Step 2: Select Subjects</h3>
      <p>
        <strong>Name:</strong> {formData.name}
      </p>
      <p>
        <strong>Branch:</strong> {formData.branch.toUpperCase()}
      </p>
      <p>
        <strong>Class:</strong> {formData.class}
      </p>

      {availableSubjects.length > 0 ? (
        <div className="form-group">
          {availableSubjects.map((subject) => (
            <div key={subject} className="subject-selection">
              <label>{subject}</label>
              <select
                onChange={(e) =>
                  handleSubjectTypeChange(subject, e.target.value)
                }
                defaultValue=""
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="Main">Main</option>
                <option value="Elective">Elective</option>
              </select>
            </div>
          ))}
        </div>
      ) : (
        <p>No subjects available for the selected branch.</p>
      )}

      <div className="form-buttons">
        <button type="button" className="btn back" onClick={goToPreviousStep}>
          Back
        </button>
        <button type="button" className="btn next" onClick={goToNextStep}>
          Next
        </button>
      </div>
    </form>
  );
};

Step2Review.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  goToPreviousStep: PropTypes.func.isRequired,
  goToNextStep: PropTypes.func.isRequired,
};

export default Step2Review;
