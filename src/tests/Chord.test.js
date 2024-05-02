import { Interval, Note, Chord } from "../modules/Chord.js"

// Interval

test('interval b3 has alteration b', () => {
    const interval = new Interval('b3')

    const alteration = interval.getAlteration()

    expect(alteration).toBe('b')
})

test('interval b3 has natural interval name 3', () => {
    const interval = new Interval('b3')

    const naturalIntervalName = interval.getNaturalIntervalName()

    expect(naturalIntervalName).toBe('3')
})

test('interval b3 has diatonic interval 2', () => {
    const interval = new Interval('b3')

    const diatonicInterval = interval.getDiatonicInterval()

    expect(diatonicInterval).toBe(2)
})

test('interval b3 has chromatic interval 3', () => {
    const interval = new Interval('b3')

    const chromaticInterval = interval.getChromaticInterval()

    expect(chromaticInterval).toBe(3)
})

test('invalid interval B3 throws an error', () => {
    expect(() => {
        new Interval('B3')
    }).toThrow('Invalid interval name : B3')
})

test('invalid interval b0 throws an error', () => {
    expect(() => {
        new Interval('b0')
    }).toThrow('Invalid interval name : b0')
})

test('invalid interval b9 throws an error', () => {
    expect(() => {
        new Interval('b9')
    }).toThrow('Invalid interval name : b9')
})

// Note

test('note Eb4 has note name Eb4', () => {
    const note = new Note('Eb4')

    const noteName = note.getNoteName()

    expect(noteName).toBe('Eb4')
})

test('note Eb4 has natural note name E', () => {
    const note = new Note('Eb4')

    const naturalNoteName = note.getNaturalNoteName()

    expect(naturalNoteName).toBe('E')
})

test('note Eb4 has alteration b', () => {
    const note = new Note('Eb4')

    const naturalNoteName = note.getAlteration()

    expect(naturalNoteName).toBe('b')
})

test('note Eb4 has octave number 4', () => {
    const note = new Note('Eb4')

    const naturalNoteName = note.getOctaveNumber()

    expect(naturalNoteName).toBe(4)
})

test('note Eb4 has diatonic value 30', () => {
    const note = new Note('Eb4')

    const diatonicValue = note.getDiatonicValue()

    expect(diatonicValue).toBe(30)
})

test('note Eb4 has chromatic value 51', () => {
    const note = new Note('Eb4')

    const chromaticValue = note.getChromaticValue()

    expect(chromaticValue).toBe(51)
})

test('invalid note Jb4 throws an error', () => {
    expect(() => {
        new Note('Jb4')
    }).toThrow('Invalid note name : Jb4')
})

test('invalid note EB4 throws an error', () => {
    expect(() => {
        new Note('EB4')
    }).toThrow('Invalid note name : EB4')
})

test('invalid note Eb throws an error', () => {
    expect(() => {
        new Note('Eb')
    }).toThrow('Invalid note name : Eb')
})

test('note by value 30, 51 has note name Eb4', () => {
    const note = Note.byValue(30, 51)

    const noteName = note.getNoteName()

    expect(noteName).toBe('Eb4')
})

test('note by value -1, 51 throws an error', () => {
    expect(() => {
        Note.byValue(-1, 51)
    }).toThrow('Note value out of range : -1, 51')
})

test('note by value 70, 51 throws an error', () => {
    expect(() => {
        Note.byValue(70, 51)
    }).toThrow('Note value out of range : 70, 51')
})

test('note by value 30, -1 throws an error', () => {
    expect(() => {
        Note.byValue(30, -1)
    }).toThrow('Note value out of range : 30, -1')
})

test('note by value 30, 120 throws an error', () => {
    expect(() => {
        Note.byValue(30, 120)
    }).toThrow('Note value out of range : 30, 120')
})

test('note Eb4 octavated by 2 octaves is Eb6', () => {
    const note = new Note('Eb4')

    const octavatedNote = note.octavateBy(2)

    expect(octavatedNote.getNoteName()).toBe('Eb6')
})

test('note Eb4 octavated to octave 6 is Eb6', () => {
    const note = new Note('Eb4')

    const octavatedNote = note.octavateToOctave(6)

    expect(octavatedNote.getNoteName()).toBe('Eb6')
})

test('note Eb4 transposed up by interval #4 returns note A4', () => {
    const note = new Note('Eb4')

    const transposedNoteName = note.transposeUp('#4').getNoteName()

    expect(transposedNoteName).toBe('A4')
})

test('note Eb4 transposed down by interval bb4 returns note B#3', () => {
    const note = new Note('Eb4')

    const transposedNoteName = note.transposeDown('bb4').getNoteName()

    expect(transposedNoteName).toBe('B#3')
})

// Chord

test('chord Eb°7 has chord name Eb°7', () => {
    const chord = Chord.byChordName('Eb°7')

    const chordName = chord.getChordName()

    expect(chordName).toBe('Eb°7')
})

