import { useState, useEffect } from "react"
import Soundfont from 'soundfont-player'
import { Chord } from "./modules/Chord.js"
import ChordButton from "./ChordButton.jsx"
import ChordLayout from "./chordLayout.json"

export default function ChordKeyboard({ instrumentId }) {
    const [ac, setAc] = useState(new AudioContext())
    const [instrument, setInstrument] = useState()

    useEffect(() => {
        setInstrument(Soundfont.instrument(ac, instrumentId))
    }, [ac, instrumentId])

    return (
        <div className="chord-keyboard">
            {ChordLayout.chordKeyboard.map((section, index) => (
                <div className={"chord-section"} key={index}>
                    <div className="section-name">{section.name}</div>
                    {section.chords.map((alternativeChords, index_) => (
                        <div key={index_}>
                            <ChordButton color={section.color}
                            chord={typeof alternativeChords == "string" ? Chord.byChordName(alternativeChords) : Chord.byChordName(alternativeChords[0])}
                            alternativeChords={typeof alternativeChords == "string" ? null : alternativeChords.map((chordName) => (Chord.byChordName(chordName)))}
                            instrument={instrument}
                            ac={ac}
                            displayInversions={true} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}