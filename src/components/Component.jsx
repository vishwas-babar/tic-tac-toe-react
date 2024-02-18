import { useEffect, useState } from "react"


function InnerSquare({ value, onSquareClick }) {

    return (
        <button onClick={onSquareClick} className=" size-10 rounded-md bg-amber-200 shadow-lg shadow-black flex items-center justify-center">
            {value}
        </button>
    )
}


export default function Board() {

    const [squares, setSquare] = useState(Array(9).fill(null)) // .fill set the value of each element to null which we given here
    const [xoro, setXoro] = useState('X');
    const [winner, setWinner] = useState(null); // when user won the game then change the value of this 
    const [history, setHistory] = useState(Array());
    const [firstRender, setFirstRender] = useState(true);

    function handleSqareClick(i) {
        const squaresCopy = squares.slice();

        if (squaresCopy[i] === 'X' || squaresCopy[i] === 'O') {
            return alert("don't dare to cheat with your oponent")
        }

        if (xoro === 'X') {
            squaresCopy[i] = xoro;
            setXoro('O')
        } else {
            squaresCopy[i] = xoro;
            setXoro('X');
        }
        setSquare(squaresCopy);
    }


    // check everytime anyone won the game or not
    useEffect(() => {
        console.log('checking all condition for finding who won the game...');
        if (squares[0] === squares[1] && squares[1] === squares[2]) {
            if (squares[0] === null) return;
            setWinner(squares[0]);
        }
        else if (squares[3] === squares[4] && squares[4] === squares[5]) {
            if (squares[3] === null) return;
            setWinner(squares[3]);
        }
        else if (squares[6] === squares[7] && squares[7] === squares[8]) {
            if (squares[6] === null) return;
            setWinner(squares[6]);
        }
        else if (squares[0] === squares[3] && squares[3] === squares[6]) {
            if (squares[0] === null) return;
            setWinner(squares[0]);
        }
        else if (squares[1] === squares[4] && squares[4] === squares[7]) {
            if (squares[1] === null) return;
            setWinner(squares[1]);
        }
        else if (squares[2] === squares[5] && squares[5] === squares[8]) {
            if (squares[2] === null) return;
            setWinner(squares[2]);
        }
        else if (squares[0] === squares[4] && squares[4] === squares[8]) {
            if (squares[0] === null) return;
            setWinner(squares[0]);
        }
        else if (squares[2] === squares[4] && squares[4] === squares[6]) {
            if (squares[2] === null) return;
            setWinner(squares[2]);
        }

    }, [squares]) // if we pass empty arr as depedency then  it will only going to execute once and if we not anything it will execute each time when the component rerender

    // if any user won the game then tell them
    let winnerDiv;
    useEffect(() => {
        if (winner === 'X') {
            alert('X won the game');
            const squaresCopy = squares.slice();
            squaresCopy.fill(null);
            setSquare(squaresCopy);
        } else if (winner === 'O') {
            alert('O won the game');
            const squaresCopy = squares.slice();
            squaresCopy.fill(null);
            setSquare(squaresCopy);
        }
    }, [winner]);


    // store every move history array
    useEffect(() => {

        if (firstRender) {
            return setFirstRender(false);
        }

        const historyCopy = history.slice();
        historyCopy.push(squares);
        setHistory(historyCopy);
    }, [xoro]);

    function setHistoryMove(index) {
        const squaresPast = history[index];
        const nullCount = squaresPast.filter( element => element === null ).length;

        const noOfValidElement = squaresPast.length - nullCount;
        if (noOfValidElement/2 == 0) setXoro('O');
        else setXoro('X');

        setSquare(squaresPast);

    }

    return (

        <div className="flex flex-col gap-10 items-center">
            <h1 className=" text-white text-center text-3xl">Its {xoro} Turn</h1>
            <div className="flex gap-20 items-center">

                <div className="flex flex-col">
                    <div className="border border-white rounded-md scale-150 border-spacing-2 bg-white bg-opacity-50 p-4 flex flex-col gap-3">
                        <div className="flex gap-3">
                            <InnerSquare onSquareClick={() => handleSqareClick(0)} value={squares[0]} />
                            <InnerSquare onSquareClick={() => handleSqareClick(1)} value={squares[1]} />
                            <InnerSquare onSquareClick={() => handleSqareClick(2)} value={squares[2]} />
                        </div>
                        <div className="flex gap-3">
                            <InnerSquare onSquareClick={() => handleSqareClick(3)} value={squares[3]} />
                            <InnerSquare onSquareClick={() => handleSqareClick(4)} value={squares[4]} />
                            <InnerSquare onSquareClick={() => handleSqareClick(5)} value={squares[5]} />
                        </div>
                        <div className="flex gap-3">
                            <InnerSquare onSquareClick={() => handleSqareClick(6)} value={squares[6]} />
                            <InnerSquare onSquareClick={() => handleSqareClick(7)} value={squares[7]} />
                            <InnerSquare onSquareClick={() => handleSqareClick(8)} value={squares[8]} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 bg-slate-500 w-28 h-72 overflow-y-auto items-center rounded-md p-2">
                    {history.map((element, index) => {
                        return <button
                            className=" px-3 py-1 bg-yellow-100 rounded-md"
                            key={index}
                            onClick={() => setHistoryMove(index)}
                        >Move {index + 1}</button>
                    })}
                </div>
            </div>
        </div>
    )
}