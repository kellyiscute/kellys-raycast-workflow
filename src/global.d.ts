declare module globalThis {
  interface IPrefs {
    clash: {
      enabled: boolean;
      host: string;
      port: string;
    };
    defaultEditor: string;
    repoSearchDir: string;
    gitlab: {
      enabled: boolean;
      addr: string;
      username: string;
      pat: string;
    };
    github: {
      enabled: boolean;
      username: string;
      pat: string;
    };
  }

  var prefs: IPrefs;
}

