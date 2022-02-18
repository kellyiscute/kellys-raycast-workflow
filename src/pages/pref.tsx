import { ActionPanel, Action, Form, LocalStorage, useNavigation, showToast, Application, getApplications } from "@raycast/api";
import React, {useEffect, useReducer, useState} from "react";
import { PreferencesNames } from "../constants"

interface IPrefPanelState {
  searchDir: string;
  clashHost: string;
  clashPort: string;
  clashEnabled: boolean;
  applications: Application[];
  defaultApplication: string;
}

enum ReducerActionsType {
  INIT,
  SEARCH_DIR,
  CLASH_HOST,
  CLASH_PORT,
  CLASH_ENDABLED,
}

interface ReducerAction {
  state: Partial<IPrefPanelState>;
}

const reducer: React.Reducer<IPrefPanelState, ReducerAction> = (state, ReducerAction) => {
  return {...state, ...ReducerAction.state};
}

export default function PrefPanel() {
  const [state, dispatch] = useReducer(reducer, {
    searchDir: "",
    clashHost: "",
    clashPort: "",
    clashEnabled: false,
    applications: [],
    defaultApplication: "",
  })
  const [loaded, setLoaded] = useState(false);

  const { searchDir, clashHost, clashEnabled, clashPort } = state;

  const { pop } = useNavigation();

  const getData = async () => {
    const searchDir = await LocalStorage.getItem<string>(PreferencesNames.REPO_SEARCH_DIR);
    const clashHost = await LocalStorage.getItem<string>(PreferencesNames.CLASH_CONTROLLER_HOST);
    const clashPort = await LocalStorage.getItem<string>(PreferencesNames.CLASH_CONTROLLER_PORT);
    const clashEnabled = (await LocalStorage.getItem<number>(PreferencesNames.CLASH_CONTROLLER_ENABLED)) === 1 ? true : false;
    const defaultApplication = (await LocalStorage.getItem<string>(PreferencesNames.DEFAULT_DEITOR)) ?? "Visual Studio Code";
    const applications = await getApplications();
    dispatch({
      state: {
        clashHost,
        clashPort,
        clashEnabled,
        searchDir,
        applications,
        defaultApplication,
      }
    })
    setLoaded(true);
  };

  useEffect(() => {
    getData();
  }, []);

  const savePref = async () => {
    await LocalStorage.setItem(PreferencesNames.REPO_SEARCH_DIR, searchDir)
    await LocalStorage.setItem(PreferencesNames.CLASH_CONTROLLER_HOST, clashHost)
    await LocalStorage.setItem(PreferencesNames.CLASH_CONTROLLER_PORT, clashPort)
    await LocalStorage.setItem(PreferencesNames.CLASH_CONTROLLER_ENABLED, clashEnabled)
    await LocalStorage.setItem(PreferencesNames.DEFAULT_DEITOR, state.defaultApplication)
    pop()
    showToast({ title: "Preferences Saved" })
  }

  const actions = (
    <ActionPanel>
      <Action title="Save" onAction={savePref}/>
    </ActionPanel>
  )

  const onClashPortChange = (v: string) => {
    const allNum = /^\d+$/.test(v);
    if (!allNum) {
      return;
    }
    const num = Number.parseInt(v);
    if (num >= 1024 && num < 65535) {
      dispatch({
        state: {
          clashPort: v,
        }
      });
    }
  }

  const onClashEnabledChange = (v: boolean) => {
    dispatch({
      state: {
        clashEnabled: v,
      }
    })
  }

  const onClashHostChange = (v: string) => {
    dispatch({
      state: {
        clashHost: v,
      }
    })
  }

  const onSearchDirChange = (v: string) => {
    dispatch({
      state: {
        searchDir: v,
      }
    })
  }

  const onDefaultAppChange = (v: string) => {
    dispatch({
      state: {
        defaultApplication: v,
      }
    })
  }

  return loaded ? (
    <Form actions={actions}>
      <Form.Description text="Clash Proxy Control Configurations" />
      <Form.Checkbox id="clashEnabled" label="Use Clash Controller" value={clashEnabled} onChange={onClashEnabledChange} />
      {
        clashEnabled ? 
        (
          <>
            <Form.TextField id="clashhost" title="Clash Controller Host" value={clashHost} onChange={onClashHostChange} />
            <Form.TextField id="clashport" title="Clash Controller Port" value={clashPort} onChange={onClashPortChange} />
          </>
        ) :
        null
      }

      <Form.Description text="Default Editor App" />
      <Form.Dropdown id="Default Editor" onChange={onDefaultAppChange} value={state.defaultApplication}>
        {
          state.applications.map((v, i) => (
            <Form.Dropdown.Item key={i} title={v.name} value={v.name} />
          ))
        }
      </Form.Dropdown>

      <Form.Description text="Git Repository Search Configurations" />
      <Form.TextArea
        id="searchDir"
        value={searchDir}
        onChange={onSearchDirChange}
        title="Git Search Directories"
      />
    </Form>
  ) : null;
}

