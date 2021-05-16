import styled from 'styled-components';

export const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 2rem;
	margin-top: -10rem;
	div {
		background: var(--shape);
		padding: 1.5rem 2rem;
		border-radius: 0.25rem;
		color: var(--text-title);
		header {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		strong {
			display: block;
			margin-top: 1rem;
			font-size: 2rem;
			font-weight: 500;
			line-height: 3rem;
		}
		/* 	&.highlight-background {
			background: var(--green);
			color: #fff;
		} */
	}
`;

interface BoxTotalProps {
	total: number;
}
const colors = {
	green: '#33cc95',
	red: '#e52e4d',
};

export const BoxTotal = styled.div<BoxTotalProps>`
	color: #fff !important;
	background: ${(props) => (props.total < 0 ? colors['red'] : colors['green'])} !important;
`;
