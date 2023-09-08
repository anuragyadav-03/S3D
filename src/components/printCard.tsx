import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faCamera,
  faGear,
  faTrash,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

interface iProps {
  onClick?: () => void;
  isNew?: boolean;
  isFile?: boolean;
  fileName?: string;
  progress?: number;
  printStatus?: string;
  isPrinting?: boolean;
  nozzleTemp?: number;
  nozzleSpeed?: number;
  hasStreamingUrls?: boolean;
}

const ProgressDiv = styled.div<{}>`
  transform: translateX(-50%) translateY(-50%);
`;

const PrintCard = (props: iProps) => {
  return props.isNew ? (
    <div className="border border-stroke-dark-300 bg-fill-dark-200 rounded-lg text-text p-3">
      <div
        onClick={props?.onClick}
        className="border border-2 border-dashed border-stroke-dark-300 rounded-xl h-full flex flex-col justify-center items-center px-[4rem]"
      >
        <FontAwesomeIcon
          icon={faCirclePlus}
          size="4x"
          className="text-primary"
        />
        <span className="text-2xl font-light text-text-variant2 mt-3">
          Add new files
        </span>
      </div>
    </div>
  ) : (
    <div className="border border-stroke-dark-300 bg-fill-dark-200 rounded-lg text-text p-3 pr-5">
      <span className="text-lg">{props.fileName}</span>
      <FontAwesomeIcon icon={faPencil} className="ml-1 text-primary w-2" />
      <div className="flex items-center mt-3">
        {props.isFile ? (
          <div className="flex justify-center items-center border border-text-variant w-[130px] h-[130px] rounded-[50%] ml-5">
            <span className="block text-2xl font-bold text-text-variant uppercase">
              Start
            </span>
          </div>
        ) : (
          <div
            className="w-[130px] h-[130px] rounded-[50%] ml-5 relative"
            style={{
              background: `radial-gradient(closest-side, #1C1D21 95%, transparent 96% 100%), 
            conic-gradient(${
              props.printStatus === "printing"
                ? "#12b76a"
                : props.printStatus === "paused"
                ? "#F9B867"
                : "#db1f1f"
            } ${props.progress || 0}%, #545665 0)`,
            }}
          >
            <progress
              value={props.progress}
              max={100}
              style={{ visibility: "hidden", height: 0, width: 0 }}
            >
              {props.progress}
            </progress>
            <ProgressDiv className="absolute text-center top-[50%] left-[50%]">
              <span
                className={`block text-2xl font-bold ${
                  props.printStatus === "printing"
                    ? "text-success"
                    : props.printStatus === "paused"
                    ? "text-dark-primary"
                    : "text-error"
                }`}
              >
                {props.progress}%
              </span>
              <span className="block capitalize text-xs text-text-variant2 -mt-[0.2rem]">
                {props.printStatus}
              </span>
            </ProgressDiv>
          </div>
        )}
        <div className="text-left ml-5">
          <span className="block text-sm text-text-variant2">Nozzle Temp.</span>
          <span className="block text-text text-lg">
            {props.isFile ? "N/A" : `${props.nozzleTemp} ℃`}
          </span>
          <span className="block text-sm text-text-variant2">Nozzle Speed</span>
          <span className="block text-text text-lg">
            {props.isFile ? "N/A" : `${props.nozzleSpeed} rpm`}
          </span>
        </div>
      </div>
      <div className="flex items-center mt-3">
        <FontAwesomeIcon
          icon={faCamera}
          className={`ml-1 ${
            !props.hasStreamingUrls ? "text-text-disabled" : "text-text-variant"
          }`}
        />
        <FontAwesomeIcon icon={faGear} className="ml-auto text-text-variant" />
        <FontAwesomeIcon icon={faTrash} className="ml-2 text-text-variant" />
      </div>
    </div>
  );
};

export default PrintCard;
