import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../assets/assets.js";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import toast from "react-hot-toast";

import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

import ProblemDescription from "../component/ProblemDescription";
import OutputPanel from "../component/OutputPanel";
import CodeEditorPanel from "../component/CodeEditorPanel";
import { executeCode } from "../lib/piston";
import confetti from "canvas-confetti";

function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentProblemId, setCurrentProblemId] = useState("two-sum");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(
    PROBLEMS["two-sum"].starterCode.javascript
  );
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const currentProblem = PROBLEMS[currentProblemId];

  useEffect(() => {
    if (id && PROBLEMS[id]) {
      setCurrentProblemId(id);
      setCode(PROBLEMS[id].starterCode[selectedLanguage]);
      setOutput(null);
    }
  }, [id, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(currentProblem.starterCode[newLang]);
    setOutput(null);
  };

  const handleProblemChange = (newProblemId) =>
    navigate(`/problem/${newProblemId}`);

  const triggerConfetti = () => {
    confetti({ particleCount: 80, spread: 250, origin: { x: 0.2, y: 0.6 } });
    confetti({ particleCount: 80, spread: 250, origin: { x: 0.8, y: 0.6 } });
  };

  const normalizeOutput = (text) =>
    text
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          .replace(/\s*,\s*/g, ",")
      )
      .filter(Boolean)
      .join("\n");

  const checkIfTestsPassed = (actual, expected) =>
    normalizeOutput(actual) === normalizeOutput(expected);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);
    setIsRunning(false);
    setOutput(result);

    if (result.success) {
      const expected = currentProblem.expectedOutput[selectedLanguage];
      const passed = checkIfTestsPassed(result.output, expected);

      if (passed) {
        triggerConfetti();
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-slate-900 to-gray-900">
      <Navbar />

      {/* WORKSPACE */}
      <div className="flex-1 px-3 sm:px-4 py-4 overflow-hidden ">
        <div
          className="
            h-full rounded-3xl
            bg-gray-900/60 backdrop-blur-xl
            border border-indigo-500/20
            shadow-[0_0_30px_rgba(99,102,241,0.15)]
          "
        >
          {/* DESKTOP */}
          <div className="hidden md:block h-full">
            <PanelGroup direction="horizontal">
              <Panel defaultSize={38} minSize={30}>
                <div className="h-full mx-2 overflow-y-auto p-4">
                  <ProblemDescription
                    problem={currentProblem}
                    currentProblemId={currentProblemId}
                    onProblemChange={handleProblemChange}
                    allProblems={Object.values(PROBLEMS)}
                  />
                </div>
              </Panel>

              <PanelResizeHandle
                className="
                  w-1.5
                  bg-indigo-500/20
                  hover:bg-indigo-500
                  transition-all duration-300
                  cursor-col-resize
                "
              />

              <Panel defaultSize={62} minSize={30}>
                <PanelGroup direction="vertical">
                  <Panel defaultSize={68} minSize={30}>
                    <div className="h-full p-4">
                      <CodeEditorPanel
                        selectedLanguage={selectedLanguage}
                        code={code}
                        isRunning={isRunning}
                        onLanguageChange={handleLanguageChange}
                        onCodeChange={setCode}
                        onRunCode={handleRunCode}
                      />
                    </div>
                  </Panel>

                  <PanelResizeHandle
                    className="
                      h-1.5
                      bg-indigo-500/20
                      hover:bg-indigo-500
                      transition-all duration-300
                      cursor-row-resize
                    "
                  />

                  <Panel defaultSize={32} minSize={25}>
                    <div className="h-full p-4">
                      <OutputPanel output={output} />
                    </div>
                  </Panel>
                </PanelGroup>
              </Panel>
            </PanelGroup>
          </div>

          {/* MOBILE */}
          <div className="md:hidden overflow-y-auto p-4 space-y-5">
            <ProblemDescription
              problem={currentProblem}
              currentProblemId={currentProblemId}
              onProblemChange={handleProblemChange}
              allProblems={Object.values(PROBLEMS)}
            />

            <CodeEditorPanel
              selectedLanguage={selectedLanguage}
              code={code}
              isRunning={isRunning}
              onLanguageChange={handleLanguageChange}
              onCodeChange={setCode}
              onRunCode={handleRunCode}
            />

            <OutputPanel output={output} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProblemPage;
