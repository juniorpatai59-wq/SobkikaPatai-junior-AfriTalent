window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNavbar');
    
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
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
    if (btnTop) {
        if (window.scrollY > 300) {
            btnTop.style.display = 'flex';
        } else {
            btnTop.style.display = 'none';
        }
    }
});

if (btnTop) {
    btnTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth'});
    });
}



const compteurs = document.querySelectorAll('.compteur');

const observateurCompteurs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry){
        if (entry.isIntersecting) {
            const el = entry.target;
            const cible = parseInt(el.getAttribute('data-cible'));
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


const boutionsFiltres = document.querySelectorAll('.filtre-btn');
const cartesFreelances = document.querySelectorAll('.freelance-card');

boutionsFiltres.forEach(function (bouton) {

    bouton.addEventListener('click', function () {

        const filtre = bouton.getAttribute('data-filtre');

        boutionsFiltres.forEach(function (b) {
            b.classList.remove('actif');
        });

        bouton.classList.add('actif');

        cartesFreelances.forEach(function (carte) {

            if (filtre === 'tous') {
                carte.style.display = 'flex';
            }
            else if (carte.getAttribute('data-categorie') === filtre) {
                carte.style.display = 'flex';
            }
            else {
                carte.style.display = 'none';
            }

        });

    });

});



const formulaire = document.getElementById('contactForm');

if (formulaire) {
    formulaire.addEventListener('submit', function(e){
        e.preventDefault();

        const nom = document.getElementById('nom').value.trim();
        const prenom = document.getElementById('prenom').value.trim();
        const email = document.getElementById('email').value.trim();
        const sujet = document.getElementById('sujet').value;
        const message = document.getElementById('message').value.trim();


        document.getElementById('errorNom').textContent = '';
        document.getElementById('errorPrenom').textContent = '';
        document.getElementById('errorEmail').textContent = '';
        document.getElementById('errorSujet').textContent = '';
        document.getElementById('errorMessage').textContent = '';


        document.getElementById('nom').style.borderColor = '';
        document.getElementById('prenom').style.borderColor = '';
        document.getElementById('email').style.borderColor = '';
        document.getElementById('sujet').style.borderColor = '';
        document.getElementById('message').style.borderColor = '';

        let valide = true;


        if (nom === '') {
            document.getElementById('errorNom').textContent = 'Le nom est obligatoire.';
            document.getElementById('nom').style.borderColor = 'red';
            valide = false;
        } else {
            document.getElementById('nom').style.borderColor = 'green';
        }



        if (prenom === '') {
            document.getElementById('errorPrenom').textContent = 'Le prénom est obligatoire.';
            document.getElementById('prenom').style.borderColor = 'red';
            valide = false;
        } else {
            document.getElementById('prenom').style.borderColor = 'green';
        }


        
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            document.getElementById('errorEmail').textContent = 'L\'email est obligatoire.';
            document.getElementById('email').style.borderColor = 'red';
            valide = false;
        } else if (!regexEmail.test(email)) {
            document.getElementById('errorEmail').textContent = 'Veuillez saisir une adresse email valide.';
            document.getElementById('email').style.borderColor = 'red'; 
            valide = false;
        } else {
            document.getElementById('email').style.borderColor = 'green';
        }



        if (sujet ==='') {
            document.getElementById('errorSujet').textContent = 'Veuillez choisir un sujet.';
            document.getElementById('sujet').style.borderColor = 'red';
            valide = false;
        } else {
            document.getElementById('sujet').style.borderColor = 'green';
        }



        if (message === '') {
            document.getElementById('errorMessage').textContent = 'Le message est obligatoire.';
            document.getElementById('message').style.borderColor = 'red';
            valide = false;
        } else if (message.length < 20) {
            document.getElementById('errorMessage').textContent = 'Le message doit contenir au moins 20 caractères.';
            document.getElementById('message').style.borderColor = 'red';
            valide = false;
        } else {
            document.getElementById('message').style.borderColor = 'green';
        }



        if (valide) {
            document.getElementById('successMessage').style.display = 'block';
            formulaire.reset();


            document.getElementById('nom').style.borderColor = '';
            document.getElementById('prenom').style.borderColor = '';
            document.getElementById('email').style.borderColor = '';
            document.getElementById('sujet').style.borderColor = '';
            document.getElementById('message').style.borderColor = '';
        }
    });
}