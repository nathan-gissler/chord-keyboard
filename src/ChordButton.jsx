export default function ChordButton({ color, chord, alternativeChords, instrument, ac, displayHoverMenuColumn, displayInversions }) {
    const chordsOnHover = alternativeChords ? alternativeChords : (displayInversions ? chord.getInversions() : null)

    const hoverMenu = !chordsOnHover ? null : (
        <div className={displayHoverMenuColumn ? "chord-hover column" : "chord-hover row"}>
            <div>
                {chordsOnHover.map((ch, index_) => (
                    <div key={index_}>
                        <ChordButton
                        color={color}
                        chord={ch}
                        instrument={instrument}
                        ac={ac}
                        displayHoverMenuColumn={true}
                        displayInversions={alternativeChords && displayInversions} />
                    </div>
                    ))}
            </div>
        </div>
    )

    const fontSize = chord.getChordName().length <= 3 ? 16 : (chord.getChordName().length <= 5 ? 14 : (chord.getChordName().length <= 7 ? 12 : 10))
    
    return (
        <div>
            <div className={displayHoverMenuColumn ? "chord-button-wrapper column" : "chord-button-wrapper row"}>
                <div className={"chord-button"} style={{backgroundColor: `var(${color})`, fontSize: `${fontSize}px`}} onClick={() => {instrument.then(function (instru) {
                    chord.getNotes().map((note) => {instru.play(note.getNoteName(), ac.currentTime, {duration : 1})})
                })}}>
                    <div>{chord.getChordName()}</div>
                </div>
                {hoverMenu}
            </div>
        </div>
    )
}