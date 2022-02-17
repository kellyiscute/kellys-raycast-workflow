import {List, Icon, useNavigation, ActionPanel, Action} from "@raycast/api";
import ReposPage from "../pages/repos";

export default function Actions() {
  const { push } = useNavigation();

  const gotoRepoAction = (
    <ActionPanel>
      <Action title="Goto Repo" onAction={() => push(<ReposPage />)} />
    </ActionPanel>
  )

  return (
    <List.Section>
      <List.Item title="Goto Repo" icon={{source: "repo.png"}} actions={gotoRepoAction} />
    </List.Section>
  )
}

