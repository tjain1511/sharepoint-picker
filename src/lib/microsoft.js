import { UserAgentApplication, InteractionRequiredAuthError } from "msal";
import * as msal from "@azure/msal-browser";
const consoleError = console.error;
const MICROSOFT_SCOPES = [
  "files.read.all",
  "user.read",
  "OnlineMeetings.ReadWrite",
  "Calendars.ReadWrite",
];

class Microsoft {
  constructor() {
    console.log("microoft lib");
    if (!Microsoft.instance) {
      console.log("microoft new instance");
      const msalConfig = {
        auth: {
          clientId: "df86501c-017e-42a6-8ef4-c4f3aa344452",
          redirectUri: `${window.location.origin}`,
        },
      };
      // if (false) {
      //   this.userAgentApplication = new msal.PublicClientApplication(
      //     msalConfig
      //   );
      // } else {
      // }
      this.userAgentApplication = new UserAgentApplication(msalConfig);

      Microsoft.instance = this;
    }
    return Microsoft.instance;
  }

  loginPopup = async ({ successCallback, failureCallback }) => {
    const loginRequest = {
      scopes: MICROSOFT_SCOPES,
      prompt: "select_account",
    };
    false && (await this.userAgentApplication.initialize());
    return this.userAgentApplication
      .loginPopup(loginRequest)
      .then((params) => {
        return this.getUserProfile({
          successCallback,
          failureCallback,
          selectedAccount: params,
        });
      })
      .catch((error) => {
        consoleError("ERROR_DURING_MIRCROSOFT_LOGIN_POPUP", error);
        return failureCallback(error);
      });
  };

  async getUserProfile({ successCallback, failureCallback, selectedAccount }) {
    try {
      const accounts = this.userAgentApplication.getAllAccounts();
      let account = accounts[0];

      if (selectedAccount) {
        const accountIdentifier = selectedAccount.get(
          selectedAccount,
          "account.accountIdentifier"
        );
        if (accountIdentifier) {
          const selectedAccount = accounts.find(accounts, (account) => {
            return account.accountIdentifier === accountIdentifier;
          });

          if (selectedAccount) {
            account = selectedAccount;
          }
        }
      }
      const request = {
        account,
        scopes: MICROSOFT_SCOPES,
      };
      let response;
      try {
        response = await this.userAgentApplication.acquireTokenSilent(request);
      } catch (err) {
        consoleError("ERROR_DURING_MIRCROSOFT_LOGIN", err);
        if (
          err instanceof msal.InteractionRequiredAuthError ||
          err instanceof InteractionRequiredAuthError ||
          err.get(err, "name") === "InteractionRequiredAuthError"
        ) {
          response = await this.userAgentApplication.acquireTokenPopup(request);
        } else {
          throw err;
        }
      }

      if (response) {
        if (successCallback) {
          successCallback(response.accessToken);
        }
      } else {
        if (failureCallback) {
          failureCallback();
        }
      }
    } catch (err) {
      if (failureCallback) {
        failureCallback();
      }
      consoleError(err);
    }
  }

  logout = async () => {
    // this.userAgentApplication.logout();
  };
}

const instance = new Microsoft();
Object.freeze(instance);

export default instance;
