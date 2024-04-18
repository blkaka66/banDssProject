'use client'
import React, { Fragment, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { partsItem, relatedPartsItemWithdischargeState, relatedPartsItemWithrobotState, relatedPartsItemWithsupplyeState, relatedPartsWithdischargeState, relatedPartsWithrobotState, relatedPartsWithsupplyeState } from './api/state/state';
import { ApplicationDTO, ControlDTO, EtcDTO, RobotDTO, SupplyDTO, DischargeDTO } from './dto/dto';
import { useRouter } from 'next/router';
import { PaperClipIcon } from '@heroicons/react/20/solid';
import UserResponseLog from './UserResponseLog';


function handleCheckClientLogBtn(userRes:any){ //이게아니라 그 뭐냐 그 usestate로해야한다.
  return <UserResponseLog res={userRes} />;
}

function parseUserResponse(userResponse:any){
  const responseString = Array.isArray(userResponse) ? userResponse[0] : userResponse;

  let parsedData = null;
  try {
    if(responseString){
      parsedData = JSON.parse(responseString)    ;
    }
  } catch (error) {
    console.error("Error parsing userResponse:", error);
  }
  return parsedData
}

function StaffPage() {
  const [partItem, setPartItem] = useRecoilState(partsItem);
  // const partItem: {
  //   application: ApplicationDTO[];
  //   control: ControlDTO[];
  //   discharge: DischargeDTO[];
  //   etc: EtcDTO[];
  //   robot: RobotDTO[];
  //   supply: SupplyDTO[];
  // } = {
  //   application: [{
  //     AUTOMATION: "Automated",
  //     CURING_CONDITIONS: "EVERYTHING",
  //     FILLER_SUPPORT: "NO",
  //     HOW_TO_USE_IT: "EVERYTHING",
  //     ONE_COMPONENT_OR_TWO: "ONE_COMPONENT",
  //     SUPPLY_FORM: "EVERYTHING",
  //     SUPPROT_PASTE: "NO",
  //     USE_TWO_COMPONENT_CARTRIDGE: "NO",
  //     category: "PC PUMP",
  //     control: "BP-2",
  //     discharge_accuracy: 1,
  //     etc: "Valve Bracket",
  //     id: 26,
  //     keywords: "Endless piston 방식|\n1%의 정량성",
  //     median_discharge_amount: 0.505,
  //     operation_method: "ROTOR&STATOR",
  //     part_name: "SPP-500",
  //     primeCost: 2300000,
  //     specific_gravity: 2,
  //     supply: null,
  //     userKRW: 8000000,
  //     userUSD: null,
  //     viscosity: null
  //   }],
  //   control: [{
  //     AUTOMATION: "Automated",
  //     CURING_CONDITIONS: "EVERYTHING",
  //     FILLER_SUPPORT: "NO",
  //     HOW_TO_USE_IT: "EVERYTHING",
  //     ONE_COMPONENT_OR_TWO: "ONE_COMPONENT",
  //     SUPPLY_FORM: "EVERYTHING",
  //     SUPPROT_PASTE: "NO",
  //     USE_TWO_COMPONENT_CARTRIDGE: "NO",
  //     category: "PC PUMP",
  //     control: "BP-2",
  //     discharge_accuracy: 1,
  //     etc: "Valve Bracket",
  //     id: 26,
  //     keywords: "Endless piston 방식|\n1%의 정량성",
  //     median_discharge_amount: 0.505,
  //     operation_method: "ROTOR&STATOR",
  //     part_name: "SPP-500",
  //     primeCost: 2300000,
  //     specific_gravity: 2,
  //     supply: null,
  //     userKRW: 8000000,
  //     userUSD: null,
  //     viscosity: null
  //   }],
  //   discharge: [
  //     {
  //       AUTOMATION: "Automated",
  //       CURING_CONDITIONS: "EVERYTHING",
  //       FILLER_SUPPORT: "NO",
  //       HOW_TO_USE_IT: "EVERYTHING",
  //       ONE_COMPONENT_OR_TWO: "ONE_COMPONENT",
  //       SUPPLY_FORM: "EVERYTHING",
  //       SUPPROT_PASTE: "NO",
  //       USE_TWO_COMPONENT_CARTRIDGE: "NO",
  //       category: "PC PUMP",
  //       control: "BP-2",
  //       discharge_accuracy: 1,
  //       etc: "Valve Bracket",
  //       id: 26,
  //       keywords: "Endless piston 방식|\n1%의 정량성",
  //       median_discharge_amount: 0.505,
  //       operation_method: "ROTOR&STATOR",
  //       part_name: "SPP-500",
  //       primeCost: 2300000,
  //       specific_gravity: 2,
  //       supply: null,
  //       userKRW: 8000000,
  //       userUSD: null,
  //       viscosity: null
  //     }
  //   ],
  //   etc: [{
  //     AUTOMATION: "Automated",
  //     CURING_CONDITIONS: "EVERYTHING",
  //     FILLER_SUPPORT: "NO",
  //     HOW_TO_USE_IT: "EVERYTHING",
  //     ONE_COMPONENT_OR_TWO: "ONE_COMPONENT",
  //     SUPPLY_FORM: "EVERYTHING",
  //     SUPPROT_PASTE: "NO",
  //     USE_TWO_COMPONENT_CARTRIDGE: "NO",
  //     category: "PC PUMP",
  //     control: "BP-2",
  //     discharge_accuracy: 1,
  //     etc: "Valve Bracket",
  //     id: 26,
  //     keywords: "Endless piston 방식|\n1%의 정량성",
  //     median_discharge_amount: 0.505,
  //     operation_method: "ROTOR&STATOR",
  //     part_name: "SPP-500",
  //     primeCost: 2300000,
  //     specific_gravity: 2,
  //     supply: null,
  //     userKRW: 8000000,
  //     userUSD: null,
  //     viscosity: null
  //   }],
  //   robot: [{
  //     AUTOMATION: "Automated",
  //     CURING_CONDITIONS: "EVERYTHING",
  //     FILLER_SUPPORT: "NO",
  //     HOW_TO_USE_IT: "EVERYTHING",
  //     ONE_COMPONENT_OR_TWO: "ONE_COMPONENT",
  //     SUPPLY_FORM: "EVERYTHING",
  //     SUPPROT_PASTE: "NO",
  //     USE_TWO_COMPONENT_CARTRIDGE: "NO",
  //     category: "PC PUMP",
  //     control: "BP-2",
  //     discharge_accuracy: 1,
  //     etc: "Valve Bracket",
  //     id: 26,
  //     keywords: "Endless piston 방식|\n1%의 정량성",
  //     median_discharge_amount: 0.505,
  //     operation_method: "ROTOR&STATOR",
  //     part_name: "SPP-500",
  //     primeCost: 2300000,
  //     specific_gravity: 2,
  //     supply: null,
  //     userKRW: 8000000,
  //     userUSD: null,
  //     viscosity: null
  //   }],
  //   supply: [{
  //     AUTOMATION: "Automated",
  //     CURING_CONDITIONS: "EVERYTHING",
  //     FILLER_SUPPORT: "NO",
  //     HOW_TO_USE_IT: "EVERYTHING",
  //     ONE_COMPONENT_OR_TWO: "ONE_COMPONENT",
  //     SUPPLY_FORM: "EVERYTHING",
  //     SUPPROT_PASTE: "NO",
  //     USE_TWO_COMPONENT_CARTRIDGE: "NO",
  //     category: "PC PUMP",
  //     control: "BP-2",
  //     discharge_accuracy: 1,
  //     etc: "Valve Bracket",
  //     id: 26,
  //     keywords: "Endless piston 방식|\n1%의 정량성",
  //     median_discharge_amount: 0.505,
  //     operation_method: "ROTOR&STATOR",
  //     part_name: "SPP-500",
  //     primeCost: 2300000,
  //     specific_gravity: 2,
  //     supply: null,
  //     userKRW: 8000000,
  //     userUSD: null,
  //     viscosity: null
  //   }]
  // };
  
  const [relatedPartsItemWithDischarge, setRelatedPartsItemWithDischargeState] = useRecoilState(relatedPartsItemWithdischargeState);
  const [relatedPartsItemWithSupplyeState, setRelatedPartsItemWithsupplyeState] = useRecoilState(relatedPartsItemWithsupplyeState);
  const [relatedPartsItemWithRobotState, setRelatedPartsItemWithrobotState] = useRecoilState(relatedPartsItemWithrobotState);
  const [userRes , setUserRes] = useState();
  const router = useRouter();

  

  useEffect(()=>{

    const { userResponse } = router.query;
    const res = parseUserResponse(userResponse);
    setUserRes(res);
  },[])

  useEffect(()=>{
    if(userRes!==null &&userRes!==undefined){
      console.log(userRes)
    }
  },[userRes])

  const [showUserResponseLog, setShowUserResponseLog] = useState(false);


  const totalPrimeCostDischarge = calculateTotalPrimeCost(partItem.discharge);
  const totalPrimeCostSupply = calculateTotalPrimeCost(partItem.supply);
  const totalPrimeCostRobot = calculateTotalPrimeCost(partItem.robot, false, true);
  const totalPrimeCostControl = calculateTotalPrimeCost(partItem.control);
  const totalPrimeCostApplication = calculateTotalPrimeCost(partItem.application);
  const totalPrimeCostEtc = calculateTotalPrimeCost(partItem.etc, true);
  

  const totalCost =
    totalPrimeCostDischarge +
    totalPrimeCostSupply +
    totalPrimeCostRobot +
    totalPrimeCostControl +
    totalPrimeCostApplication +
    totalPrimeCostEtc;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Parts</h1>
          <p className="mt-2 text-sm text-gray-700">A list of parts information</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => handleCheckClientLogBtn(userRes)}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            고객의 대답 기록
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full">
              {renderTableSection('Discharge', partItem.discharge, totalPrimeCostDischarge)}
              {renderTableSection('Supply', partItem.supply, totalPrimeCostSupply)}
              {renderTableSection('Application', partItem.application, totalPrimeCostApplication)}
              {renderTableSection('Control', partItem.control, totalPrimeCostControl)}
              {renderTableSection('Etc', partItem.etc, totalPrimeCostEtc)}
              {renderTableSection('Robot', partItem.robot, totalPrimeCostRobot)}
              <tbody>
                <tr className="border-t border-gray-200">
                  <th colSpan={5} scope="colgroup" className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                    Total Cost: {totalCost}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderTableSection(title:any, items:any, totalPrimeCost:any) {
  return (
    <Fragment>
      <thead className="bg-white">
        
        {renderPartItemsHeader(title, totalPrimeCost)}
      </thead>
      <tbody className="bg-white">
        {renderPartItems(items)}
      </tbody>
    </Fragment>
  );
}

function renderPartItemsHeader(title:any, totalPrimeCost:number) {
  return (
    <Fragment>

      <tr className="border-t border-gray-200">
        <th
          colSpan={5}
          scope="colgroup"
          className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-semibold  text-gray-900 sm:pl-3"
        >
          <span className="text-black"> {title}</span> 
          <span className="text-gray-500"> (Total Prime Cost: {totalPrimeCost})</span>
        </th>
      
    </tr>

    <tr className="border-t border-gray-200">
        <th
          colSpan={5}
          scope="colgroup"
          className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-semibold  text-gray-900 sm:pl-3"
        >
          <div className='flex justify-between'>
          <span className="text-gray-500">Part Name</span> 
          <span className="text-gray-500">Cost</span>
          <span className="text-gray-500"></span>
          </div>
        </th>
        
    </tr>
        
    </Fragment>
  );
}

function renderPartItems(items:any) {
  return items.map(item => (
    <tr key={item.id} className="border-gray-200 border-t">
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-black sm:pl-3">
        {item.part_name}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium">{item.primeCost}</td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
        <a href="#" className="text-indigo-600 hover:text-indigo-900">
          Edit
        </a>
      </td>
    </tr>
  ));
}

function calculateTotalPrimeCost(items:any, isEtc?:boolean, isRobot?:boolean) {
  if (isEtc) {
    return items.reduce((total:any, item:any) => total + item.price, 0);
  } else if (isRobot) {
    return items.reduce((total:any, item:any) => total + item.primeCostUSD, 0);
  } else {
    return items.reduce((total:any, item:any) => total + item.primeCost, 0);
  }
}



export default StaffPage;