test('chord Eb°7 has base octave 4', () => {
    const chord = Chord.byChordName('Eb°7')

    const baseOctave = chord.getBaseOctave()

    expect(baseOctave).toBe(4)
})

test('chord Eb°7 on octave 2 has base octave 2', () => {
    const chord = Chord.byChordName('Eb°7', 2)

    const baseOctave = chord.getBaseOctave()

    expect(baseOctave).toBe(2)
})

test('chord Eb°7 has base note Eb4', () => {
    const chord = Chord.byChordName('Eb°7')

    const baseNote = chord.getBaseNote()

    expect(baseNote.getNoteName()).toBe('Eb4')
})

test('chord Eb°7 has notes Eb4, Gb4, Bbb4 and Dbb5', () => {
    const chord = Chord.byChordName('Eb°7')

    const notes = chord.getNotes()

    expect(notes[0].getNoteName()).toBe('Eb4')
    expect(notes[1].getNoteName()).toBe('Gb4')
    expect(notes[2].getNoteName()).toBe('Bbb4')
    expect(notes[3].getNoteName()).toBe('Dbb5')
})

test('chord Eb°7 on octave 2 has notes Eb2, Gb2, Bbb2 and Dbb3', () => {
    const chord = Chord.byChordName('Eb°7', 2)

    const notes = chord.getNotes()

    expect(notes[0].getNoteName()).toBe('Eb2')
    expect(notes[1].getNoteName()).toBe('Gb2')
    expect(notes[2].getNoteName()).toBe('Bbb2')
    expect(notes[3].getNoteName()).toBe('Dbb3')
})

test('chord Eb has notes Eb4, G4, Bb4', () => {
    const chord = Chord.byChordName('Eb')

    const notes = chord.getNotes()

    expect(notes[0].getNoteName()).toBe('Eb4')
    expect(notes[1].getNoteName()).toBe('G4')
    expect(notes[2].getNoteName()).toBe('Bb4')
})

test('invalid chord Jb°7 throws an error', () => {
    expect(() => {
        const chord = Chord.byChordName('Jb°7')
    }).toThrow('Invalid chord name : Jb°7 (invalid note name)')
})

test('invalid chord Eb°78 throws an error', () => {
    expect(() => {
        const chord = Chord.byChordName('Eb°78')
    }).toThrow('Invalid chord name : Eb°78 (invalid chord qualifier)')
})

test('chord Eb°7/Gb created with notes Gb4, Bbb4, Dbb5 and Eb5 has chordName Eb°7/Gb', () => {
    const chord = Chord.byNoteNames('Eb°7/Gb', ['Gb4', 'Bbb4', 'Dbb5', 'Eb5'])

    const chordName = chord.getChordName()

    expect(chordName).toBe('Eb°7/Gb')
})

test('chord Eb°7/Gb created with notes Gb4, Bbb4, Dbb5 and Eb5 has base octave 4', () => {
    const chord = Chord.byNoteNames('Eb°7/Gb', ['Gb4', 'Bbb4', 'Dbb5', 'Eb5'])

    const baseOctave = chord.getBaseOctave()

    expect(baseOctave).toBe(4)
})

test('chord Eb°7/Gb created with notes Gb4, Bbb4, Dbb5 and Eb5 has notes Gb4, Bbb4, Dbb5 and Eb5', () => {
    const chord = Chord.byNoteNames('Eb°7/Gb', ['Gb4', 'Bbb4', 'Dbb5', 'Eb5'])

    const notes = chord.getNotes()

    expect(notes[0].getNoteName()).toBe('Gb4')
    expect(notes[1].getNoteName()).toBe('Bbb4')
    expect(notes[2].getNoteName()).toBe('Dbb5')
    expect(notes[3].getNoteName()).toBe('Eb5')
})

test('getting inversions of chord Eb°7 returns 4 chords : Eb°7/Eb, Eb°7/Gb, Eb°7/Bbb and Eb°7/Dbb', () => {
    const chord = Chord.byChordName('Eb°7')

    const inversions = chord.getInversions()

    expect(inversions.length).toBe(4)
    expect(inversions[0].getChordName()).toBe('Eb°7/Eb')
    expect(inversions[1].getChordName()).toBe('Eb°7/Gb')
    expect(inversions[2].getChordName()).toBe('Eb°7/Bbb')
    expect(inversions[3].getChordName()).toBe('Eb°7/Dbb')
})

test('getting inversions of chord Eb°7 returns as second chord notes : Gb4, Bbb4, Dbb5, Eb5', () => {
    const chord = Chord.byChordName('Eb°7')

    const inversions = chord.getInversions()
    const secondChordNotes = inversions[1].getNotes()

    expect(secondChordNotes[0].getNoteName()).toBe('Gb4')
    expect(secondChordNotes[1].getNoteName()).toBe('Bbb4')
    expect(secondChordNotes[2].getNoteName()).toBe('Dbb5')
    expect(secondChordNotes[3].getNoteName()).toBe('Eb5')
})