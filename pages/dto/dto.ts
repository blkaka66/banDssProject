
export enum ONE_COMPONENT_OR_TWO {
  ONE_COMPONENT = "ONE_COMPONENT",
  TWO_COMPONENT = "TWO_COMPONENT",
  EVERYTHING = "EVERYTHING"
}

export enum USE_TWO_COMPONENT_CARTRIDGE {
  YES = "YES",
  NO = "NO",
  EVERYTHING = "EVERYTHING"
}

export enum questionType{
  ShortAnswer = "ShortAnswer",
  MultipleChoice = "MultipleChoice",
  CompoundType = "CompoundType"
}

export enum SUPPROT_PASTE {
  YES = "YES",
  NO = "NO",
  EVERYTHING = "EVERYTHING"
}

export enum HOW_TO_USE_IT {
  LINE_DISPENSING = "LINE_DISPENSING",
  DOT_DISPENSING = "DOT_DISPENSING",
  MOLDING_FILLING_METERING_VALVE = "MOLDING_FILLING_METERING_VALVE",
  UNDERFILLING = "UNDERFILLING",
  SEALING = "SEALING",
  CONFORMAL_COATING_SPRAYING_SPRAY_VALVE = "CONFORMAL_COATING_SPRAYING_SPRAY_VALVE",
  EVERYTHING = "EVERYTHING"
}

export enum FILLER_SUPPORT {
  YES = "YES",
  NO = "NO",
  EVERYTHING = "EVERYTHING"
}

export enum CURING_CONDITIONS {
  WATER_REACTION = "WATER_REACTION",
  ANAEROBIC_REACTION = "ANAEROBIC_REACTION",
  ROOM_TEMPERATURE = "ROOM_TEMPERATURE",
  UV_CURING = "UV_CURING",
  TWO_COMPONENT_CURING = "TWO_COMPONENT_CURING",
  HEATED_CURING = "HEATED_CURING",
  NOT_CURING = "NOT_CURING",
  EVERYTHING = "EVERYTHING"
}

export enum SUPPLY_FORM {
  BARREL_SYRINGE = "BARREL_SYRINGE",
  CARTRIDGE = "CARTRIDGE",
  TANK = "TANK",
  CAN_DRUM = "CAN_DRUM",
  TANK_OR_CAN_DRUM = "TANK_OR_CAN_DRUM",
  EXCEPT_TANK_OR_CAN_DRUM="EXCEPT_TANK_OR_CAN_DRUM",
  EVERYTHING = "EVERYTHING"
}

export enum AUTOMATION {
  MANUAL = "MANUAL",
  Automated = "Automated",
  EVERYTHING = "EVERYTHING"
}

export enum HIGH_LOW_PRICE {
  HIGH_PRICE = "HIGH_PRICE",
  LOW_PRICE = "LOW_PRICE",
  EVERYTHING = "EVERYTHING"
}

// dischargeDTO.ts
export interface DischargeDTO {
  id: number;
  category?: string;
  part_name?: string;
  operation_method?: string;
  SUPPROT_PASTE?: string;
  viscosity?: number;
  specific_gravity?: number;
  SUPPLY_FORM?: string;
  ONE_COMPONENT_OR_TWO?: string;
  discharge_accuracy?: number;
  median_discharge_amount?: number;
  FILLER_SUPPORT?: string;
  CURING_CONDITIONS?: string;
  AUTOMATION?: string;
  HOW_TO_USE_IT?: string;
  USE_TWO_COMPONENT_CARTRIDGE?: string;
  keywords?: string;
  control?: string;
  supply?: string;
  etc?: string;
  primeCost?: number;
  userKRW?: number;
  userUSD?: number;
}

// supplyDTO.ts
export interface SupplyDTO {
  id: number;
  category?: string;
  part_name?: string;
  SUPPLY_FORM?: string;
  supply_capacity_L?: number;
  SUPPROT_PASTE?: string;
  viscosity?: number;
  specific_gravity?: number;
  max_discharge_amount?: number;
  HIGH_LOW_PRICE?: string;
  keywords?: string;
  etc?: string;
  application?: string;
  discharge?: string;
  primeCost?: number;
  userKRW?: number;
  userUSD?: number;
}

// controlDTO.ts
export interface ControlDTO {
  id?: number;
  category?: string;
  part_name?: string;
  primeCost?: number;
  userKRW?: number;
  userUSD?: number;
}

// applicationDTO.ts
export interface ApplicationDTO {
  id: number;
  category?: string;
  part_name?: string;
  viscosity?: number;
  FILLER_SUPPORT?: string;
  SUPPLY_FORM?: string;
  ONE_COMPONENT_OR_TWO?: string;
  discharge_accuracy?: number;
  HIGH_LOW_PRICE?: string;
  mixing_ratio?: number;
  keywords?: string;
  primeCost?: number;
  userKRW?: number;
  userUSD?: number;
}

// robotDTO.ts
export interface RobotDTO {
  id: number;
  category?: string;
  part_name?: string;
  product_size_X?: number;
  product_size_Y?: number;
  product_size_Z?: number;
  HIGH_LOW_PRICE?: string;
  keywords?: string;
  etc?: string;
  primeCostUSD?: number;
  userKRW?: number;
  userUSD?: number;
}

// etcDTO.ts
export interface EtcDTO {
  id: number;
  category?: string;
  part_name?: string;
  price?: number;
}

// questionDTO.ts
export interface QuestionDTO {
  id: number;
  questionType?: string;
  questionTitle?: string;
  questionNumber?: string;
}

// MultipleChoiceQuestionDTO.ts
export interface MultipleChoiceQuestionDTO {
  id: number;
  questionNumber?: string;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
  option5?: string;
  option6?: string;
  option7?: string;
}

// ShortAnswerQuestionDTO.ts
export interface ShortAnswerQuestionDTO {
  id: number;
  questionNumber?: string;
  option1?: string;
  option2?: string;
  option3?: string;
}