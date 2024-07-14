import { createResource, createSignal } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import { resourceServer } from "../../store";
import { list_device_by_ids, list_group_device_by_ids } from "rmcs-api-client";
import DataTable from "../table/DataTable";

export default function ItemList(props) {

  const [searchParams, setSearchParams] = useSearchParams();
  const initViewMode = searchParams.view ? searchParams.view : "table";

  let [viewMode, setViewMode] = createSignal(initViewMode);

  const filterItem = (items, type) => {
    if (typeof items === "object") {
      return Object.keys(items)
        .filter(key => key == type)
        .reduce((obj, key) => { obj[key] = items[key]; return obj; }, {})
    }
  }

  const deviceMap = () => {
    if (props.devices) {
      return props.config.type ? filterItem(props.devices(), props.config.type) : props.devices();
    }
  };

  const groupMap = () => {
    if (props.groups) {
      return props.config.type ? filterItem(props.groups(), props.config.type) : props.groups();
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

  function columns() {
    return {
      type: { content: "Type", sortable: true, align: "left", html: true },
      name: { content: "Name", sortable: true, align: "left" },
      status: { content: "Status", sortable: true }
    };
  }

  const cell_type = (type, icon) => 
    <div class="flex items-center">
      <span class={icon + " text-[1.25rem] my-auto mr-1"}></span>
      <span>{type}</span>
    </div>
  ;

  function dataTable() {
    const devicesMap = deviceMap();
    const groupsMap = groupMap();
    const dataTable = [];
    if (devicesMap) {
      for (const type in devicesMap) {
        for (const name in devicesMap[type].device_id) {
          const dataRow = {
            __link__: "/dashboard/" + [props.config.dashboard, props.config.menu, type, name].join("/"),
            type: cell_type(devicesMap[type].text, devicesMap[type].icon),
            name: name
          };
          dataTable.push(dataRow);
        }
      }
    }
    if (groupsMap) {
      for (const type in groupsMap) {
        for (const name in groupsMap[type].group_id) {
          const dataRow = {
            __link__: "/dashboard/" + [props.config.dashboard, props.config.menu, type, name].join("/"),
            type: groupsMap[type].text,
            name: name
          };
          dataTable.push(dataRow);
        }
      }
    }
    return dataTable;
  }

  function changeViewMode(mode) {
    setViewMode(mode);
    setSearchParams({
      view: mode
    });
  }

  return (
    <div class="w-full xs:px-1 py-1">
      <div class="w-full max-w-[48rem] xs:rounded-sm border border-slate-200 dark:border-slate-700">
        <div class="w-full flex flex-row items-center justify-between bg-gray-100 dark:bg-gray-800">
          <div class="mx-3 my-1.5 flex flex-row items-center font-semibold">
          <span class={(props.config.icon ? props.config.icon : "icon-list_square") + " text-[1.5rem] align-middle"}></span>
            <span class="ml-1.5 align-middle">{props.config.text}&nbsp;</span>
          </div>
          <div class="mx-3 my-auto flex flex-row text-sm">
            <button class={"px-2 py-0.5 text-gray-100 rounded-l-sm " 
              + (viewMode() == 'map' ? "bg-sky-700 cursor-default" : "bg-slate-500 hover:bg-sky-800 hover:text-white")}
              onclick={() => changeViewMode("map")}
            >
              Map
            </button>
            <button class={"px-2 py-0.5 text-gray-100 rounded-r-sm " 
              + (viewMode() == 'table' ? "bg-sky-700 cursor-default" : "bg-slate-500 hover:bg-sky-800 hover:text-white")}
              onclick={() => changeViewMode("table")}
            >
              Table
            </button>
          </div>
        </div>
        <div id="sensor-table" class="w-full xs:px-4 py-2 bg-white dark:bg-gray-900 text-sm">
          <DataTable columns={columns()} data={dataTable()} />
        </div>
      </div>
    </div>
  );
}
