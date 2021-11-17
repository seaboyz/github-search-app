// toggle dark theme
const theme = document.querySelector('.theme') as HTMLElement;

theme.addEventListener('click', () => {
	document.body.classList.toggle('dark');
	if (document.body.classList.contains('dark')) {
		theme.innerHTML = 'light <img src="./assets/icon-sun.svg" alt="sun"/>';
	} else {
		theme.innerHTML = 'dark <img src="./assets/icon-moon.svg" alt="moon"/>';
	}
});
