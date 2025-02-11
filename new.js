const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

let currentInput = ""; 
let previousInput = "";
let operator = ""; 

function updateDisplay(value) {
    display.textContent = value || "0";
}

function clearDisplay() {
    currentInput = "";
    previousInput = "";
    operator = "";
    updateDisplay("0");
}

function toggleSign() {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay(currentInput);
    }
}

function addPercentage() {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay(currentInput);
    }
}

function appendNumber(value) {
    if (currentInput === "0" && value === "0") return; 
    currentInput += value;
    updateDisplay(currentInput);
}

function appendOperator(value) {
    if (currentInput === "") return; 
    if (previousInput !== "") {
        calculateResult(); 
    }
    operator = value;
    previousInput = currentInput;
    currentInput = "";
}

function calculateResult() {
    if (currentInput === "" || previousInput === "" || operator === "") return;
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result;

    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            result = num1 / num2;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = "";
    previousInput = "";
    updateDisplay(currentInput);
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.value;

        if (button.classList.contains("suprim")) {
            clearDisplay();
        } else if (button.classList.contains("negative")) {
            toggleSign();
        } else if (button.classList.contains("persentage")) {
            addPercentage();
        } else if (button.classList.contains("operation")) {
            appendOperator(value);
        } else if (button.classList.contains("equal")) {
            calculateResult();
        } else if (button.classList.contains("numbers")) {
            appendNumber(value);
        }
    });
});
