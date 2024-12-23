import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "../styles/Form.css";

const Step3Feedback = ({ formData, goToPreviousStep, handleSubmit }) => {
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Questions for feedback
  const questions = [
    { id: 1, text: "Teaching Quality" },
    { id: 2, text: "Communication Skills" },
    { id: 3, text: "Subject Knowledge" },
    { id: 4, text: "Punctuality" },
  ];

  const handleRatingChange = (subjectId, questionId, value) => {
    setRatings((prev) => ({
      ...prev,
      [subjectId]: {
        ...prev[subjectId],
        [questionId]: parseInt(value),
      },
    }));
  };

  const validateForm = () => {
    // Check if all subjects have ratings for all questions
    return Object.keys(formData.subjects).every((subjectId) =>
      questions.every(
        (q) =>
          ratings[subjectId]?.[q.id] >= 1 && ratings[subjectId]?.[q.id] <= 5
      )
    );
  };

  const submitFeedback = async () => {
    if (!validateForm()) {
      setError("Please complete all ratings");
      return;
    }

    setLoading(true);
    try {
      // Transform ratings into the required format
      const feedbackData = Object.entries(formData.subjects).map(
        ([subjectId, subject]) => ({
          subject_id: subjectId,
          teacher_id: subject.teacherId,
          ratings: questions.map((q) => ({
            question_id: q.id,
            rating: ratings[subjectId][q.id],
          })),
        })
      );

      await axios.post("/api/feedback", feedbackData);
      handleSubmit();
    } catch (err) {
      setError(err.response?.data?.message || "Error submitting feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="student-form step-3">
      <h2>Step 3: Provide Feedback</h2>

      {error && <div className="error-message">{error}</div>}

      {Object.entries(formData.subjects).map(([subjectId, subject]) => (
        <div key={subjectId} className="subject-feedback">
          <h3>{subject.name}</h3>

          <table className="feedback-table">
            <thead>
              <tr>
                <th>Criteria</th>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <th key={rating}>{rating}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {questions.map((question) => (
                <tr key={question.id}>
                  <td>{question.text}</td>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <td key={rating}>
                      <input
                        type="radio"
                        name={`${subjectId}-${question.id}`}
                        value={rating}
                        checked={ratings[subjectId]?.[question.id] === rating}
                        onChange={(e) =>
                          handleRatingChange(
                            subjectId,
                            question.id,
                            e.target.value
                          )
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <div className="form-buttons">
        <button
          type="button"
          className="btn back"
          onClick={goToPreviousStep}
          disabled={loading}
        >
          Back
        </button>
        <button
          type="button"
          className="btn submit"
          onClick={submitFeedback}
          disabled={loading || !validateForm()}
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </div>
    </form>
  );
};

Step3Feedback.propTypes = {
  formData: PropTypes.object.isRequired,
  goToPreviousStep: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Step3Feedback;
