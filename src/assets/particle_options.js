
const particle_options = {
  background: {
    color: {
      value: "#00",
    },
  },
  fpsLimit: 60,
  interactivity: {
    detectsOn: "canvas",
    events: {
      onClick: {
        enable: false,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "bubble",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 200,
        duration: 2,
        opacity: 0.8,
        size: 4,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#0000",
    },
    links: {
      color: "#000",
      distance: 200,
      enable: true,
      opacity: 0.2,
      width: 0.5,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 0.5,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 3,
    },
  },
  detectRetina: false,
}

export default particle_options;