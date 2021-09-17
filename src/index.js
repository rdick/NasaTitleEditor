import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastProvider } from 'react-toast-notifications';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnmount: true,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			retry: false,
		},
	},
});

ReactDOM.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ToastProvider autoDismiss autoDismissTimeout={2000} placement="bottom-center">
				<App />
			</ToastProvider>
		</QueryClientProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
