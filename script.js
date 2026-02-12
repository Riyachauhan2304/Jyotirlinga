const jyotirlingas = [
    { name: 'Somnath Jyotirlinga', file: 'somnath.html', location: 'Gujarat' },
    { name: 'Mallikarjuna Jyotirlinga', file: 'mallikarjuna.html', location: 'Andhra Pradesh' },
    { name: 'Mahakaleshwar Jyotirlinga', file: 'mahakaleshwar.html', location: 'Madhya Pradesh' },
    { name: 'Omkareshwar Jyotirlinga', file: 'omkareshwar.html', location: 'Madhya Pradesh' },
    { name: 'Kedarnath Jyotirlinga', file: 'kedarnath.html', location: 'Uttarakhand' },
    { name: 'Bhimashankar Jyotirlinga', file: 'bhimashankar.html', location: 'Maharashtra' },
    { name: 'Kashi Vishwanath Jyotirlinga', file: 'kashi_vishwanath.html', location: 'Uttar Pradesh' },
    { name: 'Trimbakeshwar Jyotirlinga', file: 'trimbakeshwar.html', location: 'Maharashtra' },
    { name: 'Vaidyanath Jyotirlinga', file: 'vaidyanath.html', location: 'Jharkhand' },
    { name: 'Nageshwar Jyotirlinga', file: 'nageshwar.html', location: 'Gujarat' },
    { name: 'Rameshwar Jyotirlinga', file: 'rameshwar.html', location: 'Tamil Nadu' },
    { name: 'Grishneshwar Jyotirlinga', file: 'grishneshwar.html', location: 'Maharashtra' }
];

let visitCount = 0;

document.addEventListener('DOMContentLoaded', function() {
    initializeVisitCounter();
    
    const grid = document.getElementById('jyotirlingasGrid');
    if (grid) {
        renderCards();
        initializeSearch();
    }
});

function renderCards() {
    const grid = document.getElementById('jyotirlingasGrid');
    grid.innerHTML = '';

    jyotirlingas.forEach((jyotirlinga) => {
        const card = document.createElement('div');
        card.className = 'jyotirlinga-card';
        card.innerHTML = `
            <img src="images/${jyotirlinga.file.replace('.html', '.jpg')}" alt="${jyotirlinga.name}" class="card-image" loading="lazy">
            <div class="card-content">
                <h3 class="card-title">${jyotirlinga.name}</h3>
                <p class="card-description">Location: ${jyotirlinga.location}</p>
            </div>
        `;
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            recordVisit();
            window.location.href = jyotirlinga.file;
        });
        grid.appendChild(card);
    });
}

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchDropdown = document.getElementById('searchDropdown');

    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();

        if (query.length === 0) {
            searchDropdown.style.display = 'none';
            return;
        }

        const filtered = jyotirlingas.filter(j => j.name.toLowerCase().includes(query));

        if (filtered.length === 0) {
            searchDropdown.style.display = 'none';
            return;
        }

        searchDropdown.innerHTML = '';
        filtered.forEach(j => {
            const item = document.createElement('div');
            item.className = 'search-item';
            item.textContent = j.name;
            item.addEventListener('click', () => {
                recordVisit();
                window.location.href = j.file;
            });
            searchDropdown.appendChild(item);
        });

        searchDropdown.style.display = 'block';
    });

    document.addEventListener('click', function(e) {
        if (e.target !== searchInput && e.target !== searchDropdown) {
            searchDropdown.style.display = 'none';
        }
    });

    searchInput.addEventListener('focus', function() {
        if (searchInput.value.length > 0) {
            searchDropdown.style.display = 'block';
        }
    });
}

function initializeVisitCounter() {
    visitCount = parseInt(localStorage.getItem('visitCount') || 0);
    updateVisitDisplay();
}

function recordVisit() {
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    updateVisitDisplay();
    console.log('[v0] Visit recorded. Total visits:', visitCount);
}

function updateVisitDisplay() {
    const visitCountElement = document.getElementById('visitCount');
    if (visitCountElement) {
        visitCountElement.textContent = visitCount;
    }
}
