import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Card from './components/card'

function App() {
  const emojis = ['🍎', '🍌', '🍇', '🍓', '🍉', '🥝', '🍑', '🍒', '🍋', '🍈'];
  const generateShuffledCards = () => {
    const pairs = [...emojis, ...emojis]
    const shuffled = pairs

    .map((emoji,index) => ({
      id : index,
      emoji,
      matched : false,
    }))

    .sort(() => Math.random()- 0.5)

    return shuffled
  };

  const [cards, setCards] = useState(generateShuffledCards());
  const [flipped, setFlipped] = useState([])
  const [turn, setTurn] = useState("blue")
  const [blueScore, setBlueScore] = useState(0)
  const [redScore, setRedScore] = useState(0)
  const [gameOver, setGameOver] = useState(false);

  const handleCardClick = (index) => {
    if(flipped.includes(index) || flipped.length === 2 || cards[index].matched){
      return
    }

    const newFlipped = [...flipped, index]
    setFlipped(newFlipped);

    if(newFlipped.length === 2){
      const [firstIndex, secondIndex] = newFlipped
      const firstCard = cards[firstIndex]
      const secondCard = cards[secondIndex]

      if(firstCard.emoji === secondCard.emoji){
        const updatedCards = [...cards]
        updatedCards[firstIndex].matched = true
        updatedCards[secondIndex].matched = true
        setCards(updatedCards)

        const allMatched = updatedCards.every(card => card.matched)
        if(allMatched){
          setTimeout(() => {
            setGameOver(true)
          }, 1000)
        }

        if(turn === "blue"){
          setBlueScore(score => score + 1)
        }
        else{
          setRedScore(score => score+1)
        }

        setTimeout(() => setFlipped([]), 1000);
      }
      else{
        setTimeout(() => {
          setFlipped([])
          setTurn(prev => (prev === "blue" ? "red" : "blue"))
        }, 1000)
      }
    }
  }

  const restartGame = () => {
    setFlipped([])
    setTimeout(() => {
    setCards(generateShuffledCards())
    setBlueScore(0)
    setGameOver(false)
    setTurn("blue")
    setRedScore(0)
    }, 50)
  };

  return (
    <>
    <div className={`game-container ${turn}`}>
    {/* <div className='scoreboard'>
      <h2>Blue : {blueScore} | Red : {redScore}</h2>
      <h3>
        Current Turn:{" "}
        <span className={`turn ${turn}`}>{turn.toUpperCase()}</span>
      </h3>
    </div> */}
    <div className="scoreboard">
  <div className="player player-blue">
    <h2>🔵 Blue</h2>
    <div className="score">{blueScore}</div>
  </div>

  <div className="turn-indicator">
    <span className={`turn-badge ${turn}`}>
      {turn.toUpperCase()}'s TURN
    </span>
  </div>

  <div className="player player-red">
    <h2>🔴 Red</h2>
    <div className="score">{redScore}</div>
  </div>
</div>
      <div className="grid">
        {cards.map((card,index) => (
          <Card
          key = {card.id}
          card = {card}
          flipped = {flipped.includes(index) || card.matched}
          onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
      {gameOver && (
        <div className='game-over'>
          <h2>
            Game Over! {blueScore === redScore ? "It's a tie!" : (blueScore > redScore ? "Blue Wins!" : "Red Wins!")}
          </h2>
          <button className="restart-btn" onClick={restartGame}>Restart Game</button>
        </div>
      )}
      </div>
    </>
  )
}

export default App
