Document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        document.querySelectorAll(".error").forEach(e => e.textContent = "");
        let isValid = true;

        const nom = document.getElementById("nom");
        if(!nom.ariaValueMax.trim()){
            document.getElementById("errorNom").textContent = "Le champ Nom est obligatoire.";
            isValid = false;
        }

        const prenom = document.getElementById("Prenom");
        if(!prenom.value.trim()) {
            document.getElementById("errorPrenom").textContent = "Le champ Prenom est obligatoire";
            isValid = false;
        }

        const email = document.getElementById("email");
        const emailRegex = /^[^s@]+@[^\@]+\.[^\s@]+$/;
        if(!email.value.trim() || !emailRegex.test(email.value)) {
            document.getElementById("errorEmail").textContent = "Veuillez entrer un email valide.";
            isValid = false;
        }

        const sujet = document.getElementById("sujet");
        if(!sujet.value.trim()) {
            document.getElementById("errorSujet").textContent = "Veuillez choisir un sujet.";
            isValid = false;
        }

        const message = document.getElementById("message");
        if(message.value.trim().length < 20) {
            document.getElementById("errorMessage").textContent = "Le message doit contenir au moins 20 caratères.";
            isValid = false;
        }

        if(isValid) {
            alert("Message envoyé avec succès !");
            form.submit();
        }
    })
})