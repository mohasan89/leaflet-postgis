import React, { useState } from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";

const SketchExample = ({ color, stateFunc, opacity, setOpacity }) => {
  const hexToRGBA = (hex, opacity) => {
    return (
      "rgba(" +
      (hex = hex.replace("#", ""))
        .match(new RegExp("(.{" + hex.length / 3 + "})", "g"))
        .map(function (l) {
          return parseInt(hex.length % 2 ? l + l : l, 16);
        })
        .concat(isFinite(opacity) ? opacity : 1)
        .join(",") +
      ")"
    );
  };

  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    setOpacity(color.rgb.a);
    stateFunc(color.hex);
  };

  const styles = reactCSS({
    default: {
      color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `${color}`,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  return (
    <div>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {displayColorPicker ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <SketchPicker color={hexToRGBA(color, opacity)} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default SketchExample;
