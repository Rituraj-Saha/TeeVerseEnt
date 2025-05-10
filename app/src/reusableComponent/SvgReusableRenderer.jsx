import React from "react";
import parse from "html-react-parser";

const SvgStringRenderer = (props) => {
  const { svgString, width = "100%", height = "100%" } = props;
  if (!svgString) return null;
  const cleanedSvg = svgString
    .replace(/<\?xml.*?\?>/, "")
    .replace(/<!--.*?-->/g, "");
  return (
    <div
      style={{ height: height, width: width }}
      dangerouslySetInnerHTML={{ __html: cleanedSvg }}
    ></div>
  );
};

export default SvgStringRenderer;
