import { List } from "@raycast/api";
import Actions from "./components/actions";
import Summary from "./components/summary";

export default function KellyWorkflow() {
  return (
    <List>
      <Summary />
      <Actions />
    </List>
  );
}
