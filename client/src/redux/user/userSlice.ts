import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SearchNameState {
	value: string;
}

export interface GenderState {
	value: string;
}

export interface DomainState {
	value: string;
}

export interface AvailableState {
	value: string;
}

export interface TeamCreateState {
	value: boolean;
}

export interface UserIdState {
	value: string[];
}

interface User {
	_id: string;
	avatar: string;
	available: boolean;
	domain: string;
	email: string;
	first_name: string;
	last_name: string;
	gender: string;
}

export interface UserState {
	users: User[];
}

const initialStateSearch: SearchNameState = {
	value: '',
};
const initialStateGender: GenderState = {
	value: '',
};

const initialStateDomain: DomainState = {
	value: '',
};

const initialStateAvailable: AvailableState = {
	value: '',
};

const initialStateTeamCreate: TeamCreateState = {
	value: false,
};

const initialStateUserId: UserIdState = {
	value: [],
};

const initialUserState: UserState = {
	users: [],
};

export const searchNameSlice = createSlice({
	name: 'searchName',
	initialState: initialStateSearch,
	reducers: {
		setSearchName: (state, action: PayloadAction<string>) => {
			state.value = action.payload;
		},
	},
});

export const genderSlice = createSlice({
	name: 'gender',
	initialState: initialStateGender,
	reducers: {
		setGender: (state, action: PayloadAction<string>) => {
			state.value = action.payload;
		},
	},
});

export const domainSlice = createSlice({
	name: 'domain',
	initialState: initialStateDomain,
	reducers: {
		setDomain: (state, action: PayloadAction<string>) => {
			state.value = action.payload;
		},
	},
});

export const availableSlice = createSlice({
	name: 'available',
	initialState: initialStateAvailable,
	reducers: {
		setAvailable: (state, action: PayloadAction<string>) => {
			state.value = action.payload;
		},
	},
});

export const teamCreateSlice = createSlice({
	name: 'teamCreate',
	initialState: initialStateTeamCreate,
	reducers: {
		setTeamCreate: (state, action: PayloadAction<boolean>) => {
			state.value = action.payload;
		},
	},
});

export const userIdSlice = createSlice({
	name: 'userId',
	initialState: initialStateUserId,
	reducers: {
		setUserId: (state, action: PayloadAction<string[]>) => {
			state.value = action.payload;
		},
	},
});

export const userSlice = createSlice({
	name: 'user',
	initialState: initialUserState,
	reducers: {
		setUsers: (state, action: PayloadAction<User[]>) => {
			state.users = action.payload;
		},
	},
});

export const { setSearchName: setSearchNameAction } = searchNameSlice.actions;

export const { setGender: setGenderAction } = genderSlice.actions;

export const { setDomain: setDomainAction } = domainSlice.actions;

export const { setAvailable: setAvailableAction } = availableSlice.actions;

export const { setTeamCreate: setTeamCreateAction } = teamCreateSlice.actions;

export const { setUserId: setUserIdAction } = userIdSlice.actions;

export const { setUsers: setUsersAction } = userSlice.actions;

export const searchNameReducer = searchNameSlice.reducer;
export const genderReducer = genderSlice.reducer;
export const domainReducer = domainSlice.reducer;
export const availableReducer = availableSlice.reducer;
export const teamCreateReducer = teamCreateSlice.reducer;
export const userIdReducer = userIdSlice.reducer;
export const userReducer = userSlice.reducer;
