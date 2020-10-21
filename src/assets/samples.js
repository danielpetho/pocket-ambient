const SAMPLE_LIBRARY = [
  {
    variations: [
      { variation: 0, rules: {}, samples: ["children"], name: "" },
      { variation: 1, rules: {}, samples: ["night" ], name: "" },
      { variation: 2, rules: {}, samples: ["ocean"], name: ""},
      { variation: 3, rules: {}, samples: ["rain"], name: "" },
    ],
    channelName: "BACKGROUND",
  },
  {
    variations: [
      { variation: 0, rules: {}, samples: ["pad1"], name: ""},
      { variation: 1, rules: {}, samples: ["pad2"], name: "" },
      { variation: 2, rules: {}, samples: ["pad3" ], name: "" },
      { variation: 3, rules: {}, samples: ["pad4"], name: ""},
    ],
    channelName: "PAD",
  },
  {
    variations: [
      { variation: 0, rules: {}, samples: ["c3", "c4", "c5", "c6", "c7"], name: ""},
      { variation: 1, rules: {}, samples: ["c3", "c4", "c5", "c6", "c7"], name: "" },
      { variation: 2, rules: {}, samples: ["c2", "c3", "c4", "c5", "c6"], name: "" },
      { variation: 3, rules: {}, samples: ["c3", "c4", "c5", "c6", "c7"], name: ""},
    ],
    channelName: "LEAD",
  },
  {
    variations: [
      { variation: 0, rules: {}, samples: ["c2", "c3", "c4", "c5", "c6"], name: ""},
      { variation: 1, rules: {}, samples: ["c1", "c2", "c3", "c4", "c5"], name: "" },
      { variation: 2, rules: {}, samples: ["c1", "c2", "c3", "c4", "c5"], name: ""},
      { variation: 3, rules: {}, samples: ["c1", "c2", "c3", "c4", "c5"], name: "" },
    ],
    channelName: "EFFECTS",
  },
];

export { SAMPLE_LIBRARY };
