import React, { useState } from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
	const [turn, setTurn] = useState('x');
	const [cells, setCells] = useState(Array(9).fill(''));
	const [winner, setWinner] = useState();
    const [tied, setTied] = useState(false);

	const checkForWinner = (squares) => {
		let lines = {
            possibilities:[
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
                
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],

				[0, 4, 8],
				[2, 4, 6],
			],
		};

		for (let chain in lines) {
			lines[chain].forEach((sequence) => {
				if (
					squares[sequence[0]] === '' ||
					squares[sequence[1]] === '' ||
					squares[sequence[2]] === ''
				) {

				} else if (
					squares[sequence[0]] === squares[sequence[1]] &&
					squares[sequence[1]] === squares[sequence[2]]
				) {
					setWinner(squares[sequence[0]]);
				}
			});
		}
	};

	const handleClick = (num) => {

		if (cells[num] !== '') {
			return;
		}

        if(winner){
            return;
        }

		let squares = [...cells];

		if (turn === 'x') {
			squares[num] = 'x';
			setTurn('o');
		} else {
			squares[num] = 'o';
			setTurn('x');
		}

		checkForWinner(squares);
		setCells(squares);
                
	};

    
	const handlePlayAgain = () => {
		setWinner(null);
		setCells(Array(9).fill(''));
        setTied(false);
	};

	const Cell = ({ num }) => {

        const checkForTie = () => {
            const notEmpty = (values) => values !== '';
            if(cells.every(notEmpty) && !winner){
                setTied(true);
            }
        }

        checkForTie();

		return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
	};

	return (
		<div className='container'>
			<main>
				Turn: {turn}
				<table>
					<tr>
						<Cell num={0} />
						<Cell num={1} />
						<Cell num={2} />
					</tr>
					<tr>
						<Cell num={3} />
						<Cell num={4} />
						<Cell num={5} />
					</tr>
					<tr>
						<Cell num={6} />
						<Cell num={7} />
						<Cell num={8} />
					</tr>
				</table>
			</main>
			{winner && (
				<>
					<p>{winner} is the winner!</p>
					<button onClick={() => handlePlayAgain()}>Play Again</button>
				</>
			)}
            
            {tied && (
                <>
                <p>{winner} Got a tie!</p>
                <button onClick={() => handlePlayAgain()}>Play Again</button>
               </>
            )}

		</div>
	);
};

export default TicTacToe;