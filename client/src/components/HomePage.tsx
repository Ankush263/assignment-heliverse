import { Box, Flex, Pagination } from '@mantine/core';
import { getUsersByPage, searchUsers, userByFilters } from '../api';
import { useEffect, useCallback, useState } from 'react';
import NavComponents from './nav/NavComponents';
import UserCardComponent from './UserCardComponent';

interface userInterface {
	_id: string;
	avatar: string;
	available: boolean;
	domain: string;
	email: string;
	first_name: string;
	last_name: string;
	gender: string;
}

function HomePage() {
	const [user, setUser] = useState<userInterface[]>([]);
	const [activePage, setActivePage] = useState<number>(1);
	const [searchName, setSearchName] = useState<string>('');
	const [gender, setGender] = useState<string>('');
	const [domain, setDomain] = useState<string>('');
	const [available, setAvailable] = useState<string>('');
	const [teamCreate, setTeamCreate] = useState<boolean>(false);
	const [userId, setUserId] = useState<string[]>([]);

	const handleFilter = useCallback(async () => {
		try {
			const availableVal =
				available === 'Available'
					? true
					: available === 'Not Available'
					? false
					: '';
			const users = await userByFilters(gender, availableVal, domain);
			setUser(users.data.data.data);
		} catch (error) {
			console.log(error);
		}
	}, [available, domain, gender]);

	useEffect(() => {
		handleFilter();
	}, [handleFilter]);

	const handleSearch = useCallback(async () => {
		try {
			const users = await searchUsers(searchName);
			setUser(users.data.data.data);
		} catch (error) {
			console.log(error);
		}
	}, [searchName]);

	useEffect(() => {
		handleSearch();
	}, [handleSearch, searchName]);

	const fetch = useCallback(async () => {
		try {
			const users = await getUsersByPage(activePage);
			setUser(users.data.data.data);
		} catch (error) {
			console.log(error);
		}
	}, [activePage]);

	useEffect(() => {
		fetch();
	}, [fetch]);

	return (
		<Flex direction={'column'} justify={'center'} align={'center'}>
			<NavComponents
				searchName={searchName}
				setSearchName={setSearchName}
				gender={gender}
				setGender={setGender}
				domain={domain}
				setDomain={setDomain}
				available={available}
				setAvailable={setAvailable}
				teamCreate={teamCreate}
				setTeamCreate={setTeamCreate}
				userId={userId}
				setUserId={setUserId}
			/>

			<Box miw={'100vw'}>
				<UserCardComponent
					user={user}
					userId={userId}
					setUserId={setUserId}
					teamCreate={teamCreate}
				/>
			</Box>
			<Flex mb={20} mt={20} justify={'center'}>
				<Pagination value={activePage} onChange={setActivePage} total={50} />
			</Flex>
		</Flex>
	);
}

export default HomePage;
