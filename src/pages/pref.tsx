import { ActionPanel, Action, Form, LocalStorage, useNavigation, showToast } from "@raycast/api";
import {useEffect, useState} from "react";
import { PreferencesNames } from "../constants"

export default function PrefPanel() {
  const [searchDir, setSearchDir] = useState<string>("");
  const [clashHost, setClashHost] = useState<string>("");
  const [clashPort, setClashPort] = useState<string>("");
  const { pop } = useNavigation();

  const getData = async () => {
    const s = await LocalStorage.getItem<string>(PreferencesNames.REPO_SEARCH_DIR);
    const h = await LocalStorage.getItem<string>(PreferencesNames.CLASH_CONTROLLER_HOST);
    const p = await LocalStorage.getItem<string>(PreferencesNames.CLASH_CONTROLLER_PORT);
    setSearchDir(s ?? "");
    setClashHost(h ?? "127.0.0.1");
    setClashPort(p ?? "9090");
    showToast({ title: `${h}:${p}` })
  };

  useEffect(() => {
    getData();
  }, []);

  const savePref = async () => {
    await LocalStorage.setItem(PreferencesNames.REPO_SEARCH_DIR, searchDir)
    await LocalStorage.setItem(PreferencesNames.CLASH_CONTROLLER_HOST, clashHost)
    await LocalStorage.setItem(PreferencesNames.CLASH_CONTROLLER_PORT, clashPort)
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
      setClashPort(clashPort);
    }
    const num = Number.parseInt(v);
    if (num >= 1024 && num < 65535) {
      setClashPort(v);
    }
  }

  return (
    <Form actions={actions}>
      <Form.Description text="Clash Proxy Control Configurations" />
      <Form.TextField id="clashhost" title="Clash Controller Host" value={clashHost} onChange={setClashHost}/>
      <Form.TextField id="clashport" title="Clash Controller Port" value={clashPort} onChange={onClashPortChange}/>
      <Form.Description text="Git Repository Search Configurations" />
      <Form.TextArea
        id="searchDir"
        value={searchDir}
        onChange={(v) => setSearchDir(v)}
        title="Git Search Directories"
      />
    </Form>
  );
}
