const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

const questions = [
    "What's your Name?",
    "What's your Phone Number?",
    "What's your Street Address?",
    "Which City do you live in?",
    "Select your State (AL, AK, AZ, AR, CA):",
    "Enter your VIN (optional):",
    "Do you have the title for the vehicle? (Yes or No)"
];

let answers = {};
let currentQuestionIndex = 0;

// Show greeting first
addMessage("Hey there! I'm here to guide you through the title transfer process and provide you with the necessary forms. Let's start by having you answer some questions about yourself...", 'bot');

// After 2 seconds, show the first question
setTimeout(() => {
    addMessage(questions[currentQuestionIndex], 'bot');
}, 2000);

sendBtn.addEventListener('click', handleUserResponse);

function handleUserResponse() {
    const userText = chatInput.value.trim();
    if (!userText) return;

    // Display user message
    addMessage(userText, 'user');

    // Store answer
    const keys = ['name', 'phone', 'address', 'city', 'state', 'vin', 'title'];
    answers[keys[currentQuestionIndex]] = userText;

    chatInput.value = '';
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        setTimeout(() => {
            addMessage(questions[currentQuestionIndex], 'bot');
        }, 1000);
    } else {
        setTimeout(() => {
            showSummary();
        }, 1000);
    }
}

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.classList.add(sender === 'bot' ? 'bot-message' : 'user-message');
    div.innerText = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function showSummary() {
    let summary = "Thank you! Let's double-check and make sure everything is accurate. Here's the information you provided:\n\n";
    for (let key in answers) {
        summary += `${key.toUpperCase()}: ${answers[key]}\n`;
    }
    addMessage(summary, 'bot');
}
