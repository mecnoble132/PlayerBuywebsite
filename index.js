let generatePlayerHTML = '';
players.forEach(player => {
    let playersHTML = `
    <div class="player-card">
        <div class="player-image">
            <img src="${player.image}" alt="${player.id}">
        </div>
        <div class="player-info">
            <h4 class="player-name">${player.name}</h4>
            <p class="player-price">${player.valueEuro} euros</p>
        </div>
        <button class="add-to-cart" onclick="addToCart('${player.id}')">Add to cart</button>
    </div>
    `
    generatePlayerHTML += playersHTML;
});

let playersContainer = document.querySelector('.actual-players-container')
playersContainer.innerHTML = generatePlayerHTML

let cart = [];

function updateCartDisplay() {
    let generateCartHTML = '';
    cart.forEach(cartPlayer => {
        cartHTML = `
        <div class="cart-player">
            <img src="${cartPlayer.image}" alt="${cartPlayer.id}">
            <div class="cart-player-info">
                <p class="cart-player-name">${cartPlayer.name}</p>
                <p>${cartPlayer.valueEuro} euros</p>
                <p class="cart-remove" onclick="removeFromCart('${cartPlayer.id}')">Remove</p>
            </div>
        </div>
        `
        generateCartHTML +=cartHTML;
    });

    let cartContainer = document.querySelector('.actual-cart-container');
    cartContainer.innerHTML = generateCartHTML;
}
function updateCartQuantity(){
    let cartQuantityDisplay = document.querySelector('.cartQuantity')
    let cartQuantity = cart.length;
    cartQuantityDisplay.innerHTML = `(${cartQuantity})`
}
function addToCart(playerId) { 
    let playerToAdd = players.find(player => player.id === playerId);
    if (playerToAdd) {
        let isPlayerInCart = cart.some(player => player.id === playerId);
        if (isPlayerInCart) {
            showAlert(`${playerToAdd.name} is already in your cart.`);
        } else {
            cart.unshift(playerToAdd);
            updateCartDisplay();
            saveCartToLocalStorage(); // Save cart to local storage
        }
    };
    updateCartQuantity();
}

function removeFromCart(playerId) { 
    let playerIndex = cart.findIndex(player => player.id === playerId);
    if (playerIndex !== -1) {
        cart.splice(playerIndex, 1);
        updateCartDisplay();
        saveCartToLocalStorage(); // Save cart to local storage
    }
    updateCartQuantity()
}


function showAlert(message) {
    let customAlert = document.getElementById('customAlert');
    let alertMessage = document.getElementById('alertMessage');
    
    alertMessage.textContent = message;
    customAlert.style.display = 'block';

    setTimeout(() => {
        customAlert.style.display = 'none';
    }, 3000); // Hide after 3 seconds (adjust as needed)
}

function closeAlert() {
    document.getElementById('customAlert').style.display = 'none';
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function initCartFromLocalStorage() {
    let savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Call this function when your page loads
initCartFromLocalStorage();
updateCartQuantity();