import {List, LocalStorage} from "@raycast/api";
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

  return (
    <List isLoading={!repos}>
      {
        repos?.map((v, i) => (
          <List.Item title={v.name} key={i} icon="repo.png" />
        ))
      }
    </List>
  )
}

