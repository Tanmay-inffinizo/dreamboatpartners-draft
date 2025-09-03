document.addEventListener('DOMContentLoaded', async () => {
    const { search } = window.location;
    const urlParams = new URLSearchParams(search);
    const productId = urlParams.get('id');

    if (!productId) {
        console.error('No product ID found in the URL.');
        document.getElementById('product-name').textContent = 'Error: Product Not Found';
        document.getElementById('product-description').textContent = 'Please return to the main products page to select a product.';
        return;
    }

    try {
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const products = await response.json();
        const product = products.find(p => p.id === productId);

        if (!product || !product.images || product.images.length < 5) {
            console.error(`Product with ID "${productId}" not found or is missing required images.`);
            document.getElementById('product-name').textContent = 'Product Not Found';
            document.getElementById('product-description').textContent = 'The product you are looking for could not be found or has incomplete data.';
            return;
        }

        // Use a single query selector to get all required elements
        const elements = {
            banner: document.getElementById('banner'),
            productName: document.getElementById('product-name'),
            productSubtitle: document.getElementById('product-sub-title'),
            productDescription: document.getElementById('product-description'),
            productBreadcrumb: document.getElementById('product-breadcrumb'),
            additionalParagraph: document.getElementById('additional-paragraph'), // New
            keyPointersList: document.getElementById('key-pointers') // New
        };
        const galleryImages = document.querySelectorAll('.col-lg-3 img');
        
        // Populate the banner
        elements.banner.style.backgroundImage = `url('${product.images[0]}')`;
        elements.banner.style.backgroundSize = 'cover';
        elements.banner.style.backgroundPosition = 'center';

        // Populate text content
        elements.productName.textContent = product.name;
        elements.productSubtitle.textContent = product.subTitle;
        elements.productDescription.textContent = product.description;
        elements.productBreadcrumb.textContent = product.name;

        // Populate new content for additional paragraph and key pointers
        if (product.additionalParagraph) {
            elements.additionalParagraph.textContent = product.additionalParagraph;
        }
        
        if (product.keyPointers && Array.isArray(product.keyPointers)) {
            elements.keyPointersList.innerHTML = ''; // Clear existing list
            product.keyPointers.forEach(pointer => {
                const li = document.createElement('li');
                li.textContent = pointer;
                elements.keyPointersList.appendChild(li);
            });
        }

        // Populate the gallery images
        const galleryImageSources = product.images.slice(1, 5);
        galleryImages.forEach((imgElement, index) => {
            imgElement.src = galleryImageSources[index];
            imgElement.alt = `${product.name} - Gallery Image ${index + 1}`;
        });

    } catch (error) {
        console.error('Error fetching or parsing products.json:', error);
        document.getElementById('product-name').textContent = 'Error Loading Data';
        document.getElementById('product-description').textContent = 'An error occurred while trying to load product details.';
    }
});