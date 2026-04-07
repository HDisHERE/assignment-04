// List of pages with titles and URLs
const pages = [
    { title: 'Home', url: 'index.html' },
    { title: 'About Us', url: 'about.html' },
    { title: 'Log In', url: 'login.html' },
    { title: 'Review', url: 'review.html' },
    { title: 'Ancient Civilizations', url: 'ancient.html' },
    { title: 'Renaissance & Early Modern', url: 'renaissance.html' },
    { title: 'Industrial Revolution', url: 'industrial.html' },
    { title: 'World Wars', url: 'world-wars.html' }
];

document.addEventListener('DOMContentLoaded', function() {
    // Find the header inner container
    const headerInner = document.querySelector('.header-inner');
    if (!headerInner) return;

    // Create search container
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" id="search-input" placeholder="Search pages...">
        <div id="search-results"></div>
    `;

    // Insert search container before the nav
    const nav = headerInner.querySelector('.main-nav');
    if (nav) {
        headerInner.insertBefore(searchContainer, nav);
    } else {
        headerInner.appendChild(searchContainer);
    }

    // Get references to search elements
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    // Handle input event
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        searchResults.innerHTML = '';

        if (query.length === 0) {
            return;
        }

        // Filter pages that match the query
        const matches = pages.filter(page =>
            page.title.toLowerCase().includes(query)
        );

        // Display matches
        if (matches.length > 0) {
            matches.forEach(page => {
                const link = document.createElement('a');
                link.href = page.url;
                link.textContent = page.title;
                searchResults.appendChild(link);
            });
        } else {
            searchResults.innerHTML = '<div>No matches found</div>';
        }
    });

    // Hide results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchContainer.contains(e.target)) {
            searchResults.innerHTML = '';
        }
    });

     // Handle link clicks for fade out transition
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href]');
        if (
            link &&
            link.href.startsWith(window.location.origin) &&
            !link.hasAttribute('download') &&
            !link.getAttribute('target')
        ) {
            e.preventDefault();
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = link.href;
            }, 300);
        }
    });
});
