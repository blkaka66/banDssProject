import { atom } from 'recoil';
import { PartItem } from './QuestionContentLogic';

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


export const partsState = atom<Map <number,PartItem>>({
  key: 'partsState',
  default:new Map<number, PartItem>()
});

