import { Action, ActionPanel, Icon, List, showToast, Toast } from "@raycast/api";
import { useEffect, useState } from "react";
import * as clash from "../actions/clash";

export default function Summary() {
  const [proxyMode, setProxyMode] = useState<string>();
  const { clash: clashPrefs } = globalThis.prefs;

  const switchMode = async () => {
    const newMode = proxyMode === "Global" ? "Direct" : "Global";
    try {
      await clash.switchMode(newMode.toLowerCase() as any);
      // showToast({
      //   title: `mode switched to ${newMode}`,
      //   style: Toast.Style.Success,
      // });
      setProxyMode(newMode);
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    clash.getProxyMode().then((v) => {
      setTimeout(() => setProxyMode(v), 100);
    })
  }, [])

  console.log(proxyMode)

  return (
    <List.Section title="Summary">
      {
        clashPrefs.enabled ? 
          <List.Item
            title="ProxyMode"
            icon={Icon.Globe}
            accessoryTitle={proxyMode ?? "Loading"}
            actions={
              <ActionPanel>
                <Action title="ChangeMode" onAction={switchMode} />
              </ActionPanel>
            }
          />
        :
          null
      }

    </List.Section>
  ) 
}
