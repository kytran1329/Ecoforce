document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    // Function to show the correct section
    function showSection(targetId) {
        sections.forEach(section => section.style.display = 'none'); // Hide all sections
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.style.opacity = '0';
            setTimeout(() => {
                targetSection.style.opacity = '1';
            }, 10);
        }
    }

    // Show the correct section based on the URL hash (or default to 'home')
    const initialSection = window.location.hash.substring(1) || 'home';
    showSection(initialSection);

    // Add event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
            history.pushState(null, "", `#${targetId}`); // Update URL without refreshing
        });
    });

    // Superhero Username Generator
    function generateUsername() {
        const adjectives = [
            "Mighty", "Invisible", "Galactic", "Thunder", "Shadow", "Solar", 
            "Cosmic", "Stealthy", "Blazing", "Iron", "Emerald", "Storm", "Crimson", 
            "Phantom", "Spectral", "Neon", "Astral", "Venomous"
        ];
        
        const nouns = [
            "Guardian", "Warrior", "Avenger", "Sentinel", "Protector", "Champion", 
            "Defender", "Phoenix", "Striker", "Titan", "Knight", "Vortex", "Hunter", 
            "Hawk", "Ranger", "Juggernaut", "Shadow", "Rebel", "Vigilante", "Crusader"
        ];

        // Pick a random adjective and noun
        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

        // Combine them into a username
        const superheroAlias = `${randomAdjective} ${randomNoun}`;

        // Display in the input field
        document.getElementById("username").value = superheroAlias;
    }

    // Attach event listener to the Generate Username button
    const generateBtn = document.querySelector("button[onclick='generateUsername()']");
    if (generateBtn) {
        generateBtn.addEventListener("click", generateUsername);
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const chatBtn = document.getElementById("chatbot-button");
    const chatBox = document.getElementById("chatbot");
    const closeChat = document.getElementById("close-chat");
    const sendBtn = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");
    const chatMessages = document.getElementById("chat-messages");

    const missions = [
        "🗑 Pick Up Litter: Collect 5 pieces of trash today. (5 pts)",
        "💡 Turn Off Lights: Save electricity when not needed. (3 pts)",
        "🚰 Save Water: Take a shorter shower today. (4 pts)",
        "♻ Recycle: Sort your trash and recycle properly. (6 pts)",
        "🛍 Use a Reusable Bag: Say no to plastic bags. (5 pts)",
        "🍽 Reduce Food Waste: Finish your meal without wasting food. (4 pts)",
        "🚶 Walk Instead: Avoid driving for a short trip. (5 pts)",
        "📢 Spread Awareness: Share one eco-friendly tip with a friend. (3 pts)"
    ];

    // Open chatbot
    chatBtn.addEventListener("click", function () {
        chatBox.style.display = "flex";
        chatBtn.style.display = "none";
    });

    // Close chatbot
    closeChat.addEventListener("click", function () {
        chatBox.style.display = "none";
        chatBtn.style.display = "block";
    });

    // Handle sending messages
    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        const userText = userInput.value.trim();
        if (userText === "") return;

        // Display user message
        appendMessage(userText, "user-message");

        // Generate bot response
        let botResponse;
        if (userText.toLowerCase().includes("mission")) {
            botResponse = missions[Math.floor(Math.random() * missions.length)];
        } else {
            botResponse = "🤖 Try asking for a mission! Example: 'Give me a mission!'";
        }

        setTimeout(() => {
            appendMessage(botResponse, "bot-message");
        }, 500);

        userInput.value = "";
    }

    function appendMessage(text, className) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", className);
        messageDiv.innerText = text;
        chatMessages.appendChild(messageDiv);

        // Scroll to latest message
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});


function postMessage() {
    const content = document.getElementById("post-content").value;
    if (content) {
        const postElement = document.createElement("div");
        postElement.className = "post";
        postElement.innerHTML = `<p>${content}</p>`;
        document.getElementById("posts").appendChild(postElement);
        document.getElementById("post-content").value = "";
    }
}

