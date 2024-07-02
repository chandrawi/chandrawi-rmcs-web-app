import { createResource } from "solid-js";
import { useParams } from "@solidjs/router";
import { list_group_device_by_ids } from "rmcs-api-client";
import { resourceServer, DEFAULT_DASHBOARD } from "../../store";
import Breadcrumb from "../navigation/Breadcrumb";

export default function Analysis() {

  const dashboardName = () => useParams().name ? decodeURI(useParams().name) : DEFAULT_DASHBOARD;
  const analysisType = () => useParams().submenu ? decodeURI(useParams().submenu) : undefined;
  const analysisName = () => useParams().rest ? decodeURI(useParams().rest).split("/")[0] : undefined;

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
     * @type {Object.<string, { text:string, model_id:string, group_id:string }>}
     */
    const analyses = await response.json();
    return analyses;
  });

  const [groups] = createResource(analyses, async (analyses) => {
    const groups = {};
    for (const type in analyses) {
      const groupList = await list_group_device_by_ids(resourceServer.get(dashboard().api_id), { ids: analyses[type].group_id });
      if (groupList) groups[type] = groupList;
    }
    return groups;
  });

  const children1 = () => {
    const items = analyses();
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
    const items = groups();
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
      return children2;
    }
  };

  return (
    <>
    <Breadcrumb dashboard={dashboardName()} parent={{ name: "analysis", text: "Analysis" }} children1={children1()} children2={children2()} child1={analysisType()} child2={analysisName()} />
    </>
  );
}
