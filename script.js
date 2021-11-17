"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// toggle dark theme
var theme = document.querySelector('.theme');
theme.addEventListener('click', function () {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        theme.innerHTML = 'light <img src="./assets/icon-sun.svg" alt="sun"/>';
    }
    else {
        theme.innerHTML = 'dark <img src="./assets/icon-moon.svg" alt="moon"/>';
    }
});
// fetch data from api
var apiURL = 'https://api.github.com/users/';
var NOTAVAILABLE = 'Not Avaivable';
var input = document.querySelector('input');
var form = document.querySelector('form');
var card = document.querySelector('.card');
var nameElement = document.querySelector('.name');
var avitarElement = document.querySelector('.avatar img');
var emailElement = document.querySelector('.email');
var joinDateElement = document.querySelector('.join-date');
var errorMessage = document.querySelector('.error-message');
var bioElement = document.querySelector('.bio');
var reposElement = document.querySelector('.repos a');
var followersElement = document.querySelector('.followers a');
var followingElement = document.querySelector('.following a');
var locationElement = document.querySelector('.location a');
var blogElement = document.querySelector('.blog a');
var twitterElement = document.querySelector('.twitter a');
var companyElement = document.querySelector('.company a');
form === null || form === void 0 ? void 0 : form.addEventListener('submit', function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var userName, response, data, name, email, avatar_url, created_at, bio, followers, following, public_repos, location, blog, twitter_username, company, login;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                userName = input.value;
                if (userName === '')
                    return [2 /*return*/];
                return [4 /*yield*/, fetch(apiURL + userName)];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    errorMessage.style.display = 'initial';
                    input.addEventListener('focus', function () {
                        errorMessage.style.display = 'none';
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                name = data.name, email = data.email, avatar_url = data.avatar_url, created_at = data.created_at, bio = data.bio, followers = data.followers, following = data.following, public_repos = data.public_repos, location = data.location, blog = data.blog, twitter_username = data.twitter_username, company = data.company, login = data.login;
                // update name element
                if (name) {
                    nameElement.textContent = name;
                    nameElement.classList.remove('isDisabled');
                }
                else {
                    nameElement.textContent = login;
                    nameElement.classList.remove('isDisabled');
                }
                nameElement.href = "https://github.com/" + login;
                // update avitar
                avitarElement.src = avatar_url;
                // update email
                if (email) {
                    emailElement.classList.remove('isDisabled');
                    emailElement.textContent = email;
                    emailElement.href = email;
                }
                else {
                    emailElement.textContent = "@" + NOTAVAILABLE;
                    emailElement.classList.add('isDisabled');
                }
                // update join date
                joinDateElement.textContent = "Joined " + new Date(created_at)
                    .toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                })
                    .replace(',', '') + "\n\t\t";
                //update bio
                if (bio) {
                    bioElement.textContent = bio;
                    nameElement.classList.remove('isDisabled');
                }
                else {
                    bioElement.textContent = NOTAVAILABLE;
                    bioElement.classList.add('isDisabled');
                }
                // update Stats
                reposElement.textContent = "" + public_repos;
                reposElement.href = "https://github.com/" + login + "?tab=repositories";
                followersElement.textContent = "" + followers;
                followersElement.href = "https://github.com/" + login + "?tab=followers";
                followingElement.textContent = "" + following;
                followingElement.href = "https://github.com/" + login + "?tab=followings";
                // update location
                if (location) {
                    locationElement.textContent = location;
                    locationElement.classList.remove('isDisabled');
                }
                else {
                    locationElement.textContent = NOTAVAILABLE;
                    locationElement.classList.add('isDisabled');
                }
                if (blog) {
                    blogElement.textContent = blog;
                    blogElement.href = blog;
                    blogElement.classList.remove('isDisabled');
                }
                else {
                    blogElement.textContent = NOTAVAILABLE;
                    blogElement.classList.add('isDisabled');
                }
                if (twitter_username) {
                    twitterElement.textContent = twitter_username;
                    twitterElement.classList.remove('isDisabled');
                    twitterElement.href = "https://twitter.com/" + twitter_username;
                }
                else {
                    twitterElement.textContent = NOTAVAILABLE;
                    twitterElement.classList.add('isDisabled');
                }
                if (company) {
                    companyElement.textContent = company;
                    companyElement.classList.remove('isDisabled');
                }
                else {
                    companyElement.textContent = NOTAVAILABLE;
                    companyElement.classList.add('isDisabled');
                }
                // clear input
                input.value = '';
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=script.js.map