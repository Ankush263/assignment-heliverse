import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { MantineProvider } from '@mantine/core';
import TeamPage from './page/TeamPage.tsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<Notifications />
				<MantineProvider
					withGlobalStyles
					withNormalizeCSS
					theme={{
						colorScheme: 'light',
					}}
				>
					<Switch>
						<Route path={'/team'}>
							<TeamPage />
						</Route>
						<Route path={'/'}>
							<App />
						</Route>
					</Switch>
				</MantineProvider>
			</Router>
		</Provider>
	</React.StrictMode>
);
