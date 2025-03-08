const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));


const userPoints = {};
function chatbotResponse(message) {
    message = message.toLowerCase(); 

    if (message.includes('recycle')) {
        return { response: "Recycling is important! +2 points for your eco-consciousness!", points: 2 };
    } else if (message.includes('reduce waste')) {
        return { response: "Reducing waste helps the planet! +3 points for being resourceful!", points: 3 };
    } else if (message.includes('save water')) {
        return { response: "Great job saving water! +2 points for conservation!", points: 2 };
    } else {
        return { response: "That's interesting! How does it relate to EcoForce?", points: 0 };
    }
}

app.get('/', (req, res) => {
    fs.readFile('./public/index.html', 'utf8', (err, html) => {
        if (err) {
            console.error('Error reading index.html:', err);
            return res.status(500).send('Error loading the page');
        }
        res.send(html);
    });
});

app.get('/points/:username', (req, res) => {
    const username = req.params.username;
    const points = userPoints[username] || 0;
    res.json({ points: points });
});

app.post('/points/:username/add', (req, res) => {
    const username = req.params.username;
    const pointsToAdd = req.body.points;

    if (typeof pointsToAdd !== 'number' || pointsToAdd <= 0) {
        return res.status(400).json({ error: 'Invalid points value' });
    }

    if (!userPoints[username]) {
        userPoints[username] = 0;
    }

    userPoints[username] += pointsToAdd;

    res.json({ message: 'Points updated successfully', points: userPoints[username] });
});

app.post('/chat/:username', (req, res) => {
    const username = req.params.username;
    const message = req.body.message;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const chatbotResult = chatbotResponse(message);
    const points = chatbotResult.points;

    
    if (points > 0) {
        if (!userPoints[username]) {
            userPoints[username] = 0;
        }
        userPoints[username] += points;
    }

    res.json({
        response: chatbotResult.response,
        points: userPoints[username] || 0 
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

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
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const totalPointsElement = document.getElementById('total-points');


    cartItemsList.innerHTML = '';

    if (cartItems.length === 0) {
        // If the cart is empty, show a message
        cartElement.querySelector('.text-box').style.display = 'block';
        totalPriceElement.textContent = '0';
        totalPointsElement.textContent = '0';
    } else {
        // Hide the empty cart message
        cartElement.querySelector('.text-box').style.display = 'none';

        // Calculate total price and points
        let totalPrice = 0;
        let totalPoints = 0;

        // Add each item to the cart list
        cartItems.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - $${item.price} | ${item.points} pts`;
            cartItemsList.appendChild(listItem);

            // Update totals
            totalPrice += item.price;
            totalPoints += item.points;
        });

        // Update total price and points
        totalPriceElement.textContent = totalPrice;
        totalPointsElement.textContent = totalPoints;
    }
}
