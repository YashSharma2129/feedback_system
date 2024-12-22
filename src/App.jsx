import React, { useState } from "react";
import { CSpinner } from '@coreui/react';
import Sidebar from "./components/sidebar";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import Step1Form from "./components/Step1Form";
import Step2Review from "./components/Step2Review";
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

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    console.log(`Updating ${id} with value: ${value}`); // Debugging
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Handle navigation between steps
  const goToNextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
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
        ) : (
          <Step2Review
            formData={formData}
            setFormData={setFormData}
            goToPreviousStep={goToPreviousStep}
            goToNextStep={goToNextStep}
          />
        )}
      </main>
    </div>
  );
}

export default App;
