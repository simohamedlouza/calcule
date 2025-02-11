// الحصول على عناصر الشاشة
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

let currentInput = ""; // الإدخال الحالي
let previousInput = ""; // الإدخال السابق
let operator = ""; // العملية الحسابية

// تحديث الشاشة
function updateDisplay(value) {
    display.textContent = value || "0";
}

// تنظيف الشاشة
function clearDisplay() {
    currentInput = "";
    previousInput = "";
    operator = "";
    updateDisplay("0");
}

// تغيير الإشارة
function toggleSign() {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay(currentInput);
    }
}

// إضافة النسبة المئوية
function addPercentage() {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay(currentInput);
    }
}

// إدخال الأرقام
function appendNumber(value) {
    if (currentInput === "0" && value === "0") return; // منع الأصفار المتكررة
    currentInput += value;
    updateDisplay(currentInput);
}

// إدخال العمليات
function appendOperator(value) {
    if (currentInput === "") return; // لا يمكن إدخال عملية بدون أرقام
    if (previousInput !== "") {
        calculateResult(); // حساب النتيجة المؤقتة
    }
    operator = value;
    previousInput = currentInput;
    currentInput = "";
}

// حساب النتيجة
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

// التعامل مع الأزرار
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