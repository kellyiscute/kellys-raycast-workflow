import { Action, ActionPanel, Icon, List, LocalStorage, showToast, Toast } from "@raycast/api";
import { useEffect, useState } from "react";
import * as clash from "../actions/clash";
import {PreferencesNames} from "../constants";

interface ISummaryProps {
  onLoaded?: () => void;
}

export default function Summary({ onLoaded }: ISummaryProps) {
  const [proxyMode, setProxyMode] = useState<string>("");
  const [clashEnabled, setClashEnabled] = useState<boolean>();
  const [loaded, setLoaded] = useState(false);

  const switchMode = async () => {
    if (!proxyMode) {
      showToast({
        title: "not ready",
        style: Toast.Style.Failure,
      });
      return;
    }

    if (proxyMode === "Global") {
      await clash.switchMode("direct");
      showToast({
        title: "mode switched to Direct",
        style: Toast.Style.Success,
      });
    } else {
      await clash.switchMode("global");
      await showToast({
        title: "mode switched to Global",
        style: Toast.Style.Success,
      });
    }

    await getData();
  };

  const getData = async () => {
    const proxy = await clash.getProxyMode();
    const clashEnabledPref = await LocalStorage.getItem<boolean>(PreferencesNames.CLASH_CONTROLLER_ENABLED);
    setClashEnabled(clashEnabledPref ?? true);
    setProxyMode(proxy);
    setLoaded(true);
    onLoaded && onLoaded();
  };

  useEffect(() => {
    void getData();
  }, []);

  return loaded ? (
    <List.Section title="Summary">
      {
        clashEnabled ? 
          <List.Item
            title="ProxyMode"
            icon={Icon.Globe}
            accessoryTitle={proxyMode ?? ""}
            actions={
              <ActionPanel>
                <Action title="ChangeMode" onAction={switchMode} />
              </ActionPanel>
            }
          />
        :
          null
      }

      <List.Item title="Nothing" icon={Icon.Text} subtitle="Nvim" accessoryTitle="CurrentProject" />
      <List.Item title="Nothing" icon={Icon.Text} subtitle="VsCode" accessoryTitle="CurrentProject" />
    </List.Section>
  ) : null;
}
