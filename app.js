// app.js
const express = require("express");
const bodyParser = require("body-parser");
const admin = require("./firebase-admin"); // Import Firebase Admin
// const openai = require("openai");

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());

// Define your routes here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Inside app.js

const { OpenAIApi } = require("openai");

const openai = new OpenAIApi({
  key: "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", // Replace with your OpenAI API key
});

app.post("/generate-story", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.createCompletion({
      engine: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1000, // Adjust as needed
    });

    const story = response.choices[0].text;
    res.json({ story });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Story generation failed" });
  }
});

// Inside app.js

const firebase = require("firebase-admin");
const db = firebase.database();
const storiesRef = db.ref("stories");

app.post("/upvote", (req, res) => {
  const { storyId } = req.body;

  // Increase the upvote count in Firebase
  storiesRef.child(storyId).transaction((story) => {
    if (story) {
      if (!story.upvotes) story.upvotes = 0;
      story.upvotes++;
    }
    return story;
  });

  res.json({ success: true });
});

app.get("/leaderboard", async (req, res) => {
  // Retrieve the top-rated stories from Firebase
  const snapshot = await storiesRef
    .orderByChild("upvotes")
    .limitToLast(10)
    .once("value");
  const leaderboard = [];

  snapshot.forEach((childSnapshot) => {
    leaderboard.push(childSnapshot.val());
  });

  res.json({ leaderboard });
});
