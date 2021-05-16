import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';

import { useTransaction } from '../../hooks/TransactionsContext';

import { BoxTotal, Container } from './styles';

/* interface SumaryData {
	sumIn: number;
	sumOut: number;
	sumTotal: number;
} */

export function Summary() {
	// const data = useContext(TransactionsContext);

	const { transactions } = useTransaction();
	/* const [sumary, setSummary] = useState({ sumIn: 0, sumOut: 0, sumTotal: 0 } as SumaryData);

	useEffect(() => {
		calcTotal();
	}, [transactions]);

	function calcTotal() {
		let sumTotal = 0;
		let sumIn = 0;
		let sumOut = 0;
		transactions.forEach((elem, idx) => {
			if (elem.type === 'deposit') {
				sumIn += elem.amount;
			} else {
				sumOut += elem.amount;
			}
		});
		sumTotal = sumIn - sumOut;
		setSummary({ sumIn, sumOut, sumTotal });
	}
 */

	/* const totalDeposit = transactions.reduce((acc, transaction) => {
		if (transaction.type === 'deposit') {
			return acc + transaction.amount;
		}
		return acc;
	}, 0); */

	const summary = transactions.reduce(
		(acc, transaction) => {
			if (transaction.type === 'deposit') {
				acc.deposits += transaction.amount;
				acc.total += transaction.amount;
			} else {
				acc.withdraws += transaction.amount;
				acc.total -= transaction.amount;
			}
			return acc;
		},
		{ deposits: 0, withdraws: 0, total: 0 }
	);

	return (
		<Container>
			<div>
				<header>
					<p> Entradas</p>
					<img src={incomeImg} alt="Entradas" />
				</header>
				<strong>
					{new Intl.NumberFormat('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					}).format(summary.deposits)}
				</strong>
			</div>
			<div>
				<header>
					<p> Saídas</p>
					<img src={outcomeImg} alt="Saídas" />
				</header>
				<strong>
					-
					{new Intl.NumberFormat('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					}).format(summary.withdraws)}
				</strong>
			</div>
			<BoxTotal total={summary.total}>
				<header>
					<p> Total</p>
					<img src={totalImg} alt="Total" />
				</header>
				<strong>
					{new Intl.NumberFormat('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					}).format(summary.total)}
				</strong>
			</BoxTotal>

			{/* <div className="highlight-background">
				<header>
					<p> Total</p>
					<img src={totalImg} alt="Total" />
				</header>
				<strong>
					{new Intl.NumberFormat('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					}).format(sumary.sumTotal)}
				</strong>
			</div> */}
		</Container>
	);
}
