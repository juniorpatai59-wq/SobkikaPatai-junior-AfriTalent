// NAVBAR DYNAMIQUE AU SCROLL
// Modifie l'apparence de la barre de navigation losque l'utilisateur défile
window.addEventListener('scroll', function() {
    //Récupération de l'élément de la barre de navigation
    const navbar = document.getElementById('mainNavbar');

    //Vérificatioin de l'existence de la navbar pour éviter les erreurs
    if (navbar) {
        //Si l'utilisateur a défilé de plus de 50 pixels vers le bas
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');  //Ajout de la classe CSS pour modifier le style
        } else {
            navbar.classList.remove('scrolled');   //Retrait de la classe si on revient en haut
        }
    }
});

//GESTIOIN DU MODE SOMBRE (DARK MODE)
//Conservation de la préférence utilisateur grâce au localStorage
const btnDarkMode= document.getElementById('btn-darkmode');

//Vérification au chargement de la page si le mode sombre était déjà activé
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');  //Activation du mode sombre sur le body
    //Remplacement de l'icone par un soleil si le bouton existe
    if (btnDarkMode) btnDarkMode.innerHTML = '<i class="bi bi-sun-fill"></i>';
} 

//Gestion du clic sur le bouton de bascule (Toggle)
if (btnDarkMode) {
    btnDarkMode.addEventListener('click', function() {
        //Alterne la classe 'dark-mode': l'ajout si elle n'y est pas, la retire si elle y est
        document.body.classList.toggle('dark-mode');

        //Sauvegarde du choix de l'utilisateur dans stockage du navigateur(localStorage)
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');  //Enregistre la référence(sombre)
            btnDarkMode.innerHTML = '<i class="bi bi-sun-fill"></i>'; //Icone soleil
        } else {
            localStorage.setItem('theme', 'light');  //Enregistre la référence(lumineuse)
            btnDarkMode.innerHTML = '<i class="bi bi-moon-fill"></i>'; //Icone Lune
        }
    });
}


//BOUTON RETOUR EN HAUT(BACK TO TOP)
//Affichage conditionnel au scroll et retour fluide en haut de la page
const btnTop = document.getElementById('btn-top');

//Afficher ou masquer le bouton selon la position de scroll
window.addEventListener('scroll', function() {
    if (btnTop) {
        //Le bouton apparait si on a défilé de 300 pixels
        if (window.scrollY > 300) {
            btnTop.style.display = 'flex';
        } else {
            btnTop.style.display = 'none';
        }
    }
});

//Action de retour en haut lors di clic sur le bouton
if (btnTop) {
    btnTop.addEventListener('click', function() {
        //Fait défiler la page jusqu'en haut avec animation fluide
        window.scrollTo({ top: 0, behavior: 'smooth'});
    });
}


//COMPTEURS ANIMES AU SCROLL
//Déclenchement d'un compteur numérique progressif dès qu'il est visible à l'écran
const compteurs = document.querySelectorAll('.compteur');

// Création d'un observateur d'intersection pour détecter la visibilité des compteurs
const observateurCompteurs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry){
        //Si le compteur entre dans la zone visible de l'écran
        if (entry.isIntersecting) {
            const el = entry.target;
            //Récupération de la valeur finale définie dans l'attribut HTML(data-cible)
            const cible = parseInt(el.getAttribute('data-cible'));
            let comptCourant = 0;
            //Définition de l'incrément(ici 1% de la valeur cible à chaque étape)
            const increment = Math.ceil(cible / 100);

            //Création d'une fonction répétitive
            const intervalle = setInterval(function(){
                comptCourant += increment;

                //Si la cible est atteinte ou dépassée
                if (comptCourant >= cible) {
                    el.textContent = '+' + cible.toLocaleString();  //Affiche la valeur exact formatée
                    clearInterval(intervalle); //Arrêt de l'animation
                } else {
                    el.textContent = '+' + comptCourant.toLocaleString(); //Affichage de la valeurs intermédiaire
                }
            }, 20);

            //Important : On arrête d'observer cet élément pour ne pas relancer l'animation au prochain scroll
            observateurCompteurs.unobserve(el);
        }
    });    
});

//Activatioin de l'observateur sur chaque compteur trouvé dans la page
compteurs.forEach(function(compteur) {
    observateurCompteurs.observe(compteur);
});

//ANIMATION D'APPARITION DES SECTIONS
//Effet visuel d'apparition (Fade-in) progressive des sections lors du défilement
const sections = document.querySelectorAll('section');

//Initialisation :  on attribue à chaque section sa classe de départ cachée
sections.forEach(function(section) {
    section.classList.add('fade-init');
});

//Création de l'observateur pour l'apparition des sections
const observateurSections = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        //Dès qu'au moins 10% de la section est visible
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-visible');  //Classe CSS qui gère l'animation d'opacité
            observateurSections.unobserve(entry.target); //Désactivation de l'observation pour cette section
        }
    });
}, { threshold: 0.1 }); //Seuil de déclenchement: 10% de lélément visible

