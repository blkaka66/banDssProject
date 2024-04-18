import { atom } from 'recoil';

export const relatedPartsWithdischargeState = atom<Record<number, { control: number[] ,supply:number[],etc:number[] }>>({
  key: 'relatedPartsWithdischargeState',
  default: {},
});
export const relatedPartsWithsupplyeState = atom<Record<number, { application: number[] ,discharge:number[],etc:number[] }>>({
  key: 'relatedPartsWithsupplyeState',
  default: {},
});

export const relatedPartsWithrobotState = atom<Record<number, { etc:number[] }>>({
  key: 'relatedPartsWithrobotState',
  default: {},
});


export const partsState = atom<{
  application: number[];
  control: number[];
  discharge: number[];
  etc: number[];
  robot: number[];
  supply: number[];
}>({
  key: 'partsState',
  default: {
    application: [],
    control: [],
    discharge: [],
    etc: [],
    robot: [],
    supply: [],
  },
});
