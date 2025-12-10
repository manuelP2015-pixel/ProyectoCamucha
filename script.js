// ----------------------------------------------------
// Inicialización
// ----------------------------------------------------
// Inicializar Lucide Icons
lucide.createIcons();

// ----------------------------------------------------
// 1. DATA: Base de Datos de Productos
// ----------------------------------------------------
const products = [
    { id: 1, name: 'Azúcar Rubia (Kg)', price: 4.50, category: 'abarrotes', stock: 15, imageUrl: 'https://placehold.co/150x150/e9f5e9/101010?text=Azúcar', isFeatured: true },
    { id: 2, name: 'Gaseosa Naranja (2 Litros)', price: 7.00, category: 'bebidas', stock: 20, imageUrl: 'https://placehold.co/150x150/e9f5e9/101010?text=Gaseosa', isFeatured: true },
    { id: 3, name: 'Detergente Ropa (Litro)', price: 15.90, category: 'limpieza', stock: 8, imageUrl: 'https://placehold.co/150x150/e9f5e9/101010?text=Detergente', isFeatured: true },
    { id: 4, name: 'Papas Fritas Clásicas (Grande)', price: 3.50, category: 'snacks', stock: 30, imageUrl: 'https://placehold.co/150x150/e9f5e9/101010?text=Papas', isFeatured: true },
    { id: 5, name: 'Aceite de Girasol (Litro)', price: 9.90, category: 'abarrotes', stock: 12, imageUrl: 'https://placehold.co/150x150/e9f5e9/101010?text=Aceite', isFeatured: false },
    { id: 6, name: 'Yogurt Vainilla (Pack 4)', price: 12.50, category: 'lacteos', stock: 15, imageUrl: 'https://placehold.co/150x150/e9f5e9/101010?text=Yogurt', isFeatured: false },
    { id: 7, name: 'Leche Fresca (Caja)', price: 5.80, category: 'lacteos', stock: 25, imageUrl: 'https://placehold.co/150x150/e9f5e9/101010?text=Leche', isFeatured: false },
    { id: 8, name: 'Cerveza Lager (Pack 6 Und.)', price: 32.00, category: 'bebidas', stock: 5, imageUrl: 'https://placehold.co/150x150/e9f5e9/101010?text=Cerveza', isFeatured: false },
    { id: 9, name: 'Jabón Líquido Manos', price: 8.50, category: 'limpieza', stock: 18, imageUrl: 'https://placehold.co/150x150/e9f5e9/101010?text=Jabón', isFeatured: false },
    { id: 10, name: 'Barritas de Cereal (Pack)', price: 9.00, category: 'snacks', stock: 40, imageUrl: 'https://placehold.co/150x150/e9f5e9/101010?text=Barritas', isFeatured: false },
    { id: 11, name: 'Arroz Superior (Kg)', price: 3.90, category: 'abarrotes', stock: 35, imageUrl: 'https://placehold.co/150x150/e9f5e9/101010?text=Arroz', isFeatured: false },
];

let cart = JSON.parse(localStorage.getItem('camuchaCart')) || []; // Carrito persistente
let currentFilter = 'all';

// ----------------------------------------------------
// 2. UTILIDADES DE UI (Toast de Alerta)
// ----------------------------------------------------

function showAlert(message) {
    const toast = document.getElementById('toastMessage');
    toast.textContent = message;
    // Mostrar
    toast.classList.remove('translate-x-full');
    toast.classList.add('translate-x-0');

    // Ocultar después de 3 segundos
    setTimeout(() => {
        toast.classList.remove('translate-x-0');
        toast.classList.add('translate-x-full');
    }, 3000);
}

// ----------------------------------------------------
// 3. RENDERIZADO DE PRODUCTOS
// ----------------------------------------------------