//Lancement de l'observation pour toutes les sections
sections.forEach(function(section){
    observateurSections.observe(section);
});

//FILTRAGE DYNAMIQUE DES FREELANCES
//Système de tri par catégorie sans rechargement de page
const boutionsFiltres = document.querySelectorAll('.filtre-btn');
const cartesFreelances = document.querySelectorAll('.freelance-card');

boutionsFiltres.forEach(function (bouton) {
    //Ecoute du clic sur chaque bouton de filtre
    bouton.addEventListener('click', function () {
        //Récupération de la categorie visée via l'attribut HTML(data-filtre)
        const filtre = bouton.getAttribute('data-filtre');

        //On retire la classe 'actif' de tous les boutons
        boutionsFiltres.forEach(function (b) {
            b.classList.remove('actif');
        });

        //Mise en avant du bouton sur lequel l'utilisateur vient de cliquer
        bouton.classList.add('actif');

        //Parcours de toutes les cartes de freelances pour appliquer le filtre
        cartesFreelances.forEach(function (carte) {
            //Cas 1: Si le filtre est 'tous', on affiche tout le monde
            if (filtre === 'tous') {
                carte.style.display = 'flex';
            }
            //Cas 2: Si la catégorie de la carte correspond au filtre sélectionné
            else if (carte.getAttribute('data-categorie') === filtre) {
                carte.style.display = 'flex';
            }
            //Cas 3: Si la carte ne correspond pas, on la masque
            else {
                carte.style.display = 'none';
            }

        });

    });

});


//VALIDATION DU FORMULAIRE DE CONTACT
//Vérification des données côté client avant envoi et gestion des messages d'erreurs
const formulaire = document.getElementById('contactForm');

if (formulaire) {
    formulaire.addEventListener('submit', function(e){
        e.preventDefault();  //Bloque le rechargement par défaut de la page lors de la soumission

        //Récupération des valeur saisies en retirant les espaces inutiles au début et à la fin
        const nom = document.getElementById('nom').value.trim();
        const prenom = document.getElementById('prenom').value.trim();
        const email = document.getElementById('email').value.trim();
        const sujet = document.getElementById('sujet').value;
        const message = document.getElementById('message').value.trim();

        //REINITIALISATION 1: on efface les anciens textes d'erreurs
        document.getElementById('errorNom').textContent = '';
        document.getElementById('errorPrenom').textContent = '';
        document.getElementById('errorEmail').textContent = '';
        document.getElementById('errorSujet').textContent = '';
        document.getElementById('errorMessage').textContent = '';

        //REINITIALISATION 2: on remet à zéro les bordures des champs
        document.getElementById('nom').style.borderColor = '';
        document.getElementById('prenom').style.borderColor = '';
        document.getElementById('email').style.borderColor = '';
        document.getElementById('sujet').style.borderColor = '';
        document.getElementById('message').style.borderColor = '';

        let valide = true;  //varriable témoin du statut du formulaire

        //Validation du Nom
        if (nom === '') {
            document.getElementById('errorNom').textContent = 'Le nom est obligatoire.';
            document.getElementById('nom').style.borderColor = 'red';
            valide = false;
        } else {
            document.getElementById('nom').style.borderColor = 'green';
        }

        //Validation du Prénom
        if (prenom === '') {
            document.getElementById('errorPrenom').textContent = 'Le prénom est obligatoire.';
            document.getElementById('prenom').style.borderColor = 'red';
            valide = false;
        } else {
            document.getElementById('prenom').style.borderColor = 'green';
        }

        //Validation de l'Email
        //Expression régulière (regex) pour valider une structure d'adresse email stantard
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

        //Validation du Sujet
        if (sujet ==='') {
            document.getElementById('errorSujet').textContent = 'Veuillez choisir un sujet.';
            document.getElementById('sujet').style.borderColor = 'red';
            valide = false;
        } else {
            document.getElementById('sujet').style.borderColor = 'green';
        }

        //Validation du Message
        if (message === '') {
            document.getElementById('errorMessage').textContent = 'Le message est obligatoire.';
            document.getElementById('message').style.borderColor = 'red';
            valide = false;
        } else if (message.length < 20) {
            //Contrainte de sécurité : minimum 20 caractères
            document.getElementById('errorMessage').textContent = 'Le message doit contenir au moins 20 caractères.';
            document.getElementById('message').style.borderColor = 'red';
            valide = false;
        } else {
            document.getElementById('message').style.borderColor = 'green';
        }

        //Traitement final si tout est valide
        if (valide) {
            //Affichage du bandeau de confirmation de réussite
            document.getElementById('successMessage').style.display = 'block';
            formulaire.reset(); //Vider tous les champs du formulaire

            //Nettoyage final  des bordures de validation(remise au style par défaut) 
            document.getElementById('nom').style.borderColor = '';
            document.getElementById('prenom').style.borderColor = '';
            document.getElementById('email').style.borderColor = '';
            document.getElementById('sujet').style.borderColor = '';
            document.getElementById('message').style.borderColor = '';
        }
    });
}