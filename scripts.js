document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript geladen');
    // Hier kann später der Code für das Quiz hinzugefügt werden
});
// Modal-Elemente auswählen
const modal = document.getElementById('registerModal');
const registerButton = document.querySelector('.btn-green');
const closeButton = document.querySelector('.close');

// Modal öffnen, wenn der Registrierungsbutton angeklickt wird
registerButton.onclick = function() {
    modal.style.display = 'block';
}

// Modal schließen, wenn das "x" angeklickt wird
closeButton.onclick = function() {
    modal.style.display = 'none';
}

// Modal schließen, wenn außerhalb des Modals geklickt wird
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
