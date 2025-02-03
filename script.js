// Function to move the No button
function moveButton() {
    const noButton = document.getElementById('noButton');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Calculate safe boundaries (keeping button fully visible)
    const maxX = windowWidth - noButton.offsetWidth - 20;
    const maxY = windowHeight - noButton.offsetHeight - 20;
    
    // Generate random position within viewport
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    // Apply new position using fixed positioning
    noButton.style.position = 'fixed';
    noButton.style.left = Math.max(20, Math.min(maxX, newX)) + 'px';
    noButton.style.top = Math.max(20, Math.min(maxY, newY)) + 'px';
    noButton.style.zIndex = '1000';
}

function nextPage() {
    window.location.href = "yes.html";
}

// Function to check if element is in the center of the viewport
function isElementInCenter(entry) {
    const windowHeight = window.innerHeight;
    const elementRect = entry.target.getBoundingClientRect();
    const elementCenter = elementRect.top + elementRect.height / 2;
    const windowCenter = windowHeight / 2;
    
    // Define a range for what we consider "center" (smaller range = more precise center)
    const centerThreshold = windowHeight * 0.15; // 15% of window height
    
    return Math.abs(elementCenter - windowCenter) < centerThreshold;
}

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: Array.from({ length: 21 }, (_, i) => i * 0.05) // More precise tracking of visibility
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && isElementInCenter(entry)) {
            if (!entry.target.classList.contains('show-text')) {
                entry.target.classList.add('show-text');
                // Set a timeout to remove the text after 3 seconds
                setTimeout(() => {
                    if (!isElementInCenter(entry)) {
                        entry.target.classList.remove('show-text');
                    }
                }, 3000);
            }
        } else {
            entry.target.classList.remove('show-text');
        }
    });
}, observerOptions);

// Observe all memory items
document.addEventListener('DOMContentLoaded', () => {
    const memoryItems = document.querySelectorAll('.memory-item');
    memoryItems.forEach(item => observer.observe(item));
    
    // Add scroll event listener for more precise center detection
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            memoryItems.forEach(item => {
                const entry = { target: item, isIntersecting: true };
                if (isElementInCenter(entry)) {
                    item.classList.add('show-text');
                } else {
                    item.classList.remove('show-text');
                }
            });
        }, 50); // Small delay for performance
    });
});