function renderProducts(productList, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = ''; 

    productList.forEach(product => {
        const stockText = product.stock > 0
            ? `<span class="text-sm font-semibold text-green-600 flex items-center"><i data-lucide="check-circle" class="w-4 h-4 mr-1"></i> Stock: ${product.stock}</span>`
            : `<span class="text-sm font-semibold text-red-600 flex items-center"><i data-lucide="x-circle" class="w-4 h-4 mr-1"></i> Agotado</span>`;

        const productElement = document.createElement('div');
        productElement.className = 'card-product';
        productElement.dataset.category = product.category;
        productElement.dataset.name = product.name.toLowerCase();
        productElement.innerHTML = `
            <div>
                <img src="${product.imageUrl}" alt="${product.name}" class="w-full h-32 object-contain mb-4 rounded-lg">
                <h3 class="text-lg font-bold text-gray-900 mb-1 truncate">${product.name}</h3>
                <p class="text-2xl font-extrabold text-camucha-accent mb-2">S/ ${product.price.toFixed(2)}</p>
            </div>
            <div>
                <p>${stockText}</p>
                <button onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''} class="mt-3 w-full bg-camucha-accent text-white px-4 py-2 rounded-lg font-semibold hover:bg-camucha-dark transition duration-300 ${product.stock === 0 ? 'opacity-50 cursor-not-allowed bg-gray-400 hover:bg-gray-400' : ''}">
                    <i data-lucide="plus" class="w-4 h-4 inline mr-1"></i> Agregar al carrito
                </button>
            </div>
        `;
        container.appendChild(productElement);
    });

    // Volver a renderizar iconos
    lucide.createIcons();
}

// ----------------------------------------------------
// 4. LÓGICA DE FILTRADO Y BÚSQUEDA
// ----------------------------------------------------

function filterCategory(category, button) {
    currentFilter = category;
    const searchInput = document.getElementById('searchInput');
    searchInput.value = ''; // Limpiar búsqueda al cambiar categoría
    
    // Actualizar estilo de los botones de categoría (para saber cuál está activo)
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('bg-camucha-accent', 'text-white');
        btn.classList.add('bg-gray-200', 'hover:bg-camucha-accent', 'hover:text-white');
    });
    // Solo si el botón fue pasado (es decir, no es llamada desde init o search)
    if (button) {
        button.classList.remove('bg-gray-200', 'hover:bg-camucha-accent', 'hover:text-white');
        button.classList.add('bg-camucha-accent', 'text-white');
    }

    applyFilters();
}

function filterProducts() {
    // Función llamada por el input de búsqueda
    applyFilters();
}

function applyFilters() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const productCards = document.querySelectorAll('.card-product'); // Seleccionar todas las tarjetas
    
    productCards.forEach(card => {
        const categoryMatch = currentFilter === 'all' || card.dataset.category === currentFilter;
        const nameMatch = card.dataset.name.includes(query);
        
        // Mostrar si coincide con ambos filtros
        card.style.display = (categoryMatch && nameMatch) ? 'flex' : 'none';
    });
}


// ----------------------------------------------------
// 5. LÓGICA DEL CARRITO (Agregar, Cambiar Cantidad, Eliminar)
// ----------------------------------------------------

