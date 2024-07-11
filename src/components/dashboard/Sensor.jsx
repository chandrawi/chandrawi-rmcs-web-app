import { Show, createResource } from "solid-js";
import { useParams } from "@solidjs/router";
import { DEFAULT_DASHBOARD } from "../../store";
import Breadcrumb from "../navigation/Breadcrumb";
import ItemList from "./ItemList";

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
  const apiId = () => dashboard().api_id;

  const [sensors] = createResource(dashboard, async (dashboard) => {
    const response = await fetch(`/data/dashboard/${dashboard.name}/sensor.json`);
    /**
     * @type {Object.<string, { text:string, model_id:string, device_id:Object.<string,string> }>}
     */
    const sensors = await response.json();
    return sensors;
  });

  const sensor = () => {
    const type = sensorType();
    const name = sensorName();
    const sensorMap = sensors();
    if (type && name && sensorMap) {
      const filter = Object.keys(sensorMap[type].device_id).filter((deviceName) => deviceName == name);
      if (filter.length > 0) {
        return {
          model_id: sensorMap[type].model_id,
          device_id: sensorMap[type].device_id[filter[0]]
        };
      }
    }
  };

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
    const items = sensors();
    const children2 = [];
    if (items) {
      for (const type in items) {
        for (const deviceName in items[type].device_id) {
          children2.push({
            parent: type,
            name: deviceName,
            text: deviceName
          })
        }
      }
      return children2;
    }
  };

  return (
    <>
    <Breadcrumb dashboard={dashboardName()} parent={{ name: "sensor", text: "Sensor" }} children1={children1()} children2={children2()} child1={sensorType()} child2={sensorName()} />
    <ItemList apiId={apiId()} devices={sensors} type={sensorType()} />
    </>
  );
}
