document.addEventListener('DOMContentLoaded', () => {
    if ('Notification' in window && navigator.serviceWorker) {
        Notification.requestPermission().then(function(permission) {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
            } else {
                console.log('Notification permission denied.');
            }
        });
    }
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(function(error) {
            console.log('Service Worker registration failed:', error);
        });
}

function startTimer(duration) {
    let timer = duration, minutes, seconds;

    const interval = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        console.log(minutes + ':' + seconds);

        if (--timer < 0) {
            clearInterval(interval);
            showNotification('Timer Ended', 'Your timer has finished.');
        }
    }, 1000);
}

function showNotification(title, body) {
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, {
                body: body,
                icon: 'icons/icon-192x192.png',
                badge: 'icons/icon-72x72.png'
            });
        });
    }
}

document.getElementById('startTimer').addEventListener('click', () => {
    startTimer(10); // Starts a timer for 10 seconds
});
