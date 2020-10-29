const SAMPLE_LIBRARY = [
  {
    globalRules: {
      multiSample: false,
      modulateLpf: true,
      reverb: false
    },
    variations: [
      {
        
        variation: 0,
        rules: {},
        samples: ["children"],
        name: "children",
      },
      {
        variation: 1,
        rules: {},
        samples: ["night"],
        name: "night",
      },
      {
        variation: 2,
        rules: {},
        samples: ["ocean"],
        name: "ocean",
      },
      {
        variation: 3,
        rules: {},
        samples: ["rain"],
        name: "rain",
      },
    ],
    channelName: "BACKGROUND",
  },
  {
    globalRules: {
      multiSample: false,
      modulateLpf: true,
      reverb: false,
    },
    variations: [
      {
        variation: 0,
        rules: {},
        samples: ["pad1"],
        name: "pad1",
      },
      {
        variation: 1,
        rules: {},
        samples: ["pad2"],
        name: "pad2",
      },
      {
        variation: 2,
        rules: {},
        samples: ["pad3"],
        name: "pad3",
      },
      {
        variation: 3,
        rules: {},
        samples: ["pad4"],
        name: "pad4",
      },
    ],
    channelName: "PAD",
  },
  {
    globalRules: {
      multiSample: true,
      modulateLpf: false,
      reverb: true,
    },
    variations: [
      {
        variation: 0,
        rules: {notes: ["c", "d", "f", "g", "a"], octaves: [3, 4, 5, 6], delay: 0.3},
        samples: ["c3", "c4", "c5", "c6", "c7"],
        name: "piano",
      },
      {
        variation: 1,
        rules: {notes: ["c", "d", "f", "g", "a"], octaves: [3, 4, 5, 6], delay: 0.3},
        samples: ["c3", "c4", "c5", "c6", "c7"],
        name: "harp",
      },
      {
        variation: 2,
        rules: {notes: ["c", "d", "f", "g", "a"], octaves: [2, 3, 4, 5], delay: 0.3},
        samples: ["c2", "c3", "c4", "c5", "c6"],
        name: "mandolin",
      },
      {
        variation: 3,
        rules: {notes: ["c", "d", "f", "g", "a"], octaves: [3, 4, 5, 6], delay: 0.3},
        samples: ["c3", "c4", "c5", "c6", "c7"],
        name: "grain",
      },
    ],
    channelName: "LEAD",
  },
  {
    globalRules: {
      multiSample: true,
      modulateLpf: true,
      reverb: false,
    },
    variations: [
      {
        variation: 0,
        rules: {notes: ["c", "d", "f", "g", "a"], octaves: [2, 3, 4, 5], delay: 0.3},
        samples: ["c2", "c3", "c4", "c5", "c6"],
        name: "dolphin",
      },
      {
        variation: 1,
        rules: {notes: ["c", "d", "f", "g", "a"], octaves: [1, 2, 3, 4], delay: 0.3},
        samples: ["c1", "c2", "c3", "c4", "c5"],
        name: "whale",
      },
      {
        variation: 2,
        rules: {notes: ["c", "d", "f", "g", "a"], octaves: [1, 2, 3, 4], delay: 0.3},
        samples: ["c1", "c2", "c3", "c4", "c5"],
        name: "narval",
      },
      {
        variation: 3,
        rules: {notes: ["c", "d", "f", "g", "a"], octaves: [1, 2, 3, 4], delay: 0.3},
        samples: ["c1", "c2", "c3", "c4", "c5"],
        name: "xyxy",
      },
    ],
    channelName: "EFFECTS",
  },
];

export { SAMPLE_LIBRARY };
