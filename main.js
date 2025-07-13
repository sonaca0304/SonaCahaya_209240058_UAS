let cart = [];
        let cartTotal = 0;

        function addToCart(productName, price) {
            const existingItem = cart.find(item => item.name === productName);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: productName,
                    price: price,
                    quantity: 1
                });
            }
            
            updateCartDisplay();
            showNotification(`${productName} berhasil ditambahkan ke cart!`);
        }

        function removeFromCart(productName) {
            cart = cart.filter(item => item.name !== productName);
            updateCartDisplay();
            showNotification(`${productName} dihapus dari cart!`);
        }

        function updateQuantity(productName, change) {
            const item = cart.find(item => item.name === productName);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(productName);
                    return;
                }
                updateCartDisplay();
            }
        }

        function updateCartDisplay() {
            const cartCount = document.getElementById('cart-count');
            const cartItems = document.getElementById('cart-items');
            const cartTotalElement = document.getElementById('cart-total');
            
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            cartCount.textContent = totalItems;
            cartTotalElement.textContent = `Total: Rp ${cartTotal.toLocaleString('id-ID')}`;
            
            cartItems.innerHTML = '';
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div>
                        <strong>${item.name}</strong><br>
                        <small>Rp ${item.price.toLocaleString('id-ID')} x ${item.quantity}</small>
                    </div>
                    <div>
                        <button onclick="updateQuantity('${item.name}', -1)" style="background: #ff4757; color: white; border: none; padding: 0.2rem 0.5rem; border-radius: 5px; margin: 0 0.2rem; cursor: pointer;">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity('${item.name}', 1)" style="background: #2d5a27; color: white; border: none; padding: 0.2rem 0.5rem; border-radius: 5px; margin: 0 0.2rem; cursor: pointer;">+</button>
                        <button onclick="removeFromCart('${item.name}')" style="background: #ff4757; color: white; border: none; padding: 0.2rem 0.5rem; border-radius: 5px; margin-left: 0.5rem; cursor: pointer;">Remove</button>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });

            if (cart.length === 0) {
                cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Cart kosong</p>';
            }
        }

        function toggleCart() {
            const cartModal = document.getElementById('cartModal');
            cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
        }

        function checkout() {
            if (cart.length === 0) {
                showNotification('Cart kosong! Silakan tambahkan produk terlebih dahulu.');
                return;
            }
            
            showNotification(`Terima kasih! Pesanan senilai Rp ${cartTotal.toLocaleString('id-ID')} sedang diproses.`);
            cart = [];
            updateCartDisplay();
            toggleCart();
        }

        function showNotification(message) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Contact form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simulate form submission
            showNotification(`Terima kasih ${name}! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.`);
            
            // Reset form
            this.reset();
        });

        // Close modal when clicking outside
        document.getElementById('cartModal').addEventListener('click', function(e) {
            if (e.target === this) {
                toggleCart();
            }
        });

        // Initialize
        updateCartDisplay();