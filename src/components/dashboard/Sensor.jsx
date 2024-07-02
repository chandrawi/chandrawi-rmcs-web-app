import { createResource } from "solid-js";
import { useParams } from "@solidjs/router";
import { read_device } from "rmcs-api-client";
import { resourceServer, DEFAULT_DASHBOARD } from "../../store";

export default function Sensor() {

  const dashboardName = () => useParams().name ? useParams().name : DEFAULT_DASHBOARD;
  const sensorType = () => useParams().submenu;

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
     * @type {Object.<string, { text:string, device_id:string[] }>}
     */
    const sensors = await response.json();
    return sensors;
  });

  const [devices] = createResource(sensors, async (sensors) => {
    const devices = {};
    for (const type in sensors) {
      devices[type] = [];
      for (const id of sensors[type].device_id) {
        const device = await read_device(resourceServer.get(dashboard().api_id), { id: id });
        if (device) {
          devices[type].push(device);
        }
      }
    }
    return devices;
  });

  const submenuText = () => {
    const devices = sensors();
    const ty = sensorType();
    if (devices) {
      if (ty in devices) {
        return devices[ty].text
      }
    }
  };

  return (
    <>
    </>
  );
}
