import React, { useState, useEffect } from "react";
import SpecDisplay from "./components/SpecDisplay";
import SpecInputForm from "./components/SpecInputForm";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

export default function App() {
  const [techDraft, setTechDraft] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function checkIsMobile() {
      setIsMobile(window.innerWidth < 768);
    }
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f4f6] text-gray-900 px-4">
        <div className="max-w-md text-center p-6 bg-white rounded shadow">
          <h1 className="text-2xl font-bold mb-4 text-[#008080]">
            This application is not supported on mobile devices
          </h1>
          <p className="text-gray-700">
            Please access this application from a desktop or laptop computer.
          </p>
        </div>
      </div>
    );
  }

  console.log("techDraft Data", techDraft);
  console.log(
    "technical ",
    techDraft?.technicalSpecification?.apiSpecifications
  );
  console.log("system ", techDraft?.technicalSpecification?.systemComponents);

  return (
    <div className="min-h-screen bg-[#f4f4f6] text-gray-900">
      <main className="max-w-full mx-auto px-4 sm:px-6 md:px-8 py-10 space-y-4">
        <header className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-[#008080]">
            TechDraft AI
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Turn your ideas into detailed technical specifications using AI.
          </p>
        </header>

        {/* Form Card */}
        <Card className="w-full bg-[#f9fafa] max-w-[80%] min-h-[500px] mx-auto border-[0.5px] border-gray-300 p-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-medium text-black">
              Generate Technical Specification
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <SpecInputForm onTechDraft={setTechDraft} />
          </CardContent>
        </Card>

        {/* Display Card with matching width */}
        {techDraft && (
          <Card className="w-full bg-white max-w-[80%] mx-auto border-[0.5px] border-gray-300 p-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-gray-800">
                Generate Specification
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <SpecDisplay techDraft={techDraft} />
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
