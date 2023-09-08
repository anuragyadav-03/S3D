export interface iPrinter {
  id: number;
  name?: string;
  deviceId: string;
  description?: string;
  streamingUrl?: string[];
  printerConfigId?: number;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
  archivedAt: Date;
}

export interface iSingleConfiguration {
  command: string;
  htmlElement: string;
  id: number;
  isTesting: boolean;
  name: string;
  printerConfigId: number;
  selfArray: any[];
  text: string;
}

export interface iPrinterConfig {
  Configuration: iSingleConfiguration[];
  id: number;
  isDefault: boolean;
  name: string;
}

enum BoardState {
  unknown,
  flashing,
  flashFailed,
  resetting,
  running,
}

enum HeaterState {
  active,
  off,
  standby,
}

enum SensorAnalogType {
  thermistor,
  pt1000,
  rtdmax31865,
  thermocouplemax31855,
  thermocouplemax31856,
  linearanalog,
  dht11,
  dht21,
  dht22,
  dhthumidity,
  currentlooppyro,
  mcutemp,
  drivers,
  driversduex,
  unknown,
}

enum SensorEndstopType {
  inputPin,
  zProbeAsEndstop,
  motorStallAny,
  motorStallIndividual,
  unknown,
}

enum StateStatus {
  disconnected,
  starting,
  updating,
  off,
  halted,
  pausing,
  paused,
  resuming,
  cancelling,
  processing,
  simulating,
  busy,
  changingTool,
  idle,
}

enum ToolState {
  off,
  active,
  standby,
}

interface iSingleRangedValue {
  current: number;
  max: number;
  min: number;
}

interface iSingleBoard {
  canAddress: number | string;
  firmwareVersion: string;
  maxHeaters: number;
  maxMotors: number;
  mcuTemp: iSingleRangedValue;
  name: string;
  state: BoardState;
  uniqueId: string;
  v12: iSingleRangedValue;
  vIn: iSingleRangedValue;
}

interface iDirectoryPath {
  [name: string]: string;
}

interface iFanThermostatic {
  heaters: number[];
  highTemperature: number | null;
  lowTemperature: number | null;
}

interface iSingleFan {
  actualValue: number;
  max: number;
  min: number;
  name: string;
  rpm: number;
  thermostatic: iFanThermostatic;
}

interface iSingleHeater {
  active: number;
  avgPwm: number;
  current: number;
  max: number;
  min: number;
  sensor: number;
  standby: number;
  state: HeaterState;
}

interface iHeat {
  bedHeaters: number[];
  coldExtrudeTemperature: number;
  coldRetractTemperature: number;
  heaters: iSingleHeater[];
}

interface iJobFile {
  filament: number[];
  fileName: string;
  height: number;
  lastModified: Date | string | null;
  layerHeight: number;
  numLayers: number;
  printTime: number;
  size: number;
  generatedBy: string;
}

interface iSingleLayer {
  duration: number;
  filament: number[];
  fractionPrinted: number;
  height: number;
  temperatures: number[];
}

interface iTimesLeft {
  filament: number;
  file: number;
  slicer: number;
}

interface iJob {
  duration: number;
  file: iJobFile;
  lastDuration: number | null;
  lastFileAborted: Boolean;
  lastFileCancelled: Boolean;
  lastFileName: string | null;
  lastFileSimulated: Boolean;
  layer: number;
  layerTime: number;
  layers: iSingleLayer[];
  pauseDuration: number;
  rawExtrusion: number;
  timesLeft: iTimesLeft;
  warmUpDuration: number;
}

interface iSingleMessage {
  content: string;
  time: Date | string;
  type: number;
}

interface iSingleAxis {
  babystep: number;
  homed: boolean;
  letter: string;
  machinePosition: number;
  max: number;
  maxProbed: boolean;
  min: number;
  minProbed: boolean;
  userPosition: number;
}

interface iCurrentMove {
  requestedSpeed: number;
  topSpeed: number;
}

interface iSingleExtruder {
  factor: number;
  position: number;
}

interface iMove {
  axes: iSingleAxis[];
  currentMove: iCurrentMove;
  extruders: iSingleExtruder[];
  speedFactor: number;
}

interface iSingleInterface {
  actualIP: string;
  type: string;
}

interface iNetwork {
  hostname: string;
  interfaces: iSingleInterface[];
  name: string;
}

interface iSingleAnalog {
  lastReading: number;
  name: string;
  type: SensorAnalogType;
}

interface iSingleEndstops {
  hightEnd: boolean;
  tiggered: boolean;
  type: SensorEndstopType;
}

interface iSingleProbe {
  value: number;
}

interface iSensors {
  analog: iSingleAnalog[];
  endstops: iSingleEndstops[];
  probes: iSingleProbe[];
}

interface iState {
  currentTool: number;
  displayMessage: string;
  status: StateStatus;
  time: Date | string;
  upTime: number;
}

interface iSingleTool {
  active: number[];
  extruders: number[];
  fans: number[];
  heaters: number[];
  isRetracted: boolean;
  name: string;
  number: number;
  standby: number[];
  state: ToolState;
}

export interface iPrinterObjectModel {
  boards: iSingleBoard[];
  directories: iDirectoryPath;
  fans: iSingleFan[];
  heat: iHeat;
  job: iJob;
  messages: iSingleMessage[];
  move: iMove;
  network: iNetwork;
  sensors: iSensors;
  state: iState;
  tools: iSingleTool[];
}

interface iTempStatData {
  x: number;
  y: number | string;
}
export interface iSingleTempStat {
  name: string;
  data: iTempStatData[];
}

export interface iMaterial {
  id: number;
  name: string;
  unitPrice: number;
}

export interface iProject {
  id: number;
  name: string;
  progress: number;
  cost: number;
  deadline: Date;
  isFavourite: boolean;
  budget: number;
  materialId: number;
}

export interface iFile {
  id: number;
  fileName: string;
  filePath: string;
  fileSize: number;
  fileType: string;
  projectId: number | null;
  project: iProject | null;
}

export interface iPrint {
  id: number;
  printerId: number;
  printer: iPrinter;
  fileId: number;
  file: iFile;
  projectId: number | null;
  project: iProject | null;
}

export interface iPrintChecklist {
  id: number;
  isBedClean: any;
  softPurgeResult: any;
  homingResult: any;
  wasSatified: boolean;
  printId: number;
  print: iPrint;
}
