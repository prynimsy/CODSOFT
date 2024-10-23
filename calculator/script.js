const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");

let currentInput = "";
let firstOperand = null;
let operator = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.id === "clear") {
      clear();
    } else if (button.id === "equals") {
      calculate();
    } else {
      appendToDisplay(button.dataset.value);
    }
  });
});

function appendToDisplay(value) {
  currentInput += value;
  display.value = currentInput;
}

function clear() {
  currentInput = "";
  firstOperand = null;
  operator = "";
  display.value = "";
}

function calculate() {
  if (currentInput === "") return;

  if (firstOperand === null) {
    firstOperand = parseFloat(currentInput);
  } else {
    const secondOperand = parseFloat(currentInput);
    switch (operator) {
      case "+":
        firstOperand += secondOperand;
        break;
      case "-":
        firstOperand -= secondOperand;
        break;
      case "*":
        firstOperand *= secondOperand;
        break;
      case "/":
        firstOperand /= secondOperand;
        break;
      default:
        return;
    }
  }

  display.value = firstOperand; // Show result on display
  currentInput = ""; // Reset current input for next calculation
}

buttons.forEach((button) => {
  if (button.classList.contains("operator") && button.dataset.value !== "=") {
    button.addEventListener("click", () => {
      if (currentInput !== "") {
        operator = button.dataset.value; // Store operator
        firstOperand = parseFloat(currentInput); // Store the first operand
        currentInput = ""; // Reset current input for the next number
        display.value = firstOperand; // Display first operand
      }
    });
  }
});
