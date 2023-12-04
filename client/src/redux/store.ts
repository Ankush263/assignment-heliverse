import { configureStore } from '@reduxjs/toolkit';
import {
	searchNameReducer,
	genderReducer,
	domainReducer,
	availableReducer,
	teamCreateReducer,
	userIdReducer,
	userReducer,
} from './user/userSlice';

export const store = configureStore({
	reducer: {
		searchName: searchNameReducer,
		gender: genderReducer,
		domain: domainReducer,
		available: availableReducer,
		teamcreate: teamCreateReducer,
		userId: userIdReducer,
		user: userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
