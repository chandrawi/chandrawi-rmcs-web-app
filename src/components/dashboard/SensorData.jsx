import { For, createSignal, createResource, createEffect } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import { read_model, list_data_by_last_time, list_data_by_range_time } from "rmcs-api-client";
import { resourceServer } from "../../store";

export default function SensorData(props) {

  const config = (key) => {
    const sensor = props.sensor();
    if (sensor) if (sensor.config) return sensor.config[key];
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const initViewMode = searchParams.view ? searchParams.view : config("view_mode") ? config("view_mode") : "table";
  const initTimeMode = searchParams.time ? searchParams.time : "live";
  const initTimeLast= searchParams.last ? parseInt(searchParams.last) : config("live_range") ? config("live_range") : 300000;
  const initTimeBegin = searchParams.begin ? new Date(searchParams.begin) : new Date();
  const initTimeEnd = searchParams.end ? new Date(searchParams.end) : new Date();

  let [viewMode, setViewMode] = createSignal(initViewMode);
  let [timeMode, setTimeMode] = createSignal(initTimeMode);

  let [timeLast, setTimeLast] = createSignal(initTimeLast);
  let [timeBegin, setTimeBegin] = createSignal(initTimeBegin);
  let [timeEnd, setTimeEnd] = createSignal(initTimeEnd);

  const [model] = createResource(props.sensor, async (input) => {
    return await read_model(resourceServer.get(props.apiId), { id: input.model_id });
  });

  const [data, {refetch} ] = createResource(props.sensor, async (input) => {
    if (timeMode() == "live") {
      const tLast = new Date(Date.now() - timeLast());
      return await list_data_by_last_time(resourceServer.get(props.apiId), {
        device_id: input.device_id,
        model_id: input.model_id,
        timestamp: tLast
      });
    }
    else if (timeMode() == "history") {
      return await list_data_by_range_time(resourceServer.get(props.apiId), {
        device_id: input.device_id,
        model_id: input.model_id,
        begin: timeBegin(),
        end: timeEnd()
      });
    }
  });

  let selectTimeMode;
  let selectRange;
  let datetimeBegin;
  let datetimeEnd;

  function submitTimeMode(e) {
    e.preventDefault();
    if (selectTimeMode.value == "live") {
      setSearchParams({
        time: "live",
        last: selectRange.value,
        begin: null,
        end: null
      });
      setTimeLast(parseInt(selectRange.value));
      refetch();
    }
    else if (selectTimeMode.value == "history") {
      setSearchParams({
        time: "history",
        last: null,
        begin: datetimeBegin.value,
        end: datetimeEnd.value
      });
      if (datetimeBegin.value && datetimeEnd.value) {
        setTimeBegin(new Date(datetimeBegin.value));
        setTimeEnd(new Date(datetimeEnd.value));
      }
      refetch();
    }
  }

  function changeViewMode(mode) {
    setViewMode(mode);
    setSearchParams({
      view: mode
    });
  }

  createEffect(() => {
    if (searchParams.time) selectTimeMode.value = searchParams.time;
    if (searchParams.last) selectRange.value = searchParams.last;
    if (searchParams.begin) datetimeBegin.value = searchParams.begin;
    if (searchParams.end) datetimeEnd.value = searchParams.end;
  });

  const [rangeList, setRangeList] = createSignal([300000, 900000, 1800000, 3600000]);
  createEffect(() => {
    if (Array.isArray(config("live_ranges"))) setRangeList(config("live_ranges"));
    if (config("live_range")) selectRange.value = searchParams.last ? searchParams.last : config("live_range");
  });
  function rangeName(range) {
    if (range < 60000) return String(range / 1000) + " seconds";
    else if(range == 60000) return "1 minute";
    else if(range < 3600000) return String(range / 60000) + " minutes";
    else if(range == 3600000) return "1 hour";
    else if(range < 86400000) return String(range / 3600000) + " hours";
    else if(range == 86400000) return "1 day";
    else return String(range / 86400000) + " day(s)";
  }

  return (
    <div class="w-full xs:px-1 py-1">
      <div class="w-full max-w-[48rem] xs:rounded-sm border border-slate-200 dark:border-slate-700">
        <div class="w-full flex flex-row items-center justify-between bg-gray-100 dark:bg-gray-800">
          <div class="mx-2 my-1.5 flex flex-row items-center font-semibold">
            <span class="icon-list_square text-[1.75rem] align-middle"></span>
            <span class="ml-1 align-middle">{props.name}</span>
          </div>
          <div class="mx-3 my-auto flex flex-row text-sm">
            <button class={"px-2 py-0.5 text-gray-100 rounded-l-sm " 
              + (viewMode() == 'graph' ? "bg-sky-700 cursor-default" : "bg-slate-500 hover:bg-sky-800 hover:text-white")}
              onclick={() => changeViewMode("graph")}
            >
              Graph
            </button>
            <button class={"px-2 py-0.5 text-gray-100 rounded-r-sm " 
              + (viewMode() == 'table' ? "bg-sky-700 cursor-default" : "bg-slate-500 hover:bg-sky-800 hover:text-white")}
              onclick={() => changeViewMode("table")}
            >
              Table
            </button>
          </div>
        </div>
        <div class="w-full bg-white dark:bg-gray-900 text-sm">
          <form action="#" class="px-2 py-2 flex flex-row flex-wrap" onsubmit={submitTimeMode}>
            <div class="mx-1 my-1 flex flex-row">
              <label for="input-mode" class="px-1.5 py-0.5 rounded-l-sm bg-sky-100 dark:bg-sky-950">Mode</label>
              <select name="time-mode" class="px-1 bg-white border border-sky-100 dark:bg-slate-800 dark:border-sky-950"
                ref={selectTimeMode} onChange={() => setTimeMode(selectTimeMode.value)}
              >
                <option value="live">Live</option>
                <option value="history">History</option>
              </select>
            </div>
            <div class="grow"></div>
            <div class="flex flex-row flex-wrap justify-between">
              <div class="mx-1 my-1 flex flex-row" classList={{"hidden": timeMode() != "live"}}>
                <label for="input-last" class="px-1.5 py-0.5 rounded-l-sm bg-slate-200 dark:bg-slate-700">Range</label>
                <select name="time-last" class="px-1 bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700"
                  ref={selectRange}
                >
                  <For each={rangeList()}>
                  {(item) => (
                    <option value={item}>{rangeName(item)}</option>
                  )}
                  </For>
                </select>
              </div>
              <div class="mx-1 my-1 flex flex-row" classList={{"hidden": timeMode() != "history"}}>
                <label for="input-begin" class="min-w-[3rem] px-1.5 py-0.5 rounded-l-sm bg-slate-200 dark:bg-slate-700">Begin</label>
                <input type="datetime-local" step="1" name="time-begin" class="w-[12rem] px-1 bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700" 
                  ref={datetimeBegin}
                />
              </div>
              <div class="mx-1 my-1 flex flex-row" classList={{"hidden": timeMode() != "history"}}>
                <label for="input-end" class="min-w-[3rem] px-1.5 py-0.5 rounded-l-sm bg-slate-200 dark:bg-slate-700">End</label>
                <input type="datetime-local" step="1" name="time-end" class="w-[12rem] px-1 bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700" 
                  ref={datetimeEnd}
                />
              </div>
              <div class="grow mx-1 my-1 flex flex-row justify-end">
                <button class="px-2 py-0.5 bg-sky-700 text-gray-100 hover:bg-sky-800 rounded-sm hover:text-white">Set</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
