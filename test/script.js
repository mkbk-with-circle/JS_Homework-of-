document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        item.addEventListener('mouseover', () => {
            const color = item.getAttribute('data-color');
            item.style.setProperty('--hover-color', color);
        });

        item.addEventListener('mouseout', () => {
            item.style.setProperty('--hover-color', '#ddd');
        });
    });
});
