import Letter from "./Letter"

export default function Keyboard({ guesses, onClick }) {

  const topRowLetters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
  const middleRowLetters = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
  const bottomRowLetters = ['z', 'x', 'c', 'v', 'b', 'n', 'm']

  const usedLetters = []
  guesses.forEach((guess, i) => {
    if (guess) {
      [...guess.value].forEach(({ value, status }) => {
        if (!usedLetters[value]) {
          usedLetters[value] = status
        } else {
          const existingLetterStatus = usedLetters[value]
          if (existingLetterStatus === 1 && status === 2) {
            usedLetters[value] = 2
          } else if (existingLetterStatus === 0 && status === 1) {
            usedLetters[value] = 1
          }
        }
      })
    }
  })

  const getLetter = (char) => {
    const value = { status: -1, value: char }
    if (usedLetters[char] >= 0) {
      value.status = usedLetters[char]
    }
    return <Letter value={value} key={char} onClick={onClick} />
  }

  return (
    <div className="keyboard">
      <div className="row">
        {
          topRowLetters.map((letter) => {
            return getLetter(letter)
          })
        }
      </div>
      <div className="row">
        {
          middleRowLetters.map((letter, idx) => {
            return getLetter(letter)
          })
        }
      </div>
      <div className="row">
        <Letter className="big" value={{ value: 'Enter', status: -1 }} onClick={onClick} />
        {
          bottomRowLetters.map((letter, idx) => {
            return getLetter(letter)
          })
        }
        <Letter className="big" value={{ value: 'Back', status: -1 }} onClick={onClick} />
      </div>
    </div>
  )
}