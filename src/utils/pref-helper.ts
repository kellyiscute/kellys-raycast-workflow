import { LocalStorage } from "@raycast/api"
import { PreferencesNames } from "../constants"

interface IStorageMap<ST = unknown, T = ST> {
  storageName: string;
  default?: T | ((v: ST) => T);
}

const prefStorageMapping: { [k: string]: IStorageMap<any> } = {
  "clash.enabled": {
    storageName: PreferencesNames.CLASH_CONTROLLER_ENABLED,
    default: (v) => v === 1,
  } as IStorageMap<number, boolean>,
  "clash.host": {
    storageName: PreferencesNames.CLASH_CONTROLLER_HOST,
    default: "127.0.0.1",
  } as IStorageMap<string>,
  "clash.port": {
    storageName: PreferencesNames.CLASH_CONTROLLER_PORT,
    default: "9090",
  } as IStorageMap<string>,

  "defaultEditor": {
    storageName: PreferencesNames.DEFAULT_DEITOR,
    default: "Visual Studio Code",
  } as IStorageMap<string>,
  "repoSearchDir": {
    storageName: PreferencesNames.REPO_SEARCH_DIR,
    default: "",
  } as IStorageMap<string>,

  "gitlab.enabled": {
    storageName: PreferencesNames.GITLAB_ENABLED,
    default: (v) => v === 1, 
  } as IStorageMap<number, boolean>,
  "gitlab.addr": {
    storageName: PreferencesNames.GITLAB_ADDR,
    default: "https://gitlab.com",
  } as IStorageMap<string>,
  "gitlab.username": {
    storageName: PreferencesNames.GITLAB_USER,
    default: "",
  } as IStorageMap<string>,
  "gitlab.pat": {
    storageName: PreferencesNames.GITLAB_PAT,
    default: "",
  } as IStorageMap<string>,
  
  "github.enabled": {
    storageName: PreferencesNames.GITHUB_ENABLED,
    default: (v) => v === 1, 
  } as IStorageMap<number, boolean>,
  "github.username": {
    storageName: PreferencesNames.GITHUB_USER,
    default: "",
  } as IStorageMap<string>,
  "github.pat": {
    storageName: PreferencesNames.GITHUB_PAT,
    default: "",
  } as IStorageMap<string>,
  
}

export function readObj<T = any>(path: string, obj: any): T {
  const items = path.split(".");
  for (const item of items) {
    obj = obj[item];
  }

  return obj;
}

export function setObj(path: string, obj: any, value: any) {
  const items = path.split(".");

  for (let i=0; i < items.length - 1; i++) {
    if (!obj[items[i]]) {
      obj[items[i]] = {};
    }
    obj = obj[items[i]];
  }

  obj[items[items.length-1]] = value;
}

const getDefault = (raw: any, config: IStorageMap) => {
  if (typeof config.default !== "undefined") {
    if (typeof config.default === "function") {
      return config.default(raw);
    } else {
      return config.default;
    }
  } else {
    return raw;
  }
}

export const loadPrefs = async () => {
  const pref = {};

  const promises = Object.entries(prefStorageMapping).map(async ([path, config]) => {
    const rawValue = await LocalStorage.getItem<any>(config.storageName);
    setObj(path, pref, getDefault(rawValue, config));
  })

  await Promise.all(promises);

  globalThis.prefs = pref as any;
  console.log(pref)
}

export const savePrefs = async () => {
  const promises = Object.entries(prefStorageMapping).map(async ([path, config]) => {
    await LocalStorage.setItem(config.storageName, readObj(path, getDefault(globalThis.prefs, config.default)));
  });

  await Promise.all(promises);
}

