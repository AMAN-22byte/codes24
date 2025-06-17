const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { generateFile } = require('./generateFile');
const { generateInputFile } = require('./generateInputFile');
const { executeCpp } = require('./executeCpp');
const { executePython } = require('./executeCpp');
const { executeJs } = require('./executeCpp');
const { aiCodeReview } = require('./aiCodeReview');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const Problem = require('./models/Problems.js'); 
const User = require('./models/User.js'); 
const Submission = require('./models/Submission.js'); 
const { DBConnection } = require('./db.js');
DBConnection();
const dotenv = require('dotenv');
dotenv.config();

app.use(cors()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

app.get("/", (req, res) => {
    res.json({ online: 'compiler' });
});

app.post("/run", async (req, res) => {
    try {
        const { language = 'cpp', code, input = '' } = req.body;

        if (!code || code.trim() === '') {
            return res.status(400).json({ success: false, error: "Empty code! Please provide some code to execute." });
        }

        // Generate temp files first
        const filePath = await generateFile(language, code);
        const inputPath = await generateInputFile(input);

        let output;
        if (language === 'cpp') {
            output = await executeCpp(filePath, inputPath);
        } else if (language === 'python' || language === 'py') {
            output = await executePython(filePath, inputPath);
        } else if (language === 'js') {
            output = await executeJs(filePath, inputPath);
        } else {
            return res.status(400).json({ success: false, error: "Unsupported language!" });
        }

        return res.json({ success: true, filePath, inputPath, output });
    } catch (error) {
        console.error('Error executing code:', error);
        return res.status(500).json({ success: false, error: error.message || 'An error occurred while executing the code' });
    }
});

app.post("/ai-review", async (req, res) => {
    const { code } = req.body;
    if (code === undefined) {
        return res.status(404).json({ success: false, error: "Empty code!" });
    }
    try {
        const review = await aiCodeReview(code);
        res.json({ "review": review });
    } catch (error) {
        res.status(500).json({ error: "Error in AI review, error: " + error.message });
    }
});

// app.post("/submit", async (req, res) => {
//   console.log(">>> /submit HIT on port 8000 <<<");
//   // console.log("Forwarding to port 8000 with problemId:", problemId);
//   // const { language = 'cpp', code, problemId } = req.body;
//   const { language = 'cpp', code, problemId, userId } = req.body;
//   if (!code || !problemId) {
//     return res.status(400).json({ success: false, error: "Code or problemId missing!" });
//   }

//   try {
//     const problem = await Problem.findById(problemId);
//     console.log('Fetched problem:', problem);
//     if (!problem) return res.status(404).json({ success: false, error: "Problem not found!" });

//     if (!Array.isArray(problem.hiddenTC) || problem.hiddenTC.length === 0) {
//       return res.status(400).json({ success: false, error: "No hidden test cases available!" });
//     }

//     const filePath = await generateFile(language, code);
//     let allPassed = true;
//     const results = [];

//     for (let i = 0; i < problem.hiddenTC.length; i++) {
//       const { input, output: expected } = problem.hiddenTC[i];
//       // console.log(`Test case #${i + 1} input:`, input);
//       // console.log(`Test case #${i + 1} expected output:`, expected);

//       const inputPath = await generateInputFile(input);
//       let actual;
//       if (language === 'cpp') {
//         actual = await executeCpp(filePath, inputPath);
//       } else if (language === 'py') {
//         actual = await executePython(filePath, inputPath);
//       } else if (language === 'js') {
//         actual = await executeJs(filePath, inputPath);
//       } else {
//         return res.status(400).json({ success: false, error: "Unsupported language!" });
//       }

//       const passed = actual.trim() === expected.trim();
//       if (!passed) allPassed = false;

//       results.push({
//         testCase: i + 1,
//         input,
//         expected: expected.trim(),
//         actual: actual.trim(),
//         passed
//       });
//     }


//      let verdict = allPassed ? "Accepted" : "Wrong Answer";

//     // ✅ Update user's solved problems if all test cases passed
//     // if (allPassed && req.user && req.user._id) {
//     //   const user = await User.findById(req.user._id);
//     //   if (user && !user.solvedProblems.includes(problemId)) {
//     //     user.solvedProblems.push(problemId);
//     //     await user.save();
//     //   }
//     // }

// if (allPassed && mongoose.Types.ObjectId.isValid(userId)) {
//     const user = await User.findById(userId);
//     if (user && !user.solvedProblems.some(p => p.equals(problemId))) {
//         user.solvedProblems.push(problemId);
//         await user.save();
//         console.log('✅ Problem added to solvedProblems');
//     } else {
//         console.log('ℹ️ Problem already solved or user not found');
//     }
// }


//     // ✅ Now send the response
//     return res.json({
//       success: true,
//       verdict,
//       results
//     });
//     fs.unlinkSync(filePath);
//     fs.unlinkSync(inputPath);


//   } catch (error) {
//     console.error("Submit Error:", error);
//     res.status(500).json({ success: false, error: error.message || "Internal error" });
//   }
// });



app.post("/submit", async (req, res) => {
  // console.log(">>> /submit HIT on port 8000 <<<");
  const { language = 'cpp', code, problemId, userId } = req.body;

  if (!code || !problemId) {
    return res.status(400).json({ success: false, error: "Code or problemId missing!" });
  }

  try {
    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ success: false, error: "Problem not found!" });

    if (!Array.isArray(problem.hiddenTC) || problem.hiddenTC.length === 0) {
      return res.status(400).json({ success: false, error: "No hidden test cases available!" });
    }

    const filePath = await generateFile(language, code);
    let allPassed = true;
    const results = [];

    for (let i = 0; i < problem.hiddenTC.length; i++) {
      const { input, output: expected } = problem.hiddenTC[i];
      const inputPath = await generateInputFile(input);

      let actual;
      if (language === 'cpp') {
        actual = await executeCpp(filePath, inputPath);
      } else if (language === 'py') {
        actual = await executePython(filePath, inputPath);
      } else if (language === 'js') {
        actual = await executeJs(filePath, inputPath);
      } else {
        return res.status(400).json({ success: false, error: "Unsupported language!" });
      }

      const passed = actual.trim() === expected.trim();
      if (!passed) allPassed = false;

      results.push({
        testCase: i + 1,
        input,
        expected: expected.trim(),
        actual: actual.trim(),
        passed
      });

      // ✅ Clean input file after each test case
      fs.unlinkSync(inputPath);
    }

    const verdict = allPassed ? "Accepted" : "Wrong Answer";

    // ✅ Add to solvedProblems only if all passed
    if (allPassed && mongoose.Types.ObjectId.isValid(userId)) {
      const user = await User.findById(userId);
      if (user && !user.solvedProblems.some(p => p.equals(problemId))) {
        user.solvedProblems.push(problemId);
        await user.save();
        console.log('✅ Problem added to solvedProblems');
      } else {
        console.log('ℹ️ Problem already solved or user not found');
      }
    }

    // ✅ (Optional) Save submission details
    // await Submission.create({
    //   userId,
    //   problemId,
    //   code,
    //   language,
    //   verdict,
    //   results
    // });

    try {
  await Submission.create({
      userId,
      problemId,
      code,
      language,
      verdict,
      results
    });
  console.log("✅ Submission saved");
} catch (err) {
  console.error("❌ Submission saving failed:", err.message);
}

    // ✅ Respond
    res.json({ success: true, verdict, results });

    // ✅ Cleanup code file
    fs.unlinkSync(filePath);

  } catch (error) {
    console.error("Submit Error:", error);
    res.status(500).json({ success: false, error: error.message || "Internal error" });
  }
});




// Start the server on port 8000
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
});