import { Component, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faFilter } from "@fortawesome/free-solid-svg-icons";
import PrintCard from "../components/printCard";
import ModalStepper from "./modelStepper";

interface iState {
  showStepper: boolean;
  printers: any[];
  prints: any[];
  files: any[];
}

class Project extends Component<any, iState> {
  constructor(props: any) {
    super(props);
    this.state = {
      showStepper: false,
      printers: [
        {
          id: 1,
          name: "printer-1",
          progress: 75,
          nozzleTemp: 230,
          nozzleSpeed: "200",
          streamingUrl: [],
          status: "printing",
        },
        {
          id: 2,
          name: "printer-2",
          progress: 74,
          nozzleTemp: 230,
          nozzleSpeed: "200",
          streamingUrl: [],
          status: "paused",
        },
        {
          id: 3,
          name: "printer-3",
          progress: 45,
          nozzleTemp: 230,
          nozzleSpeed: "200",
          streamingUrl: [],
          status: "stopped",
        },
        {
          id: 4,
          name: "printer-4",
          nozzleTemp: 230,
          nozzleSpeed: "200",
          streamingUrl: [],
          status: "idle",
        },
        {
          id: 4,
          name: "printer-5",
          nozzleTemp: 230,
          nozzleSpeed: "200",
          streamingUrl: [],
          status: "idle",
        },
      ],
      prints: [
        {
          fileId: 1,
          printerId: 1,
          file: { id: 1, fileName: "left-arm.g3" },
          printer: {
            id: 1,
            name: "printer-1",
            progress: 75,
            nozzleTemp: 230,
            nozzleSpeed: "200",
            streamingUrl: [],
            status: "printing",
          },
        },
        {
          fileId: 2,
          printerId: 2,
          file: { id: 2, fileName: "right-arm.g3" },
          printer: {
            id: 2,
            name: "printer-2",
            progress: 74,
            nozzleTemp: 230,
            nozzleSpeed: "200",
            streamingUrl: [],
            status: "paused",
          },
        },
        {
          fileId: 3,
          printerId: 3,
          file: { id: 3, fileName: "head.g3" },
          printer: {
            id: 3,
            name: "printer-3",
            progress: 45,
            nozzleTemp: 230,
            nozzleSpeed: "200",
            streamingUrl: [],
            status: "stopped",
          },
        },
      ],
      files: [{ id: 4, fileName: "foot.g3" }],
    };
  }

  render(): ReactNode {
    const { showStepper } = this.state;

    return (
      <>
        {showStepper && <ModalStepper />}
        <div className="w-[92%] mx-auto pt-10">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                size="2x"
                className="text-text"
              />
              <h1 className="inline text-5xl text-primary ml-3">
                Project Mumbai
              </h1>
            </div>
            <div className="text-right text-xl">
              <span className="block text-text-variant">
                Deadline: 27 September 2023
              </span>
              <span className="block text-error">4 days left</span>
            </div>
          </div>
          <div className="flex items-end mt-5">
            <div>
              <span className="block text-text-variant text-xl">Progress</span>
              <span className="block text-5xl text-text">28%</span>
            </div>
            <div className="ml-10">
              <span className="block text-text-variant text-xl">Cost</span>
              <span className="block text-5xl">
                <span className="text-text">29.5k</span>
                <span className="text-text-variant2">/80.0k$</span>
                <span className="text-sm text-success ml-1">36.8%</span>
              </span>
            </div>
            <div className="ml-auto">
              <FontAwesomeIcon
                icon={faFilter}
                size="2x"
                className="text-text-variant"
              />
            </div>
          </div>
          <div className="flex flex-wrap mt-10" style={{ gap: "2rem" }}>
            <PrintCard
              isNew
              onClick={() =>
                this.setState({ showStepper: !this.state.showStepper })
              }
            />
            {this.state.prints.map((p, idx) => (
              <PrintCard
                key={idx}
                fileName={p.file.fileName}
                nozzleSpeed={p.printer.nozzleSpeed}
                nozzleTemp={p.printer.nozzleTemp}
                printStatus={p.printer.status}
                progress={p.printer.progress}
                hasStreamingUrls={p.printer.streamingUrl || false}
              />
            ))}
            {this.state.files.map((f, idx) => (
              <PrintCard key={idx} fileName={f.fileName} isFile={true} />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Project;
