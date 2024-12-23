import React, { useState } from "react";
import { CSpinner } from "@coreui/react";
import Sidebar from "./components/sidebar";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import Step1Form from "./components/Step1Form";
import Step2Review from "./components/Step2Review";
import Step3Feedback from "./components/Step3FeedBack";

import "./styles/App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    class: "",
    division: "",
    rollNo: "",
    universityRollNo: "",
    subjects: {}, // Updated: To store subjects and their types (Main/Elective)
  });

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/feedback", formData);
      setCurrentStep(3); // Move to feedback confirmation step
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    console.log(`Updating ${id} with value: ${value}`); // Debugging
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const goToNextStep = () => {
    console.log("Current step:", currentStep);
    console.log("Form data:", formData);

    if (currentStep === 1) {
      if (
        !formData.name ||
        !formData.branch ||
        !formData.class ||
        !formData.rollNo ||
        !formData.universityRollNo
      ) {
        console.log("Validation failed");
        alert("Please fill in all required fields");
        return;
      }
      console.log("Validation passed");
    }

    setCurrentStep((prev) => {
      const newStep = Math.min(prev + 1, 3);
      console.log("New step:", newStep);
      return newStep;
    });
  };

  return (
    <div className="app-container">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="main-content">
        <Header />
        <ProgressBar currentStep={currentStep} />
        {currentStep === 1 ? (
          <Step1Form
            formData={formData}
            handleInputChange={handleInputChange}
            goToNextStep={goToNextStep}
          />
        ) : currentStep === 2 ? (
          <Step2Review
            formData={formData}
            setFormData={setFormData}
            goToPreviousStep={goToPreviousStep}
            goToNextStep={goToNextStep}
          />
        ) : (
          <Step3Feedback
            formData={formData}
            setFormData={setFormData}
            goToPreviousStep={goToPreviousStep}
            handleSubmit={handleSubmit}
          />
        )}
      </main>
    </div>
  );
}
export default App;
