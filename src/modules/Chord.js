import Chords from "../chords.json"

export class Interval {
    constructor(intervalName) {
        if (!/^(b|#)*[1-8]$/.test(intervalName)) {
            throw new Error(`Invalid interval name : ${intervalName}`)
        }

        this.alteration = intervalName.substring(0, intervalName.length-1)
        this.naturalIntervalName = intervalName[intervalName.length-1]

        const alterationValue = this.alteration.match(/#*/)[0].length - this.alteration.match(/b*/)[0].length

        this.diatonicInterval = Chords.intervalsDiatonicValue[this.naturalIntervalName]
        this.chromaticInterval = Chords.intervalsChromaticValue[this.naturalIntervalName] + alterationValue
    }

    getAlteration() {
        return this.alteration
    }

    getNaturalIntervalName() {
        return this.naturalIntervalName
    }

    getDiatonicInterval() {
        return this.diatonicInterval
    }

    getChromaticInterval() {
        return this.chromaticInterval
    }
}

export class Note {

    noteName = null
    naturalNoteName = null
    alteration = null
    octaveNumber = null
    diatonicValue = null
    chromaticValue = null

    constructor(noteName) {
        if (!/^[A-G](b|#)*[0-9]$/.test(noteName)) {
            throw new Error(`Invalid note name : ${noteName}`)
        }

        this.noteName = noteName
        this.naturalNoteName = noteName[0]
        this.alteration = noteName.substring(1, noteName.length-1)
        this.octaveNumber = Number(noteName[noteName.length-1])
        this.diatonicValue = this.octaveNumber * 7 + Chords.notesDiatonicValue[this.naturalNoteName]
        const alterationValue = this.alteration.match(/#*/)[0].length - this.alteration.match(/b*/)[0].length
        this.chromaticValue = this.octaveNumber * 12 + Chords.notesChromaticValue[this.naturalNoteName] + alterationValue
    }

    static byValue(diatonicValue, chromaticValue) {
        if (diatonicValue < 0 || diatonicValue > 69 || chromaticValue < 0 || chromaticValue > 119) {
            throw new Error(`Note value out of range : ${diatonicValue}, ${chromaticValue}`)
        }

        const noteName = Chords.notesDiatonicValueReversed[diatonicValue % 7]
        const octaveNumber = Math.floor(diatonicValue / 7)
        const alterationValue = chromaticValue - (Chords.notesChromaticValue[noteName] + octaveNumber * 12)
        const alteration = alterationValue < 0 ? 'b'.repeat(Math.abs(alterationValue)) : '#'.repeat(Math.abs(alterationValue))

        return new Note(noteName + alteration + octaveNumber)
    }

    getNoteName() {
        return this.noteName
    }

    getNaturalNoteName() {
        return this.naturalNoteName
    }

    getAlteration() {
        return this.alteration
    }

    getOctaveNumber() {
        return this.octaveNumber
    }

    getDiatonicValue() {
        return this.diatonicValue
    }

    getChromaticValue() {
        return this.chromaticValue
    }

    transposeUp(intervalName, numberOfTranspositions = 1) {
        const interval = new Interval(intervalName)
        const newDiatonicValue = this.diatonicValue + interval.getDiatonicInterval() * numberOfTranspositions
        const newChromaticValue = this.chromaticValue + interval.getChromaticInterval() * numberOfTranspositions
        return Note.byValue(newDiatonicValue, newChromaticValue)
    }

    transposeDown(intervalName, numberOfTranspositions = 1) {
        return this.transposeUp(intervalName, - numberOfTranspositions)
    }

    octavateBy(octavesToAdd) {
        return this.transposeUp('8', octavesToAdd)
    }

    octavateToOctave(octave) {
        const octavesToAdd = octave - this.getOctaveNumber()
        return this.octavateBy(octavesToAdd)
    }
}

export class Chord {

    chordName = null
    baseOctave = null
    baseNote = null
    notes = null

    constructor(chordName, baseOctave, baseNote, notes) {
        this.chordName = chordName
        this.baseOctave = baseOctave
        this.baseNote = baseNote
        this.notes = notes
    }

    static byChordName(chordName, baseOctave = 4) {
    const matchNoteNamePattern = chordName.match(/^[A-G](b|#)*/)

        if (!matchNoteNamePattern) {
            throw new Error(`Invalid chord name : ${chordName} (invalid note name)`)
        }

        const baseNoteName = matchNoteNamePattern[0] + baseOctave
        const chordQualifier = chordName.substring(matchNoteNamePattern[0].length)
        const chordIntervals = Chords.chordsNew[chordQualifier]

        if(chordIntervals == undefined) {
            console.log(matchNoteNamePattern)
            throw new Error(`Invalid chord name : ${chordName} (invalid chord qualifier)`)
        }

        const baseNote = new Note(baseNoteName)
        const notes = [baseNote].concat(chordIntervals.map((intervalName) => (
            baseNote.transposeUp(intervalName)
        )))

        return new Chord(chordName, baseOctave, baseNote, notes)
    }

    static byNoteNames(chordName, noteNames) {
        const notes = noteNames.map((noteName) => (new Note(noteName)))
        return new Chord(chordName, notes[0].getOctaveNumber(), notes[0], notes)
    }

    getChordName() {
        return this.chordName
    }

    getBaseOctave() {
        return this.baseOctave
    }

    getBaseNote() {
        return this.baseNote
    }

    getNotes() {
        return this.notes
    }

    getInversions() {
        return this.notes.map((note, index) => {
            const chordName = this.chordName + '/' + note.getNaturalNoteName() + note.getAlteration()
            const noteNames = this.notes.map((note, i) => ((i < index ? note.octavateBy(1) : note).getNoteName()))
            const invertedNoteNames = noteNames.slice(index).concat(noteNames.slice(0, index))
            return Chord.byNoteNames(chordName, invertedNoteNames)
        })
    }
}