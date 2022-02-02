module.exports = {
  purge: [
    './components/**/*.js',
    './components/**/*.jsx',
    './pages/**/*.js',
    './pages/**/*.jsx',
    './layouts/**/*.js',
    './layouts/**/*.jsx'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    
    fontFamily: {
      sans: ["poppins"],
    },
    extend: {
      colors: {
        "payrue-blue": "#4594f7",
        "payrue-home-blue": "#0050FF",
        "payrue-blue-6": "#4594F705",
        "payrue-black": "#373F51",
        "payrue-gray": "#373F5166",
        "payrue-gray-60": "#373F5166",
      },
      height: {
        144: "36rem",
        175: "43rem",
      },
      width: {
        116: "29rem",
        144: "36rem",
        154: "36rem",
        175: "43rem",
        506: "31.625rem",
      },
      padding: {
        108: "27rem",
        26: "1.625rem",
        29: "1.813rem",
      },
      fontFamily: {
        poppins: ["poppins"],
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      flex: {
        0.7: "0.7",
      },
    },
  },
  variants: {
    extend: {
      borderRadius: ["hover", "focus"],
    },
  },
  plugins: [],
};
