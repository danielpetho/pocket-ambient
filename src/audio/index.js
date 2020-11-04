const OCTAVE = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];

const getSample = (nodes, noteAndOctave) => {
    let [, requestedNote, requestedOctave] = /^(\w[b#]?)(\d)$/.exec(noteAndOctave);
    requestedOctave = parseInt(requestedOctave, 10);
    requestedNote = flatToSharp(requestedNote);
    let sample = getNearestSample(nodes, requestedNote, requestedOctave);
    let distance = getNoteDistance(requestedNote, requestedOctave, sample.note, sample.octave);
}



const flatToSharp = (note) => {
    switch (note) {
      case 'bb': return 'a#';
      case 'db': return 'c#';
      case 'eb': return 'd#';
      case 'gb': return 'f#';
      case 'ab': return 'g#';
      default:   return note;
    }
  }

const noteValue = (note, octave) => {
    return octave * 12 + OCTAVE.indexOf(note);
}

const getNoteDistance = (note1, octave1, note2, octave2) => {
    return noteValue(note1, octave1) - noteValue(note2, octave2);
}

/**
 * You have to pass the variation nodes as nodes
 */
const getNearestSample = (nodes, note, octave) => {
    let sampleBank = nodes.map((node) => {
        let s = node.sampleName.slice(0, node.sampleName.length - 4);
        return {note: s.slice(0), octave: s.slice(1) }
    })

    let sortedBank = sampleBank.slice().sort((sampleA, sampleB) => {
        let distToA = Math.abs(getNoteDistance(note, octave, sampleA.note, sampleB.octave));
        let distToB = Math.abs(getNoteDistance(note, octave, sampleB.note, sampleB.octave));
        return distToA - distToB;
    })

    return sortedBank[0];
}