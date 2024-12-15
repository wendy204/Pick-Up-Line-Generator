// Add event listeners to buttons
document.getElementById("maleButton").addEventListener("click", function () {
  let instructions = document.getElementById("instructions").value;
  fetchLine("male", instructions);
});

document.getElementById("femaleButton").addEventListener("click", function () {
  let instructions = document.getElementById("instructions").value;
  fetchLine("female", instructions);
});

// Function to fetch a pick-up line based on selected gender
function fetchLine(gender, instructions) {
  let apiKey = "d6116e815a6e6a387bt2b0af2o2c3495";

  // Basic prompts based on gender
  let prompt =
    gender === "male"
      ? "Provide a unique and clever pick-up line that a male could use to impress someone."
      : "Provide a unique and clever pick-up line that a female could use to impress someone.";

  // Add instructions if provided
  if (instructions) {
    prompt += ` The pick-up line should be related to ${instructions}.`;
  }

  // Ensure it's different each time
  prompt += " Ensure it's different each time.";

  // Context for AI generation
  let context =
    "You are a witty AI Assistant that generates fresh, fun, and charming pick-up lines for various occasions.";

  let url = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt
  )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  document.getElementById("line").innerText =
    "Generating a pick-up line... please wait";

  // Fetch line using axios
  axios
    .get(url)
    .then((response) => {
      let line = response.data.answer;

      // Use Typewriter effect to display the line
      new Typewriter("#line", {
        delay: 50, // Delay in milliseconds between characters
        cursor: "_", // Optional custom cursor
      })
        .typeString(line)
        .start();
    })
    .catch((error) => {
      console.error("Error fetching pick-up line:", error);
      document.getElementById("line").innerText = "Oops, something went wrong!";
    });
}