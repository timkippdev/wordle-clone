import { useState } from "react"

const useWordle = (answer) => {
  const [currentTurn, setCurrentTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([...Array(6)])
  const [isCorrectGuess, setIsCorrectGuess] = useState(false)
  const [prevGuesses, setPreviousGuesses] = useState([])

  const analyseGuess = (guess) => {
    const analysedGuess = [...guess].map((value) => {
      return { value: value, status: 0 }
    })
    const answerParts = [...answer]

    analysedGuess.forEach((letter, i) => {
      if (answerParts[i] === letter.value) {
        analysedGuess[i].status = 2
        answerParts[i] = null
      }
    })

    analysedGuess.forEach((letter, i) => {
      if (answerParts.includes(letter.value) && letter.status !== 2) {
        analysedGuess[i].status = 1
        answerParts[answerParts.indexOf(letter.value)] = null
      }
    })

    return analysedGuess
  }

  const handleKeyup = (e) => {
    const key = (e.key ? e.key : e.target.innerText).toLowerCase()
    if (key === 'enter' && currentGuess.length === 5) {
      if (prevGuesses.includes(currentGuess)) {
        return
      }
      setGuesses((prev) => {
        const updatedGuesses = [...prev]
        updatedGuesses[currentTurn] = { value: analyseGuess(currentGuess) }
        return updatedGuesses
      })
      setPreviousGuesses((prev) => {
        const updatedPreviousGuesses = [...prev]
        updatedPreviousGuesses.push(currentGuess)
        return updatedPreviousGuesses
      })
      if (currentGuess === answer) {
        setIsCorrectGuess(true)
      }

      if (!isCorrectGuess) {
        setCurrentTurn(currentTurn + 1)
      }

      setCurrentGuess('')
      return
    }
    if ((key === 'backspace' || key === 'back') && currentGuess.length > 0) {
      setCurrentGuess(() => {
        return currentGuess.substring(0, currentGuess.length - 1)
      })
    }
    if (/^[A-Za-z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess((prev) => {
        return (prev + key).toLowerCase()
      })
    }
  }

  const reset = () => {
    setCurrentTurn(0)
    setCurrentGuess('')
    setGuesses([...Array(6)])
    setIsCorrectGuess(false)
    setPreviousGuesses([])
  }

  return { currentGuess, currentTurn, guesses, handleKeyup, isCorrectGuess, reset }
}

export default useWordle