import React, { Component } from "react";
import ReactDOM from "react-dom";

const vextab = require("vextab");

const VexTab = vextab.VexTab;
const Artist = vextab.Artist;
console.log(vextab,)
debugger;
const Renderer = vextab.Vex.Flow.Renderer;

export default class VexTabComponent extends Component {
  state: {
    x: number;
    y: number;
  };

  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0
    };
  }

  componentDidMount() {
    const svgContainer = document.createElement("div");
    const { notes } = this.props;

    // var vf = new VF.Factory({
    //   renderer: { elementId: svgContainer, width: 600, height: 100 }
    // });

    // Create VexFlow Renderer from canvas element with id #boo.
    const renderer = new Renderer(
      ReactDOM.findDOMNode("#boo"),
      Renderer.Backends.CANVAS
    );

    // For SVG, you can use the following line (make sure #boo is a div element)
    // renderer = new Renderer($('#boo')[0], Renderer.Backends.SVG);

    // Initialize VexTab artist and parser.
    const artist = new Artist(10, 10, 600, { scale: 0.8 });
    const vextab = new VexTab(artist);

    try {
      // Parse VexTab music notation passed in as a string.
      vextab.parse("tabstave notation=true\n notes :q 4/4\n");

      // Render notation onto canvas.
      artist.render(renderer);
    } catch (e) {
      console.log(e);
    }

    this.refs.outer.appendChild(svgContainer);
  }

  render() {
    return (
      <div
        ref="outer"
        style={{
          border: "2px blue solid",
          padding: 10,
          borderRadius: 10,
          display: "inline-block"
        }}
      />
    );
  }
}
