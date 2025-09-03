document.addEventListener('DOMContentLoaded', () => {
    // Fetch the JSON file from the main directory
    fetch('products.json')
        .then(response => {
            // Check if the network request was successful
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(products => {
            const productContainer = document.querySelector('.row.g-3');
            
            // Clear any existing content in the container
            productContainer.innerHTML = '';

            // Loop through each product in the JSON data
            products.forEach(product => {
                // Create a new div for the product card
                const productCard = document.createElement('div');
                productCard.className = 'col-lg-3';
                
                // Get the path to the second image from the JSON data, which serves as the preview image
                // for the main product list.
                const previewImage = product.images[1];
                
                // Use a template literal to insert dynamic data into the HTML structure
                productCard.innerHTML = `
                    <div class="reels" style="background-image: url('${previewImage}');">
                        <div class="glass">
                            <h3>${product.name}</h3>
                            <p>${product.description.substring(0, 80)}...</p>
                            <a href="product-page.html?id=${product.id}" style="color: white;">read more</a>
                        </div>
                    </div>
                `;
                
                // Append the created card to the product container
                productContainer.appendChild(productCard);
            });
        })
        .catch(error => {
            // Log any errors that occur during the fetch process
            console.error('Error fetching products:', error);
            // Optionally, display a user-friendly error message on the page
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Failed to load products. Please try again later.';
            document.querySelector('.row.g-3').appendChild(errorMessage);
        });
});