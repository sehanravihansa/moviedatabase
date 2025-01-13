const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved 'darkMode' in localStorage
const darkMode = localStorage.getItem('darkMode');

if (darkMode === 'enabled') {
    body.classList.add('dark-mode'); // Add dark mode class if previously enabled
}

// Event listener for the toggle button
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode'); // Toggle dark mode class
    
    // Save the current preference to localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
});
