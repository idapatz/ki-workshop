document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript geladen');
    // Progress-Anzeige initialisieren
    const steps = document.querySelectorAll('.progress-step');
    const nextButton = document.getElementById('continue-btn');
    const backButton = document.getElementById('back-btn');
    let currentStep = 0;

    // Progress-Anzeige: "Weiter"-Button
    if (nextButton && steps) {
        nextButton.addEventListener('click', () => {
            if (currentStep < steps.length - 1) {
                steps[currentStep].classList.add('active'); // Aktuellen Schritt markieren
                currentStep++;
                steps[currentStep].classList.add('active'); // Nächsten Schritt aktivieren
                console.log(`Fortschritt: Schritt ${currentStep + 1} von ${steps.length}`);
                
                // Weiterleitung zur nächsten Frage (z. B. Frage2.html)
                window.location.href = `Frage${currentStep + 1}.html`;
            }
        });
    }

    // Progress-Anzeige: "Zurück"-Button
    if (backButton && steps) {
        backButton.addEventListener('click', () => {
            if (currentStep > 0) {
                steps[currentStep].classList.remove('active'); // Aktuellen Schritt deaktivieren
                currentStep--;
                console.log(`Fortschritt: Schritt ${currentStep + 1} von ${steps.length}`);
                
                // Zur vorherigen Frage (z. B. Frage1.html)
                window.location.href = `Frage${currentStep + 1}.html`;
            }
        });
    }

    // Modal-Elemente initialisieren
    const modal = document.getElementById('registerModal');
    const loginModal = document.getElementById('loginModal'); // Neuen Modal für Login hinzufügen
    const registerButton = document.querySelector('.btn-green');
    const closeButton = document.querySelector('.close');
    const loginButton = document.querySelector('.btn-outline'); // Login-Button hinzufügen

    if (modal && registerButton && closeButton && loginButton && loginModal) {
        // Modal öffnen, wenn der Registrierungsbutton angeklickt wird
        registerButton.onclick = function() {
            modal.style.display = 'flex'; // Flex verwenden, um das Modal korrekt darzustellen
        };

        // Modal öffnen, wenn der Login-Button angeklickt wird
        loginButton.onclick = function() {
            loginModal.style.display = 'flex'; // Login Modal anzeigen
        };

        // Modal schließen, wenn das "x" angeklickt wird
        closeButton.onclick = function() {
            modal.style.display = 'none';
        };

        // Schließen-Button für Login
        const closeLoginModal = document.querySelector('.close-login');
        if (closeLoginModal) {
            closeLoginModal.onclick = function() {
                loginModal.style.display = 'none';
            };
        }

        // Modal schließen, wenn außerhalb des Modals geklickt wird
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            } else if (event.target === loginModal) {
                loginModal.style.display = 'none'; // Login Modal schließen
            }
        };
    } else {
        console.error('Modal oder Buttons nicht gefunden');
    }
});

// Funktion für die Registrierung
function registerUser() {
    const email = document.getElementById('modalEmail').value; // Korrigierte ID für das E-Mail-Feld
    const password = document.getElementById('modalPassword').value; // Korrigierte ID für das Passwort-Feld

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('User registered successfully: ' + user.email);
            closeModal();
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert('Error: ' + errorMessage);
        });
}

// Funktion für den Login
function loginUser() {
    const email = document.getElementById('loginEmail').value; // ID für das E-Mail-Feld im Login-Modal
    const password = document.getElementById('loginPassword').value; // ID für das Passwort-Feld im Login-Modal

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('Erfolgreich angemeldet: ' + user.email);
            window.location.href = 'dashboard.html'; // Weiterleitung zum Dashboard
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert('Fehler: ' + errorMessage);
        });
}

// Funktion für Kurs Feedback
document.getElementById('submit-btn').addEventListener('click', function () {
    const selectedOption = document.querySelector('input[name="definition"]:checked');
    const feedback = document.getElementById('feedback');

    if (selectedOption) {
        if (selectedOption.value === 'correct') {
            feedback.textContent = '🎉 Richtig! Gut gemacht!';
            feedback.style.color = 'green';
        } else {
            feedback.textContent = '❌ Falsch. Bitte versuche es erneut.';
            feedback.style.color = 'red';
        }
        feedback.classList.remove('hidden');
    } else {
        alert('Bitte wähle eine Option aus!');
    }
});
