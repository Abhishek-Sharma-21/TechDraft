import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Zap, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function SpecInputForm({ onTechDraft }) {
  const [featureIdea, setFeatureIdea] = useState("");
  const [developmentScope, setDevelopmentScope] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // For displaying error messages
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset previous error message
    if (!featureIdea || !developmentScope) {
      setErrorMessage(
        "Please fill in both the feature idea and development scope."
      );
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/techDraft`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featureIdea, developmentScope }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate the specification.");
      }
      const data = await response.json();
      if (data.result) {
        toast.success("Specification generated!");
        onTechDraft(data.result);
        // console.log(data.result); // You can do something with the result here

        // toast.success("Health insights generated!");
      }
      // else {
      //   toast.error("No response from AI.");
      // }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Feature Idea Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Feature or App Idea
        </label>
        <Textarea
          placeholder="Describe your high-level feature or application idea..."
          rows={7}
          className="resize bg-[#f4f4f6] text-sm sm:text-base"
          value={featureIdea}
          onChange={(e) => setFeatureIdea(e.target.value)}
          style={{ minHeight: "120px" }}
        />
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Provide a clear description of the feature you want to specify (up to
          5000 characters).
        </p>
      </div>

      {/* Development Scope Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Development Scope
        </label>
        <Select value={developmentScope} onValueChange={setDevelopmentScope}>
          <SelectTrigger className="w-full bg-[#f4f4f6] text-sm sm:text-base">
            <SelectValue placeholder="Select the development scope" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="front-end">Front-end</SelectItem>
            <SelectItem value="back-end">Back-end</SelectItem>
            <SelectItem value="full-stack">Full-stack</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Choose the primary area of focus for this specification.
        </p>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <p className="text-xs sm:text-sm text-red-600 mt-1">{errorMessage}</p>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base bg-[#008080] hover:bg-teal-700 transition-colors duration-200 rounded-md flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span className="truncate">Generating...</span>
          </>
        ) : (
          <>
            <Zap className="mr-2 h-4 w-4" />
            <span className="truncate">Generate Specification</span>
          </>
        )}
      </Button>
    </form>
  );
}
