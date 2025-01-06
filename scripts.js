document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question'); // Alle Fragen finden
    const nextButton = document.getElementById('continue-btn');
    const backButton = document.getElementById('back-btn');
    let currentQuestion = 0; // Start bei der ersten Frage

    // Funktion, um die aktuelle Frage anzuzeigen
    function showQuestion(index) {
        questions.forEach((q, i) => {
            q.style.display = i === index ? 'block' : 'none'; // Nur die aktuelle Frage anzeigen
        });
    }

    // "Weiter"-Button
    nextButton.addEventListener('click', () => {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
        }
    });

    // "Zurück"-Button
    backButton.addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion(currentQuestion);
        }
    });

    // Zeige die erste Frage
    showQuestion(currentQuestion);
});

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


// Funktion zur Überprüfung der Antwort
function checkAnswer(element, isCorrect) {
    const feedback = document.getElementById('feedback');
    const feedbackText = document.getElementById('feedback-text');

    if (isCorrect) {
        element.classList.add('correct');
        feedbackText.textContent = '🎉 Richtig! KI imitiert menschliche Fähigkeiten und hilft, komplexe Aufgaben zu lösen.';
        feedback.classList.add('visible');
        enableNextButton();
    } else {
        element.classList.add('wrong');
        setTimeout(() => {
            element.classList.remove('wrong');
        }, 300);
    }
}

// Funktion zum Aktivieren des Weiter-Buttons
function enableNextButton() {
    const nextButton = document.querySelector('.btn.next');
    nextButton.disabled = false;
}

// Logik für den Zurück-Button
function goBack() {
    // Hier kannst du die Logik für das Zurückgehen implementieren
    alert('Zurück zur vorherigen Frage.');
}

// Logik für den Weiter-Button
function goNext() {
    // Hier kannst du die Logik für das Weitergehen implementieren
    alert('Weiter zur nächsten Frage.');
}

// Initialisierung der Progress-Bar
function initializeProgressBar(totalQuestions) {
    const progressBar = document.querySelector('.progress-bar');
    for (let i = 0; i < totalQuestions; i++) {
        const segment = document.createElement('div');
        segment.classList.add('segment');
        progressBar.appendChild(segment);
    }
}

// Funktion zum Aktualisieren der Progress-Bar
function updateProgressBar(currentQuestion) {
    const segments = document.querySelectorAll('.progress-bar .segment');
    segments.forEach((segment, index) => {
        if (index < currentQuestion) {
            segment.classList.add('completed');
        } else {
            segment.classList.remove('completed');
        }
    });
}

// Aufruf der Initialisierung (Beispiel mit 14 Fragen)
initializeProgressBar(14);


}
