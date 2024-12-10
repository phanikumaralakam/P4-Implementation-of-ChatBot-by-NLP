const historyContainer = document.getElementById('history');
const sidebar = document.getElementById('sidebar');
const toggleButton = document.getElementById('toggle-sidebar');
const showButton = document.getElementById('show-button');
const userSide = document.getElementById('user-side');
const botSide = document.getElementById('bot-side');

// Start the conversation with a welcome greeting
function startConversation() {
  appendMessage('bot', "Hi, I am Buddy!");
  appendMessage(
    'bot',
    "I can help you with time and date, weather, shopping recommendations, history quizzes, mathematical problem answers, and language translations between Hindi, English, and Telugu."
  );
}

function toggleHistory() {
  if (sidebar.classList.contains('hidden')) {
    sidebar.classList.remove('hidden');
    showButton.style.display = 'none';
  } else {
    sidebar.classList.add('hidden');
    showButton.style.display = 'block';
  }
}

function addHistoryItem(message) {
  const historyItem = document.createElement('div');
  historyItem.className = 'history-item';

  const messageSpan = document.createElement('span');
  messageSpan.textContent = message;

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-btn';
  deleteButton.textContent = '🗑️';
  deleteButton.onclick = () => {
    historyContainer.removeChild(historyItem);
  };

  historyItem.appendChild(messageSpan);
  historyItem.appendChild(deleteButton);

  historyContainer.appendChild(historyItem);
}

function sendMessage() {
  const userInput = document.getElementById('user-input');
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage('user', message);
  addHistoryItem(message);

  const botResponse = getBotResponse(message);
  appendMessage('bot', botResponse);

  userInput.value = '';
}

function getBotResponse(userMessage) {
  userMessage = userMessage.toLowerCase();

  if (userMessage.includes('time') || userMessage.includes('date')) {
    const now = new Date();
    return `Current date and time: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  }

  if (userMessage.includes('weather')) {
    return 'Weather information is not available in this bot currently, but you can check online weather platforms!';
  }

  if (userMessage.includes('shopping')) {
    return 'You can shop at popular websites like Amazon (https://www.amazon.com) and Flipkart (https://www.flipkart.com). Happy shopping!';
  }

  if (userMessage.includes('history')) {
    return 'Did you know? The Great Wall of China is over 13,000 miles long! Ask me more history trivia if you like.';
  }

  if (userMessage.includes('solve')) {
    try {
      const mathExpression = userMessage.replace('solve', '').trim();
      const result = eval(mathExpression);
      return `The answer to ${mathExpression} is ${result}.`;
    } catch {
      return 'I couldn’t solve the mathematical problem. Please make sure it’s a valid equation.';
    }
  }

  if (userMessage.includes('translate')) {
    return handleTranslation(userMessage);
  }

  return 'I don’t understand that. Can you ask me about time, weather, shopping, history, math problems, or translations?';
}

function handleTranslation(message) {
  const translations = {
    hi: {
      hindi: 'नमस्ते',
      telugu: 'హలో',
      english: 'Hello',
    },
    thank: {
      hindi: 'धन्यवाद',
      telugu: 'ధన్యవాదాలు',
      english: 'Thank you',
    },
  };

  const words = message.split(' ');
  const targetLang = words[1]?.toLowerCase();
  const wordToTranslate = words.slice(2).join(' ').toLowerCase();

  if (!['hindi', 'english', 'telugu'].includes(targetLang)) {
    return 'I can only translate between Hindi, English, and Telugu.';
  }

  const translation = Object.entries(translations).find(([key]) =>
    wordToTranslate.includes(key)
  );

  if (translation) {
    return `${wordToTranslate} in ${targetLang} is "${translation[1][targetLang]}"`;
  }

  return 'Sorry, I don’t have a translation for that word.';
}

function appendMessage(sender, message) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-bubble ${sender}`;
  messageDiv.textContent = message;

  if (sender === 'user') {
    userSide.appendChild(messageDiv);
  } else {
    botSide.appendChild(messageDiv);
  }
}

function handleKeyDown(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}

// Start the bot conversation when the page loads
startConversation();
