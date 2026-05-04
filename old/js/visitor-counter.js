function initVisitorCounter() {
    const visitorCountElement = document.getElementById('visitorCount');
    if (!visitorCountElement) return;

    let visitorCount = localStorage.getItem('roomRentVisitorCount');

    if (visitorCount === null) {
        visitorCount = 0;
    } else {
        visitorCount = parseInt(visitorCount);
    }

    const sessionId = sessionStorage.getItem('roomRentSessionId');

    if (!sessionId) {
        visitorCount++;
        localStorage.setItem('roomRentVisitorCount', visitorCount);

        const newSessionId = 'session_' + Date.now() + '_' + Math.random();
        sessionStorage.setItem('roomRentSessionId', newSessionId);

        console.log('New visitor detected! Total visitors: ' + visitorCount);
    }

    visitorCountElement.textContent = visitorCount;

    visitorCountElement.classList.remove('pulse-animation');
    void visitorCountElement.offsetWidth;
    visitorCountElement.classList.add('pulse-animation');
}

document.addEventListener('DOMContentLoaded', initVisitorCounter);