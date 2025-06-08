export const Type = {
    LOSE: 'error',
    SUCCESS: 'success'
};

export function showNotification(message, notificationType) {
    let existing = document.querySelector('.notification');
    if (existing) existing.remove(); // remove any existing popup

    const popup = document.createElement('div');
    popup.className = 'notification';
    popup.textContent = message;

    let bgColor = '#2196F3'; // default info
    if (notificationType === 'error') bgColor = '#FF2D00';
    if (notificationType === 'success') bgColor = '#00FF41';

    Object.assign(popup.style, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: bgColor,
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        border: '2px solid white',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        zIndex: '1000',
        fontSize: 'clamp(14px, 2vw, 18px)', // responsive font size
        maxWidth: '90%',
        width: 'fit-content',
        textAlign: 'center',
        wordBreak: 'break-word',
        transition: 'opacity 0.4s ease',
        opacity: '1'
    });

    // Fade-in effect
    popup.style.opacity = '0';
    document.body.appendChild(popup);
    requestAnimationFrame(() => popup.style.opacity = '1');

    // Auto-fade-out
    setTimeout(() => {
        popup.style.opacity = '0';
        setTimeout(() => popup.remove(), 400);
    }, 3000);
}
