import { createResource } from "solid-js";
import { useParams } from "@solidjs/router";
import { read_group_device } from "rmcs-api-client";
import { resourceServer, DEFAULT_DASHBOARD } from "../../store";

export default function Analysis() {

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

  const [analyses] = createResource(dashboard, async (dashboard) => {
    const response = await fetch(`/data/dashboard/${dashboard.name}/analysis.json`);
    /**
     * @type {Object.<string, { text:string, group_id:string }>}
     */
    const analyses = await response.json();
    return analyses;
  });

  const [groups] = createResource(analyses, async (analyses) => {
    const groups = {};
    for (const type in analyses) {
      groups[type] = [];
      for (const id of analyses[type].group_id) {
        const device = await read_group_device(resourceServer.get(dashboard().api_id), { id: id });
        if (device) {
          groups[type].push(device);
        }
      }
    }
    return groups;
  });

  const submenuText = () => {
    const groups = analyses();
    const ty = sensorType();
    if (groups) {
      if (ty in groups) {
        return groups[ty].text
      }
    }
  };

  return (
    <>
    </>
  );
}
