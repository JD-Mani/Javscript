// get DOM elements needed fo game
const scoreE1 = document.getElementById("score");
const colorParts = document.querySelectorAll(".colors");
const containerE1 = document.querySelector(".container");
const startBtn = document.querySelector("#start-btn");
const resultE1 = document.querySelector("#score-result");
const wrapperE1 = document.querySelector(".wrapper");

// Current and new colors object
const colorObj = {
  color1: { current: "#006400", new: "#00ff00" },
  color2: { current: "#800000", new: "#ff0000" },
  color3: { current: "#0000b8", new: "#0000ff" },
  color4: { current: "#808000", new: "#ffff00" },
};

// Game variables
let randomColors = [];
let isPathGenerating = false;
let score = 0;
let clickCount = 0;

// Function to get a random color from colors object
const getRandomColor = (colorObj) => {
  const colorKeys = Object.keys(colorObj);
  return colorKeys[Math.floor(Math.random() * colorKeys.length)];
};

// Function to pause execution of game fot given amount of time
const delay = async (time) => {
  return await new Promise((resolve) => setTimeout(resolve, time));
};

// Function to generate a random path of colors
const generateRandomPath = async () => {
  randomColors.push(getRandomColor(colorObj));
  score = randomColors.length;
  isPathGenerating = true;
  await showPath(randomColors);
};

// Function to show the path of colors to player
const showPath = async (colors) => {
  scoreE1.innerText = score;

  // Loop through each color in the array
  for (let color of colors) {
    const currentColor = document.querySelector(`.${color}`);

    // Pause execution for 500 milliseconds
    await delay(500);

    // Set background to new color
    currentColor.style.backgroundColor = colorObj[color].new;
    await delay(600);

    // Set background to old color
    currentColor.style.backgroundColor = colorObj[color].current;
    await delay(600);
  }

  // Set flag to indicate the game is no longer generating path
  isPathGenerating = false;
};

// Function to end the game and show final score
const endGame = () => {
  resultE1.innerHTML = `<span> Your Score : </span>${score}`;
  resultE1.classList.remove("hide");
  containerE1.classList.remove("hide");
  wrapperE1.classList.add("hide");
  startBtn.innerText = "Play Again";
  startBtn.classList.remove("hide");
};

// Function to reset game after ending
const resetGame = () => {
  score = 0;
  clickCount = 0;
  randomColors = [];
  isPathGenerating = false;
  wrapperE1.classList.remove("hide");
  containerE1.classList.add("hide");
  generateRandomPath();
};

// Function to handle a color being clicked
const handleColorClick = async (e) => {
  // IF the path is currently being generated, ignore click
  if (isPathGenerating) {
    return false;
  }

  // If clicked color is correct, update score and continue generating the path
  if (e.target.classList.contains(randomColors[clickCount])) {
    e.target.style.backgroundColor = colorObj[randomColors[clickCount]].new;
    await delay(500);
    e.target.style.backgroundColor = colorObj[randomColors[clickCount]].current;
    clickCount++;
    if (clickCount === score) {
      clickCount = 0;
      generateRandomPath();
    }

    // If the clicked color is incorrect, end game
  } else {
    endGame();
  }
};

// Event Listeners
startBtn.addEventListener("click", resetGame);
colorParts.forEach((color) =>
  color.addEventListener("click", handleColorClick)
);
