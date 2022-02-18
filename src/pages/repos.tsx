import {Action, ActionPanel, getApplications, List, LocalStorage, open, showToast, Toast} from "@raycast/api";
import {useEffect, useState} from "react";
import {IScannedRepos} from "../actions/scan-repes";
import {PreferencesNames, StorageNames} from "../constants";

export default function ReposPage() {
  const [repos, setRepos] = useState<IScannedRepos[] | undefined>(undefined);

  const getData = async () => {
    const rawReposData = await LocalStorage.getItem<string>(StorageNames.REPOS);
    if (!rawReposData) {
      setRepos([]);
      return;
    }
    setRepos(JSON.parse(rawReposData));
  }

  useEffect(() => {
    getData();
  }, [])

  const openWithCode = async (dir: string) => {
    const appName = await LocalStorage.getItem<string>(PreferencesNames.DEFAULT_DEITOR) ?? "Visual Studio Code";
    const apps = await getApplications()
    const app = apps.find(a => a.name === appName)
    if (!app) {
      showToast({
        title: "Unable to open repo",
        message: `${appName} not found`,
        style: Toast.Style.Failure,
      })
      return;
    }
    await open(dir, app)
  }

  return (
    <List isLoading={!repos}>
      {
        repos?.map((v, i) => (
          <List.Item 
            title={v.name} 
            key={i} 
            icon="repo.png" 
            actions={
              <ActionPanel>
                <Action title="open with editor" onAction={
                  () => {
                    openWithCode(v.path)
                  }
                } />
              </ActionPanel>
            }
          />
        ))
      }
    </List>
  )
}

