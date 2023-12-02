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

interface NavComponentsInterface {
	searchName: string;
	setSearchName: React.Dispatch<React.SetStateAction<string>>;
	gender: string;
	setGender: React.Dispatch<React.SetStateAction<string>>;
	domain: string;
	setDomain: React.Dispatch<React.SetStateAction<string>>;
	available: string;
	setAvailable: React.Dispatch<React.SetStateAction<string>>;
	teamCreate: boolean;
	setTeamCreate: React.Dispatch<React.SetStateAction<boolean>>;
	userId: string[];
	setUserId: React.Dispatch<React.SetStateAction<string[]>>;
}

function NavComponents({
	searchName,
	setSearchName,
	gender,
	setGender,
	domain,
	setDomain,
	available,
	setAvailable,
	teamCreate,
	setTeamCreate,
	userId,
	setUserId,
}: NavComponentsInterface) {
	const [opened, { open, close }] = useDisclosure(false);
	const [teamName, setTeamName] = useState<string>('');
	const [teamDesc, setTeamDesc] = useState<string>('');

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
			setTeamCreate(true);
			close();
		} catch (error) {
			console.log(error);
		}
	};

	const handleClick = async () => {
		try {
			setTeamCreate(false);
			close();
			await createTeam(teamName, teamDesc, userId);
			setTeamName('');
			setTeamDesc('');
			setUserId([]);
			history.push('/team');
		} catch (error: unknown) {
			console.log('error: ', error);
			setTeamName('');
			setTeamDesc('');
			setUserId([]);
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
						onSearchChange={setGender}
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
						onSearchChange={setAvailable}
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
						onSearchChange={setDomain}
						searchValue={domain}
						searchable
						clearable
						nothingFound="No options"
					/>
				</Grid.Col>
				<Grid.Col md={6} lg={2}>
					<Input
						placeholder="search name"
						value={searchName}
						onChange={(e) => setSearchName(e.target.value)}
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
