import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import CurrencyInput from 'react-currency-input-field';
import { useTransaction } from '../../hooks/TransactionsContext';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';

import { Container, RadioBox, TransactionTypeContainer } from './styles';

interface NewTransactionModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
}

const currencyConfig = {
	locale: 'pt-BR',

	currency: 'BRL',
};

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
	const [title, setTitle] = useState('');
	const [amount, setAmount] = useState(0);
	const [category, setCategory] = useState('');

	const [type, setType] = useState('deposit');

	const { createTransaction } = useTransaction();

	function clearForm() {
		setTitle('');
		setAmount(0);
		setCategory('');
		setType('deposit');
		onRequestClose();
	}

	function handleCreateNewTransaction(event: FormEvent) {
		event.preventDefault();

		createTransaction({
			title,
			amount,
			category,
			type,
		});
		clearForm();
	}

	/* 	function isNumber(currentVal: number, newDigit: any) {
		try {
			

			if (newDigit === '.') {
				if(currentVal % 1 != 0)
				return false;
				else if(currentVal < 0)
				
			} else if {
				const testeNumber = Number(newDigit);
			

			
				
			}
			return true;
		} catch (e) {
			return false;
		}
	} */
	function toNumber(value: string | undefined): number {
		const newNumber = typeof value != 'undefined' ? Number(value.replaceAll(',', '.')) : 0;
		return newNumber;
	}

	return (
		<Modal
			overlayClassName="react-modal-overlay"
			className="react-modal-content"
			onRequestClose={onRequestClose}
			isOpen={isOpen}
		>
			<button type="button" onClick={onRequestClose} className="react-modal-close">
				<img src={closeImg} alt="close modal" />
			</button>
			<Container onSubmit={handleCreateNewTransaction}>
				<h2> Register Transaction</h2>
				<input placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)}></input>

				<CurrencyInput
					placeholder="Price"
					decimalSeparator=","
					groupSeparator="."
					intlConfig={currencyConfig}
					onValueChange={(val) => {
						setAmount(toNumber(val));
					}}
				/>

				<TransactionTypeContainer>
					<RadioBox
						isActive={type === 'deposit'}
						activeColor="green"
						type="button"
						onClick={() => setType('deposit')}
					>
						<img src={incomeImg} alt="In" />
						<span>IN</span>
					</RadioBox>
					<RadioBox
						isActive={type === 'withdraw'}
						activeColor="red"
						type="button"
						onClick={() => setType('withdraw')}
					>
						<img src={outcomeImg} alt="out" />
						<span>OUT</span>
					</RadioBox>
				</TransactionTypeContainer>

				<input
					type="text"
					placeholder="Category"
					value={category}
					onChange={(event) => setCategory(event.target.value)}
				></input>
				<button type="submit">Register</button>
			</Container>
		</Modal>
	);
}
