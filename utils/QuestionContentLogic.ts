import {
  getRowData,
  dischargeRelatedControl,
  dischargeRelatedSupply,
  dischargeRelatedEtc,
  dischargeSearchUnder,
  applicationSearchUnder,
  applicationSearchUpper,
  supplyRelatedApplication,
  supplyRelatedDischarge,
  supplyRelatedEtc,
  dischargeSearchUpper,
  
  supplySearchUpper,
  dischargeSearchMostClose,
  robotSearchUpper,
  robotRelatedEtc,
} from "./tableApi";
import { ONE_COMPONENT_OR_TWO, DischargeDTO, ControlDTO, ApplicationDTO, SupplyDTO, AUTOMATION, RobotDTO } from "@/pages/dto/dto";
import { useRecoilState } from "recoil";
import { relatedPartsWithdischargeState, partsState, relatedPartsItemWithdischargeState } from "../pages/api/state/state";
import { useEffect } from "react";
import { arrToStringComma } from "./stringToArr";

export interface PartItem {
  application: number[];
  control: number[];
  discharge: number[];
  etc: number[];
  robot: number[];
  supply: number[];
}

let noDualCartridge = false;

let partsMap = new Map<number, PartItem>();
function pushNewPartType(liquidIndex:number) {
  partsMap.set(liquidIndex, {
    application: [],
    control: [],
    discharge: [],
    etc: [],
    robot: [],
    supply: []
  });
  prevParts.push([{
    application: [],
    control: [],
    discharge: [],
    etc: [],
    robot: [],
    supply: []
  },{
    application: [],
    control: [],
    discharge: [],
    etc: [],
    robot: [],
    supply: []
  }]);
}



let prevParts: {
  //각 질문에대한 부품state배열 이전으로가면 parts에 덮어씌운다
  application: number[];
  control: number[];
  discharge: number[];
  etc: number[];
  robot: number[];
  supply: number[];
}[][] = [];




//부품간의 엮이는 부품id를 저장
let application = {
  //application부품이랑 엮이는 부품의id를 저장하는곳
};
let control = {};
let discharge = {};

let etc = {};
let robot = {};
let supply = {};
let plusQuestionNumber = 0;

