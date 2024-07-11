import { createResource } from "solid-js";
import { useParams } from "@solidjs/router";
import { DEFAULT_DASHBOARD } from "../../store";
import Breadcrumb from "../navigation/Breadcrumb";
import ItemList from "./ItemList";

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
  const apiId = () => dashboard().api_id;

  const [analyses] = createResource(dashboard, async (dashboard) => {
    const response = await fetch(`/data/dashboard/${dashboard.name}/analysis.json`);
    /**
     * @type {Object.<string, { text:string, model_id:string, group_id:Object.<string,string> }>}
     */
    const analyses = await response.json();
    return analyses;
  });

  const analysis = () => {
    const type = analysisType();
    const name = analysisName();
    const analysisMap = analyses();
    if (type && name && analysisMap) {
      const filter = Object.keys(analysisMap[type].group_id).filter((deviceName) => deviceName == name);
      if (filter.length > 0) {
        return {
          model_id: analysisMap[type].model_id,
          group_id: analysisMap[type].group_id[filter[0]]
        };
      }
    }
  };

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
    const items = analyses();
    const children2 = [];
    if (items) {
      for (const type in items) {
        for (const groupName in items[type].group_id) {
          children2.push({
            parent: type,
            name: groupName,
            text: groupName
          })
        }
      }
      return children2;
    }
  };

  return (
    <>
    <Breadcrumb dashboard={dashboardName()} parent={{ name: "analysis", text: "Analysis" }} children1={children1()} children2={children2()} child1={analysisType()} child2={analysisName()} />
    <ItemList apiId={apiId()} groups={analyses} type={analysisType()} />
    </>
  );
}
