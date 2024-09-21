import { createEffect } from "solid-js";
import { darkTheme } from "../../store";

export default function LineChart(props) {

  function domainRange(column, range) {
    let min = undefined;
    let max = undefined;
    if (props.data && column && range) {
      const rangeStep = range[0];
      const rangeMin = range[1];
      const rangeMax = range[2];
      for (const row of props.data) {
        if (min === undefined || row[column] < min) min = row[column];
        if (max === undefined || row[column] > max) max = row[column];
      }
      min = Math.floor(min / rangeStep) * rangeStep;
      max = Math.ceil(max / rangeStep) * rangeStep;
      if (typeof rangeMin == "number") min = rangeMin;
      if (typeof rangeMax == "number") max = rangeMax;
    }
    return [min, max];
  };

  const idstring = (id) => {
    const okstring = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let okid = "";
    for (const c of id) okid += okstring.indexOf(c) >= 0 ? c : "_";
    return okid;
  };

  const vlSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    background: 'transparent',
    width: 'container',
    data: {
      values: props.data
    },
    mark: {
      type: 'line',
      point: true,
      interpolate: 'natural',
      tooltip: true
    },
    encoding: {
      x: {
        field: props.xColumn, 
        type: "quantitative",
        title: props.xColumn,
        scale: props.xRange ? {
          domainMin: domainRange(props.xColumn, props.xRange)[0],
          domainMax: domainRange(props.xColumn, props.xRange)[1]
        } : undefined
      },
      y: {
        field: props.yColumn,
        type: "quantitative",
        title: props.yColumn,
        scale: props.yRange ? {
          domainMin: domainRange(props.yColumn, props.yRange)[0],
          domainMax: domainRange(props.yColumn, props.yRange)[1]
        } : undefined
      },
      order: {
        field: props.domain
      },
      color: {
        field: "Data set",
        type: "nominal",
        legend: {}
      }
    },
    config: {
      axis: {}
    }
  };

  createEffect(() => {
    vlSpec.data.values = props.data;
    vlSpec.config.axis.gridColor = darkTheme() ? "#1f2937" : "#e5e7eb";
    vlSpec.config.axis.labelColor = darkTheme() ? "#e5e7eb" : "#1f2937";
    vlSpec.config.axis.titleColor = darkTheme() ? "#e5e7eb" : "#1f2937";
    vlSpec.encoding.color.legend.titleColor = darkTheme() ? "#e5e7eb" : "#1f2937";
    vlSpec.encoding.color.legend.labelColor = darkTheme() ? "#e5e7eb" : "#1f2937";
    vegaEmbed('#chart-' + idstring(props.xColumn) + idstring(props.yColumn), vlSpec);
  });

  return (
    <div id={"chart-" + idstring(props.xColumn) + idstring(props.yColumn)} style="width:100%"></div>
  );
}
