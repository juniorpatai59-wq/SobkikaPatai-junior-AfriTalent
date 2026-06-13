window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNavbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const btnDarkMode= document.getElementById('btn-darkmode');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    if (btnDarkMode) btnDarkMode.innerHTML = '<i class="bi bi-sun-fill"></i>';
} 

if (btnDarkMode) {
    btnDarkMode.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            btnDarkMode.innerHTML = '<i class="bi bi-sun-fill"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            btnDarkMode.innerHTML = '<i class="bi bi-moon-fill"></i>';
        }
    });
}

const btnTop = document.getElementById('btn-top');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        btnTop.style.display = 'flex';
    } else {
        btnTop.style.display = 'none';
    }
});

if (btnTop) {
    btnTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth'});
    });
}



const compteurs = document.querySelectorAll('.compteur');

const observateurCompteurs = IntersectionObserver(function(entries) {
    entries.forEach(function(entry){
        if (entry.isIntersecting) {
            const el = entry.target;
            const cible = parseInt(el.getAttibute('data-cible'));
            let comptCourant = 0;
            const increment = Math.ceil(cible / 100);

            const intervalle = setInterval(function(){
                comptCourant += increment;
                if (comptCourant >= cible) {
                    el.textContent = '+' + cible.toLocaleString();
                    clearInterval(intervalle);
                } else {
                    el.textContent = '+' + comptCourant.toLocaleString();
                }
            }, 20);

            observateurCompteurs.unobserve(el);
        }
    });    
});

compteurs.forEach(function(compteur) {
    observateurCompteurs.observe(compteur);
});


const sections = document.querySelectorAll('section');

sections.forEach(function(section) {
    section.classList.add('fade-init');
});


const observateurSections = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-visible');
            observateurSections.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

sections.forEach(function(section){
    observateurSections.observe(section);
});