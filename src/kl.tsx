import { Action, ActionPanel, Icon, List, LocalStorage, showToast, Toast, useNavigation } from "@raycast/api";
import { scanRepos } from "./actions/scan-repes";
import Actions from "./components/actions";
import Summary from "./components/summary";
import {StorageNames} from "./constants";
import PrefPanel from "./pages/pref";

export default function KellyWorkflow() {
  const { push } = useNavigation();

  const openPreferencesAction = (
    <ActionPanel>
      <Action title="Open" onAction={() => push(<PrefPanel />)} />
    </ActionPanel>
  );

  const doScanRepos = async () => {
    const dirs = await LocalStorage.getItem<string>("pref.searchDir");
    if (!dirs) {
      showToast({ title: "Scan Repos Failed", message: "No scan dirs set" });
      return;
    } else {
      try {
        const toast = await showToast({ title: "Scanning repos...", style: Toast.Style.Animated });
        const result = await scanRepos(dirs.split("\n"));
        await LocalStorage.setItem(StorageNames.REPOS, JSON.stringify(result));
        toast.style = Toast.Style.Success;
        toast.title = `Found ${result.length} repos`
      } catch (e) {
        showToast({ title: "Unable to scan repos", message: `Error: \n${e}`, style: Toast.Style.Failure })
      }
    }
  };

  const scanReposAction = (
    <ActionPanel>
      <Action title="Scan Repos" onAction={doScanRepos} />
    </ActionPanel>
  );

  return (
    <List>
      <Summary />
      <Actions />
      <List.Section title="Preferences">
        <List.Item title="Open Preferences" icon={Icon.Gear} actions={openPreferencesAction} />
        <List.Item title="Scan Repos" icon={Icon.MagnifyingGlass} actions={scanReposAction} />
      </List.Section>
    </List>
  );
}
