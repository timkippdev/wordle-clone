import Letter from "./Letter"

const EMPTY_LETTER = { status: -1, value: '' }

export default function Row({ rawGuess, guess }) {
    if (rawGuess && rawGuess.length) {
        const spots = [...rawGuess, ...Array(5 - rawGuess.length).fill('')]
        return (
            <div className="row">
                {spots.map((value, i) => {
                    const letter = Object.assign({}, EMPTY_LETTER)
                    letter.value = value
                    return <Letter value={letter} key={i} />
                })}
            </div>
        )
    }

    if (guess && guess.value.length) {
        const spots = [...guess.value, ...Array(5 - guess.value.length).fill(EMPTY_LETTER)]
        return (
            <div className="row">
                {spots.map((value, idx) => {
                    return <Letter value={value} key={idx} />
                })}
            </div>
        )
    }

    return (
        <div className="row">
            {[...Array(5).fill(EMPTY_LETTER)].map((value, idx) => {
                return <Letter value={value} key={idx} />
            })}
        </div>
    )
}