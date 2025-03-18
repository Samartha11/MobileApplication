// Book data
const books = [
    {
        id: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 12.99,
        category: "classics",
        rating: 4.8,
        image: "mockingbird.jpg" 
    },
    {
        id: 2,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 10.95,
        category: "classics",
        rating: 4.5,
        image: "gatsby.jpg"
    },
    {
        id: 3,
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        price: 15.99,
        category: "non-fiction",
        rating: 4.7,
        image: "humankind.jpg"
    },
    {
        id: 4,
        title: "The Midnight Library",
        author: "Matt Haig",
        price: 14.50,
        category: "fiction",
        rating: 4.2,
        image: "library.jpg"
    },
    {
        id: 5,
        title: "Atomic Habits",
        author: "James Clear",
        price: 13.75,
        category: "non-fiction",
        rating: 4.9,
        image: "atomichabits.jpg"
    },
    {
        id: 6,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        price: 11.99,
        category: "fiction",
        rating: 4.3,
        image: "silentparadise.jpg"
    },
    {
        id: 7,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        price: 9.99,
        category: "classics",
        rating: 4.7,
        image: "proud.jpg"
    },
    {
        id: 8,
        title: "Educated",
        author: "Tara Westover",
        price: 16.20,
        category: "non-fiction",
        rating: 4.6,
        image: "library.jpg"
    }
];

// DOM Elements
const booksContainer = document.getElementById('books-container');
const filterButtons = document.querySelectorAll('.filter-btn');

// Functions
function displayBooks(category = 'all') {
    booksContainer.innerHTML = '';
    
    const filteredBooks = category === 'all' 
        ? books 
        : books.filter(book => book.category === category);
    
    filteredBooks.forEach(book => {
        const bookElement = createBookElement(book);
        booksContainer.appendChild(bookElement);
    });
}

function createBookElement(book) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    
    // Generate stars based on rating
    const ratingStars = generateRatingStars(book.rating);
    
    bookCard.innerHTML = `
        <div class="book-image">
            <img src="${book.image}" alt="${book.title}">
            <span class="book-category">${book.category}</span>
        </div>
        <div class="book-info">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">by ${book.author}</p>
            <span class="book-price">$${book.price.toFixed(2)}</span>
            <div class="book-rating">${ratingStars}</div>
            <div class="book-actions">
                <button class="details-btn">View Details</button>
                <button class="wishlist-btn"><i class="far fa-heart"></i></button>
            </div>
        </div>
    `;
    
    return bookCard;
}

function generateRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Add half star if needed
    if (halfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return `${starsHTML} <span>(${rating})</span>`;
}

// Event Listeners
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter books
        const category = button.getAttribute('data-filter');
        displayBooks(category);
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayBooks();
    
    // Add click event to dynamically created buttons
    booksContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('details-btn')) {
            alert('Book details functionality would go here!');
        } else if (e.target.classList.contains('wishlist-btn') || e.target.parentElement.classList.contains('wishlist-btn')) {
            const wishlistBtn = e.target.classList.contains('wishlist-btn') ? e.target : e.target.parentElement;
            const icon = wishlistBtn.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.replace('far', 'fas');
                icon.classList.add('text-red');
            } else {
                icon.classList.replace('fas', 'far');
                icon.classList.remove('text-red');
            }
        }
    });
});