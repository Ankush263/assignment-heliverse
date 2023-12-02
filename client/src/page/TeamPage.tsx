import { useCallback, useEffect, useState } from 'react';
import { getTeams } from '../api';
import { IconEye, IconTrash } from '@tabler/icons-react';
import {
	Box,
	Flex,
	Grid,
	Card,
	Text,
	Avatar,
	Tooltip,
	ActionIcon,
	Modal,
	Group,
} from '@mantine/core';
import { deleteTeam, getTeam } from '../api';
import { useDisclosure } from '@mantine/hooks';

interface UserInterface {
	_id: string;
	first_name: string;
	last_name: string;
	email: string;
	avatar: string;
}
interface TeamInterface {
	_id: string;
	userIds: UserInterface[];
	name: string;
	description: string;
	createdAt: Date;
}

function TeamPage() {
	const [teams, setTeams] = useState<TeamInterface[]>([]);
	const [opened, { open, close }] = useDisclosure(false);
	const [teamDetails, setTeamDetails] = useState<TeamInterface>();

	const handleDelete = async (_id: string) => {
		try {
			await deleteTeam(_id);
			fetch();
		} catch (error) {
			console.log(error);
		}
	};

	const handleOpenTeam = async (_id: string) => {
		try {
			open();
			const team = await getTeam(_id);
			setTeamDetails(team.data.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetch = useCallback(async () => {
		try {
			const team = await getTeams();
			setTeams(team.data.data.data);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		fetch();
	}, [fetch]);
	return (
		<Box miw={'100vw'}>
			<Modal opened={opened} onClose={close} title={teamDetails?.name} centered>
				<Box>Description: {teamDetails?.description}</Box>
				{teamDetails?.userIds.map((user) => {
					return (
						<Card
							shadow="sm"
							padding="lg"
							radius="md"
							withBorder
							key={user._id}
						>
							<Card.Section>
								<Group position="apart" mt="md" mb="xs">
									<Avatar src={user.avatar} alt="#" bg={'dark'} radius={'xl'} />
									<Text>
										{user.first_name} {user.last_name}
									</Text>
								</Group>
							</Card.Section>
							<Card.Section>
								<Flex justify={'center'}>
									<Text>{user.email}</Text>
								</Flex>
							</Card.Section>
						</Card>
					);
				})}
			</Modal>
			<Grid gutter={'xl'} justify="center" w={'100%'} mt={20}>
				{teams.map((i) => {
					return (
						<Grid.Col md={6} lg={3} key={i._id}>
							<Flex justify={'center'} align={'center'}>
								<Card
									shadow="sm"
									maw={400}
									padding="lg"
									radius="md"
									withBorder
									mb={10}
								>
									<Card.Section withBorder inheritPadding py="xs">
										<Text>Name: {i.name}</Text>
									</Card.Section>
									<Card.Section withBorder inheritPadding py="xs">
										<Text>Description: {i.description}</Text>
									</Card.Section>
									<Card.Section withBorder inheritPadding py="xs">
										<Tooltip.Group openDelay={300} closeDelay={100}>
											<Avatar.Group spacing="sm">
												{i.userIds.map((user: UserInterface) => {
													return (
														<Tooltip
															label={`${user.first_name} ${user.last_name}`}
															withArrow
															key={user._id}
														>
															<Avatar
																src={`${user.avatar}`}
																radius="xl"
																bg={'dark'}
															/>
														</Tooltip>
													);
												})}
											</Avatar.Group>
										</Tooltip.Group>
										<Flex w={'100%'} justify={'space-between'}>
											<ActionIcon
												color="red"
												onClick={() => handleDelete(i._id)}
											>
												<IconTrash size="1.125rem" />
											</ActionIcon>
											<ActionIcon
												color="blue"
												onClick={() => handleOpenTeam(i._id)}
											>
												<IconEye size="1.125rem" />
											</ActionIcon>
										</Flex>
									</Card.Section>
								</Card>
							</Flex>
						</Grid.Col>
					);
				})}
			</Grid>
		</Box>
	);
}

export default TeamPage;
