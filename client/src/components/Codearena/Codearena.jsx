// Updated Codearena component with improved UI
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import ReactMarkdown from 'react-markdown';

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css';

import axios from 'axios';

const languageTemplates = {
  cpp: `#include<bits/stdc++.h>
using namespace std;

int main(){
    int a,b;
    cin>>a>>b;
    cout<<a+b<<endl;
    return 0;
}`,
  python: `def main():
    num1, num2 = map(int, input().split())
    sum = num1 + num2
    print(f"The sum of the two numbers is: {sum}")

if __name__ == "__main__":
    main()`,
  js: `function main() {
    const input = prompt("Enter two numbers separated by space:").split(" ");
    const num1 = parseInt(input[0]), num2 = parseInt(input[1]);
    const sum = num1 + num2;
    console.log("The sum of the two numbers is: " + sum);
}
main();`,
};

function Codearena({ problemTitle }) {
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState(languageTemplates.cpp);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [aiReview, setAiReview] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);
  const [problemId, setProblemId] = useState('');

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?._id;

  useEffect(() => {
    setCode(languageTemplates[language]);
  }, [language]);

  useEffect(() => {
    if (!problemTitle) return;
    const fetchProblem = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_MAIN_BACKEND}/problems/${encodeURIComponent(problemTitle)}`);
        const problem = res.data;
        setProblemId(problem._id);
      } catch (err) {
        console.error('Failed to fetch problem:', err);
      }
    };
    fetchProblem();
  }, [problemTitle]);

  const handleRun = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/run`, { language, code, input });
      setOutput(data.output);
    } catch (error) {
      setOutput('Error executing code, error: ' + error.message);
    }
  };

  const handleSubmit = async () => {
    if (!problemId) {
      setOutput("Error: Problem ID not loaded yet. Please wait.");
      return;
    }
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_MAIN_BACKEND}/submit`, {
        language,
        code,
        problemId,
        userId
      });
      if (data.success) {
        const verdictMsg = data.verdict === "Accepted" ? "✅ Accepted" : "❌ Wrong Answer";
        const resultDetails = data.results.map(r =>
          `Test Case ${r.testCase}:\nPassed: ${r.passed}\nExpected: ${r.expected}\nActual: ${r.actual}`
        ).join('\n\n');
        setOutput(`${verdictMsg}\n\n${resultDetails}`);
      } else {
        setOutput('❌ Error running test cases');
      }
    } catch (error) {
      setOutput('Error during submission: ' + error.message);
    }
  };

  const handleAiReview = async () => {
    try {
      setLoadingAi(true);
      // const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/ai-review`, { code });
      console.log("AI Review URL:", import.meta.env.VITE_BACKEND_URL);
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/ai-review`, { code });
      setAiReview(data.review);
    } catch (error) {
      setAiReview('Error in AI review, error: ' + error.message);
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Code Editor */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Code Editor</h2>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-sm"
            >
              <option value="cpp">C++</option>
              <option value="python">Python</option>
              <option value="js">JavaScript</option>
            </select>
          </div>

          <div className="bg-gray-100 rounded-md overflow-auto h-[500px] text-sm">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code) =>
                Prism.highlight(code, Prism.languages[language === 'cpp' ? 'clike' : language], language)
              }
              padding={15}
              style={{ fontFamily: 'Fira Code, monospace', fontSize: 14 }}
            />
          </div>
        </div>

        {/* Input, Output, AI Review */}
        <div className="flex flex-col gap-4">
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-bold text-gray-700 mb-2">Input</h2>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-3 text-sm border border-gray-300 rounded-md resize-none"
              rows={4}
              placeholder="Enter input values here..."
            />
          </div>

          <div className="bg-white p-4 rounded-xl shadow overflow-y-auto h-[150px]">
            <h2 className="text-lg font-bold text-gray-700 mb-2">Output</h2>
            <pre className="text-sm font-mono whitespace-pre-wrap text-gray-800">{output}</pre>
          </div>

          <div className="bg-white p-4 rounded-xl shadow overflow-y-auto h-[150px]">
            <h2 className="text-lg font-bold text-gray-700 mb-2">AI Review</h2>
            <div className="text-sm text-gray-800">
              {loadingAi ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin h-6 w-6 border-2 border-purple-500 border-t-transparent rounded-full"></div>
                </div>
              ) : aiReview ? (
                <ReactMarkdown>{aiReview}</ReactMarkdown>
              ) : (
                <p>🤖 Click "AI Review" to get feedback.</p>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={handleRun} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg">
              Run
            </button>
            <button onClick={handleSubmit} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg">
              Submit
            </button>
            <button
              onClick={handleAiReview}
              disabled={loadingAi}
              className={`flex-1 ${loadingAi ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'} text-white font-medium py-2 rounded-lg`}
            >
              {loadingAi ? 'Loading...' : 'AI Review'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Codearena;