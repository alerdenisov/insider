/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
const color = require('color');
const humanReadable = {
  0: 'darkest',
  1: 'darken',
  2: 'dark',
  3: 'default',
  4: 'light',
  5: 'lighten',
  6: 'lightest',
}

function makeGradient(pure, lighten = 0.15, rotate = 1.8) {
  const steps = 3;
  return Array(steps * 2 + 1)
    .fill(0)
    .map((_, index) =>
      color(pure)
        .lighten(lighten * (index - steps))
        .rotate(rotate * (index - steps))
        .rgb()
        .string())
    .reduce((dict, color, index) =>
      (
        dict[(index + 1) * 100] = color,
        dict[humanReadable[index]] = color,
        dict
      ),
      {});
}
function relative(map) {
  return Object.entries(map).reduce((dict, [key, value]) => (
    dict[key] = value,
    dict[key + '-em'] = typeof value === 'string' && value.endsWith('rem') ? value.substring(0, value.length - 3) + 'em' : undefined,
    dict
  ), {})
}

module.exports = {
  theme: {
    extend: {
      colors: {
        grey: {
          "darkest": "#303133",
          "darker": "#9097a0",
          "dark": "#70818a",
          default: "#b8bec6",
          "light": "#dae4e9",
          "lighter": "#eaedf0",
          "lightest": "#f6f8fa",
        },

        white: "#ffffff",

        red: {
          "darkest": "#420806",
          "darker": "#6a1b19",
          "dark": "#cc1f1a",
          default: "#e3342f",
          "light": "#ef5753",
          "lighter": "#f9acaa",
          "lightest": "#fcebea",
        },

        orange: {
          "darkest": "#542605",
          "darker": "#7f4012",
          "dark": "#de751f",
          default: "#f6993f",
          "light": "#faad63",
          "lighter": "#fcd9b6",
          "lightest": "#fff5eb",
        },

        yellow: {
          "darkest": "#453411",
          "darker": "#684f1d",
          "dark": "#f2d024",
          default: "#ffed4a",
          "light": "#fff382",
          "lighter": "#fff9c2",
          "lightest": "#fcfbeb",
        },

        green: {
          "darkest": "#032d19",
          "darker": "#0b4228",
          "dark": "#1f9d55",
          default: "#38c172",
          "light": "#51d88a",
          "lighter": "#a2f5bf",
          "lightest": "#e3fcec"
        },

        teal: {
          "darkest": "#0d3331",
          "darker": "#174e4b",
          "dark": "#38a89d",
          default: "#4dc0b5",
          "light": "#64d5ca",
          "lighter": "#a0f0ed",
          "lightest": "#e8fffe",
        },

        blue: {
          "darkest": "#05233b",
          "darker": "#103d60",
          "dark": "#2779bd",
          default: "#236bbf",
          "light": "#6cb2eb",
          "lighter": "#bcdefa",
          "lightest": "#eff8ff"
        },

        indigo: {
          "darkest": "#191e38",
          "darker": "#2f365f",
          "dark": "#5661b3",
          default: "#6574cd",
          "light": "#7886d7",
          "lighter": "#b2b7ff",
          "lightest": "#e6e8ff",
        },
        purple: {
          "darkest": "#1f133f",
          "darker": "#352465",
          "dark": "#794acf",
          default: "#9561e2",
          "light": "#a779e9",
          "lighter": "#d6bbfc",
          "lightest": "#f3ebff"
        },

        pink: {
          "darkest": "#45051e",
          "darker": "#72173a",
          "dark": "#eb5286",
          default: "#f66d9b",
          "light": "#fa7ea8",
          "lighter": "#ffbbca",
          "lightest": "#ffebef"
        },
        // "night-blue": makeGradient("#1f2144"),
        // orange: makeGradient("#ff8257"),
        // blue: makeGradient("#8073eb"),
        // aspid: makeGradient("#5E63BF"),
        // yellow: makeGradient("#FFC064"),
        wheat: "#F0DED5"
      }
    },
    screens: {
      xs: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1440px"
    },
    margin: relative({
      "none": 0,
      "auto": "auto",
      "xxl": "4rem",
      "xl": "2.5rem",
      "l": "2rem",
      "m": "1.5rem",
      "s": "1rem",
      "xs": "0.5rem",
      "xxs": "0.25rem",
      "minus-xxl": "-4rem",
      "minus-xl": "-2.5rem",
      "minus-l": "-2rem",
      "minus-m": "-1.5rem",
      "minus-s": "-1rem",
      "minus-xs": "-0.5rem",
      "minus-xxs": "-0.25rem"
    }),
    padding: relative({
      "none": 0,
      "xxl": "4rem",
      "xl": "2.5rem",
      "l": "2rem",
      "m": "1.5rem",
      "s": "1rem",
      "xs": "0.5rem",
      "xxs": "0.25rem"
    }),
    fontFamily: {
      sans: [
        "Montserrat"
      ],
      serif: [
        "serif"
      ],
      mono: [
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace"
      ]
    },
    fontSize: {
      xs: ".75rem", // 12px
      sm: ".875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      xxl: "1.5rem", // 24px
      xl3: "2rem", // 32px
      xl4: "2.5rem", // 40px
      xl5: "3.5rem", // 56px,
      xl6: "4.5rem", // 56px,
    }
  },
  variants: {},
  plugins: []
}

