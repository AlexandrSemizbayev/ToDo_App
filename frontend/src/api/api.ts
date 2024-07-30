import axios from "axios";
import { v4 as uuidV4, v1 as uuidV1 } from 'uuid';
import { urls } from './urls';
import {deserializeToDo, serializeToDo, serializeToDos} from "../serializers/ToDo.ts";

declare module 'axios' { /* eslint-disable  @typescript-eslint/no-explicit-any */
	export interface AxiosInstance {
		request<T = any> (config: AxiosRequestConfig): Promise<T>;
		get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
		delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
		head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
		post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
		put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
		patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
	}
}

let requestCount = 10;

const api = axios.create({
	baseURL: `/request/`,
	timeout: 30_000,
	headers: {},
});

api.interceptors.request.use(async function (config) {
	if(requestCount < 0) {return config}
	requestCount--;
	let allowFallback = true;
	const { url } = config;
	const ignoreAuthFallbackUrls = [
		urls.user,
		urls.jwt,
	]
	ignoreAuthFallbackUrls.forEach((urlToBeIgnored) => {
		const isMatch = (url||'').match(urlToBeIgnored as string);
		if(isMatch) {
			allowFallback = false;
		}
	});
	if(allowFallback) {
		const user = localStorage.getItem('user');
		if (!user) {
			await createUser();
		}
		const token = JSON.parse(sessionStorage.getItem('token') || '{}').access;
		if (token) {
			config.headers['Authorization'] = `Token ${token}`;
		} else {
			await createToken().then(() => {
				config.headers['Authorization'] = `Token ${JSON.parse(sessionStorage.getItem('token') || '{}').access}`;
			});
		}
	}
	return config;
}, function (error) {
	return Promise.reject(error);
});

api.interceptors.response.use(function (response) {
	return response.data;
}, function (error) {
	return Promise.reject(error);
});

export const createUser = () => {
	const data = {
		username: uuidV4(),
		password: uuidV1(),
	};
	return api.post(urls.user, data).then((response) => {
		window.localStorage.setItem('user', JSON.stringify([response.username, data.password]));
		return createToken();
	})
}
export const createToken = () => {
	const userCredentials = JSON.parse(window.localStorage.getItem('user') || '[]');
	const data = {
		username: userCredentials[0],
		password: userCredentials[1],
	}
	return api.post(`${urls.jwt}create/`, data).then((response) => {
		sessionStorage.setItem('token', JSON.stringify(response));
	}).catch((err) => {
		console.error(err);
	})
}

export const refreshToken = () => {
	const JWT = JSON.parse(sessionStorage.getItem('token') || '{}');
	const { refresh, access } = JWT;
	if(!refresh || !access) {
		return createToken();
	} else {
		return verifyToken(access).then(() => api
			.post(`${urls.jwt}refresh`, { refresh }).then((response) => {
				sessionStorage.setItem('token', JSON.stringify(response));
			})
		).catch(createToken);
	}
}

export const verifyToken = (token: string) => {
	return api.post(`${urls.jwt}verify`, {token})
}

export const deleteToken = () => {

}

export const getTodos = () => {
	return api.get(urls.todo).then((response: IToDoRaw[]) => serializeToDos(response))
}

export const createTodo = (task: IToDoSer) => {
	const deserializedTask: IToDoRaw = deserializeToDo(task);
	return api.post(urls.todo, deserializedTask).then((response) => {
		return serializeToDo(response);
	})
}

export const updateTodo = (task: IToDoSer) => {
	const deserializedTask: IToDoRaw = deserializeToDo(task);
	return api.put(`${urls.todo}${task.id}`, deserializedTask).then((response) => {
		return serializeToDo(response);
	})
}

export const deleteTodo = (id: number) => {
	return api.delete(`${urls.todo}${id}`);
}
