document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('preferences-form');
    const categorySelect = document.getElementById('category');
    const priceMinInput = document.getElementById('price-min');
    const priceMaxInput = document.getElementById('price-max');
    const recommendationsList = document.getElementById('recommendations-list');

    // Dados fictícios de produtos com preços variados
    const products = [
        // Frutas
        { name: 'Maçã', category: 'fruta', price: 3.00 },
        { name: 'Banana', category: 'fruta', price: 2.50 },
        { name: 'Laranja', category: 'fruta', price: 4.00 },

        // Legumes
        { name: 'Cenoura', category: 'legume', price: 1.50 },
        { name: 'Batata', category: 'legume', price: 2.00 },
        { name: 'Brócolis', category: 'legume', price: 3.50 },

        // Cereais
        { name: 'Arroz', category: 'cereal', price: 5.00 },
        { name: 'Aveia', category: 'cereal', price: 4.00 },
        { name: 'Milho', category: 'cereal', price: 3.50 }
    ];

    function renderRecommendations(recommendations) {
        recommendationsList.innerHTML = '';
        if (recommendations.length === 0) {
            recommendationsList.innerHTML = '<li>Nenhuma recomendação encontrada.</li>';
        } else {
            recommendations.forEach(product => {
                const li = document.createElement('li');
                li.className = 'recommendation-item';
                li.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>Categoria: ${product.category}</p>
                    <p>Preço: R$${product.price.toFixed(2)}</p>
                `;
                recommendationsList.appendChild(li);
            });
        }
    }

    function getRecommendations(category, priceMin, priceMax) {
        return products.filter(product => {
            return (!category || product.category === category) &&
                   (!priceMin || product.price >= priceMin) &&
                   (!priceMax || product.price <= priceMax);
        });
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const category = categorySelect.value;
        const priceMin = parseFloat(priceMinInput.value) || 0;
        const priceMax = parseFloat(priceMaxInput.value) || Infinity;

        const recommendations = getRecommendations(category, priceMin, priceMax);
        renderRecommendations(recommendations);
    });
});
