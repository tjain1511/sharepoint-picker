import React, { useEffect } from "react";
import loadScript from "load-script";
const MICROSOFT_FILE_PICKER_URL = "https://js.live.net/v7.2/OneDrive.js";
//  const delay = (ms = 100) => {
//   return new Promise((resolve) =>
//     setTimeout(() => {
//       resolve();
//     }, ms)
//   );
// };

function SharePointPicker() {
  useEffect(() => {
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
  }, []);

  const launchSharepointPicker = () => {
    const odOptions = {
      clientId: "df86501c-017e-42a6-8ef4-c4f3aa344452",
      action: "query",
      multiSelect: true,
      success: onSucces,
      advanced: {
        redirectUri: `${window.location.origin}/sso/microsoft`,
        isConsumerAccount: false,
      },
      cancel: onCancel,
      error: function (error) {
        console.error("Error launching SharePoint picker:", error);
      },
    };
    window.OneDrive.open(odOptions);
  };
  const onSucces = (data) => {
    console.log(data);
  };
  const onCancel = () => {};
  console.log("Sharepoint picker");
  return (
    <div
      onClick={() => {
        launchSharepointPicker();
      }}
    >
      Launch SharePointPicker
    </div>
  );
}

export default SharePointPicker;
