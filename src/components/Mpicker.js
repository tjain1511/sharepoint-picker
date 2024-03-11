import React, { useEffect } from "react";
import loadScript from "load-script";

const MICROSOFT_FILE_PICKER_URL = "https://js.live.net/v7.2/OneDrive.js";

const delay = (ms = 100) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, ms)
  );
};

function Mpicker() {
  if (!document.getElementById("microsoftFilePickerScript")) {
    loadScript(
      MICROSOFT_FILE_PICKER_URL,
      { attrs: { id: "microsoftFilePickerScript" } },
      (err) => {
        if (err) {
          console.error("Failed to laod script: ", err);
        }
      }
    );
  }
  console.log("M picker");
  return <div>Mpicker</div>;
}

export default Mpicker;