function saveCart() {
    localStorage.setItem('camuchaCart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const cartCountElement = document.getElementById('cartCount');
    let total = 0;

    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center text-gray-500 py-10">El carrito está vacío. ¡Añade productos!</p>';
        cartCountElement.textContent = 0;
        cartTotalElement.textContent = 'S/ 0.00';
        return;
    }

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return; 

        const subtotal = item.quantity * product.price;
        total += subtotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'flex items-center space-x-4 p-3 bg-gray-50 rounded-lg shadow-sm';
        itemElement.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}" class="w-12 h-12 object-contain rounded-md border border-gray-200">
            <div class="flex-grow">
                <h4 class="font-semibold text-gray-900 truncate">${product.name}</h4>
                <p class="text-sm text-gray-500">S/ ${product.price.toFixed(2)} c/u</p>
            </div>
            
            <div class="flex items-center space-x-2">
                <button onclick="changeQuantity(${item.id}, -1)" class="p-1 border rounded-md hover:bg-gray-200" aria-label="Disminuir Cantidad">
                    <i data-lucide="minus" class="w-4 h-4"></i>
                </button>
                <span class="font-medium w-6 text-center">${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, 1)" class="p-1 border rounded-md hover:bg-gray-200" aria-label="Aumentar Cantidad">
                    <i data-lucide="plus" class="w-4 h-4"></i>
                </button>
            </div>

            <span class="font-bold text-lg w-20 text-right">S/ ${subtotal.toFixed(2)}</span>

            <button onclick="removeFromCart(${item.id})" class="p-1 text-red-500 hover:text-red-700 transition" aria-label="Eliminar Producto">
                <i data-lucide="trash-2" class="w-5 h-5"></i>
            </button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    cartTotalElement.textContent = `S/ ${total.toFixed(2)}`;
    cartCountElement.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);

    lucide.createIcons();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock <= 0) {
        showAlert('Producto agotado o no encontrado.');
        return;
    }

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity += 1;
            showAlert(`Se agregó una unidad más de ${product.name}.`);
        } else {
            showAlert(`No hay suficiente stock de ${product.name}. Stock máximo: ${product.stock}`);
            return;
        }
    } else {
        cart.push({ id: productId, quantity: 1 });
        showAlert(`¡${product.name} agregado al carrito!`);
    }

    saveCart();
    updateCartUI();
}

function changeQuantity(productId, delta) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex === -1) return;

    const item = cart[itemIndex];
    const product = products.find(p => p.id === productId);

    const newQuantity = item.quantity + delta;

    if (newQuantity <= 0) {
        cart.splice(itemIndex, 1);
        showAlert(`Producto eliminado del carrito.`);
    } else if (newQuantity > product.stock) {
        showAlert(`Máximo de stock alcanzado (${product.stock} unidades).`);
        return;
    } else {
        item.quantity = newQuantity;
        showAlert(`Cantidad de ${product.name} actualizada a ${newQuantity}.`);
    }

    saveCart();
    updateCartUI();
}

function removeFromCart(productId) {
    const product = products.find(p => p.id === productId);
    cart = cart.filter(item => item.id !== productId);
    showAlert(`"${product.name}" eliminado del carrito.`);
    saveCart();
    updateCartUI();
}

// ----------------------------------------------------
// 6. LÓGICA DE CHECKOUT Y MODAL
// ----------------------------------------------------

function checkout() {
    if (cart.length === 0) {
        showAlert('Tu carrito está vacío. ¡Añade productos para comprar!');
        return;
    }
    // Simulación de proceso de pago
    showAlert(`¡Pedido Finalizado! Total: ${document.getElementById('cartTotal').textContent}. Nos comunicaremos pronto para confirmar el envío.`);
    
    // Vaciar carrito
    cart = [];
    saveCart();
    updateCartUI();
    
    // Cerrar modal
    document.getElementById('cartModal').classList.remove('active');
}

// Manejo del Modal (Abrir/Cerrar Carrito)
document.getElementById('openCartBtn').addEventListener('click', () => {
    document.getElementById('cartModal').classList.add('active');
    updateCartUI(); 
});

document.getElementById('closeCartBtn').addEventListener('click', () => {
    document.getElementById('cartModal').classList.remove('active');
});

// Cerrar modal al hacer clic fuera del contenido (en el overlay)
document.getElementById('cartModal').addEventListener('click', (e) => {
    if (e.target.id === 'cartModal') {
        document.getElementById('cartModal').classList.remove('active');
    }
});


// ----------------------------------------------------
// Inicialización al cargar el documento
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Cargar destacados y catálogo
    const featured = products.filter(p => p.isFeatured);
    renderProducts(featured, 'featuredProducts');
    renderProducts(products, 'productGrid');
    updateCartUI(); 
    
    // Configurar el botón 'Todas' como activo al inicio
    const allButton = document.querySelector('.category-btn[onclick="filterCategory(\'all\', this)"]');
    if (allButton) {
        allButton.classList.remove('bg-gray-200', 'hover:bg-camucha-accent', 'hover:text-white');
        allButton.classList.add('bg-camucha-accent', 'text-white');
    }
});