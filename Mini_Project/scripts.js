// Select display element
const display = document.getElementById("display");

// Variables to store operation
let currentInput = ""; // Stores current input
let previousInput = ""; // Stores previous input
let operator = ""; // Stores the selected operator

// Add event listeners to all buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    const value = e.target.dataset.value;

    if (e.target.id === "clear") {
      clearDisplay();
    } else if (e.target.id === "square") {
      calculateSquare();
    } else if (e.target.id === "equals") {
      calculateResult();
    } else if (button.classList.contains("operator")) {
      setOperator(value);
    } else if (button.classList.contains("number")) {
      appendNumber(value);
    }
  });
});

// Function to clear the display
function clearDisplay() {
  currentInput = "";
  previousInput = "";
  operator = "";
  display.innerText = "0";
}

// Function to append a number or decimal to the current input
function appendNumber(value) {
  // Avoid multiple decimals
  if (value === "." && currentInput.includes(".")) return;

  currentInput += value;
  display.innerText = currentInput;
}

// Function to set the operator
function setOperator(value) {
  if (currentInput === "") return; // Ignore if no input
  if (previousInput !== "") calculateResult(); // Perform calculation if there's a previous input

  operator = value; // Assign the operator
  previousInput = currentInput; // Store the current input as the first operand
  currentInput = ""; // Clear the current input for the second operand
}

// Function to calculate the square of the current input
function calculateSquare() {
  if (currentInput === "") return;
  currentInput = (parseFloat(currentInput) ** 2).toString();
  display.innerText = formatResult(currentInput);
}

// Function to calculate the result
function calculateResult() {
  if (previousInput === "" || currentInput === "" || operator === "") return;

  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);
  let result;

  // Perform the calculation based on the selected operator
  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;  // Multiplication fixed
      break;
    case "/":
      result = num2 !== 0 ? num1 / num2 : "Error"; // Avoid division by zero
      break;
    case "%":
      result = num1 % num2;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  previousInput = "";
  operator = "";
  display.innerText = formatResult(currentInput);
}

// Function to format the result (limit to 4 decimal places if needed)
function formatResult(result) {
  if (isNaN(result)) return "Error"; // Handle invalid input
  if (result.includes(".")) {
    return parseFloat(result).toFixed(4); // Limit to 4 decimal places
  }
  return result; 
}
