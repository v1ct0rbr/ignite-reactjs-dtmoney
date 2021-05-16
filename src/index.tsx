import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
	models: {
		transactions: Model,
	},
	seeds(server) {
		server.db.loadData({
			transactions: [
				{
					id: 1,
					title: 'FreeLancer',
					type: 'deposit',
					category: 'dev',
					amount: 6000,
					createdAt: new Date('2020-12-12 09:00:00'),
				},
				{
					id: 2,
					title: 'Aluguel',
					type: 'withdraw',
					category: 'fixa',
					amount: 400,
					createdAt: new Date('2020-12-12 09:00:00'),
				},
				{
					id: 3,
					title: 'Curso',
					type: 'withdraw',
					category: 'learning',
					amount: 300,
					createdAt: new Date('2021-05-14 09:00:00'),
				},
			],
		});
	},
	routes() {
		this.namespace = 'api';
		this.get('/transactions', () => {
			/* 	return [
				{
					id: 1,
					title: 'Transaction 1',
					amount: 400,
					type: 'deposit',
					category: 'Food',
					createdAt: new Date(),
				},
			]; */
			return this.schema.all('transactions');
		});
		this.post('/transactions', (schema, request) => {
			const data = JSON.parse(request.requestBody);
			// console.log(`veja o data: ${data}`);
			
			return schema.create('transactions', data);
		});
	},
});

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
