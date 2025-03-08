let currentProgress = 0;
let earnedPoints = 0;
let missions = 0;
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    function showSection(targetId) {
        sections.forEach(section => section.style.display = 'none');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.style.opacity = '0';
            setTimeout(() => {
                targetSection.style.opacity = '1';
            }, 10);
        }
    }

    const initialSection = window.location.hash.substring(1) || 'home';
    showSection(initialSection);

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
            history.pushState(null, "", `#${targetId}`);
        });
    });
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

        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
        const superheroAlias = `${randomAdjective} ${randomNoun}`;
        document.getElementById("username").value = superheroAlias;
    }

    const generateBtn = document.querySelector("button[onclick='generateUsername()']");
    if (generateBtn) {
        generateBtn.addEventListener("click", generateUsername);
    }
    const buttons = document.querySelectorAll('.quest-button');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const points = parseInt(this.getAttribute('data-points')); 
            earnedPoints += points;
            missions += 1;
            const missionCount = document.getElementById('completed-missions');
            missionCount.textContent = `${missions}`;
            const pointsEarned = document.getElementById('points');
            pointsEarned.textContent = `${earnedPoints}`;
            currentProgress = .5 * earnedPoints;
            updateProgressBar(currentProgress);
        });
    });

    const chatBtn = document.getElementById("chatbot-button");
    const chatBox = document.getElementById("chatbot");
    const closeChat = document.getElementById("close-chat");
    const sendBtn = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");
    const chatMessages = document.getElementById("chat-messages");

    if (chatBtn && chatBox && closeChat && sendBtn && userInput && chatMessages) {
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

        chatBtn.addEventListener("click", function () {
            chatBox.style.display = "flex";
            chatBtn.style.display = "none";
        });

        closeChat.addEventListener("click", function () {
            chatBox.style.display = "none";
            chatBtn.style.display = "block";
        });

        sendBtn.addEventListener("click", sendMessage);
        userInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                sendMessage();
            }
        });

        function sendMessage() {
            const userText = userInput.value.trim();
            if (userText === "") return;

            appendMessage(userText, "user-message");

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
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
    }
    func

            function updateProgressBar(percentage) {
                const validPercentage = Math.min(Math.max(percentage, 0), 100).toFixed(2);
                const progressElement = document.querySelector('.progress');
                const progressTextElement = document.getElementById('progress-text');
                progressElement.style.width = `${validPercentage}%`;
                if (validPercentage === 100) {
                progressTextElement.textContent = "100% Great Job!";
                } else {
                progressTextElement.textContent = `${validPercentage}% Complete - Keep Going!`;
                }
            }
        
            // Example usage: Updating to 75% with a delay of 2 seconds
            /*setTimeout(function() {
                updateProgressBar(75);
            }, 2000);  // Delay of 2000 milliseconds (2 seconds)*/

    function filterProducts() {
        const selectedCategory = document.getElementById('category').value;
        const products = document.querySelectorAll('.product');

        products.forEach(product => {
            const productCategory = product.getAttribute('data-category');
            if (selectedCategory === 'all' || productCategory === selectedCategory) {
                product.style.display = 'block'; 
            } else {
                product.style.display = 'none'; 
            }
        });
    }

    window.filterProducts = filterProducts;

    let cartItems = [];

    function addToCart(productName, price, points) {
        const cartItem = {
            name: productName,
            price: price,
            points: points
        };
        cartItems.push(cartItem);
        updateCartDisplay();
    }

    function updateCartDisplay() {
        const cartElement = document.getElementById('cart');
        cartElement.innerHTML = '';

        if (cartItems.length === 0) {
            cartElement.innerHTML = '<p>No items in cart.</p>';
        } else {
            const cartList = document.createElement('ul');

            cartItems.forEach((item, index) => {
                const listItem = document.createElement('li');
                listItem.textContent = `${item.name} - $${item.price} | ${item.points} pts`;
                cartList.appendChild(listItem);
            });

            cartElement.appendChild(cartList);

            const checkoutButton = document.createElement('button');
            checkoutButton.textContent = 'Checkout';
            checkoutButton.addEventListener('click', function () {
                alert('Thank you for your purchase!');
                cartItems = []; // Clear the cart
                updateCartDisplay(); // Update the display
            });
            cartElement.appendChild(checkoutButton);
        }
    }

    window.addToCart = addToCart;
    window.addToCart = addToCart;
});

