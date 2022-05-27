export default function Letter({ value, onClick, className }) {
    let backgroundColor
    if (value.status === 1) {
        backgroundColor = '#b59f3b'
    } else if (value.status === 2) {
        backgroundColor = '#538d4e'
    } else if (value.status === 0) {
        backgroundColor = '#3a3a3c'
    } else {
        // backgroundColor = '#121213'
    }

    const borderColor = '#3a3a3c' // #565758

    return (
        <div className={`letter ${className ? className : ''}`} style={{ backgroundColor, color: '#ffffff', borderWidth: '2px', borderColor }} onClick={onClick}>{value.value}</div>
    )
}