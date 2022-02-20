import { PreferencesNames } from "../constants";

type defaultFunction<ST, T = ST> = (raw: ST) => T;

type map = { [name: string]: IPreferenceItem } 

type PreferenceWidgetType = "TextField" | "TextArea" | "Checkbox" | "Dropdown";

// ST = StorageType, T = Real Type
type IPreferenceItem<ST = any, T = ST> = {
  isSection?: false;
  storageName: string;
  displayName: string;
  widget: PreferenceWidgetType;
  default?: T | defaultFunction<ST, T>;
  inputValidator?: (v: string) => boolean;
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
  }
}