async function QuestionContentLogic({
  liquidIndex,
  setLiquidIndex,
  textFieldValue,
  choiceItem,
  isNext,
  setRelatedPartsWithDischargeState,
  setRelatedPartWithSupply,
  setPartsState,
  questionNumber,
  userResponse,
  setRelatedPartWithRobot,
  setPartItem,
  setRelatedPartsItemWithDischargeState,
  setRelatedPartsItemWithsupplyeState,
  setRelatedPartsItemWithrobotState,
  relatedPartsWithDischarge,
  relatedPartWithSupply,
  relatedPartWithRobot,
}: {
  liquidIndex:any,
  setLiquidIndex:any,
  isNext: boolean;
  userResponse: any;
  textFieldValue: string[];
  choiceItem: string;
  setRelatedPartsWithDischargeState: any;
  setRelatedPartWithSupply: any;
  setPartsState: any;
  questionNumber: number;
  setRelatedPartWithRobot: any;
  setPartItem: any;
  setRelatedPartsItemWithDischargeState: any;
  setRelatedPartsItemWithsupplyeState: any;
  setRelatedPartsItemWithrobotState: any;
  relatedPartsWithDischarge: any;
  relatedPartWithSupply: any;
  relatedPartWithRobot: any;
}) {
  if (isNext === true) {

    const parts = {...partsMap.get(liquidIndex) }
    console.log("parts",parts);
    console.log("liquidindex:",liquidIndex);
    switch (questionNumber) {
      case 1:
        for(let i =0; i<Number(textFieldValue[0]); i++){
          pushNewPartType(i);
        }

        const parts = {...partsMap.get(0) }
        const partsa = {...partsMap.get(1) }
        console.log("parts",parts);
        console.log("partsa",partsa);
        if(textFieldValue[0] === "1"){//1번질문에서 2미만이라고 대답하면 2번질문 (1,2액형),3번질문스킵
          plusQuestionNumber = 3;
        }
        else{
          plusQuestionNumber = 1;
        }
        break;
      case 2:
        console.log("2번질문");
        await questionNumber2(liquidIndex,choiceItem,questionNumber);
        if (choiceItem === ONE_COMPONENT_OR_TWO.ONE_COMPONENT) {
          plusQuestionNumber = 2;
        } else if (choiceItem === ONE_COMPONENT_OR_TWO.TWO_COMPONENT) {
          plusQuestionNumber = 1;
        }
        break;
      case 3:
        await questionNumber3(liquidIndex,choiceItem, textFieldValue[0], questionNumber);
        plusQuestionNumber = 1;
        break;
      case 4:
        console.log(choiceItem);
        await questionNumber4(liquidIndex,choiceItem, questionNumber);
        plusQuestionNumber = 1;
        break;
      case 5:
        await questionNumber5(liquidIndex,choiceItem, textFieldValue[0], questionNumber);
        
        if(noDualCartridge){//4,5,8,9,10번 다시물어보는 케이스면 
          plusQuestionNumber=3;
        }
        else{
          plusQuestionNumber = 1;
        }
        break;
      case 6:
        await questionNumber6(liquidIndex,textFieldValue[0], questionNumber);
        plusQuestionNumber = 1;
        break;
      case 7:
        await questionNumber7(liquidIndex,textFieldValue[0], questionNumber);
        plusQuestionNumber = 1;
        break;
      case 8:
        await questionNumber8(liquidIndex,textFieldValue[0], questionNumber);
        plusQuestionNumber = 1;
        break;
      case 9:
        await questionNumber9(liquidIndex,choiceItem, questionNumber);
        plusQuestionNumber = 1;
        break;
      case 10:
        await questionNumber10(liquidIndex,choiceItem, questionNumber);
        console.log("noDualCartridge",noDualCartridge)
        if(noDualCartridge){//4,5,8,9,10번 다시물어보는 케이스면 
          console.log("여기여기여기여기")
          console.log(userResponse[14].choiceItem)
          await priceSelection(userResponse[14].choiceItem);
          await sortNotUseDualCarttridgeCase();
          await showAllParts();
          plusQuestionNumber=5;//이제 끝났으니까 바로 
        }
        else{
          plusQuestionNumber = 1;
        }
        break;
      case 11:
        await questionNumber11(liquidIndex,choiceItem, textFieldValue[0], questionNumber);
        plusQuestionNumber = 1;
        break;
      case 12:
        await questionNumber12(liquidIndex,choiceItem, questionNumber);
        if (choiceItem === AUTOMATION.MANUAL) {
          plusQuestionNumber = 2;
        } else if (choiceItem === AUTOMATION.Automated) {
          plusQuestionNumber = 1;
        }
        break;
      case 13:
        await questionNumber13(liquidIndex,textFieldValue, questionNumber);
        plusQuestionNumber = 1;
        break;
      case 14:
       await questionNumber14(liquidIndex,choiceItem, questionNumber)
       await finalPartUpdate(liquidIndex);
       await showAllParts();
       console.log(userResponse[1].shortAnswerValues[0])
       if(userResponse[1].shortAnswerValues[0]==="2"){//1번 질문에 2라고 대답 하였을 경우, 
        if(userResponse[2].choiceItem==="ONE_COMPONENT"){//1) 2번 질문에 1액형이라고 대답하였을 경우
          if(liquidIndex === 0){//그리고 첫번째 액체만한경우
            plusQuestionNumber=-10;//4번부터 12번까지 전체 질문 X2
          }
          
        }
        else if(userResponse[2].choiceItem==="TWO_COMPONENT"){//2번 질문에 2액형이라고 대답했을 경우
          if(userResponse[3].choiceItem==="NO" && noDualCartridge===false){//2액형 카트리지가 아닌경우 
            noDualCartridge=true;
            plusQuestionNumber=-10;//4,5,8,9,10번 질문만 다시물어보기
          }
        }
       }
       else{//1번 질문에 1라고 대답 하였을 경우, 
        plusQuestionNumber=0;//그대로 시마이
      }
       break;  
    }
  } else if (isNext === false) { //이전 버튼눌렀을때
    console.log("이전버튼!!")
    for (let i = 1; i < prevParts.length; i++) {
      if (prevParts[questionNumber - i] !== undefined) {
        plusQuestionNumber = -i;
        if (prevParts[questionNumber - i - 1] !== undefined) {
          let parts = {...partsMap.get( - i - 1) }
          parts = {
            application: prevParts[liquidIndex][questionNumber - i - 1].application,
            control: prevParts[liquidIndex][questionNumber - i - 1].control,
            discharge: prevParts[liquidIndex][questionNumber - i - 1].discharge,
            etc: prevParts[liquidIndex][questionNumber - i - 1].etc,
            robot: prevParts[liquidIndex][questionNumber - i - 1].robot,
            supply: prevParts[liquidIndex][questionNumber - i - 1].supply,
          };
          partsMap.set(liquidIndex,parts);
        } else {
          let parts = {...partsMap.get( - i ) }
          //이전 질문이 조건부 질문인데 내질문이 해당안됐다면
          parts = {
            application: prevParts[liquidIndex][questionNumber - i].application,
            control: prevParts[liquidIndex][questionNumber - i].control,
            discharge: prevParts[liquidIndex][questionNumber - i].discharge,
            etc: prevParts[liquidIndex][questionNumber - i].etc,
            robot: prevParts[liquidIndex][questionNumber - i].robot,
            supply: prevParts[liquidIndex][questionNumber - i].supply,
          };
          partsMap.set(liquidIndex,parts);
        }
        console.log("plusQuestionNumber!!",plusQuestionNumber)
        break;
      }
    }
  }
  console.log("questionNumber",questionNumber);
  return plusQuestionNumber;






  async function questionNumber2(liquidIndex:number,choiceItem: string, questionNumber: number) {
    const parts = partsMap.get(liquidIndex);
    //discharge,application영향
    try {
      

      const response = await getRowData("discharge", "ONE_COMPONENT_OR_TWO", choiceItem);
      
      await inputDischargeData(liquidIndex,questionNumber, response);
      
      await setPartsState(partsMap);
    } catch (error) {
      console.error("Error:", error);
    }
    //application 거르기
    try {
      const response = await getRowData("application", "ONE_COMPONENT_OR_TWO", choiceItem);
      await inputApplicationData(liquidIndex,questionNumber, response);
      await setPartsState(partsMap);
    } catch (error) {
      console.error("Error:", error);
    }
    //discharge 부품과 엮이는부품 저장
    //await dischargeRelatedParts();
    console.log("partsMap.get(liquidIndex)");
    console.log(partsMap.get(liquidIndex));
  }

  async function questionNumber3(liquidIndex:number,choiceItem: string, textFieldValue: string, questionNumber: number) {
    //applicaiton, discharge영향
    try {
      const response = await getRowData("discharge", "USE_TWO_COMPONENT_CARTRIDGE", choiceItem);
      await inputDischargeData(liquidIndex,questionNumber, response);
      await setPartsState(partsMap);
    } catch (error) {
      console.error("Error:", error);
    }

    try {
      //처음 application저장하는거니까 전부저장
      const response = await applicationSearchUpper("mixing_ratio", textFieldValue);
      await inputApplicationData(liquidIndex,questionNumber, response);
      await setPartsState(partsMap);
    } catch (error) {
      console.error("Error:", error);
    }
    //discharge부품과 엮이는부품 저장
    //await dischargeRelatedParts();
  }

  async function questionNumber4(liquidIndex:number,choiceItem: string, questionNumber: number) {
    // discharge영향
    try {
      const response = await getRowData("discharge", "HOW_TO_USE_IT", choiceItem);
      await inputDischargeData(liquidIndex,questionNumber, response);
      await setPartsState(partsMap);
    } catch (error) {
      console.error("Error:", error);
    }
    //await dischargeRelatedParts();
  }

  async function questionNumber5(liquidIndex:number,choiceItem: string, textFieldValue: string, questionNumber: number) {
    //applicaiton, discharge , supply영향

    if(userResponse[4].choiceItem==="CONFORMAL_COATING_SPRAYING_SPRAY_VALVE"){//4번질문에서 CONFORMAL_COATING_SPRAYING_SPRAY_VALVE 선택했는데 
      if(Number(textFieldValue)>1000){//5번 질문에서 1000초과이면 에러
        alert("에러!")
      }
    }
    
    //discharge 부분 점도
    try {
      const response = await dischargeSearchUpper("viscosity", textFieldValue);

      await inputDischargeData(liquidIndex,questionNumber, response);
      await setPartsState(partsMap);
    } catch (error) {
      console.error("Error:", error);
    } 
    //discharge 부분 PASTE
    try {
      const response = await getRowData("discharge", "SUPPROT_PASTE", choiceItem);
      await inputDischargeData(liquidIndex,questionNumber, response);
      await setPartsState(partsMap);
    } catch (error) {
      console.error("Error:", error);
    }

    //supply 부분 점도
    try {
      const response = await supplySearchUpper("viscosity", textFieldValue);
      console.log("response",response);
      await inputSupplyData(liquidIndex,questionNumber, response);
      await setPartsState(partsMap);
    } catch (error) {
      console.error("Error:", error);
    }

    //supply부분 paste
    try {
      const response = await getRowData("supply", "SUPPROT_PASTE", choiceItem);
      await inputSupplyData(liquidIndex,questionNumber, response);
      await setPartsState(partsMap);
    } catch (error) {
      console.error("Error:", error);
    }

    //applicaiton 부분 점도
    try {
      const response = await applicationSearchUpper("viscosity", textFieldValue);
      await inputApplicationData(liquidIndex,questionNumber, response);
      await setPartsState(partsMap);
    } catch (error) {
      console.error("Error:", error);
    }

    //await dischargeRelatedParts();
    //await supplyRelatedParts();
  }

  async function questionNumber6(liquidIndex:number,textFieldValue: string, questionNumber: number) {
    // discharge,supply영향
    //discharge 비중

    try {
      const response = await dischargeSearchUpper("specific_gravity", textFieldValue);
      await inputDischargeData(liquidIndex,questionNumber, response);
      await setPartsState(partsMap);
    } catch (error) {
      console.error("Error:", error);
    }

    //supply 비중
    try {
      const response = await supplySearchUpper("specific_gravity", textFieldValue);
      await inputSupplyData(liquidIndex,questionNumber, response);
      await setPartsState(partsMap);
    } catch (error) {
      console.error("Error:", error);
    }

    //await dischargeRelatedParts();
    //await supplyRelatedParts();
  }

  async function questionNumber7(liquidIndex:number,textFieldValue: string, questionNumber: number) {
    //discharge ,supply영향
   const parts = {...partsMap.get(liquidIndex) }
    //discharge 토출량
  
    //제약식 1번)barrel,카트리지는 여기서 살아있었던 없었던 무조건 부활시켜서 discharge에 포함시키기(이건 mostclose파일에적용함)
    try {
      const response = await dischargeSearchMostClose("median_discharge_amount", textFieldValue, parts.discharge); //response엔 바렐+카트리지+살아남은놈다섯
      console.log("response.data",response.data)
      const responseMMA = await getRowData("discharge", "part_name", "MMA");
      if (parts.discharge.includes(responseMMA.data[0].id)) {
        //만약 MMA가 살아있었으면
        console.log("7번질문 1제약식");
        let arrForMMA = [];
        arrForMMA.push(responseMMA.data[0].id); //mma+살아남은놈 다섯+토출+카트리지 하자
        for (let i = 0; i < response.data.length; i++) {
          arrForMMA.push(response.data[i].id);
        }

        console.log("arrForMMA", arrForMMA);
        parts.discharge=[...arrForMMA];
        partsMap.set(liquidIndex,parts);
        // parts = {
        //   ...parts,
        //   discharge: [...arrForMMA],
        // };
        prevParts[liquidIndex][questionNumber] = {
          application: parts.application,
          control: parts.control,
          discharge: parts.discharge,
          etc: parts.etc,
          robot: parts.robot,
          supply: parts.supply,
        };
      } else {
        //만약 MMA가 없었으면
        await inputDischargeData(liquidIndex,response, "replaceAll"); //하던대로
      }
    } catch (error) {
      console.error("Error:", error);
    }

    

    //supply토출량
    try {
      const response = await supplySearchUpper("max_discharge_amount", textFieldValue);
      console.log(response);
      await inputSupplyData(liquidIndex,questionNumber, response);
      await setPartsState(partsMap);
    } catch (error) {
      console.error("Error:", error);
    }

    //await dischargeRelatedParts();
    //await supplyRelatedParts();
  }

  async function questionNumber8(liquidIndex:number,textFieldValue: string, questionNumber: number) {
    const parts = {...partsMap.get(liquidIndex) }

    //discharge, application영향
    if (textFieldValue === "1") {
      //2번 outlier 제약
      //8번 질문에서 1이라고 답변했을때 4번 질문 답이 3번(molding filling)이었으면
      //BV-M06,BV-0250T살아남았으면 얘네만 남기기

      if (userResponse[4].choiceItem === "MOLDING_FILLING_METERING_VALVE") {
        console.log("8번질문 2제약식");
        let arr = [];
        try {
          const responseBVM06 = await getRowData("discharge", "part_name", "BV-M06");
          const responseBV0250T = await getRowData("discharge", "part_name", "BV-0250T");
          if (parts.discharge.includes(responseBVM06.data[0].id)) {
            arr = [];

            arr.push(responseBVM06.data[0].id);
            parts.discharge=[...arr];
            partsMap.set(liquidIndex,parts);
            // parts = {
            //   ...parts,
            //   discharge: [...arr],
            // };
            prevParts[liquidIndex][questionNumber] = {
              application: parts.application,
              control: parts.control,
              discharge: parts.discharge,
              etc: parts.etc,
              robot: parts.robot,
              supply: parts.supply,
            };
            await setPartsState(partsMap);
          }
          if (parts.discharge.includes(responseBV0250T.data[0].id)) {
            arr.push(responseBV0250T.data[0].id);
            parts.discharge=[...arr];
            partsMap.set(liquidIndex,parts);
            // parts = {
            //   ...parts,
            //   discharge: [...arr],
            // };
            prevParts[liquidIndex][questionNumber] = {
              application: parts.application,
              control: parts.control,
              discharge: parts.discharge,
              etc: parts.etc,
              robot: parts.robot,
              supply: parts.supply,
            };
            await setPartsState(partsMap);
          } else if (!parts.discharge.includes(responseBVM06.data[0].id) && !parts.discharge.includes(responseBV0250T.data[0].id)) {
            //BV-M06,BV-0250T 안갖고있으면

            const response = await dischargeSearchUnder("discharge_accuracy", textFieldValue, parts.discharge); //하던대로 하기

            await inputDischargeData(liquidIndex,questionNumber, response);
            await setPartsState(partsMap);
          }

          await searchApplication();
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        //1번 outlier 제약
        //8번 질문에서 1이라고 답변했을때 토출에서 걸러지는게없으면(살아남은 놈이 죄다 1초과면)
        //테스트 답 이대로하면 1,2,10이 남는데 전부 정량성 1에서 걸림
        //1액형
        // sealing
        // 999999 , yes
        // 2
        // 67
        // 1
        //어플리케이션에서 gear pump가져오고(토출정량성 충족)
        //토출에선 paste지원이 yes인놈 다 가져온다음에 4번질문과 7번 질문답으로 다시 걸러서 가져간다.
        try {
          const response = await dischargeSearchUnder("discharge_accuracy", textFieldValue, parts.discharge);
          if (response.data.length === 0) {
            //8번 질문에서 1이라고 답변했을때 토출에서 걸러지는게없으면(살아남은 놈이 죄다 1초과면)
            console.log("8번질문 1제약식");
            const responseGearPump = await getRowData("application", "part_name", "Gear Pump");
            const supportPaste = await getRowData("discharge", "SUPPROT_PASTE", "YES");
            await inputApplicationData(liquidIndex,questionNumber,responseGearPump, undefined, "replaceAll");
            await setPartsState(partsMap);
            await inputDischargeData(supportPaste, undefined, "replaceAll");
            await setPartsState(partsMap); //이제 다 가져왔으니
            //4번질문 거르기
            await questionNumber4(liquidIndex,userResponse[4].choiceItem, 4);
            //7번질문 거르기
            await questionNumber7(liquidIndex,userResponse[7].shortAnswerValues[0], 7);
          } else if (response.data.length > 0) {
            //8번 질문에서 1이라고 답변했을때 뭔가 살아나왔으면
            
            await inputDischargeData(liquidIndex,questionNumber, response);
            const applicationResponse = await applicationSearchUnder("discharge_accuracy", textFieldValue);
            console.log("applicationResponse",applicationResponse)
            //어플리케이션 살아놈은 놈들중 gear pump빼고 다 가져오기
            const filteredData = applicationResponse.data.filter(item => item.part_name !== "Gear Pump");
            await inputApplicationData(liquidIndex,questionNumber, filteredData);
            await setPartsState(partsMap);
            return;
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    } else {
      //정량성이 1보다 클땐 그냥 하던대로 하기
      try {
        const response = await dischargeSearchUnder("discharge_accuracy", textFieldValue, parts.discharge);
        await inputDischargeData(liquidIndex,questionNumber, response);
        await setPartsState(partsMap);
        await searchApplication();
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function searchApplication() {
      const response = await applicationSearchUnder("discharge_accuracy", textFieldValue);
      await inputApplicationData(liquidIndex,questionNumber, response);
      await setPartsState(partsMap);
    }

    //await dischargeRelatedParts();
  }
  async function questionNumber9(liquidIndex:number,choiceItem: string, questionNumber: number) {
    //discharge , application 영향
    //application 부분 filler
    try {
      const response = await getRowData("application", "FILLER_SUPPORT", choiceItem);
      console.log("9번질문 어플", response);
      await inputApplicationData(liquidIndex,questionNumber, response);
      await setPartsState(partsMap);
    } catch (error) {
      console.error("Error:", error);
    }
    //discharge부분 filler
    try {
      const response = await getRowData("discharge", "FILLER_SUPPORT", choiceItem);
      console.log("9번질문 토출", response);
      await inputDischargeData(liquidIndex,questionNumber, response);
      await setPartsState(partsMap);
    } catch (error) {
      console.error("Error:", error);
    }
    //await dischargeRelatedParts();
  }

  async function questionNumber10(liquidIndex:number,choiceItem: string, questionNumber: number) {
    //discharge  영향
    //discharge부분 경화조건

    try {
      const response = await getRowData("discharge", "CURING_CONDITIONS", choiceItem);
      console.log("10번질문 토출", response);
      await inputDischargeData(liquidIndex,questionNumber, response);
      await setPartsState(partsMap);
    } catch (error) {
      console.error("Error:", error);
    }
    //await dischargeRelatedParts();
  }

  async function questionNumber11(liquidIndex:number,choiceItem: string, textFieldValue: string, questionNumber: number) {
    // discharge , supply , application 영향
    const parts = {...partsMap.get(liquidIndex) }
    //discharge 제공형태
    try {
      const response = await getRowData("discharge", "SUPPLY_FORM", choiceItem);

      await inputDischargeData(liquidIndex,questionNumber, response);
      await setPartsState(partsMap);
    } catch (error) {
      console.error("Error:", error);
    }

    //supply 제공형태
    try {
      const response = await getRowData("supply", "SUPPLY_FORM", choiceItem);
      await inputSupplyData(liquidIndex,questionNumber, response);
      await setPartsState(partsMap);
    } catch (error) {
      console.error("Error:", error);
    }

    //supply 공급용량
    try {
      const response = await supplySearchUpper("supply_capacity_L", textFieldValue, parts.supply);
      console.log("11번질문", response);
      await inputSupplyData(liquidIndex,questionNumber, response);
      await setPartsState(partsMap);
    } catch (error) {
      console.error("Error:", error);
    }

    //application 제공형태
    try {
      const response = await getRowData("application", "SUPPLY_FORM", choiceItem);
      console.log("11번질문", response);
      // inputApplicationData(response);
      // setPartsState(parts)
    } catch (error) {
      console.error("Error:", error);
    }

   //await dischargeRelatedParts();
    //await supplyRelatedParts();
  }

  async function questionNumber12(liquidIndex:number,choiceItem: string, questionNumber: number) {
    const parts = {...partsMap.get(liquidIndex) }
    // 12번질문에서 manual선택하면 토출에서 barrel,카트리지뺴고 전부 제끼기
    // 토출에서 barrel또는cartridge가 선택됐으면 무조건 공급에서도 barrel또는 cartridge가 선택됐어야함.
    //  그럼 토출쪽 barrel이나 cartridge는 지우기
    // 의문점1)그럼 manual선택했는데 barrel,카트리지가 남아있지 않는경우는 없는건가?
    // ->영업사원한테 문의하라고 창띄우기
    //의문점2)토출에서 barrel또는cartridge가 선택됐는데 공급에서는 barrel또는cartridge가 남아있지 않는경우는 없나?
    // ->그럴경우는없다. 무조건 둘다 같이 살아남거나 둘다 뒤지게 해놨다.
    if (choiceItem === "MANUAL") {
      //manual선택했으면
      let dischargeParts = [];
      for (let i = 0; i < parts.discharge.length; i++) {
        //살아남은 discharge중에 BARREL이나Cartridge있는지 보기
        try {
          const response = await getRowData("discharge", "id", parts.discharge[i]);

          if (response.data[0].category === "BARREL" || response.data[0].category === "Cartridge") {
            console.log("1233", response.data[0].category);
            dischargeParts.push(parts.discharge[i]);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }

      if (dischargeParts.length === 0) {
        //살아남은 discharge중에 BARREL이나Cartridge가 없으면
        alert("시스템에서 지원하지 않는 사양입니다. 영업사원에게 문의해주세요");
      } else if (dischargeParts.length > 0) {
        //살아남은 discharge중에 BARREL이나Cartridge가 있으면
        parts.discharge= [...dischargeParts];
        partsMap.set(liquidIndex,parts);
        // parts = {
        //   ...parts,
        //   discharge: [...dischargeParts],
        // }; //BARREL이나Cartridge뺴고 다 제끼기

        prevParts[liquidIndex][questionNumber] = {
          application: parts.application,
          control: parts.control,
          discharge: parts.discharge,
          etc: parts.etc,
          robot: parts.robot,
          supply: parts.supply,
        };
        await setPartsState(partsMap);

        let supplyParts = [];

        for (let i = 0; i < parts.supply.length; i++) {
          //살아남은 supply 중에 BARREL이나Cartridge있는지 보기
          try {
            const response = await getRowData("supply", "id", parts.supply[i]);
            console.log("1233", response.data[0].category);
            if (response.data[0].category === "BARREL" || response.data[0].category === "Cartridge") {
              supplyParts.push(parts.supply[i]);
            }
          } catch (error) {
            console.error("Error:", error);
          }
        }
        if (supplyParts.length === 0) {
          //살아남은 supply 중에 BARREL이나Cartridge가 없으면
          console.log("supply에서 살아남은놈이없음");
          alert("시스템에서 지원하지 않는 사양입니다. 영업사원에게 문의해주세요");
        } else if (supplyParts.length > 0) {
          //살아남은 supply 중에 BARREL이나Cartridge가 있으면
          console.log("supply 여기 살아남았음", supplyParts);
          parts.supply=[...supplyParts];
          partsMap.set(liquidIndex,parts);
          // parts = {
          //   ...parts,
          //   supply: [...supplyParts],
          // }; //BARREL이나Cartridge뺴고 다 제끼기
          prevParts[liquidIndex][questionNumber] = {
            application: parts.application,
            control: parts.control,
            discharge: parts.discharge,
            etc: parts.etc,
            robot: parts.robot,
            supply: parts.supply,
          };
          await setPartsState(partsMap);
        }
      }
    }
    //await dischargeRelatedParts();
    //await supplyRelatedParts();
  }
  async function questionNumber13(liquidIndex:number,textFieldValue: string[], questionNumber: number) {
    //로봇영향
    let sizeArr = [...textFieldValue];

    if (sizeArr[0] < sizeArr[1]) {
      //x,y는 서로 자리가 바뀌어도 상관없다. robot 테이블의 지원x,y길이가 서로 같기때문이다. 둘중 더큰값을 커버할수있는 row값 하나만 가져오면된다.
      [sizeArr[0], sizeArr[1]] = [sizeArr[1], sizeArr[0]]; //x,y중 더큰값을 [0]자리로 오게한다 작은값은[1]로 가게한다
    }
    console.log(sizeArr);
    try {
      const response = await robotSearchUpper("product_size_Z", sizeArr[2]); //z값부터확인해서
      console.log("response:", response.data.length);
      if (response.data.length === 0) {
        //z값이 100을 초과한다면
        try {
          const response = await getRowData("robot", "part_name", "Any Cartesian"); //Any Cartesian이 자동선택됨
          await inputRobotData(liquidIndex,questionNumber, response);
          await setPartsState(partsMap);
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        //z값이 100을 초과하지않는다면
        try {
          const response = await robotSearchUpper("product_size_X", sizeArr[0]); //자동으로 2개선택됨 (고가저가로 나중에 1개만뽑힘)
          await inputRobotData(liquidIndex,questionNumber, response);
          await setPartsState(partsMap);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
    //await robotRelatedParts();
  }

  async function questionNumber14(liquidIndex:number,choiceItem: string, questionNumber: number) {
    
    async function highLowPrice() {
      //이건 원래대로 해야했던거
      try {
        const responsesupply = await getRowData("supply", "HIGH_LOW_PRICE", choiceItem);
        const responseAppli = await getRowData("application", "HIGH_LOW_PRICE", choiceItem);
        const responserobot = await getRowData("robot", "HIGH_LOW_PRICE", choiceItem);

        console.log("responserobot", responserobot);
        await inputSupplyData(liquidIndex,questionNumber, responsesupply);
        await setPartsState(partsMap);
        await inputApplicationData(liquidIndex,questionNumber, responseAppli);
        await setPartsState(partsMap);
        await inputRobotData(liquidIndex,questionNumber, responserobot);
        await setPartsState(partsMap);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    
    const parts = {...partsMap.get(liquidIndex) }
    //제약식 -1)2번 질문에 2액형이라고 대답했고 2액형 카트리지도 사용하는 경우
    if(userResponse[2] && userResponse[3])
      {
        if(userResponse[2].choiceItem === "TWO_COMPONENT" && userResponse[3].choiceItem === "YES"){
          //MMA 고정 
          const response = await getRowData("discharge", "part_name", "MMA");
          parts.discharge=[response.data[0].id];
          partsMap.set(liquidIndex,parts);
        }
      }
    //제약식 0)가격으로 판단하기 전에 살아남은 discharge중 BARREL 이나 Cartridge 가 있으면 parts.supply를 비운다
    if(parts.discharge.length>0){
      for(let index=0;index <parts.discharge.length;index++)
        {
          const response = await getRowData("discharge", "id", parts.discharge[index]);
          if(response.data[0].category === "BARREL" ||
          response.data[0].category === "Cartridge" 
          ){
            parts.supply=[];
          }
        }
      partsMap.set(liquidIndex,parts);
    }

    //공급, 어플리케이션,로봇 영향
    //제약식 1)가격으로 판단하기 전에 4번답이 line이나 dot이고 2번 답이 1액형 이었으면
    // 토출의BV-303,BV-325,BV-396 살아남았으면 얘네만 남기기

    if (userResponse[4].choiceItem === "LINE_DISPENSING" || userResponse[4].choiceItem === "DOT_DISPENSING") {
      //4번답이 line이나 dot일때
      if(userResponse[2]){
        if (userResponse[2].choiceItem === "ONE_COMPONENT") {
          //2번답이 1액형이었으면
          let arrOneComponents = [];
          const responseBV303 = await getRowData("discharge", "part_name", "BV-303");
          const responseBV325 = await getRowData("discharge", "part_name", "BV-325");
          const responseBV396 = await getRowData("discharge", "part_name", "BV-396");
          if (parts.discharge.includes(responseBV303.data[0].id)) {
            //303이 포함돼있다면
            console.log("14번질문 1제약식");
            arrOneComponents = [];
            arrOneComponents.push(responseBV303.data[0].id);
            parts.discharge= [...arrOneComponents];
            partsMap.set(liquidIndex,parts);
            // parts = {
            //   ...parts,
            //   discharge: [...arrOneComponents],
            // };
          }
          if (parts.discharge.includes(responseBV325.data[0].id)) {
            //325이 포함돼있다면
            console.log("14번질문 1제약식");
            arrOneComponents.push(responseBV325.data[0].id);
            parts.discharge= [...arrOneComponents];
            partsMap.set(liquidIndex,parts);
            // parts = {
            //   ...parts,
            //   discharge: [...arrOneComponents],
            // };
          }
          if (parts.discharge.includes(responseBV396.data[0].id)) {
            //396이 포함돼있다면
            console.log("14번질문 1제약식");
            arrOneComponents.push(responseBV396.data[0].id);
            parts.discharge= [...arrOneComponents];
            partsMap.set(liquidIndex,parts);
            // parts = {
            //   ...parts,
            //   discharge: [...arrOneComponents],
            // };
          } else if (
            !parts.discharge.includes(responseBV303.data[0].id) &&
            !parts.discharge.includes(responseBV325.data[0].id) &&
            !parts.discharge.includes(responseBV396.data[0].id)
          ) {
            //위에 3개다 없으면 고대로 진행
            await highLowPrice(); //원래대로 하던거
          }
          await highLowPrice(); //원래대로 하던거
          await setPartsState(partsMap);
        }
      
 //제약식2)가격으로 판단하기 전에 4번답이 line이나 dot이고 2번 답이 2액형 이었으면
      // 토출의BV-T900,BV-T900-MINI살아남았으면 얘네만 남기기

        else if (userResponse[2].choiceItem === "TWO_COMPONENT") {
          //2번답이 2액형이었으면
          let arrTwoComponents = [];
          const responseBVT900 = await getRowData("discharge", "part_name", "BV-T900");
          const responseBVT900MINI = await getRowData("discharge", "part_name", "BV-T900-MINI");
          if (parts.discharge.includes(responseBVT900.data[0].id)) {
            //t900이 포함돼있다면
            console.log("14번질문 2제약식");
            arrTwoComponents = [];
            arrTwoComponents.push(responseBVT900.data[0].id);
            parts.discharge= [...arrTwoComponents];
            partsMap.set(liquidIndex,parts);
            // parts = {
            //   ...parts,
            //   discharge: [...responseBVT900],
            // };
          }
          if (parts.discharge.includes(responseBVT900MINI.data[0].id)) {
            //t900mini이 포함돼있다면
            console.log("14번질문 2제약식");
            arrTwoComponents.push(responseBVT900MINI.data[0].id);
            parts.discharge= [...arrTwoComponents];
            partsMap.set(liquidIndex,parts);
            // parts = {
            //   ...parts,
            //   discharge: [...responseBVT900MINI],
            // };
          } else if (!parts.discharge.includes(responseBVT900.data[0].id) && !parts.discharge.includes(responseBVT900MINI.data[0].id)) {
            //위에 2개다 없으면 고대로 진행
            await highLowPrice(); //원래대로 하던거
          }
  
          await highLowPrice(); //원래대로 하던거
          await setPartsState(partsMap);
        }
      
    } else {
      //4번답이 line이나 dot이 아니었으면
      await highLowPrice(); //고대로 하던거하기
      await setPartsState(partsMap);
    }
  }
    prevParts[liquidIndex][questionNumber] = {
      application: parts.application,
      control: parts.control,
      discharge: parts.discharge,
      etc: parts.etc,
      robot: parts.robot,
      supply: parts.supply,
    };
  
    await priceSelection(choiceItem);//토출,공급은 가격으로 최종 하나만선정


   
  }
  
  // function sortAllPart(tableName:string,targetName:string, dataArray:any){
  //   for (const key of Object.keys(dataArray)){
  //     const itemArray = dataArray[key][tableName];
  //     if(itemArray !== undefined && itemArray.length > 0){
  //       for (let i = 0; i < itemArray.length; i++) {
  //         const id = itemArray[i];
  //         if(targetName === "supply"){
  //           if(!parts.supply.includes(id))
  //             {
  //               parts.supply.push(id)
  //             }
  //         }
  //         else if(targetName === "control"){
  //           if(!parts.control.includes(id))
  //             {
  //               parts.control.push(id)
  //             }
  //         }
  //         else if(targetName === "etc"){
  //           if(!parts.etc.includes(id))
  //             {
  //               parts.etc.push(id)
  //             }
  //         }
  //         else if(targetName === "application"){
  //           if(!parts.application.includes(id))
  //             {
  //               parts.application.push(id)
  //             }
  //         }
  //         else if(targetName === "discharge"){
  //           if(!parts.discharge.includes(id))
  //             {
  //               parts.discharge.push(id)
  //             }
  //         }
  //       }
  //     }
      
  //   }

  //   console.log("모든 정렬이끝난 parts",parts)
  // }
  async function priceSelection(choiceItem: string) {
   
    const parts = {...partsMap.get(liquidIndex) }
    if (parts.discharge.length > 1) {//최종 선정된 토출부품이 2개이상이면
      let priceArr: any[] = [];
      let lastPartStanding: any[] = [];
      for (let i = 0; i < parts.discharge.length; i++) {
        const response = await getRowData("discharge", "id", parts.discharge[i]);
        const primecost = response.data[0].primeCost;
        console.log(response.data[0].part_name, "의 가격은", primecost);
        priceArr.push({ id: response.data[0].id, price: primecost });
      }
      if (choiceItem === "HIGH_PRICE") {//고가일때
        priceArr.sort((a, b) => b.price - a.price);//최고가 하나만선정
      } else if (choiceItem === "LOW_PRICE") {//저가일때
        priceArr.sort((a, b) => a.price - b.price);//최저가 하나만선정
      }
      lastPartStanding.push(priceArr[0].id); 
     
      parts.discharge=[...lastPartStanding];
    
      partsMap.set(liquidIndex,parts);

      priceArr = []; // 배열 초기화
      lastPartStanding = []; // 배열 초기화
    }

    console.log(parts.supply)
    if (parts.supply.length > 1) {
      console.log("^&^^^^^^^^^^")
      let priceArr: any[] = [];
      let lastPartStanding: any[] = [];
      for (let i = 0; i < parts.supply.length; i++) {
        const response = await getRowData("supply", "id", parts.supply[i]);
        const primecost = response.data[0].primeCost;
        console.log(response.data[0].part_name, "의 가격은", primecost);
        priceArr.push({ id: response.data[0].id, price: primecost });
      }
      if (choiceItem === "HIGH_PRICE") {
        priceArr.sort((a, b) => b.price - a.price);
      } else if (choiceItem === "LOW_PRICE") {
        priceArr.sort((a, b) => a.price - b.price);
      }
      lastPartStanding.push(priceArr[0].id); 
     
      parts.supply=[...lastPartStanding];

      partsMap.set(liquidIndex,parts);
      // parts = {
      //   ...parts,
      //   supply: [...lastPartStanding], // 선택된 부품으로 업데이트
      // };
      priceArr = []; // 배열 초기화
      lastPartStanding = []; // 배열 초기화
    }

    await setPartsState(partsMap);
  }

  

  async function getRelatedPartItem() {
    console.log("엮이는놈들");
    await fetchDataAndUpdateStateWithDischarge("control", relatedPartsWithDischarge.control);
    await fetchDataAndUpdateStateWithDischarge("supply", relatedPartsWithDischarge.supply);
    await fetchDataAndUpdateStateWithDischarge("etc", relatedPartsWithDischarge.etc);
    await fetchDataAndUpdateStateWithSupply("discharge", relatedPartWithSupply.discharge);
    await fetchDataAndUpdateStateWithSupply("application", relatedPartWithSupply.application);
    await fetchDataAndUpdateStateWithSupply("etc", relatedPartWithSupply.etc);
    await fetchDataAndUpdateStateWithRobot("etc", relatedPartWithRobot.etc);
  }
  
  async function sortNotUseDualCarttridgeCase(){
    let dischargeArr=[];
    outerLoop: for (let i = 0; i < 2; i++) {
      const parts = { ...partsMap.get(i) };
      for (let index = 0; index < parts.discharge.length; index++) {
          const dischargeResponse = await getRowData("discharge", "id", parts.discharge[index]);
          console.log("과연", dischargeResponse.data[0].ONE_COMPONENT_OR_TWO)
          if (dischargeResponse.data[0].ONE_COMPONENT_OR_TWO === "TWO_COMPONENT" ||
              dischargeResponse.data[0].ONE_COMPONENT_OR_TWO === "EVERYTHING"
          ) {
              let target = parts.discharge[index];
              clearDischarge();
              dischargeArr.push(target);
              parts.discharge=[...dischargeArr];
              partsMap.set(0,parts);
              
              break outerLoop;
          }
      }
    }
    
   
    function clearDischarge (){
      for(let i =0;i<2;i++){ //parts.discharge를 전부 빈배열로만들기
      const parts = { ...partsMap.get(i) };
      parts.discharge=[];
      partsMap.set(i,parts);
    }
   }



  }
  async function finalPartUpdate(liquidIndex:number) {
    const parts = {...partsMap.get(liquidIndex) }
    //parts 부분
    console.log("최종", parts);
    if (parts.discharge.length > 0) {
      console.log("최종 선정된 discharge.");
      for (let i = 0; i < parts.discharge.length; i++) {
        const response = await getRowData("discharge", "id", parts.discharge[i]);
        // partsItem 업데이트
        setPartItem((prevState: { discharge: any }) => ({
          ...prevState,
          discharge: [...prevState.discharge, response.data[0]],
        }));
      }
    }

    if (parts.application.length > 0) {
      console.log("최종 선정된 application.");
      for (let i = 0; i < parts.application.length; i++) {
        const response = await getRowData("application", "id", parts.application[i]);
        // partsItem 업데이트
        setPartItem((prevState: { application: any }) => ({
          ...prevState,
          application: [...prevState.application, response.data[0]],
        }));
      }
    }

    if (parts.robot.length > 0) {
      console.log("최종 선정된 robot.");
      for (let i = 0; i < parts.robot.length; i++) {
        const response = await getRowData("robot", "id", parts.robot[i]);
        // partsItem 업데이트
        setPartItem((prevState: { robot: any }) => ({
          ...prevState,
          robot: [...prevState.robot, response.data[0]],
        }));
      }
    }

    if (parts.supply.length > 0) {
      console.log("최종 선정된 supply.");
      for (let i = 0; i < parts.supply.length; i++) {
        const response = await getRowData("supply", "id", parts.supply[i]);
        // partsItem 업데이트
        setPartItem((prevState: { supply: any }) => ({
          ...prevState,
          supply: [...prevState.supply, response.data[0]],
        }));
      }
    }

    //////////////엮이는부품 정보저장
    // console.log("최종 엮이는부품");
    // console.log("relatedPartsWithDischarge",relatedPartsWithDischarge);
    // console.log("relatedPartsWithDischarge.control.length",relatedPartsWithDischarge.control);
    
///////////////////
    // console.log("relatedPartsWithDischarge.etc.length",relatedPartsWithDischarge.etc.length);
    // if(relatedPartsWithDischarge.etc.length>0){
    //   for (let i = 0; i < relatedPartsWithDischarge.etc.length; i++) {
    //     const response = await getRowData("etc", "id", relatedPartsWithDischarge.etc[i]);
       
    //     setRelatedPartsItemWithDischargeState((prevState: { etc: any }) => ({
    //       ...prevState,
    //       etc: [...prevState.etc, response.data[0]],
    //     }));
    //   }
    // }
    // console.log("relatedPartsWithDischarge.supply.length",relatedPartsWithDischarge.supply.length);
    // if(relatedPartsWithDischarge.supply.length>0){
    //   for (let i = 0; i < relatedPartsWithDischarge.supply.length; i++) {
    //     const response = await getRowData("supply", "id", relatedPartsWithDischarge.supply[i]);
    //     setRelatedPartsItemWithDischargeState((prevState: { supply: any }) => ({
    //       ...prevState,
    //       supply: [...prevState.supply, response.data[0]],
    //     }));
    //   }
    // }
  }

  //////////////////util
  // async function dischargeRelatedParts() {
  //   try {
  //     const responseControl = await dischargeRelatedControl(parts.discharge);
  //     const responseSupply = await dischargeRelatedSupply(parts.discharge);
  //     const responseEtc = await dischargeRelatedEtc(parts.discharge);
  //     console.log("responseControl", responseControl);
  //     console.log("responseSupply", responseSupply);
  //     console.log("responseEtc", responseEtc);

  //     const mergedData = {
  //       control: responseControl.data,
  //       supply: responseSupply.data,
  //       etc: responseEtc.data,
  //     };
  //     console.log("merged", mergedData);

  //     setRelatedPartsWithDischargeState(mergedData);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }

  // async function supplyRelatedParts() {
  //   try {
  //     const responseApplication = await supplyRelatedApplication(parts.supply);
  //     const responseDischarge = await supplyRelatedDischarge(parts.supply);
  //     const responseEtc = await supplyRelatedEtc(parts.supply);
  //     console.log("responseApplication", responseApplication);
  //     console.log("responseDischarge", responseDischarge);
  //     console.log("responseEtc", responseEtc);
  //     const mergedData = {
  //       application: responseApplication.data,
  //       discharge: responseDischarge.data,
  //       etc: responseEtc.data,
  //     };
  //     console.log("merged", mergedData);
  //     setRelatedPartWithSupply(mergedData);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }

  // async function robotRelatedParts() {
  //   try {
  //     const responseEtc = await robotRelatedEtc(parts.robot);
  //     console.log("responseEtc", responseEtc);
  //     // const mergedData = {
  //     //   ...etc , etc: responseEtc.data
  //     // };
  //     const mergedData = {
  //       etc: responseEtc.data,
  //     };
  //     console.log("merged", mergedData);
  //     setRelatedPartWithRobot(mergedData);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }
  async function showAllParts(){
    console.log("asdasdasd")
    console.log(Number(userResponse[1].shortAnswerValues[0]))
    for(let i =0; i<Number(userResponse[1].shortAnswerValues[0]); i++){
      console.log(i,"번째")
      const parts = {...partsMap.get(i) }
      console.log("///////////")
      console.log(parts)
    }
  }

  ////////////////////////////
  function inputDischargeData(liquidIndex:number,questionNumber: number, response: any, inputAll?: string, replaceAll?: string) {
    const parts = {...partsMap.get(liquidIndex) }
    console.log("parts",parts);
    
    let responseDischarge: number[] = [];
    responseDischarge = [];
    //전부 교체해야하면(토출량정량성 질문의 예외사항2번같은경우)
    if (replaceAll === "replaceAll") {
      if (response.length === undefined) {
        //객체로 data가올때
        response.data.forEach((item: DischargeDTO) => {
          responseDischarge.push(Number(item.id));
        });
      } else {
        for (let i = 0; i < response.length; i++) {
          //객체배열로 data가 올때
          responseDischarge.push(Number(response[i].data[0].id));
        }
      }
      console.log(responseDischarge);
      // parts= {
      //   ...parts,
      //   discharge: [...responseDischarge],
      // };
      parts.discharge=[...responseDischarge];
    } else {
      //discharge비어있거나 전부 넣어야하면 일단 전부 때려넣기
      if (parts.discharge.length === 0 || inputAll === "inputAll") {
        console.log("response.data")
        console.log(response.data)
        response.data.forEach((item: DischargeDTO) => {
          responseDischarge.push(Number(item.id));
        });
      }
      //discharge에 이미 뭐 있으면 겹치는것만저장
      else {
        //response.data의 길이가 1이면 여기서 추가함(근데 코드에선 undefined로나옴)
        if (response.data.length === undefined) {
          if (parts.discharge.includes(response.data.id)) {
            responseDischarge.push(Number(response.data.id));
          }
        } else {
          response.data.forEach((item: DischargeDTO) => {
            if (parts.discharge.includes(item.id)) {
              console.log(parts.discharge.includes(item.id));
              responseDischarge.push(Number(item.id));
            }
          });
        }
      }
      // parts = {
      //   ...parts,
      //   discharge: [...responseDischarge],
      // };
      parts.discharge=[...responseDischarge];
      replaceAll = "";
      inputAll = "";
    }

    prevParts[liquidIndex][questionNumber] = {
      application: parts.application,
      control: parts.control,
      discharge: parts.discharge,
      etc: parts.etc,
      robot: parts.robot,
      supply: parts.supply,
    };
    console.log("prevParts[liquidIndex][questionNumber]")
    console.log(prevParts[liquidIndex][questionNumber])
    partsMap.set(liquidIndex,parts);
    console.log("partsMap.get(liquidIndex)");
    console.log(partsMap.get(liquidIndex));
    return;
  }

  function inputApplicationData(liquidIndex:number, questionNumber: number, response: any, inputAll?: string, replaceAll?: string) {
    const parts = {...partsMap.get(liquidIndex) }
    let responseApplication: number[] = [];
    responseApplication = [];
    //전부 교체해야하면(토출량정량성 질문의 예외사항2번같은경우)
    if (replaceAll === "replaceAll") {
      if (response.length === undefined) {
        //객체로 data가올때
        response.data.forEach((item: ApplicationDTO) => {
          responseApplication.push(Number(item.id));
        });
      } else {
        for (let i = 0; i < response.length; i++) {
          //객체배열로 data가 올때
          responseApplication.push(Number(response[i].data[0].id));
        }
      }
      console.log(responseApplication);
      // parts = {
      //   ...parts,
      //   application: [...responseApplication],
      // };
      parts.application=[...responseApplication];
    } else {
      //application 비어있거나 전부 넣어야하면 일단 전부 때려넣기
      if (parts.application.length === 0 || inputAll === "inputAll") {
        response.data.forEach((item: ApplicationDTO) => {
          responseApplication.push(Number(item.id));
        });
      }
      //application 에 이미 뭐 있으면 겹치는것만저장
      else {
        //response.data의 길이가 1이면 여기서 추가함(근데 코드에선 undefined로나옴)
        if (response.data.length === undefined) {
          if (parts.application.includes(response.data.id)) {
            responseApplication.push(Number(response.data.id));
          }
        } else {
          response.data.forEach((item: ApplicationDTO) => {
            if (parts.application.includes(item.id)) {
              console.log(parts.application.includes(item.id));
              responseApplication.push(Number(item.id));
            }
          });
        }
      }
      // parts = {
      //   ...parts,
      //   application: [...responseApplication],
      // };
      console.log(responseApplication);
      console.log(responseApplication);
      console.log("parts.application")
      console.log(parts.application)
      parts.application=[...responseApplication];
      

    }
    replaceAll = "";
    inputAll = "";
    prevParts[liquidIndex][questionNumber] = {
      application: parts.application,
      control: parts.control,
      discharge: parts.discharge,
      etc: parts.etc,
      robot: parts.robot,
      supply: parts.supply,
    };
    partsMap.set(liquidIndex,parts);
    return;
  }

  function inputSupplyData(liquidIndex:number, questionNumber: number, response: any, inputAll?: string, replaceAll?: string) {
    const parts = {...partsMap.get(liquidIndex) }
    let responseSupply: number[] = [];
    responseSupply = [];
    //전부 교체해야하면(토출량정량성 질문의 예외사항2번같은경우)
    if (replaceAll === "replaceAll") {
      if (response.length === undefined) {
        //객체로 data가올때
        response.data.forEach((item: SupplyDTO) => {
          responseSupply.push(Number(item.id));
        });
      } else {
        for (let i = 0; i < response.length; i++) {
          //객체배열로 data가 올때
          responseSupply.push(Number(response[i].data[0].id));
        }
      }
      console.log(responseSupply);

      parts.supply=[...responseSupply];
    } else {
      
      if (parts.supply.length === 0 || inputAll === "inputAll") {
        response.data.forEach((item: SupplyDTO) => {
          responseSupply.push(Number(item.id));
        });
      }
      
      else {
        //response.data의 길이가 1이면 여기서 추가함(근데 코드에선 undefined로나옴)
        if (response.data.length === undefined) {
          if (parts.supply.includes(response.data.id)) {
            responseSupply.push(Number(response.data.id));
          }
        } else {
          response.data.forEach((item: SupplyDTO) => {
            if (parts.supply.includes(item.id)) {
              console.log(parts.supply.includes(item.id));
              responseSupply.push(Number(item.id));
            }
          });
        }
      }

      console.log(responseSupply);
      console.log(responseSupply);
      console.log("parts.supply")
      console.log(parts.supply)
      parts.supply=[...responseSupply];
      

    }
    replaceAll = "";
    inputAll = "";
    prevParts[liquidIndex][questionNumber] = {
      application: parts.application,
      control: parts.control,
      discharge: parts.discharge,
      etc: parts.etc,
      robot: parts.robot,
      supply: parts.supply,
    };
    partsMap.set(liquidIndex,parts);
    return;
  }

  function inputRobotData(liquidIndex:number, questionNumber: number, response: any, inputAll?: string, replaceAll?: string) {
    const parts = {...partsMap.get(liquidIndex) }
    let responseRobot: number[] = [];
    responseRobot = [];
    //전부 교체해야하면(토출량정량성 질문의 예외사항2번같은경우)
    if (replaceAll === "replaceAll") {
      if (response.length === undefined) {
        //객체로 data가올때
        response.data.forEach((item: RobotDTO) => {
          responseRobot.push(Number(item.id));
        });
      } else {
        for (let i = 0; i < response.length; i++) {
          //객체배열로 data가 올때
          responseRobot.push(Number(response[i].data[0].id));
        }
      }
      console.log(responseRobot);

      parts.robot=[...responseRobot];
    } else {
      
      if (parts.robot.length === 0 || inputAll === "inputAll") {
        response.data.forEach((item: RobotDTO) => {
          responseRobot.push(Number(item.id));
        });
      }
      
      else {
        //response.data의 길이가 1이면 여기서 추가함(근데 코드에선 undefined로나옴)
        if (response.data.length === undefined) {
          if (parts.robot.includes(response.data.id)) {
            responseRobot.push(Number(response.data.id));
          }
        } else {
          response.data.forEach((item: RobotDTO) => {
            if (parts.robot.includes(item.id)) {
              console.log(parts.robot.includes(item.id));
              responseRobot.push(Number(item.id));
            }
          });
        }
      }

      console.log(responseRobot);
      console.log(responseRobot);
      console.log("parts.robot")
      console.log(parts.robot)
      parts.robot=[...responseRobot];
      

    }
    replaceAll = "";
    inputAll = "";
    prevParts[liquidIndex][questionNumber] = {
      application: parts.application,
      control: parts.control,
      discharge: parts.discharge,
      etc: parts.etc,
      robot: parts.robot,
      supply: parts.supply,
    };
    partsMap.set(liquidIndex,parts);
    return;
  }

  
  /////////////////////////////////
  async function fetchDataAndUpdateState(tableName:string, dataArray:any, setStateFunction:any) {
    if (!dataArray) {
      console.error("dataArray is null or undefined");
      return;
    }
    
    for (const key of Object.keys(dataArray)) {
      const itemArray = dataArray[key][tableName];
      for (let i = 0; i < itemArray.length; i++) {
        const id = itemArray[i];
        const response = await getRowData(tableName, "id", id);
        setStateFunction(prevState => {
          // 이전 상태에 tableName에 해당하는 속성이 존재하는지 확인
          if (!prevState[tableName]) {
            // tableName에 해당하는 속성이 존재하지 않는 경우 초기화
            return {
              ...prevState,
              [tableName]: [],
            };
          }
    
          // tableName에 해당하는 속성이 존재하고, find 메서드를 사용하여 중복 데이터 확인
          const existingData = prevState[tableName].find(item => item.id === id);
          if (!existingData) {
            return {
              ...prevState,
              [tableName]: [...prevState[tableName], response.data[0]],
            };
          }
          return prevState; // 기존 상태 그대로 반환
        });
      }
    }
    
    
  }
  
    
    async function fetchDataAndUpdateStateWithDischarge(tableName:string, dataArray:any) {
      await fetchDataAndUpdateState(tableName, dataArray, setRelatedPartsItemWithDischargeState);
    }
    
    async function fetchDataAndUpdateStateWithSupply(tableName:string, dataArray:any) {
      await fetchDataAndUpdateState(tableName, dataArray, setRelatedPartsItemWithsupplyeState);
    }
    
    async function fetchDataAndUpdateStateWithRobot(tableName:string, dataArray:any) {
      await fetchDataAndUpdateState(tableName, dataArray, setRelatedPartsItemWithrobotState);
    }
}

export default QuestionContentLogic;
