import styled from 'styled-components';

export const Container = styled.header`
	background: var(--blue);
`;
export const Content = styled.div`
	max-width: 1120px;
	padding: 2rem 1rem 12rem;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: space-between;

	button {
		background: var(--blue-light);
		height: 3rem;
		padding: 0 2rem;
		border: 0;
		border-radius: 0.25rem;
		font-size: 1rem;
		color: #fff;
		transition: filter 0.2s;

		&:hover {
			filter: brightness(0.9);
		}
	}
`;
