import axios from 'axios';

// const URL = `http://localhost:8000`;
const URL = `https://heliverse-server-crnu.onrender.com`;

const USER_URL = `${URL}/api/users`;
const TEAM_URL = `${URL}/api/team`;

const USER_API = axios.create({ baseURL: USER_URL });
const TEAM_API = axios.create({ baseURL: TEAM_URL });

export const getUsers = () => USER_API.get('/');

export const searchUsers = (name: string) =>
	USER_API.get(`/search?first_name=${name}`);

export const searchUsersWithPage = (name: string, page: number) =>
	USER_API.get(`/search?first_name=${name}&page=${page}`);

export const getUsersByPage = (page: number) => USER_API.get(`?page=${page}`);

export const userByFilters = (
	gender: string,
	available: boolean | string,
	domain: string
) => USER_API.get(`?gender=${gender}&available=${available}&domain=${domain}`);

export const createTeam = (
	name: string,
	description: string,
	userIds: string[]
) => TEAM_API.post('/', { name, description, userIds });

export const getTeams = () => TEAM_API.get('/');

export const deleteTeam = (_id: string) => TEAM_API.delete(`/${_id}`);

export const getTeam = (_id: string) => TEAM_API.get(`/${_id}`);
