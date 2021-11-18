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

const input = document.querySelector('input') as HTMLInputElement;
const form = document.querySelector('form') as HTMLFormElement;
const card = document.querySelector('.card') as HTMLElement;
const errorMessage = document.querySelector('.error-message') as HTMLElement;

async function getUserInfo(userName: string): Promise<UserInfo> {
	const response = await fetch(apiURL + userName);
	return await response.json();
}

form?.addEventListener('submit', async (event: Event) => {
	event.preventDefault();
	const userName = input.value;
	// clear input
	input.value = '';

	try {
		const userInfo = await getUserInfo(userName);

		let {
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
		} = userInfo;

		card.innerHTML = `
					<div class="card__header">
						<div class="avatar">
							<img
								src="${avatar_url}
								alt="avatar"
							/>
						</div>

						<a target="_blank" href="https://github.com/${login}" class="name"
							>${name ? name : login}</a
						>
						<a target="_blank" class="email ${email ? '' : 'isDisabled'}">${
			email || 'Not available'
		}</a>
						<p class="join-date">Joined ${new Date(created_at)
							.toLocaleDateString('en-US', {
								day: 'numeric',
								month: 'short',
								year: 'numeric',
							})
							.replace(',', '')}</p>

						<p class="bio ${bio ? '' : 'isDisabled'}">
							${bio || 'Not available'}
						</p>
					</div>

					<div class="card__body">
						<div class="stats">
							<div class="repos">
								<h3>Repos</h3>
								<a href="https://github.com/${login}?tab=repositories" target="_blank">${public_repos}</a>
							</div>
							<div class="followers">
								<h3>Followers</h3>
								<a href="https://github.com/${login}?tab=followers" target="_blank">${followers}</a>
							</div>
							<div class="following">
								<h3>Following</h3>
								<a href="https://github.com/${login}?tab=followings" target="_blank">${following}</a>
							</div>
						</div>
					</div>

					<div class="card__footer">
						<div class="location">
							<i class="fas fa-map-marker-alt"></i>
							<a class="${location ? '' : 'isDisabled'}" >${location || 'Not available'}</a>
						</div>
						<div class="blog ${blog ? '' : 'isDisabled'}">
							<i class="fas fa-link"></i>
							<a target="_blank"  href="${blog || ''}">${blog || 'Not available'}</a>
						</div>
						<div class="twitter ${twitter_username ? '' : 'isDisabled'}">
							<i class="fab fa-twitter"></i>
							<a href="https://twitter.com/${twitter_username}" target="_blank" class="isDisabled">${
			twitter_username || 'Not available'
		}</a>
						</div>
						<div class="company ${company ? '' : 'isDisabled'}"">
							<i class="far fa-building"></i>
							<a>${company || 'Not available'}</a>
						</div>
					</div>
		`;
	} catch (error) {
		errorMessage.style.display = 'initial';
		input.addEventListener('focus', () => {
			errorMessage.style.display = 'none';
		});
		return;
	}
});
