const OCTAVE = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];

export const getDistanceAndNearestNote = (nodes, noteAndOctave) => {
    let [, requestedNote, requestedOctave] = /^(\w[b#]?)(\d)$/.exec(noteAndOctave);
    requestedOctave = parseInt(requestedOctave, 10);
    requestedNote = flatToSharp(requestedNote);
   
    let sample = getNearestNote(nodes, requestedNote, requestedOctave);
    let distance = getNoteDistance(requestedNote, requestedOctave, sample.note, sample.octave);

    return [distance, sample]
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
const getNearestNote = (nodes, note, octave) => {
    console.log("nodes");
    console.log(nodes);
    let sampleBank = nodes.map((node) => {
        let s = node.sampleName;
        return {note: s[0], octave: s[1] }
    })

    console.log("sampleBank");
    console.log(sampleBank);

    let sortedBank = sampleBank.slice().sort((sampleA, sampleB) => {
        let distToA = Math.abs(getNoteDistance(note, octave, sampleA.note, sampleB.octave));
        let distToB = Math.abs(getNoteDistance(note, octave, sampleB.note, sampleB.octave));
        return distToA - distToB;
    })

    return sortedBank[0];
}