const prefixes = {
	api: 'api/',
	auth: 'auth/',
}

const requestPrefix = ''; // might be used for proxy requests

const urlsWithoutPrefix = {
	todo: `${prefixes.api}todos/`,
	user: `${prefixes.auth}users/`,
	jwt: `${prefixes.auth}jwt/`,
};

export const urls = {} as typeof urlsWithoutPrefix;

Object.keys(urlsWithoutPrefix).forEach((key) => {
	urls[key as keyof typeof urlsWithoutPrefix] = requestPrefix + urlsWithoutPrefix[key as keyof typeof urlsWithoutPrefix];
});