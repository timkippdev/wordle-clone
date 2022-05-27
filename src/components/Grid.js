import Row from "./Row"

export default function Grid({ currentGuess, guesses, currentTurn }) {
  return (
    <div className="grid">
      {
        guesses.map((guess, i) => {
          if (currentTurn === i) {
            return <Row rawGuess={currentGuess} key={i} />
          }
          return <Row guess={guess} key={i} />
        })
      }
    </div>
  )
}