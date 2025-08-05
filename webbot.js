const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotContainer = document.querySelector('.chatbot-container');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatbotBody = document.getElementById('chatbot-body');

chatbotToggle.addEventListener('click', () => {
    chatbotContainer.style.display = chatbotContainer.style.display === 'flex' ? 'none' : 'flex';
});

// Show initial greeting and button when page loads
window.addEventListener('DOMContentLoaded', () => {
    addMessage("Hello! How can I help you today?", 'bot');
    addTitleInfoButton();
});

sendBtn.addEventListener('click', () => {
    const userText = userInput.value.trim();
    if (userText) {
        appendMessage(userText, 'user');
        userInput.value = '';

        // Store user input for later use
        const userLocation = userText;

        setTimeout(() => {
            appendRichMessage(`Great! Now that we know the vehicle is located in ${userLocation}, we can continue our process <a href="bot.html" style="color:#007bff; text-decoration:underline;">here</a>!`);
        }, 1000);
    }
});

function appendMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.innerText = text;
    chatbotBody.appendChild(messageDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function addMessage(text, sender) {
    appendMessage(text, sender);
}

function addTitleInfoButton() {
    const buttonDiv = document.createElement('div');
    buttonDiv.style.marginTop = '10px';

    const titleBtn = document.createElement('button');
    titleBtn.innerText = 'Title Info';
    titleBtn.style.padding = '8px 14px';
    titleBtn.style.background = '#007bff';
    titleBtn.style.color = '#fff';
    titleBtn.style.border = 'none';
    titleBtn.style.borderRadius = '6px';
    titleBtn.style.cursor = 'pointer';

    titleBtn.addEventListener('click', () => {
        appendMessage('Title Info', 'user');
        setTimeout(() => {
            appendMessage('Great! You selected Title Info! We can start by having you tell me what state the vehicle is located in.', 'bot');
        }, 800);

        // Remove the button after click
        buttonDiv.remove();
    });
    

    buttonDiv.appendChild(titleBtn);
    chatbotBody.appendChild(buttonDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function appendRichMessage(htmlContent) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('bot-message');
    messageDiv.innerHTML = htmlContent;
    chatbotBody.appendChild(messageDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}
