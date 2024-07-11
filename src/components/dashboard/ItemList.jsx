import { createResource } from "solid-js";
import { resourceServer } from "../../store";
import { list_device_by_ids, list_group_device_by_ids } from "rmcs-api-client";

export default function ItemList(props) {

  const filterItem = (items, type) => {
    if (typeof items === "object") {
      return Object.keys(items)
        .filter(key => key == type)
        .reduce((obj, key) => { obj[key] = items[key]; return obj; }, {})
    }
  }

  const deviceMap = () => {
    if (props.devices) {
      return props.type ? filterItem(props.devices(), props.type) : props.devices();
    }
  };

  const groupMap = () => {
    if (props.groups) {
      return props.type ? filterItem(props.groups(), props.type) : props.groups();
    }
  };

  const [devices] = createResource(deviceMap, async (items) => {
    const devices = {};
    for (const type in items) {
      const ids = Object.values(items[type].device_id);
      const devicesList = await list_device_by_ids(resourceServer.get(props.apiId), { ids: ids });
      if (devicesList) devices[type] = devicesList;
    }
    return devices;
  });

  const [groups] = createResource(groupMap, async (items) => {
    const groups = {};
    for (const type in items) {
      const ids = Object.values(items[type].group_id);
      const groupsList = await list_group_device_by_ids(resourceServer.get(props.apiId), { ids: ids });
      if (groupsList) groups[type] = groupsList;
    }
    return groups;
  });

  return (
    <></>
  );
}
