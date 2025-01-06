

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
// Initialisiere die Progress-Bar und zeige die erste Frage
initializeProgressBar(questions.length);
showQuestion(currentQuestion);

// Quiz-Funktionen hinzufügen

// Funktion, um Antworten zu überprüfen
function antwortÜberprüfen(element, istRichtig) {
    // Entferne vorherige Animationen, falls vorhanden
    element.classList.remove('shake');

    if (istRichtig) {
        element.style.backgroundColor = '#737373';
        zeigeFeedback(true);
    } else {
        element.classList.add('shake'); // Falsche Antwort wackelt
    }
}

// Funktion, um Feedback anzuzeigen
function zeigeFeedback(istRichtig) {
    const feedback = document.getElementById('feedback');
    const feedbackText = document.getElementById('feedback-text');

    if (istRichtig) {
        feedbackText.textContent = '🎉 Richtig! KI imitiert menschliche Fähigkeiten und hilft, komplexe Aufgaben zu lösen.';
    }

    // Feedback-Bereich einblenden
    feedback.style.transform = 'translateY(0)';
}

// Funktion, um zum vorherigen Schritt zurückzukehren
function zurück() {
    const feedback = document.getElementById('feedback');

    // Feedback-Bereich ausblenden
    feedback.style.transform = 'translateY(100%)';
}

// Funktion, um zur nächsten Frage zu wechseln
function weiter() {
    alert('Weiter zur nächsten Frage!');
    // Hier kann weitere Logik für die nächste Frage implementiert werden
}

// Event-Listener für Hover-Effekte und Initialisierung
window.onload = function () {
    const answers = document.querySelectorAll('.answer');

    answers.forEach((answer) => {
        // Hover-Effekt hinzufügen
        answer.addEventListener('mouseover', () => {
            answer.style.backgroundColor = '#2a2a2a';
        });

        answer.addEventListener('mouseout', () => {
            answer.style.backgroundColor = '#1e1e1e';
        });
    });
};