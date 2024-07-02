import { createResource } from "solid-js";
import { useParams } from "@solidjs/router";
import { list_device_by_ids } from "rmcs-api-client";
import { resourceServer, DEFAULT_DASHBOARD } from "../../store";
import Breadcrumb from "../navigation/Breadcrumb";

export default function Sensor() {

  const dashboardName = () => useParams().name ? decodeURI(useParams().name) : DEFAULT_DASHBOARD;
  const sensorType = () => useParams().submenu ? decodeURI(useParams().submenu) : undefined;
  const sensorName = () => useParams().rest ? decodeURI(useParams().rest).split("/")[0] : undefined;

  const [dashboard] = createResource(dashboardName, async (name) => {
    const response = await fetch(`/data/dashboard/${name}/dashboard.json`);
    /** 
     * @type {{ api_id:string, group_id:string, name: string }}
     */
    const dashboard = await response.json();
    dashboard.name = name;
    return dashboard;
  });

  const [sensors] = createResource(dashboard, async (dashboard) => {
    const response = await fetch(`/data/dashboard/${dashboard.name}/sensor.json`);
    /**
     * @type {Object.<string, { text:string, model_id:string, device_id:string[] }>}
     */
    const sensors = await response.json();
    return sensors;
  });

  const [devices] = createResource(sensors, async (sensors) => {
    const devices = {};
    for (const type in sensors) {
      const devicesList = await list_device_by_ids(resourceServer.get(dashboard().api_id), { ids: sensors[type].device_id });
      if (devicesList) devices[type] = devicesList;
    }
    return devices;
  });

  const children1 = () => {
    const items = sensors();
    if (items) {
      return Object.keys(items).map((key) => { 
        return {
          name: key, 
          text: items[key].text
        }; 
      });
    }
  };

  const children2 = () => {
    const items = devices();
    const children2 = [];
    if (items) {
      for (const type in items) {
        for (const device of items[type]) {
          children2.push({
            parent: type,
            name: device.name,
            text: device.name
          })
        }
      }
      return children2.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });
    }
  };

  return (
    <>
    <Breadcrumb dashboard={dashboardName()} parent={{ name: "sensor", text: "Sensor" }} children1={children1()} children2={children2()} child1={sensorType()} child2={sensorName()} />
    </>
  );
}
