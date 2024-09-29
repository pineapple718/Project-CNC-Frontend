document.addEventListener('DOMContentLoaded', () => {
    const avatar = document.getElementById('avatar');
    const popupMenu = document.getElementById('popupMenu');

    avatar.addEventListener('click', () => {
        popupMenu.style.display = popupMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Close the popup if clicked outside
    window.addEventListener('click', (event) => {
        if (!avatar.contains(event.target) && !popupMenu.contains(event.target)) {
            popupMenu.style.display = 'none';
        }
    });
});

