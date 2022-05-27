import { useEffect, useState } from "react"
import useWordle from "../hooks/useWordle"
import Grid from "./Grid"
import Keyboard from "./Keyboard"

export default function Wordle() {
  const possibleAnswers = ['moosh', 'ninja', 'plush', 'paper', 'grant', 'react', 'state']
  const getRandomAnswer = () => {
    return possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)]
  }

  const [answer, setAnswer] = useState(getRandomAnswer())
  const { currentGuess, currentTurn, guesses, handleKeyup, isCorrectGuess, reset } = useWordle(answer)

  const resetFn = () => {
    setAnswer(getRandomAnswer())
    reset()
  }

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)
    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup])

  useEffect(() => {
    if (isCorrectGuess) {
      window.removeEventListener('keyup', handleKeyup)
    }
  }, [isCorrectGuess, handleKeyup])

  if (isCorrectGuess) {
    return (<>
      <div className="postgame">
        <h1>Congratulations!</h1>
        <h3>You guessed "{answer}" and<br />it only took you {currentTurn} guesses!</h3>
        <button onClick={resetFn}>Play Again</button>
      </div>
    </>)
  }

  if (currentTurn > 5) {
    return (<>
      <div className="postgame">
        <h1>Sorry!</h1>
        <h3>The correct answer was "{answer}".<br />Better luck next time!</h3>
        <button onClick={resetFn}>Play Again</button>
      </div>
    </>)
  }

  return (<>
    <Grid currentGuess={currentGuess} currentTurn={currentTurn} guesses={guesses} />
    <Keyboard guesses={guesses} onClick={handleKeyup} />
    <p style={{ position: 'absolute', right: '10px', bottom: '0', fontSize: '10px', color: '#222222' }}>{answer}</p>
  </>)
}