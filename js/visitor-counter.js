// ===== Server-side Visitor Counter =====
function initVisitorCounter() {
    const visitorCountElement = document.getElementById('visitorCount');
    if (!visitorCountElement) return;

    fetch('api/visitor-counter.php', {
        method: 'GET',
        cache: 'no-store',
        credentials: 'same-origin'
    })
        .then(response => response.json())
        .then(data => {
            if (!data.success) return;

            visitorCountElement.textContent = data.count;

            visitorCountElement.classList.remove('pulse-animation');
            void visitorCountElement.offsetWidth;
            visitorCountElement.classList.add('pulse-animation');
        })
        .catch(error => {
            console.error('Visitor counter error:', error);
        });
}

document.addEventListener('DOMContentLoaded', initVisitorCounter);
