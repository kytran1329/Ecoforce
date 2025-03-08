document.addEventListener('DOMContentLoaded', function () {
    // Section Navigation Logic
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

        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
        const superheroAlias = `${randomAdjective} ${randomNoun}`;
        document.getElementById("username").value = superheroAlias;
    }

    const generateBtn = document.querySelector("button[onclick='generateUsername()']");
    if (generateBtn) {
        generateBtn.addEventListener("click", generateUsername);
    }

    // Chatbot Logic
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

    // Clear the textarea after posting
    document.getElementById('post-content').value = "";
}

//drop down for the cart thingy//
function filterProducts() {
    // Get the selected category
    const selectedCategory = document.getElementById('category').value;

    // Get all product elements
    const products = document.querySelectorAll('.product');

    // Loop through each product and show/hide based on the selected category
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');

        if (selectedCategory === 'all' || productCategory === selectedCategory) {
            product.style.display = 'block'; // Show the product
        } else {
            product.style.display = 'none'; // Hide the product
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Array to store cart items
    let cartItems = [];

    // Function to add a product to the cart
    function addToCart(productName, price, points) {
        // Create a cart item object
        const cartItem = {
            name: productName,
            price: price,
            points: points
        };

        // Add the item to the cart
        cartItems.push(cartItem);

        // Update the cart display
        updateCartDisplay();
    }

    // Function to update the cart display
    function updateCartDisplay() {
        const cartElement = document.getElementById('cart');

        // Clear the cart display
        cartElement.innerHTML = '';

        if (cartItems.length === 0) {
            // If the cart is empty, show a message
            cartElement.innerHTML = '<p>No items in cart.</p>';
        } else {
            // Create a list of cart items
            const cartList = document.createElement('ul');

            cartItems.forEach((item, index) => {
                const listItem = document.createElement('li');
                listItem.textContent = `${item.name} - $${item.price} | ${item.points} pts`;
                cartList.appendChild(listItem);
            });

            // Add the list to the cart
            cartElement.appendChild(cartList);

            // Add a "Checkout" button (optional)
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

    // Attach the function to the window object for global access
    window.addToCart = addToCart;
});