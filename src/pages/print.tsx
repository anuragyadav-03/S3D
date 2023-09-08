import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faGear,
  faCheckCircle,
  faLifeRing,
  faInfoCircle,
  faPauseCircle,
  faStopCircle,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { styled } from "styled-components";
import app_api from "../config/config";
import { useParams } from "react-router-dom";
import {
  iPrinter,
  iPrinterConfig,
  iPrinterObjectModel,
  iSingleConfiguration,
  iSingleTempStat,
} from "../schema";
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";

interface iProps {}

const HeaterTable = styled.table`
  & > thead > tr > th {
    font-weight: normal;
  }

  & > tbody > tr {
    border-top: 1px solid var(--stroke-dark-300);
    & > td {
      padding-top: 1rem;
      padding-bottom: 0.3rem;
    }
  }
`;

const HeaterTable2 = styled.table`
  & > tbody > tr {
    border-bottom: 1px solid var(--stroke-dark-300);
    & > td {
      padding-top: 0.3rem;
      padding-bottom: 0.3rem;
    }
  }
`;

// const RangeInput = styled.input``;

function Print(prop: React.FC<iProps>) {
  const { printerId } = useParams();
  const [printerDetails, setPrinterDetails] = useState<iPrinter>();
  const [model, setModel] = useState<iPrinterObjectModel>();
  const [configuration, setConfiguration] = useState<iSingleConfiguration[]>(
    []
  );

  const [mInterval, setMInterval] = useState(0);
  const [tempStats, setTempStats] = useState<iSingleTempStat[]>([]);

  const [left, setLeft] = useState("dashboard");
  const [right, setRight] = useState("status");

  useEffect(() => {
    app_api
      .get(`printer/token/${printerId}`)
      .then((res) => res.data)
      .then((res: iPrinter) => {
        setPrinterDetails(res);
        app_api
          .get(`printer/object/${printerId}`)
          .then((res) => res.data)
          .then((obj) => {
            setModel(obj);
            setMInterval(
              setInterval(() => {
                getObjectModel();
              }, 2000)
            );
            app_api
              .post("printer-config/by/printer", { id: res?.printerConfigId })
              .then((res) => res.data)
              .then((res: iPrinterConfig) => {
                setConfiguration(res?.Configuration);
              })
              // setConfiguration(res?.Configuration)
              .catch(() => {});
          })
          .catch(() => {});
      });
    return () => {
      clearInterval(mInterval);
    };
  }, []);

  useEffect(() => {
    configuration.map((config) => {
      console.log(config.name);
      if (
        config.htmlElement !== "button_group" &&
        config.htmlElement !== "array" &&
        config.htmlElement !== "selfArray"
      ) {
        let button = document.getElementById(config.name);
        if (button) {
          if (config.text) button.title = config.text;
          button.setAttribute("data-gcode", config.command);
          button.addEventListener("click", function (ev) {
            let htmlElement = config.htmlElement,
              error = false;
            let target = ev.currentTarget as HTMLElement;
            let finalCommand = `${target?.getAttribute("data-gcode")}`;
            let exp = new RegExp(/{{.+?}}/g);
            let placeholders: string[] | null = finalCommand.match(exp);
            if (placeholders && placeholders.length > 0) {
              placeholders = placeholders.map((r) => {
                let str = r;
                str = str.replace(/^{{/, "");
                str = str.replace(/}}+$/, "");
                return str;
              });
              placeholders.forEach((p) => {
                if (htmlElement !== "radio") {
                  let input = document.getElementById(
                    `${button?.id}_input`
                  ) as HTMLInputElement;
                  if (input && input.value) {
                    finalCommand = finalCommand.replace(
                      `{{${p}}}`,
                      input.value
                    );
                  } else {
                    error = true;
                  }
                } else {
                  let inputs = document.getElementsByName(
                    p
                  ) as NodeListOf<HTMLInputElement>;
                  let value = "";
                  for (var i = 0; i < inputs.length; i++) {
                    if (inputs[i].checked) {
                      value = inputs[i].value;
                    }
                  }
                  if (value)
                    finalCommand = finalCommand.replace(`{{${p}}}`, value);
                  else error = true;
                }
              });
            }
            if (error) alert("Some value(s) are missing");
            else onSendCommand(finalCommand);
          });
        }
      } else if (config.htmlElement === "button_group") {
        console.log("button_group");
        let buttons = document.getElementsByClassName(config.name);
        console.log({ buttons });
        for (var i = 0; i < buttons.length; i++) {
          let button = buttons[i];
          button.setAttribute("data-gcode", config.command);
          button.addEventListener("click", (ev) => {
            let target = ev.currentTarget as HTMLElement;
            let finalCommand = target.getAttribute("data-gcode")!;
            let exp = new RegExp(/{{.+?}}/g);
            let placeholders = finalCommand.match(exp);
            if (placeholders && placeholders.length > 0) {
              placeholders.forEach((p) => {
                finalCommand = finalCommand.replace(p, target.textContent!);
              });
            }
            onSendCommand(finalCommand);
          });
        }
      } else if (config.htmlElement === "array") {
        console.log("array");
        let buttons = document.getElementsByClassName(
          config.name
        ) as HTMLCollectionOf<HTMLElement>;
        console.log({ buttons });
        for (var i = 0; i < buttons.length; i++) {
          let button = buttons[i];
          if (config.text) button.title = config.text;
          button.setAttribute("data-gcode", config.command);
          button.setAttribute("data-index", i.toString());
          button.addEventListener("click", (ev) => {
            let configuration = config;
            let target = ev.currentTarget as HTMLElement;
            let finalCommand = target.getAttribute("data-gcode")!;
            let exp = new RegExp(/{{.+?}}/g),
              error = false;
            let placeholders = finalCommand.match(exp);
            if (placeholders && placeholders.length > 0) {
              placeholders.forEach((p) => {
                if (p === "{{index}}") {
                  finalCommand = finalCommand.replace(
                    p,
                    target.getAttribute("data-index")!
                  );
                } else {
                  let input = document.getElementById(
                    `${configuration.name}_${target.getAttribute(
                      "data-index"
                    )}_input`
                  ) as HTMLInputElement;
                  if (input && input.value) {
                    finalCommand = finalCommand.replace(p, input.value);
                  } else {
                    error = true;
                  }
                }
              });
            }
            if (error) alert("Some value(s) are missing");
            else onSendCommand(finalCommand);
          });
        }
      } else if (config.htmlElement === "selfArray") {
        if (config.name === "movement") {
          let positiveDiv = document.getElementsByClassName(
            "movement"
          ) as HTMLCollectionOf<HTMLElement>;
          let negativeDiv = document.getElementsByClassName(
            "movement-negative"
          ) as HTMLCollectionOf<HTMLElement>;
          if (positiveDiv.length > 0) {
            for (var i = 0; i < positiveDiv.length; i++) {
              let pDiv = positiveDiv[i];
              console.log(pDiv);
              pDiv.innerHTML = "";
            }
          }
          if (negativeDiv.length > 0) {
            for (var i = 0; i < negativeDiv.length; i++) {
              let nDiv = negativeDiv[i];
              nDiv.innerHTML = "";
            }
          }
          let incrementalArray = Array.from(config.selfArray);
          let descrementalArray = Array.from(config.selfArray).sort(
            (a, b) => b - a
          );
          for (var i = 0; i <= 2; i++) {
            incrementalArray.map((num, idx) => {
              let button = document.createElement("button");
              button.classList.add(
                "border",
                "border-stroke-dark-100",
                "text-sm",
                "py-2",
                "px-5",
                "hover:border-primary",
                "hover:text-primary",
                "hover:bg-fill-dark-100"
              );
              if (idx === 0) {
                button.classList.add("rounded-l-lg");
              }
              if (idx === incrementalArray.length - 1) {
                button.classList.add("rounded-r-lg");
              }
              if (i === 0) {
                button.classList.add("move_x");
                button.textContent = num;
              } else if (i === 1) {
                button.classList.add("move_y");
                button.textContent = num;
              } else if (i === 2) {
                button.classList.add("move_z");
                button.textContent = num;
              }
              let div = positiveDiv[i];
              div.appendChild(button);
            });
            descrementalArray.map((num, idx) => {
              let button = document.createElement("button");
              button.classList.add(
                "border",
                "border-stroke-dark-100",
                "text-sm",
                "py-2",
                "px-5",
                "hover:border-primary",
                "hover:text-primary",
                "hover:bg-fill-dark-100"
              );
              if (idx === 0) {
                button.classList.add("rounded-l-lg");
              }
              if (idx === incrementalArray.length - 1) {
                button.classList.add("rounded-r-lg");
              }
              if (i === 0) {
                button.classList.add("move_x");
                button.textContent = (-num).toString();
              } else if (i === 1) {
                button.classList.add("move_y");
                button.textContent = (-num).toString();
              } else if (i === 2) {
                button.classList.add("move_z");
                button.textContent = (-num).toString();
              }
              let div = negativeDiv[i];
              div.appendChild(button);
            });
          }
        } else if (config.name === "feedrate" || config.name === "feedamount") {
          console.log("config name", config.name);
          const div = document.getElementById(config.name)!;
          div.innerHTML = "";
          config.selfArray.forEach((num, idx) => {
            let label = document.createElement("label");
            label.classList.add(
              "border",
              "border-text-variant",
              "p-1.5",
              "text-3xs",
              "hover:border-primary",
              "hover:text-primary"
            );
            if (idx === 0) label.classList.add("rounded-l-md");
            if (idx === config.selfArray.length - 1)
              label.classList.add("rounded-r-md");
            label.htmlFor = `${config.name}-${num}`;
            label.textContent = num;
            let input = document.createElement("input");
            input.classList.add("hidden");
            input.type = "radio";
            input.value = num;
            input.name = config.name;
            input.id = `${config.name}-${num}`;
            div.appendChild(label);
            div.appendChild(input);
          });
        }
      }
    });
  }, [configuration]);

  useEffect(() => {
    console.log("changed heater details");
    let statsForTemp = Array.from(tempStats || []);
    if (model) {
      // TODO
      // ApexCharts.exec("apex_layerChart", "updateSeries", [
      //   {
      //     name: "Layer",
      //     data: getLayerData(model),
      //   },
      // ]);
      model?.heat?.heaters?.forEach((temp, idx) => {
        if (
          Array.isArray(statsForTemp) &&
          statsForTemp.length > idx &&
          "data" in statsForTemp[idx] &&
          Array.isArray(statsForTemp[idx]["data"])
        ) {
          while (statsForTemp[idx]["data"].length > 30) {
            statsForTemp[idx]["data"].shift();
          }
          statsForTemp[idx]["data"]?.push({
            x: Date.now(),
            y: temp?.current,
          });
        } else {
          statsForTemp[idx] = {
            name: `Heater ${idx}`,
            data: [
              {
                x: Date.now(),
                y: temp?.current,
              },
            ],
          };
        }
      });
    }
    // TODO
    // ApexCharts.exec("apex_tempChart", "updateSeries", statsForTemp);
    setTempStats(statsForTemp);
  }, [model?.heat?.heaters]);

  const getLayerData = (printerDetails: iPrinterObjectModel) =>
    printerDetails?.job?.layers
      ?.slice(Math.max(printerDetails?.job?.layers.length - 100, 0))
      .map((l, idx) => ({
        x: idx + Math.max(printerDetails?.job?.layers.length - 100, 0),
        y: l?.filament[0],
      })) || [];

  const getObjectModel = () => {
    app_api
      .get(`printer/object/${printerId}`)
      .then((res) => res.data)
      .then((res) => {
        setModel(res);
      })
      .catch(() => {});
  };

  const onSendCommand = (command: string) => {
    console.log({ command });
    // app_api
    //   .post("job", {
    //     printerToken: printerid,
    //     ownerId: printer?.ownerId,
    //     command,
    //   })
    //   .then((res) => {})
    //   .catch((err) => {});
  };

  const changeLeft = (tab: string) => setLeft(tab);
  const changeRight = (tab: string) => setRight(tab);

  return (
    <div className="w-[92%] mx-auto pt-10 text-text-variant">
      <div className="flex">
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            size="2x"
            className="text-text self-start mt-2"
          />
          <div className="ml-3">
            <span className="block text-primary text-5xl">File 1</span>
            <span className="block text-text-variant text-2xl">
              Project Mumbai
            </span>
          </div>
        </div>
        <div className="ml-auto self-end">
          <span className="ml-auto self-end text-4xl text-text-variant">
            28%
          </span>
          <div className="inline-block bg-success h-3 w-3 rounded-[50%]"></div>
        </div>
      </div>
      <div className="flex items-start mt-5" style={{ gap: "1.5rem" }}>
        <div className="border border-stroke-dark-300 rounded-lg p-5 max-h-[78vh] overflow-auto flex-1 relative">
          <div className="flex p-2 bg-fill-dark-100 border border-stroke-dark-300 rounded-lg text-center text-lg sticky top-0">
            <div className="bg-dark-primary rounded-lg text-text-primary-container py-0.5 flex-1">
              <span>Dashboard</span>
            </div>
            <div className="py-0.5 flex-1">
              <span>Z-Babystepping</span>
            </div>
            <div className="py-0.5 flex-1">
              <span>Utilities</span>
            </div>
          </div>
          <div className="bg-fill-dark-200 rounded-md mt-8 p-5">
            <div className="flex">
              <span className="text-lg text-text">Machine Movement</span>
              <button
                className="border border-primary bg-transparent text-primary ml-auto py-1 px-2 text-sm rounded-lg"
                id="home_all"
                type="button"
              >
                Home All
              </button>
            </div>
            <div className="flex items-center mt-4 mb-8">
              <div className="text-text flex items-center movement-negative"></div>
              <span className="px-5 text-xl text-text">X</span>
              <div className="text-text flex items-center movement"></div>
              <button
                className="bg-dark-primary text-text-primary-container rounded-md p-2 text-xs ml-auto"
                type="button"
                id="home_x"
              >
                Home X
              </button>
            </div>
            <div className="flex items-center mt-4 mb-8">
              <div className="text-text flex items-center movement-negative"></div>
              <span className="px-5 text-xl text-text">Y</span>
              <div className="text-text flex items-center movement"></div>
              <button
                className="bg-dark-primary text-text-primary-container rounded-md p-2 text-xs ml-auto"
                type="button"
                id="home_y"
              >
                Home Y
              </button>
            </div>
            <div className="flex items-center mt-4 mb-8">
              <div className="text-text flex items-center movement-negative"></div>
              <span className="px-5 text-xl text-text">Z</span>
              <div className="text-text flex items-center movement"></div>
              <button
                className="bg-dark-primary text-text-primary-container rounded-md p-2 text-xs ml-auto"
                type="button"
                id="home_z"
              >
                Home Z
              </button>
            </div>
          </div>
          <div className="bg-fill-dark-200 rounded-md mt-4 p-5">
            <FontAwesomeIcon icon={faGear} className="text-text" />
            <span className="text-lg text-text ml-2">Tools + Extra</span>
            <HeaterTable className="w-full mt-4 text-left">
              <thead className="border-b border-stroke-dark-300 text-sm">
                <tr>
                  <th>Heater</th>
                  <th>Current Temp.</th>
                  <th>Active Temp.</th>
                  <th>Standby Temp.</th>
                </tr>
              </thead>
              <tbody className="text-text">
                {model?.heat?.heaters?.map((h, idx) => {
                  return (
                    <tr>
                      <td>Heater {idx}</td>
                      <td>{h.current}</td>
                      <td>
                        <input
                          id={`temperature_active_${idx}_input`}
                          className="border border-stroke-dark-100 rounded-lg text-center p-1 text-sm bg-transparent max-w-[4rem] mr-3"
                          type="number"
                          placeholder={h?.active.toString()}
                        />
                        <button type="button" className="temperature_active">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-dark-primary text-xl"
                          />
                        </button>
                      </td>
                      <td>
                        <input
                          className="border border-stroke-dark-100 rounded-lg text-center p-1 text-sm bg-transparent max-w-[4rem] mr-3"
                          type="number"
                          id={`temperature_standby_${idx}_input`}
                          placeholder={h?.standby.toString()}
                        />
                        <button type="button" className="temperature_standby">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-dark-primary text-xl"
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </HeaterTable>
          </div>
          <div className="flex" style={{ gap: "1rem" }}>
            <div
              className="flex flex-col flex-1 h-min mt-8"
              style={{ gap: "0.5rem" }}
            >
              <div className="bg-fill-dark-200 rounded-md p-5">
                <FontAwesomeIcon icon={faLifeRing} className="text-text" />
                <span className="text-lg text-text ml-2">Speed Factor</span>
                <div className="mt-5 w-full">
                  <span className="block text-text-variant2 text-sm">
                    Current Value: {model?.move?.speedFactor || "N/A"}
                  </span>
                  <div className="flex">
                    <input
                      type="range"
                      className="flex-1 accent-primary"
                      min="0.1"
                      max="100"
                      id="speed_factor_input"
                    />
                    <button
                      className="bg-dark-primary text-text-primary-container rounded-md py-1 px-2 text-sm ml-5"
                      type="button"
                      id="speed_factor"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-fill-dark-200 rounded-md p-5">
                <FontAwesomeIcon icon={faLifeRing} className="text-text" />
                <span className="text-lg text-text ml-2">Fan Control</span>
                {model?.fans.map((f, idx) => (
                  <div className="mt-5 w-full">
                    <span className="block text-text-variant">Fan {idx}</span>
                    <span className="block text-text-variant2 text-sm">
                      Current Value: {f?.actualValue || "N/A"}
                    </span>
                    <div className="flex">
                      <input
                        type="range"
                        className="flex-1 accent-primary bg-text"
                        min="0.1"
                        max="100"
                        id={`fan_speed_${idx}_input`}
                      />
                      <button
                        className="fan_speed bg-dark-primary text-text-primary-container rounded-md py-1 px-2 text-sm ml-5"
                        type="button"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="flex flex-col flex-1 mt-8"
              style={{ gap: "0.5rem" }}
            >
              <div className="bg-fill-dark-200 rounded-md p-5">
                <span className="block text-lg text-text">
                  Extrusion Control
                </span>
                <div className="flex mb-2">
                  <div className="flex-1">
                    <span className="text-2xs text-variant block mb-1">
                      Feed Amount
                    </span>
                    <div id="feedamount" className="flex"></div>
                  </div>
                  <div className="flex-1">
                    <span className="text-2xs text-variant block mb-1">
                      Feed Rate
                    </span>
                    <div id="feedrate" className="flex"></div>
                  </div>
                </div>
                <button
                  className="text-xs border border-primary text-primary rounded-md px-1 py-0.5"
                  type="button"
                  id="extrude"
                >
                  Extrude
                </button>
                <button
                  className="text-xs border border-primary text-primary rounded-md px-1 py-0.5 ml-2"
                  type="button"
                  id="retract"
                >
                  Retract
                </button>
              </div>

              <div className="bg-fill-dark-200 rounded-md p-5 h-min">
                <FontAwesomeIcon icon={faLifeRing} className="text-text" />
                <span className="text-lg text-text ml-2">Extrusion Factor</span>
                {model?.move?.extruders.map((e, idx) => (
                  <div className="mt-5 w-full">
                    <span className="block text-text-variant">
                      Extruder {idx}
                    </span>
                    <span className="block text-text-variant2 text-sm">
                      Current Value: {e?.factor || "N/A"}
                    </span>
                    <div className="flex">
                      <input
                        type="range"
                        className="flex-1 accent-primary"
                        min="0.1"
                        max="100"
                        id={`extrusion_factor_${idx}_input`}
                      />
                      <button
                        className="extrusion_factor bg-dark-primary text-text-primary-container rounded-md py-1 px-2 text-sm ml-5"
                        type="button"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border border-stroke-dark-300 rounded-lg p-5 max-h-[78vh] overflow-auto relative">
          <div className="flex p-2 bg-fill-dark-100 border border-stroke-dark-300 rounded-lg text-center text-lg sticky top-0">
            <button
              className={`${
                right === "status"
                  ? "bg-dark-primary rounded-lg text-text-primary-container "
                  : ""
              } py-0.5 flex-1`}
              onClick={() => changeRight("status")}
            >
              Status
            </button>
            <button
              className={`${
                right === "charts"
                  ? "bg-dark-primary rounded-lg text-text-primary-container "
                  : ""
              } py-0.5 flex-1`}
              onClick={() => changeRight("charts")}
            >
              Charts
            </button>
          </div>
          {right === "status" ? (
            <>
              <div className="bg-fill-dark-200 rounded-md mt-8 p-5">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faInfoCircle} className="text-text" />
                  <span className="text-text ml-2">Status</span>
                  <span
                    className={`ml-auto px-1 text-2xs rounded-xl capitalize font-semibold ${
                      !!model?.state?.status
                        ? ["disconnected", "off", "cancelling"].includes(
                            model?.state?.status.toString()
                          )
                          ? "bg-error text-text hover:bg-red-100"
                          : ["updating", "halted", "pausing", "busy"].includes(
                              model?.state.status.toString()
                            )
                          ? "bg-amber-50 text-amber-600 hover:bg-amber-100"
                          : ["paused", "resuming"].includes(
                              model?.state?.status.toString()
                            )
                          ? "bg-yellow-200 text-yellow-600 hover:bg-yellow-100"
                          : ["starting", "processing"].includes(
                              model?.state?.status.toString()
                            )
                          ? "bg-success text-text hover:bg-green-100"
                          : ["simulating", "idle", "changingTool"].includes(
                              model?.state?.status.toString()
                            )
                          ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                          : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                        : ""
                    }`}
                  >
                    {model?.state?.status}
                  </span>
                </div>
                <HeaterTable2 className="w-full mt-4 text-left">
                  <tbody>
                    <tr>
                      <td>Total Position</td>
                      <td className="text-right">
                        {model?.move.axes.map((ax) => (
                          <span className="text-primary ml-5 uppercase">
                            {ax.letter}:
                            <span className="ml-1 text-text">
                              {ax.machinePosition}
                            </span>
                          </span>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td>Extruder Drives</td>
                      <td className="text-right text-text">
                        {model?.move.extruders.map((ex, idx) => (
                          <>
                            <span className="block text-sm text-text-variant">
                              Drive {idx}
                            </span>
                            <span className="block">{ex.position}</span>
                          </>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td>Speeds</td>
                      <td className="text-right text-text">
                        <span className="block">
                          Requested Speed:{" "}
                          {model?.move?.currentMove?.requestedSpeed.toString() ||
                            "N/A"}
                          mm/s
                        </span>
                        <span className="block">
                          Top Speed:{" "}
                          {model?.move?.currentMove?.topSpeed.toString() ||
                            "N/A"}
                          mm/s
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Total energy consumption</td>
                      <td className="text-right text-text">N/A Wh</td>
                    </tr>
                  </tbody>
                </HeaterTable2>
                <div className="mt-5 flex items-center">
                  <button
                    className="h-10 w-10 bg-dark-primary rounded-lg flex justify-center items-center"
                    id="pause_print"
                    type="button"
                  >
                    <FontAwesomeIcon
                      icon={faPauseCircle}
                      className="text-text-primary-container text-2xl"
                    />
                  </button>
                  <button
                    className="h-10 w-10 bg-dark-primary rounded-lg flex justify-center items-center ml-3"
                    id="stop_print"
                    type="button"
                  >
                    <FontAwesomeIcon
                      icon={faStopCircle}
                      className="text-text-primary-container text-2xl"
                    />
                  </button>
                  {/* <button className="border border-primary rounded-lg ml-auto mr-2 text-2xs text-primary p-1">
                Get Firmware details
              </button> */}
                  <button className="flex justify-center items-center border border-primary rounded-lg text-sm text-primary p-1 ml-auto">
                    <FontAwesomeIcon icon={faRefresh} />
                  </button>
                </div>
              </div>
              <div className="bg-fill-dark-200 rounded-md mt-4 p-5">
                <FontAwesomeIcon icon={faInfoCircle} className="text-text" />
                <span className="text-text ml-2">Collected Data</span>
                <div
                  className="grid w-full mt-3"
                  style={{
                    gridTemplateColumns: "1fr 1fr",
                    gridTemplateRows: "1 1",
                  }}
                >
                  <div>
                    <span className="block text-xs">Warm-up Time</span>
                    <span className="text-text">
                      {model?.job?.warmUpDuration || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs">Current Layer Time</span>
                    <span className="text-text">
                      {model?.job?.layer || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs">Last Layer Time</span>
                    <span className="text-text">
                      {model?.job?.layerTime || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs">Job Duration</span>
                    <span className="text-text">
                      {model?.job?.duration || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-fill-dark-200 rounded-md mt-4 p-5">
                <FontAwesomeIcon icon={faInfoCircle} className="text-text" />
                <span className="text-text ml-2">Estimations Based On</span>
                <div className="flex mt-3">
                  <div className="flex-1">
                    <span className="text-xs mr-3">Filament Usage:</span>
                    <span className="text-text">
                      {model?.job?.file?.filament?.[0] || "N/A"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <span className="text-xs mr-3">File Progress:</span>
                    <span className="text-text">
                      {model?.job?.timesLeft?.file || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-fill-dark-200 rounded-md mt-4 p-5">
                <FontAwesomeIcon icon={faInfoCircle} className="text-text" />
                <span className="text-text ml-2">Job Information</span>
                <HeaterTable2 className="w-full mt-4 text-left">
                  <tbody>
                    <tr>
                      <td>Height</td>
                      <td className="text-right text-text">
                        {model?.job?.file?.height || "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td>Layer Height</td>
                      <td className="text-right text-text">
                        {model?.job?.file?.layerHeight || "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td>Generated By</td>
                      <td className="text-right text-text">
                        {model?.job?.file?.generatedBy || "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </HeaterTable2>
              </div>
            </>
          ) : (
            <>
              <Chart
                options={{
                  chart: {
                    id: "apex_tempChart",
                    animations: {
                      enabled: true,
                      easing: "linear",
                      speed: 800,
                      animateGradually: {
                        enabled: true,
                        delay: 150,
                      },
                      dynamicAnimation: {
                        enabled: true,
                        speed: 350,
                      },
                    },
                    toolbar: {
                      show: false,
                    },
                    zoom: {
                      enabled: false,
                    },
                  },
                  dataLabels: {
                    enabled: false,
                  },
                  stroke: {
                    curve: "smooth",
                  },
                  markers: {
                    size: 0,
                  },
                  xaxis: {
                    type: "datetime",
                    range: 30000,
                  },
                  tooltip: {
                    x: {
                      format: "mm:ss",
                    },
                  },
                  legend: {
                    show: true,
                  },
                }}
                series={tempStats}
                type="line"
                height={350}
              />
              <Chart
                options={{
                  chart: {
                    id: "apex_tempChart",
                    animations: {
                      enabled: true,
                      easing: "linear",
                      speed: 800,
                      animateGradually: {
                        enabled: true,
                        delay: 150,
                      },
                      dynamicAnimation: {
                        enabled: true,
                        speed: 350,
                      },
                    },
                    toolbar: {
                      show: false,
                    },
                    zoom: {
                      enabled: false,
                    },
                  },
                  dataLabels: {
                    enabled: false,
                  },
                  stroke: {
                    curve: "smooth",
                  },
                  markers: {
                    size: 0,
                  },
                  xaxis: {
                    type: "numeric",
                    title: { text: "Layer" },
                  },
                  yaxis: {
                    title: { text: "Filament used" },
                  },
                  tooltip: {
                    x: {
                      format: "mm:ss",
                    },
                  },
                  legend: {
                    show: true,
                  },
                }}
                series={[
                  {
                    name: "Layer",
                    data: getLayerData(model!),
                  },
                ]}
                type="line"
                height={350}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Print;
