import {
	Box,
	Card,
	Grid,
	Image,
	Text,
	Flex,
	Badge,
	Group,
	ActionIcon,
	Tooltip,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

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

interface userCardComponent {
	user: userInterface[];
	userId: string[];
	setUserId: React.Dispatch<React.SetStateAction<string[]>>;
	teamCreate: boolean;
}

function UserCardComponent({
	user,
	userId,
	setUserId,
	teamCreate,
}: userCardComponent) {
	const handleAdduser = async (_id: string) => {
		try {
			if (!userId.includes(_id)) {
				setUserId((prev) => [...prev, _id]);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Box>
			<Grid gutter={'xl'} justify="center" w={'100%'}>
				{user.map((i) => {
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
									<Card.Section>
										<Image src={`${i.avatar}`} alt="Norway" bg={'dark'} />
									</Card.Section>
									<Group position="apart" mt="md" mb="xs">
										<Text weight={500}>
											{i.first_name} {i.last_name}
										</Text>
										<Badge tt={'none'} color="pink" variant="light">
											{i.gender}
										</Badge>
									</Group>

									<Text size="sm" color="dimmed">
										{i.email}
									</Text>

									<Flex
										w={'100%'}
										justify={'space-between'}
										align={'center'}
										mt={'md'}
									>
										<Badge variant="filled" radius="md" tt={'none'}>
											{i.domain}
										</Badge>

										{teamCreate && (
											<ActionIcon
												color="dark"
												variant="outline"
												onClick={() => handleAdduser(i._id)}
												mx={10}
												disabled={userId.includes(i._id) || !i.available}
											>
												<Tooltip label="Click here to add user" withArrow>
													<IconPlus size="1.125rem" />
												</Tooltip>
											</ActionIcon>
										)}

										{i.available ? (
											<Badge variant="filled" radius="md" color="green">
												Available
											</Badge>
										) : (
											<Badge variant="filled" radius="md" color="red">
												Not Available
											</Badge>
										)}
									</Flex>
								</Card>
							</Flex>
						</Grid.Col>
					);
				})}
			</Grid>
		</Box>
	);
}

export default UserCardComponent;
