document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar & Menu Logic ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navbar = document.getElementById('navbar');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Dynamic Cafes Data ---
    const cafes = [
        {
            name: 'The Morning Brew',
            specialty: 'Artisanal Coffee & Fresh Pastries',
            image: 'the morning brew.avif',
            altText: 'A bright, modern cafe with people working on laptops.',
            vibe: 'Good for Work',
            location: 'New York, USA',
            hours: 'Mon-Fri: 7am-8pm',
            detailedDescription: 'The Morning Brew is a vibrant, sunlit space designed for productivity. With ample seating, reliable Wi-Fi, and plenty of outlets, it\'s the perfect spot for freelancers and students. Their single-origin espresso and fresh-baked croissants are a must-try.'
        },
        {
            name: 'The Reader\'s Nook',
            specialty: 'Specialty Teas & Scones',
            image: 'cozy cafe corner.avif',
            altText: 'A cozy cafe corner with a plush armchair and a bookshelf.',
            vibe: 'Cozy & Quiet',
            location: 'London, UK',
            hours: 'Tue-Sun: 9am-6pm',
            detailedDescription: 'Escape the city bustle at The Reader\'s Nook. Tucked away on a quiet street, this cafe is a haven of tranquility. With comfy armchairs, soft lighting, and a vast collection of books, it\'s the ideal place to unwind with a pot of specialty tea and a warm scone.'
        },
        {
            name: 'The Social Bean',
            specialty: 'Craft Espresso & Community Tables',
            image: 'A bustling cafe.jpg',
            altText: 'A bustling cafe with a long communal table filled with people chatting.',
            vibe: 'Bustling & Social',
            location: 'Sydney, Australia',
            hours: 'Mon-Sun: 8am-10pm',
            detailedDescription: 'The Social Bean is the heart of the neighborhood. Known for its lively atmosphere and large communal tables, it\'s the place to meet friends, old and new. Their expert baristas craft exceptional espresso drinks that fuel conversations all day long.'
        },
        {
            name: 'The Green Leaf',
            specialty: 'Organic Coffee & Vegan Bites',
            image: 'The Green Leaf.jpg',
            altText: 'A calm cafe interior filled with hanging plants and natural wood.',
            vibe: 'Cozy & Quiet',
            location: 'Kyoto, Japan',
            hours: 'Mon-Sat: 8am-7pm',
            detailedDescription: 'The Green Leaf combines minimalist design with a passion for organic, sustainable ingredients. It\'s a peaceful oasis perfect for quiet contemplation or a gentle start to your day. Enjoy their smooth pour-over coffee paired with a delicious vegan pastry.'
        }
    ];

    const cafesGrid = document.getElementById('cafes-grid');

    // --- Render Cafes ---
    function renderCafes(cafeArray) {
        cafesGrid.innerHTML = '';
        if (!cafeArray || cafeArray.length === 0) {
            cafesGrid.innerHTML = '<p class="no-results">No cafes match this vibe. Try another!</p>';
            return;
        }
        
        cafeArray.forEach(cafe => {
            const card = document.createElement('div');
            card.className = 'cafe-card';
            card.innerHTML = `
                <div class="image-container">
                    <img src="${cafe.image}" alt="${cafe.altText}" loading="lazy">
                </div>
                <div class="cafe-info">
                    <h4>${cafe.name}</h4>
                    <p>${cafe.location}</p>
                    <div class="vibe-badge">${cafe.vibe}</div>
                </div>
            `;
            
            card.addEventListener('click', () => {
                showCafeModal(cafe);
            });
            
            cafesGrid.appendChild(card);
        });
    }

    // --- Filter button logic ---
    const filterButtons = document.querySelectorAll('.filters .btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Manage active button style
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            const filter = e.target.dataset.filter;
            if (filter === 'all') {
                renderCafes(cafes);
            } else {
                const filteredCafes = cafes.filter(cafe => cafe.vibe === filter);
                renderCafes(filteredCafes);
            }
        });
    });

    // --- Modal Functionality ---
    const modal = document.getElementById('cafe-modal');
    const closeModal = document.getElementById('close-modal');
    
    function showCafeModal(cafe) {
        document.getElementById('modal-title').textContent = cafe.name;
        document.getElementById('modal-image').src = cafe.image;
        document.getElementById('modal-image').alt = cafe.altText;
        document.getElementById('modal-location').textContent = cafe.location;
        document.getElementById('modal-specialty').textContent = cafe.specialty;
        document.getElementById('modal-hours').textContent = cafe.hours;
        document.getElementById('modal-vibe').textContent = cafe.vibe;
        document.getElementById('modal-description').textContent = cafe.detailedDescription;
        
        modal.classList.add('active');
    }
    
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // --- Initial render ---
    renderCafes(cafes);
});