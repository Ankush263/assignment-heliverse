import { Box, Flex, Pagination } from '@mantine/core';
import { getUsersByPage, searchUsers, userByFilters } from '../api';
import { useEffect, useCallback, useState } from 'react';
import NavComponents from './nav/NavComponents';
import UserCardComponent from './UserCardComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setUsersAction } from '../redux/user/userSlice';

function HomePage() {
	const [activePage, setActivePage] = useState<number>(1);

	const searchname = useSelector((state: RootState) => state.searchName.value);
	const gender = useSelector((state: RootState) => state.gender.value);
	const domain = useSelector((state: RootState) => state.domain.value);
	const available = useSelector((state: RootState) => state.available.value);

	const dispatch = useDispatch();

	const handleFilter = useCallback(async () => {
		try {
			const availableVal =
				available === 'Available'
					? true
					: available === 'Not Available'
					? false
					: '';
			const users = await userByFilters(gender, availableVal, domain);
			dispatch(setUsersAction(users.data.data.data));
		} catch (error) {
			console.log(error);
		}
	}, [available, dispatch, domain, gender]);

	useEffect(() => {
		handleFilter();
	}, [handleFilter]);

	const handleSearch = useCallback(async () => {
		try {
			const users = await searchUsers(searchname);
			dispatch(setUsersAction(users.data.data.data));
		} catch (error) {
			console.log(error);
		}
	}, [dispatch, searchname]);

	useEffect(() => {
		handleSearch();
	}, [handleSearch, searchname]);

	const fetch = useCallback(async () => {
		try {
			const users = await getUsersByPage(activePage);
			dispatch(setUsersAction(users.data.data.data));
		} catch (error) {
			console.log(error);
		}
	}, [activePage, dispatch]);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			fetch();
		}
		return () => {
			isMounted = false;
		};
	}, [fetch]);

	return (
		<Flex direction={'column'} justify={'center'} align={'center'}>
			<NavComponents />

			<Box miw={'100vw'}>
				<UserCardComponent />
			</Box>
			<Flex mb={20} mt={20} justify={'center'}>
				<Pagination value={activePage} onChange={setActivePage} total={50} />
			</Flex>
		</Flex>
	);
}

export default HomePage;
