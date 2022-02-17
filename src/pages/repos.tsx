import {Action, ActionPanel, getApplications, List, LocalStorage, open, showToast, Toast} from "@raycast/api";
import {useEffect, useState} from "react";
import {IScannedRepos} from "../actions/scan-repes";
import {StorageNames} from "../constants";

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
    const apps = await getApplications()
    const vscode = apps.find(a => a.name === "Visual Studio Code")
    if (!vscode) {
      showToast({
        title: "Unable to open repo",
        message: "vscode not found",
        style: Toast.Style.Failure,
      })
      return;
    }
    await open(dir, vscode)
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

