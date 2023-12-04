import {
	Button,
	Flex,
	Grid,
	Indicator,
	Input,
	Modal,
	Select,
	Textarea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { createTeam } from '../../api';
import { notifications } from '@mantine/notifications';
import { AxiosError } from 'axios';
import {
	setSearchNameAction,
	setGenderAction,
	setDomainAction,
	setAvailableAction,
	setTeamCreateAction,
	setUserIdAction,
} from '../../redux/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';

function NavComponents() {
	const [opened, { open, close }] = useDisclosure(false);
	const [teamName, setTeamName] = useState<string>('');
	const [teamDesc, setTeamDesc] = useState<string>('');

	const searchname = useSelector((state: RootState) => state.searchName.value);
	const gender = useSelector((state: RootState) => state.gender.value);
	const domain = useSelector((state: RootState) => state.domain.value);
	const available = useSelector((state: RootState) => state.available.value);
	const teamCreate = useSelector((state: RootState) => state.teamcreate.value);
	const userId = useSelector((state: RootState) => state.userId.value);

	const dispatch = useDispatch();

	// eslint-disable-next-line prefer-const
	let history = useHistory();

	const genderData = [
		{ value: 'Male', label: 'Male' },
		{ value: 'Female', label: 'Female' },
		{ value: 'Bigender', label: 'Bigender' },
		{ value: 'Polygender', label: 'Polygender' },
		{ value: 'Agender', label: 'Agender' },
		{ value: 'Genderqueer', label: 'Genderqueer' },
		{ value: 'Non-binary', label: 'Non-binary' },
	];

	const domainData = [
		{ value: 'Sales', label: 'Sales' },
		{ value: 'Finance', label: 'Finance' },
		{ value: 'Marketing', label: 'Marketing' },
		{ value: 'UI Designing', label: 'UI Designing' },
		{ value: 'Management', label: 'Management' },
		{ value: 'IT', label: 'IT' },
		{ value: 'Business Development', label: 'Business Development' },
	];

	const handleCreate = async () => {
		try {
			dispatch(setTeamCreateAction(true));
			close();
		} catch (error) {
			console.log(error);
		}
	};

	const handleClick = async () => {
		try {
			dispatch(setTeamCreateAction(false));
			close();
			await createTeam(teamName, teamDesc, userId);
			setTeamName('');
			setTeamDesc('');
			dispatch(setUserIdAction([]));
			history.push('/team');
		} catch (error: unknown) {
			console.log('error: ', error);
			setTeamName('');
			setTeamDesc('');
			dispatch(setUserIdAction([]));
			if (error instanceof AxiosError) {
				notifications.show({
					color: 'red',
					title: 'Error',
					message: error.response?.data.message,
					autoClose: 10000,
					styles: (theme) => ({
						root: {
							backgroundColor: theme.colors.red[6],
							borderColor: theme.colors.red[6],

							'&::before': { backgroundColor: theme.white },
						},

						title: { color: theme.white },
						description: { color: theme.white },
						closeButton: {
							color: theme.white,
							'&:hover': { backgroundColor: theme.colors.red[7] },
						},
					}),
				});
			}
		}
	};

	return (
		<Flex w={'100%'} justify={'center'} align={'center'}>
			<Modal opened={opened} onClose={close} title="Create Team">
				<Input
					placeholder="team name"
					value={teamName}
					onChange={(e) => setTeamName(e.target.value)}
					mb={10}
				/>
				<Textarea
					placeholder="team descriptiom"
					value={teamDesc}
					onChange={(e) => setTeamDesc(e.target.value)}
					mb={10}
				/>
				<Button onClick={handleCreate}>Add users</Button>
			</Modal>

			<Grid
				mb={20}
				mt={10}
				w={'100%'}
				maw={'100%'}
				gutter={'xl'}
				justify="center"
			>
				<Grid.Col md={6} lg={2}>
					<Select
						placeholder="Pick Gender"
						data={genderData}
						mr={10}
						searchable
						onSearchChange={(query) => dispatch(setGenderAction(query))}
						searchValue={gender}
						clearable
						nothingFound="No options"
					/>
				</Grid.Col>
				<Grid.Col md={6} lg={2}>
					<Select
						placeholder="Availablity"
						data={[
							{ value: 'Available', label: 'Available' },
							{ value: 'Not Available', label: 'Not Available' },
						]}
						mr={10}
						searchable
						onSearchChange={(query) => dispatch(setAvailableAction(query))}
						searchValue={available}
						clearable
						nothingFound="No options"
					/>
				</Grid.Col>
				<Grid.Col md={6} lg={2}>
					<Select
						placeholder="Domain"
						data={domainData}
						mr={10}
						onSearchChange={(query) => dispatch(setDomainAction(query))}
						searchValue={domain}
						searchable
						clearable
						nothingFound="No options"
					/>
				</Grid.Col>
				<Grid.Col md={6} lg={2}>
					<Input
						placeholder="search name"
						value={searchname}
						onChange={(e) => dispatch(setSearchNameAction(e.target.value))}
					/>
				</Grid.Col>
				<Grid.Col md={6} lg={2}>
					<Button ml={'auto'} onClick={open} disabled={teamCreate}>
						Create Team
					</Button>
				</Grid.Col>
				{teamCreate ? (
					<Grid.Col md={6} lg={2}>
						<Indicator inline label={userId.length} size={16}>
							<Button color="green" onClick={handleClick}>
								Create
							</Button>
						</Indicator>
					</Grid.Col>
				) : (
					<Grid.Col md={6} lg={2}>
						<Link to={'/team'}>{`My Team >`}</Link>
					</Grid.Col>
				)}
			</Grid>
		</Flex>
	);
}

export default NavComponents;
