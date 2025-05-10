document.addEventListener('DOMContentLoaded', function () {
    const auctionsGrid = document.querySelector('.auctions-grid');

    // Datos de ejemplo de subastas
    const auctions = [
        {
            name: 'Rolex Submariner',
            description: 'Reloj de lujo con resistencia al agua y diseño clásico.',
            image: 'https://via.placeholder.com/300',
            price: '$10,000',
            age: '5 años',
            condition: 'Excelente',
            material: 'Acero inoxidable y oro',
            color: 'Negro y dorado',
            details: 'Incluye caja original y certificado de autenticidad.',
            link: 'detalle.html?product=rolex'
        },
        {
            name: 'iPhone 15',
            description: 'El último smartphone de Apple con tecnología avanzada.',
            image: 'https://via.placeholder.com/300',
            price: '$1,200',
            age: '1 año',
            condition: 'Como nuevo',
            material: 'Vidrio y aluminio',
            color: 'Negro',
            details: 'Incluye cargador y auriculares originales.',
            link: 'detalle.html?product=iphone'
        },
        {
            name: 'Chaqueta Polo Ralph Lauren',
            description: 'Chaqueta de alta calidad en color beige.',
            image: 'https://via.placeholder.com/300',
            price: '$150',
            age: '2 años',
            condition: 'Muy bueno',
            material: 'Algodón y poliéster',
            color: 'Beige',
            details: 'Ideal para ocasiones formales o informales.',
            link: 'detalle.html?product=chaqueta'
        }
    ];

    // Cargar subastas en la cuadrícula
    auctions.forEach(auction => {
        const auctionCard = document.createElement('div');
        auctionCard.className = 'auction-card';
        auctionCard.innerHTML = `
            <img src="${auction.image}" alt="${auction.name}">
            <div class="auction-info">
                <h3 class="auction-title">${auction.name}</h3>
                <p class="auction-description">${auction.description}</p>
                <p class="auction-price">${auction.price}</p>
            </div>
        `;
        auctionCard.addEventListener('click', () => {
            window.location.href = auction.link;
        });
        auctionsGrid.appendChild(auctionCard);
    });

    // Cargar detalles del producto en la página de detalle
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get('product');

    if (product) {
        const selectedAuction = auctions.find(auction => auction.link.includes(product));
        if (selectedAuction) {
            document.getElementById('auction-image').src = selectedAuction.image;
            document.getElementById('auction-title').textContent = selectedAuction.name;
            document.getElementById('auction-description').textContent = selectedAuction.description;
            document.getElementById('auction-price').textContent = selectedAuction.price;
            document.getElementById('auction-age').textContent = selectedAuction.age;
            document.getElementById('auction-condition').textContent = selectedAuction.condition;
            document.getElementById('auction-material').textContent = selectedAuction.material;
            document.getElementById('auction-color').textContent = selectedAuction.color;
            document.getElementById('auction-details').textContent = selectedAuction.details;
        }
    }
});