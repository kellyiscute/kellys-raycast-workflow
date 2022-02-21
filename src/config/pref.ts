import { PreferencesNames } from "../constants";

type defaultFunction<ST, T = ST> = (raw: ST) => T;

type map = { [name: string]: IPreferenceItem } 

type PreferenceWidgetType = "TextField" | "TextArea" | "Checkbox" | "Dropdown" | "Password";

// ST = StorageType, T = Real Type
type IPreferenceItem<ST = any, T = ST> = {
  isSection?: false;
  storageName: string;
  displayName: string;
  widget: PreferenceWidgetType,
  default?: T | defaultFunction<ST, T>;
  inputValidator?: (v: string) => boolean;
  dropdownItemsLoader?: () => void;
} | {
  isSection: true;
  displayName: string;
  children: map;
}

export const preferencesConfig: map = {
  "clash": {
    isSection: true,
    displayName: "Clash Controller Configurations",
    children: {
      "enabled": {
        storageName: PreferencesNames.CLASH_CONTROLLER_ENABLED,
        displayName: "Enable Clash Controller",
        widget: "Checkbox",
        default: (v) => v === 1,
      } as IPreferenceItem<number, boolean>,
      "host": {
        storageName: PreferencesNames.CLASH_CONTROLLER_HOST,
        displayName: "Clash Controller Host",
        widget: "TextField",
        default: "127.0.0.1",
      } as IPreferenceItem<string>,
      "port": {
        storageName: PreferencesNames.CLASH_CONTROLLER_PORT,
        displayName: "Clash Controller Port",
        widget: "TextField",
        default: "9090",
        inputValidator: (v) => /^\d*$/.test(v) && Number.parseInt(v) < 95535 && Number.parseInt(v) > 1024,
      } as IPreferenceItem<string>,
    },
  },

  "defaultEditor": {
    storageName: PreferencesNames.DEFAULT_DEITOR,
    displayName: "Default Project Editor",
    widget: "Dropdown",
    default: "Visual Studio Code",
    dropdownItemsLoader: () => null
  },
  "repoSearchDir": {
    storageName: PreferencesNames.REPO_SEARCH_DIR,
    displayName: "Repository Search Dir",
    widget: "TextField",
    default: "",
  },

  "gitlab": {
    isSection: true,
    displayName: "Gitlab Configurations",
    children: {
      "enabled": {
        storageName: PreferencesNames.GITLAB_ENABLED,
        displayName: "Enable Gitlab Integration",
        widget: "Checkbox",
        default: (v) => v === 1,
      } as IPreferenceItem<number, boolean>,
      "addr": {
        storageName: PreferencesNames.GITLAB_ADDR,
        displayName: "Gitlab Address",
        widget: "TextField",
        default: "https://gitlab.com",
      },
      "username": {
        storageName: PreferencesNames.GITLAB_USER,
        displayName: "Username",
        widget: "TextField",
        default: ""
      },
      "pat": {
        storageName: PreferencesNames.GITLAB_PAT,
        displayName: "Personal Access Token",
        widget: "Password",
        default: "",
      }
    },
  },

  "github": {
    isSection: true,
    displayName: "GitHub Configurations",
    children: {
      "enabled": {
        storageName: PreferencesNames.GITHUB_ENABLED,
        displayName: "Enable GitHub Integration",
        widget: "Checkbox",
        default: (v) => v === 1
      } as IPreferenceItem<number, boolean>,
      "username": {
        storageName: PreferencesNames.GITHUB_USER,
        displayName: "GitHub User",
        widget: "TextField",
        default: "",
      },
      "pat": {
        storageName: PreferencesNames.GITHUB_PAT,
        displayName: "Personal Access Token",
        widget: "Password",
        default: "",
      }
    }
  }
}

