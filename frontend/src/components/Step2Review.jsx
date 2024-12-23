import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios"; // Make sure to install axios

const Step2Review = ({
  formData,
  setFormData,
  goToPreviousStep,
  goToNextStep,
}) => {
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/subjects", {
          params: {
            branch: formData.branch,
            year: formData.class,
          },
        });

        if (response.data.length === 0) {
          setError("No subjects found for the selected branch and year");
        } else {
          setAvailableSubjects(response.data);
        }
      } catch (err) {
        setError("Failed to fetch subjects. Please try again later.");
        console.error("Error fetching subjects:", err);
      } finally {
        setLoading(false);
      }
    };

    if (formData.branch && formData.class) {
      fetchSubjects();
    }
  }, [formData.branch, formData.class]);

  // Handle subject selection
  const handleSubjectTypeChange = (subject, type) => {
    setFormData((prevState) => ({
      ...prevState,
      subjects: {
        ...prevState.subjects,
        [subject._id]: {
          subjectId: subject._id,
          name: subject.name,
          type: type,
        },
      },
    }));
  };

  if (loading) return <div>Loading subjects...</div>;
  if (error) return <div>{error}</div>;

  return (
    <form className="student-form">
      <h3>Step 2: Select Subjects</h3>
      <div className="selected-info">
        <p>
          <strong>Name:</strong> {formData.name}
        </p>
        <p>
          <strong>Branch:</strong> {formData.branch.toUpperCase()}
        </p>
        <p>
          <strong>Year:</strong> {formData.class}
        </p>
      </div>

      {availableSubjects.length > 0 ? (
        <div className="form-group">
          {availableSubjects.map((subject) => (
            <div key={subject._id} className="subject-selection">
              <label>{subject.name}</label>
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
        <p>No subjects available for the selected branch and year.</p>
      )}

      <div className="form-buttons">
        <button type="button" className="btn back" onClick={goToPreviousStep}>
          Back
        </button>
        <button
          type="button"
          className="btn next"
          onClick={goToNextStep}
          disabled={Object.keys(formData.subjects).length === 0}
        >
          Next
        </button>
      </div>
    </form>
  );
};

// ... PropTypes and export remain the same
Step2Review.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  goToPreviousStep: PropTypes.func.isRequired,
  goToNextStep: PropTypes.func.isRequired,
};

export default Step2Review;
