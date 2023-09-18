// script.js

document.addEventListener("DOMContentLoaded", () => {
  const generateButton = document.getElementById("generate");
  const promptInput = document.getElementById("prompt");
  const storyContainer = document.getElementById("story-container");
  const leaderboard = document.getElementById("leaderboard");

  generateButton.addEventListener("click", () => {
    const prompt = promptInput.value;

    // Send a POST request to your /generate-story endpoint (AJAX)
    fetch("/generate-story", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })
      .then((response) => response.json())
      .then((data) => {
        const story = data.story;
        storyContainer.innerHTML = `<p>${story}</p>`;
      })
      .catch((error) => {
        console.error(error);
      });
  });

  // Function to load the leaderboard
  const loadLeaderboard = () => {
    // Send a GET request to your /leaderboard endpoint (AJAX)
    fetch("/leaderboard")
      .then((response) => response.json())
      .then((data) => {
        leaderboard.innerHTML = ""; // Clear previous entries
        data.leaderboard.forEach((story) => {
          leaderboard.innerHTML += `<li>${story.text} (Upvotes: ${story.upvotes})</li>`;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Load the leaderboard when the page loads
  loadLeaderboard();
});
