async function initPushNotifications() {
    // Requests permissions
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return;

    // Registers the Service Worker
    const registration = await navigator.serviceWorker.register('/static/sw.js');

    // Subscribes the user to Push Notifications
    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: '<Your Public VAPID Key>' // Use Web Push key here
    });

    // Sends subscription to server
    await fetch('/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
    });
}

// Initializes push notifications on page load
document.addEventListener('DOMContentLoaded', initPushNotifications);

document.getElementById("alertsBox").addEventListener("click", function() {
    // Trigger the alerts function when the box is clicked
    fetchAlerts();
});

function fetchAlerts() {
    fetch('/trigger-notification', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            // Display the alert data to the user
            alert(data.message || "New alert received!");
        })
        .catch(error => console.error("Error fetching alerts:", error));
}
