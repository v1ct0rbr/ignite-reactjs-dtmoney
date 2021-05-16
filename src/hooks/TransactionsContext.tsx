import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
interface Transaction {
	id: number;
	title: string;
	amount: number;
	category: string;
	type: string;
	createdAt: Date;
}

/* interface TransactionInput {
	title: string;
			value: number;
			category: string;
			type: 'deposit' | 'withdraw';
} */
// type TransactionInput = Pick<Transaction, 'title'|'amount'|'category'|'type'>;
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
	children: ReactNode;
}

interface TransactionsContextData {
	transactions: Transaction[];
	createTransaction: (transaction: TransactionInput) => void;
	
}



export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	

	useEffect(() => {
		api.get('transactions').then((response) => {
			if (response?.data) {
				setTransactions(response.data.transactions);
			}
		});
	}, []);
	

	

	async function createTransaction(transactionInput: TransactionInput) {
		const response = await api.post('/transactions', { ...transactionInput, createdAt: new Date() });
		const transaction = response.data.transactions;

		setTransactions([...transactions, transaction]);
	}

	return (
		<TransactionsContext.Provider value={{ transactions, createTransaction }}>
			{children}
		</TransactionsContext.Provider>
	);
}
export function useTransaction(){
	const context = useContext(TransactionsContext);
	return context;
}