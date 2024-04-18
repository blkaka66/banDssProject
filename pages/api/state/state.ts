import { atom } from "recoil";
import { ApplicationDTO, ControlDTO,  RobotDTO, SupplyDTO, DischargeDTO, EtcDTO } from "../../dto/dto";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const relatedPartsWithdischargeState = atom<Record<number, { control: number[]; supply: number[]; etc: number[] }>>({
  key: "relatedPartsWithdischargeState",
  default: {},
  //effects_UNSTABLE: [persistAtom],
});


export const relatedPartsItemWithdischargeState =atom<{
  control: ControlDTO[];
  etc: EtcDTO[];
  supply: SupplyDTO[];
}>({
  key: "relatedPartsItemWithdischargeState",
  default: {
    control: [],
    supply: [],
    etc: [],
  },
});

export const relatedPartsWithsupplyeState = atom<Record<number, { application: number[]; discharge: number[]; etc: number[] }>>({
  key: "relatedPartsWithsupplyeState",
  default: {},
  //effects_UNSTABLE: [persistAtom],
});

export const relatedPartsItemWithsupplyeState =atom<{
  discharge: DischargeDTO[];
  application: ApplicationDTO[];
  etc: EtcDTO[];
}>({
  key: "relatedPartsItemWithsupplyeState",
  default: {
    application: [],
    discharge: [],
    etc: [],
  },
});


export const relatedPartsWithrobotState = atom<Record<number, { etc: number[] }>>({
  key: "relatedPartsWithrobotState",
  default: {},
  //effects_UNSTABLE: [persistAtom],
});

export const relatedPartsItemWithrobotState =atom<{
  etc: EtcDTO[];
}>({
  key: "relatedPartsItemWithrobotState",
  default: {
    etc: [],
  },
});


export const partsState = atom<{
  application: number[];
  control: number[];
  discharge: number[];
  etc: number[];
  robot: number[];
  supply: number[];
}>({
  key: "partsState",
  default: {
    application: [],
    control: [],
    discharge: [],
    etc: [],
    robot: [],
    supply: [],
  },
 // effects_UNSTABLE: [persistAtom],
});

export const partsItem = atom<{
  application: ApplicationDTO[];
  control: ControlDTO[];
  discharge: DischargeDTO[];
  etc: EtcDTO[];
  robot: RobotDTO[];
  supply: SupplyDTO[];
}>({
  key: "partsItem",
  default: {
    application: [],
    control: [],
    discharge: [],
    etc: [],
    robot: [],
    supply: [],
  },
  //effects_UNSTABLE: [persistAtom],
});
