document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;

    const galleryItems = [
        { src: 'https://picsum.photos/id/10/800/600', sub: 'Cyber Security Conference 2024' },
        { src: 'https://picsum.photos/id/24/800/1200', sub: 'My Homelab Setup' },
        { src: 'https://picsum.photos/id/42/1200/800', sub: 'CTF Event Screenshot' },
        { src: 'https://picsum.photos/id/54/800/800', sub: 'Code on Screen' },
        { src: 'https://picsum.photos/id/68/1200/900', sub: 'Network Diagram' },
        { src: 'https://picsum.photos/id/75/800/600', sub: 'Another Code Snippet' },
        { src: 'https://picsum.photos/id/88/900/1200', sub: 'Server Rack' },
        { src: 'https://picsum.photos/id/99/1200/800', sub: 'Defcon Swag' }
    ];

    // 1. Create and append gallery items to the DOM
    galleryItems.forEach(item => {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';

        const link = document.createElement('a');
        link.href = item.src;
        link.setAttribute('data-sub-html', `<h4>${item.sub}</h4>`);

        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.sub;
        img.loading = 'lazy';

        link.appendChild(img);
        gridItem.appendChild(link);
        galleryGrid.appendChild(gridItem);
    });

    // 2. Initialize Lightgallery
    const lg = lightGallery(galleryGrid, {
        selector: '.grid-item > a',
        speed: 500,
        download: false
    });

    // 3. Initialize Masonry after images are loaded
    // We need to use imagesLoaded library for robustness, but for now, a simple window.onload will work as a fallback.
    window.onload = () => {
        const msnry = new Masonry(galleryGrid, {
            itemSelector: '.grid-item',
            percentPosition: true
        });

        // In case lightGallery is somehow initialized before masonry is done, refresh it.
        // This is a bit of a failsafe.
        setTimeout(() => {
            lg.refresh();
        }, 500);
    };
});
