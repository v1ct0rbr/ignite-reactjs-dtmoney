import { useTransaction } from '../../hooks/TransactionsContext';

import { Container } from './styles';

export function TransactionsTable() {
	const { transactions } = useTransaction();

	return (
		<Container>
			<table>
				<thead>
					<tr>
						<th>Titulo</th>
						<th>Valor</th>
						<th>Categoria</th>
						<th>Data</th>
					</tr>
				</thead>
				<tbody>
					{/* <tr>
						<td>Desenvolvimento de website</td>
						<td className="deposit">R$12.000,00</td>
						<td>Desenvolvimento</td>
						<td>12/05/2021</td>
					</tr>

					<tr>
						<td>Condomínio</td>
						<td className="withdraw">- R$ 400,00</td>
						<td>Despesa fixa</td>
						<td>12/05/2021</td>
					</tr> */}
					{transactions.map((transaction) => (
						<tr key={transaction.id}>
							<td>{transaction.title}</td>
							<td className={transaction.type}>
								{new Intl.NumberFormat('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								}).format(transaction.amount)}
							</td>
							<td>{transaction?.category ? transaction.category:"---"}</td>
							<td>{new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt))}</td>
						</tr>
					))}
				</tbody>
			</table>
		</Container>
	);
}
