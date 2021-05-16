import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import Modal from 'react-modal';

import { GlobalStyle } from './styles/global';
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionsProvider } from './hooks/TransactionsContext';

Modal.setAppElement('#root');
export function App() {
	const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
	function handleOpenNewTrasactionMOdal() {
		setIsNewTransactionModalOpen(true);
	}

	function handleCloseNewTransactionModal() {
		setIsNewTransactionModalOpen(false);
	}
	return (
		<TransactionsProvider>
			{/* <Title>hello world</Title> */}
			<Header onOpenNewTransactionModal={handleOpenNewTrasactionMOdal} />
			<Dashboard />
			<NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal} />

			<GlobalStyle />
		</TransactionsProvider>
	);
}