function postMessage() {
    const postContent = document.getElementById('post-content').value.trim();
    if (postContent === "") {
        alert("Please enter a message before posting!");
        return;
    }

    const postsContainer = document.getElementById('posts');
    const newPost = document.createElement('div');
    newPost.classList.add('post');
    newPost.textContent = postContent;
    postsContainer.appendChild(newPost);
    document.getElementById('post-content').value = "";
}

// Game Variables
let player;
let obstacle;
let goal;
let score = 0;
let time = 0;
let gameInterval;
let isGameActive = false; 

function startGame() {
    player = document.getElementById('player');
    obstacle = document.getElementById('obstacle');
    goal = document.getElementById('goal');

    score = 0;
    time = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('time').textContent = time;

    player.style.left = '50px';
    player.style.top = '50px';
    obstacle.style.left = `${Math.random() * 350}px`;
    obstacle.style.top = `${Math.random() * 350}px`;
    goal.style.left = `${Math.random() * 350}px`;
    goal.style.top = `${Math.random() * 350}px`;

    clearInterval(gameInterval);
    isGameActive = true; 
    gameInterval = setInterval(updateGame, 1000);
    document.addEventListener('keydown', movePlayer);
}

// Pause the Game
function pauseGame() {
    clearInterval(gameInterval);
    isGameActive = false;
}

// Reset the Game
function resetGame() {
    if (isGameActive) {
        clearInterval(gameInterval);
        isGameActive = false; 
        alert(`Game Over! Your final score is ${score}.`);
    }
}
function updateGame() {
    if (!isGameActive) return; 
    time++;
    document.getElementById('time').textContent = time;
    if (checkCollision(player, obstacle)) {
        resetGame();
    }
    if (checkCollision(player, goal)) {
        score++;
        document.getElementById('score').textContent = score;
        goal.style.left = `${Math.random() * 350}px`;
        goal.style.top = `${Math.random() * 350}px`;
    }
}

function movePlayer(event) {
    if (!isGameActive) return; 

    const key = event.key;
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
        event.preventDefault();
    }

    const playerRect = player.getBoundingClientRect();
    const gameContainerRect = document.getElementById('game-container').getBoundingClientRect();
    const playerTop = playerRect.top - gameContainerRect.top;
    const playerLeft = playerRect.left - gameContainerRect.left;
    const moveSpeed = 10;

    if (key === 'ArrowUp' && playerTop > 0) {
        player.style.top = `${playerTop - moveSpeed}px`;
    } else if (key === 'ArrowDown' && playerTop < gameContainerRect.height - playerRect.height) {
        player.style.top = `${playerTop + moveSpeed}px`;
    } else if (key === 'ArrowLeft' && playerLeft > 0) {
        player.style.left = `${playerLeft - moveSpeed}px`;
    } else if (key === 'ArrowRight' && playerLeft < gameContainerRect.width - playerRect.width) {
        player.style.left = `${playerLeft + moveSpeed}px`;
    }
}

function checkCollision(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return !(
        rect1.top > rect2.bottom ||
        rect1.bottom < rect2.top ||
        rect1.left > rect2.right ||
        rect1.right < rect2.left
    );
}

document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        pauseGame(); 
    }
});

// Pause the Game When the Mini-Game Section is Hidden
const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.attributeName === 'style') {
            const miniGameSection = document.getElementById('mini-game-section');
            if (miniGameSection.style.display === 'none') {
                pauseGame(); 
            }
        }
    });
});

observer.observe(document.getElementById('mini-game-section'), {
    attributes: true, 
});