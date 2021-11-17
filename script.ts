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

// fetch data from api
const apiURL = 'https://api.github.com/users/';
type UserInfo = {
	name: string | null;
	avatar_url: string;
	html_url: string;
	repos_url: string;
	company: string | null;
	location: string | null;
	bio: string | null;
	twitter_username: string | null;
	public_repos: number;
	followers: number;
	following: number;
	created_at: string;
	email: string | null;
	blog: string | null;
	login: string;
};

interface HttpResponse<T> extends Response {
	parseBody?: T;
}

const NOTAVAILABLE = 'Not Avaivable';

const input = document.querySelector('input') as HTMLInputElement;
const form = document.querySelector('form') as HTMLFormElement;
const card = document.querySelector('.card') as HTMLElement;
const nameElement = document.querySelector('.name') as HTMLAnchorElement;
const avitarElement = document.querySelector('.avatar img') as HTMLImageElement;
const emailElement = document.querySelector('.email') as HTMLAnchorElement;
const joinDateElement = document.querySelector('.join-date') as HTMLElement;
const errorMessage = document.querySelector('.error-message') as HTMLElement;
const bioElement = document.querySelector('.bio') as HTMLElement;
const reposElement = document.querySelector('.repos a') as HTMLAnchorElement;
const followersElement = document.querySelector(
	'.followers a'
) as HTMLAnchorElement;
const followingElement = document.querySelector(
	'.following a'
) as HTMLAnchorElement;
const locationElement = document.querySelector(
	'.location a'
) as HTMLAnchorElement;
const blogElement = document.querySelector('.blog a') as HTMLAnchorElement;
const twitterElement = document.querySelector(
	'.twitter a'
) as HTMLAnchorElement;
const companyElement = document.querySelector(
	'.company a'
) as HTMLAnchorElement;

form?.addEventListener('submit', async (event: Event) => {
	event.preventDefault();
	const userName = input.value;
	if (userName === '') return;

	const response = await fetch(apiURL + userName);

	if (!response.ok) {
		errorMessage.style.display = 'initial';
		input.addEventListener('focus', () => {
			errorMessage.style.display = 'none';
		});
		return;
	}

	const data: UserInfo = await response.json();

	const {
		name,
		email,
		avatar_url,
		created_at,
		bio,
		followers,
		following,
		public_repos,
		location,
		blog,
		twitter_username,
		company,
		login,
	} = data;

	// update name element
	if (name) {
		nameElement!.textContent = name;
		nameElement!.classList.remove('isDisabled');
	} else {
		nameElement!.textContent = login;
		nameElement!.classList.remove('isDisabled');
	}
	nameElement.href = `https://github.com/${login}`;
	// update avitar
	avitarElement.src = avatar_url;
	// update email
	if (email) {
		emailElement.classList.remove('isDisabled');
		emailElement.textContent = email;
		emailElement.href = email;
	} else {
		emailElement.textContent = `@${NOTAVAILABLE}`;
		emailElement.classList.add('isDisabled');
	}
	// update join date
	joinDateElement.textContent = `Joined ${new Date(created_at)
		.toLocaleDateString('en-US', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
		})
		.replace(',', '')}
		`;

	//update bio
	if (bio) {
		bioElement.textContent = bio;
		nameElement!.classList.remove('isDisabled');
	} else {
		bioElement.textContent = NOTAVAILABLE;
		bioElement.classList.add('isDisabled');
	}

	// update Stats
	reposElement.textContent = `${public_repos}`;
	reposElement.href = `https://github.com/${login}?tab=repositories`;
	followersElement.textContent = `${followers}`;
	followersElement.href = `https://github.com/${login}?tab=followers`;
	followingElement.textContent = `${following}`;
	followingElement.href = `https://github.com/${login}?tab=followings`;

	// update location
	if (location) {
		locationElement.textContent = location;
		locationElement.classList.remove('isDisabled');
	} else {
		locationElement.textContent = NOTAVAILABLE;
		locationElement.classList.add('isDisabled');
	}
	if (blog) {
		blogElement.textContent = blog;
		blogElement.href = blog;
		blogElement.classList.remove('isDisabled');
	} else {
		blogElement.textContent = NOTAVAILABLE;
		blogElement.classList.add('isDisabled');
	}
	if (twitter_username) {
		twitterElement.textContent = twitter_username;
		twitterElement.classList.remove('isDisabled');
		twitterElement.href = `https://twitter.com/${twitter_username}`;
	} else {
		twitterElement.textContent = NOTAVAILABLE;
		twitterElement.classList.add('isDisabled');
	}
	if (company) {
		companyElement.textContent = company;
		companyElement.classList.remove('isDisabled');
	} else {
		companyElement.textContent = NOTAVAILABLE;
		companyElement.classList.add('isDisabled');
	}

	// clear input
	input.value = '';
});
