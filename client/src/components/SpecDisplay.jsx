import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  Layers,
  FileText,
  Settings,
  Code,
  Users,
  CheckSquare,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// ✅ Enhanced Content Display Component
const ContentDisplay = ({ content }) => {
  if (!content) return <p>No content available</p>;

  if (typeof content === "string") {
    return <p className="ml-4">{content}</p>;
  }

  if (Array.isArray(content) && typeof content[0] === "string") {
    return (
      <div className="space-y-2">
        {content.map((item, index) => (
          <p key={index} className="ml-4">
            {item}
          </p>
        ))}
      </div>
    );
  }

  if (Array.isArray(content) && typeof content[0] === "object") {
    return (
      <div className="space-y-4">
        {content.map((item, index) => (
          <div key={index} className="ml-4">
            {Object.entries(item).map(([key, value], i) => (
              <div key={i} className="mt-2">
                <strong>{key}:</strong>{" "}
                {typeof value === "object"
                  ? JSON.stringify(value, null, 2)
                  : value}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (typeof content === "object") {
    return (
      <div className="space-y-2 ml-4">
        {Object.entries(content).map(([key, value], index) => (
          <div key={index}>
            <strong>{key}:</strong>{" "}
            {typeof value === "object" ? JSON.stringify(value, null, 2) : value}
          </div>
        ))}
      </div>
    );
  }

  return <p>{String(content)}</p>;
};

// ✅ Code Block Component
const CodeBlock = ({ code }) => (
  <div className="code-block bg-black text-green-400 p-4 rounded-md overflow-x-auto">
    <pre>
      <code>{code}</code>
    </pre>
  </div>
);

// ✅ Main SpecDisplay Component
export default function SpecDisplay({ techDraft }) {
  const {
    technicalSpecification,
    tasks,
    userStories,
    techStackRecommendations,
    codeSkeleton,
  } = techDraft || {};

  const handleExport = (format) => {
    let filename = "techdraft-ai-spec";
    let contentType = "";
    let content = "";

    const formatSection = (title, data) => {
      if (!data) return `## ${title}\nNo data available\n\n`;

      if (typeof data === "string") {
        return `## ${title}\n${data}\n\n`;
      }

      if (Array.isArray(data)) {
        return `## ${title}\n${data
          .map((item) =>
            typeof item === "object"
              ? `- ${Object.entries(item)
                  .map(([k, v]) => `**${k}**: ${v}`)
                  .join(", ")}`
              : `- ${item}`
          )
          .join("\n")}\n\n`;
      }

      if (typeof data === "object") {
        return `## ${title}\n${Object.entries(data)
          .map(([key, val]) => `- **${key}**: ${val}`)
          .join("\n")}\n\n`;
      }

      return `## ${title}\n${String(data)}\n\n`;
    };

    if (format === "markdown") {
      contentType = "text/markdown";
      filename += ".md";

      content = `# TechDraft AI Generated Specification\n\n`;
      content += formatSection(
        "System Components",
        technicalSpecification?.systemComponents
      );
      content += formatSection(
        "APIs",
        technicalSpecification?.apiSpecifications
      );
      content += formatSection("Data Flow", technicalSpecification?.dataFlow);
      content += formatSection(
        "Architecture Suggestions",
        technicalSpecification?.architectureSuggestions
      );
      content += formatSection("User Stories", userStories);
      content += formatSection("Tasks", tasks);
      content += formatSection(
        "Tech Stack Recommendations",
        techStackRecommendations
      );
      content += `## Code Skeleton\n\n\`\`\`js\n${
        typeof codeSkeleton === "string"
          ? codeSkeleton
          : JSON.stringify(codeSkeleton, null, 2)
      }\n\`\`\`\n`;
    } else if (format === "json") {
      contentType = "application/json";
      filename += ".json";
      content = JSON.stringify(techDraft, null, 2);
    } else if (format === "pdf") {
      alert("PDF export not implemented.");
      return;
    }

    const blob = new Blob([content], { type: contentType });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  return (
    <Card className="shadow-lg overflow-hidden">
      <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-2">
        <CardTitle className="text-2xl font-semibold whitespace-nowrap">
          Generated Specification
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("markdown")}
          >
            <Download className="mr-2 h-4 w-4" /> Markdown
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("json")}
          >
            <Download className="mr-2 h-4 w-4" /> JSON
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="techSpec" className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 mb-4">
            <TabsTrigger value="techSpec" className="text-xs sm:text-sm">
              <Layers className="mr-1 h-3 w-3 sm:h-4 sm:w-4 inline-block" />
              Tech Spec
            </TabsTrigger>
            <TabsTrigger value="userStories" className="text-xs sm:text-sm">
              <Users className="mr-1 h-3 w-3 sm:h-4 sm:w-4 inline-block" />
              User Stories
            </TabsTrigger>
            <TabsTrigger value="tasks" className="text-xs sm:text-sm">
              <CheckSquare className="mr-1 h-3 w-3 sm:h-4 sm:w-4 inline-block" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="techStack" className="text-xs sm:text-sm">
              <Settings className="mr-1 h-3 w-3 sm:h-4 sm:w-4 inline-block" />
              Tech Stack
            </TabsTrigger>
            <TabsTrigger value="codeSkeleton" className="text-xs sm:text-sm">
              <Code className="mr-1 h-3 w-3 sm:h-4 sm:w-4 inline-block" />
              Code
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[400px] md:h-[500px] w-full rounded-md border p-4 bg-muted/30">
            <TabsContent value="techSpec">
              <div className="space-y-4">
                <h4 className="font-semibold">System Components</h4>
                <ContentDisplay
                  content={technicalSpecification?.systemComponents}
                />
                <h4 className="font-semibold mt-4">APIs</h4>
                <ContentDisplay
                  content={technicalSpecification?.apiSpecifications}
                />
                <h4 className="font-semibold mt-4">Data Flow</h4>
                <ContentDisplay content={technicalSpecification?.dataFlow} />
                <h4 className="font-semibold mt-4">Architecture Suggestions</h4>
                <ContentDisplay
                  content={technicalSpecification?.architectureSuggestions}
                />
              </div>
            </TabsContent>

            <TabsContent value="userStories">
              <ContentDisplay content={userStories} />
            </TabsContent>

            <TabsContent value="tasks">
              <ContentDisplay content={tasks} />
            </TabsContent>

            <TabsContent value="techStack">
              <ContentDisplay content={techStackRecommendations} />
            </TabsContent>

            <TabsContent value="codeSkeleton">
              <CodeBlock
                code={
                  typeof codeSkeleton === "string"
                    ? codeSkeleton
                    : JSON.stringify(codeSkeleton, null, 2)
                }
              />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  );
}
