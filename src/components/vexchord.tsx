import React, { Component, ReactText } from "react";
import ReactDOM from "react-dom";
import * as vexchords from "vexchords";

const wrapperStyle = {
  border: "2px blue solid",
  padding: 10,
  borderRadius: 10,
  display: "inline-block"
};

interface ChordConfig {
  value: {
    // array of [string, fret, label (optional)]
    chord: ReactText[][];
    position?: any;
    barres?: any[];
  };
  options?: {};
}

// https://github.com/0xfe/vexchords
export default class VexChordComponent extends Component {
  state: {
    x: number;
    y: number;
    // move to params?
    chords: ChordConfig[];
  };

  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      chords: [
        // Draw an open D7
        {
          value: {
            chord: [[1, 2], [2, 1], [3, 2], [4, 0], [5, "x"], [6, "x"]]
          }
        },

        // Customize size and default color
        {
          value: {
            chord: [[1, 2, 'F#'], [2, 1, 'C'], [3, 2, 'A'], [4, 0, 'D'], [5, "x"], [6, "x"]]
          },
          options: { width: 200, height: 240, defaultColor: "#745" }
        },

        // Set color of circles and bars only
        {
          value: {
            chord: [[2, 3], [3, 3], [4, 3], [6, "x"]],
            position: 5,
            barres: [{ fromString: 5, toString: 1, fret: 1 }]
          },
          options: { strokeColor: "#8a8" }
        },

        // Set colors of bridge and text only
        {
          value: {
            chord: [[1, 0], [2, 0], [6, 0]],
            position: 0,
            barres: [{ fromString: 5, toString: 3, fret: 2 }]
          },
          options: { bridgeColor: "#8a8", textColor: "#8a8" }
        },

        // Tiny chords, don't show tuning keys
        {
          value: {
            chord: [],
            position: 1,
            barres: [
              { fromString: 6, toString: 1, fret: 1 },
              { fromString: 5, toString: 3, fret: 3 }
            ]
          },
          options: {
            width: 30,
            height: 40,
            strokeColor: "#745",
            showTuning: false
          }
        }
      ]
    };
  }

  componentDidMount() {
    // const { chords } = this.props;
    const { chords } = this.state;

    chords.forEach(chord => {
      vexchords.draw("#vexchords", chord.value, chord.options);
    });
  }

  render() {
    return <div id="vexchords" ref="outer" style={wrapperStyle} />;
  }
}
