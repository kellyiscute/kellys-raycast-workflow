import { ActionPanel, Action, Form, LocalStorage, useNavigation, showToast } from "@raycast/api";
import { useEffect, useState } from "react";
import { PreferencesNames } from "../constants"

export default function PrefPanel() {
  const [searchDir, setSearchDir] = useState("");
  const { pop } = useNavigation();

  const getData = async () => {
    const s = await LocalStorage.getItem<string>(PreferencesNames.REPO_SEARCH_DIR);
    setSearchDir(s ?? "");
  };

  useEffect(() => {
    getData();
  }, []);

  const savePref = async () => {
    await LocalStorage.setItem(PreferencesNames.REPO_SEARCH_DIR, searchDir)
    pop()
    showToast({ title: "Preferences Saved" })
  }

  const actions = (
    <ActionPanel>
      <Action title="Save" onAction={savePref}/>
    </ActionPanel>
  )

  return (
    <Form actions={actions}>
      <Form.TextArea
        id="searchDir"
        value={searchDir}
        onChange={(v) => setSearchDir(v)}
        title="Git Search Directories"
      />
    </Form>
  );
}
