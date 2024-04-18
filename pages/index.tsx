import React, { useEffect, useState, useRef } from "react";
import CheckBox from "@/components/CheckBox";
import { inputData, getRowData, getColumnData, deleteData, updateData } from "../utils/tableApi";
import { EtcDTO, QuestionDTO } from "./dto/dto";
import { stringToArr } from "@/utils/stringToArr";
import { questionType } from "./dto/dto";
import { Button, TextField } from "@mui/material";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import questionContentLogic from "@/utils/QuestionContentLogic";
import { useRecoilState } from "recoil";
import {
  partsState,
  relatedPartsWithdischargeState,
  relatedPartsWithsupplyeState,
  relatedPartsWithrobotState,
  partsItem,
  relatedPartsItemWithdischargeState,
  relatedPartsItemWithsupplyeState,
  relatedPartsItemWithrobotState,
} from "@/pages/api/state/state";

import { useRouter } from "next/router";

function QuestionPage() {
  const router = useRouter();
  const [relatedPartsWithDischarge, setRelatedPartsWithDischargeState] = useRecoilState(relatedPartsWithdischargeState);
  const [relatedPartWithSupply, setRelatedPartWithSupply] = useRecoilState(relatedPartsWithsupplyeState);
  const [relatedPartWithRobot, setRelatedPartWithRobot] = useRecoilState(relatedPartsWithrobotState);
  
  const [relatedPartsItemWithDischarge, setRelatedPartsItemWithDischargeState] = useRecoilState(relatedPartsItemWithdischargeState);
  const [relatedPartsItemWithSupplyeState, setRelatedPartsItemWithsupplyeState] = useRecoilState(relatedPartsItemWithsupplyeState);
  const [relatedPartsItemWithRobotState, setRelatedPartsItemWithrobotState] = useRecoilState(relatedPartsItemWithrobotState);

  const [parts, setPartsState] = useRecoilState(partsState);
  const [questionData, setQuestionData] = useState<QuestionDTO | null>(null);
  const [questionNumber, setQuestionNumber] = useState(2);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  //const [textFieldValue, setTextFieldValue] = useState("");
  const [filteredMultipleOptions, setFilteredMultipleOptions] = useState<string[]>([]);
  const [filteredShortAnswer, setFilteredShortAnswer] = useState<string[]>([]);

  const [userResponse, setUserResponse] = useState<Record<number, { shortAnswerValues: string[]; choiceItem: string }>>({}); //각 질문에 어떻게답했는지 저장
  const [shortAnswerValues, setShortAnswerValues] = useState<string[]>([]);
  const [partItem, setPartItem] = useRecoilState(partsItem);
  const handleNextBtn = async (isNext: boolean) => {
    const trueKeys = Object.keys(checkedItems).filter((key) => checkedItems[key]);
    const choiceItem = trueKeys[0];

    const updatedResponse = { ...userResponse, [questionNumber]: { shortAnswerValues, choiceItem } };
    console.log("updatedResponse", updatedResponse);
    setUserResponse(updatedResponse);



    const res = questionContentLogic({
      textFieldValue: shortAnswerValues,
      choiceItem,
      setPartItem,
      isNext,
      questionNumber: questionNumber,
      setPartsState,
      setRelatedPartWithSupply,
      setRelatedPartsWithDischargeState,
      setRelatedPartWithRobot,
      relatedPartsWithDischarge,
      relatedPartWithSupply,
      relatedPartWithRobot,
      setRelatedPartsItemWithDischargeState,
      setRelatedPartsItemWithsupplyeState,
      setRelatedPartsItemWithrobotState,
      userResponse,
    });
    if (res) {
      setQuestionNumber(res + questionNumber);
    }

    setCheckedItems({});
  };

  useEffect(() => {
    console.log("parts번호 변경");
    console.log(parts);
  }, [parts]);

// async function fetchDataAndUpdateState(tableName:string, dataArray:any, setStateFunction:any) {
//   if (!dataArray) {
//     console.error("dataArray is null or undefined");
//     return;
//   }
  
//   for (const key of Object.keys(dataArray)) {
//     const itemArray = dataArray[key][tableName];
//     for (let i = 0; i < itemArray.length; i++) {
//       const id = itemArray[i];
//       const response = await getRowData(tableName, "id", id);
//       setStateFunction(prevState => {
//         // 이전 상태에 tableName에 해당하는 속성이 존재하는지 확인
//         if (!prevState[tableName]) {
//           // tableName에 해당하는 속성이 존재하지 않는 경우 초기화
//           return {
//             ...prevState,
//             [tableName]: [],
//           };
//         }
  
//         // tableName에 해당하는 속성이 존재하고, find 메서드를 사용하여 중복 데이터 확인
//         const existingData = prevState[tableName].find(item => item.id === id);
//         if (!existingData) {
//           return {
//             ...prevState,
//             [tableName]: [...prevState[tableName], response.data[0]],
//           };
//         }
//         return prevState; // 기존 상태 그대로 반환
//       });
//     }
//   }
  
  
// }

  
//   async function fetchDataAndUpdateStateWithDischarge(tableName:string, dataArray:any) {
//     await fetchDataAndUpdateState(tableName, dataArray, setRelatedPartsItemWithDischargeState);
//   }
  
//   async function fetchDataAndUpdateStateWithSupply(tableName:string, dataArray:any) {
//     await fetchDataAndUpdateState(tableName, dataArray, setRelatedPartsItemWithsupplyeState);
//   }
  
//   async function fetchDataAndUpdateStateWithRobot(tableName:string, dataArray:any) {
//     await fetchDataAndUpdateState(tableName, dataArray, setRelatedPartsItemWithrobotState);
//   }
  
//   async function a() {
//     console.log("엮이는놈들");
//     await fetchDataAndUpdateStateWithDischarge("control", relatedPartsWithDischarge.control);
//     await fetchDataAndUpdateStateWithDischarge("supply", relatedPartsWithDischarge.supply);
//     await fetchDataAndUpdateStateWithDischarge("etc", relatedPartsWithDischarge.etc);
//     await fetchDataAndUpdateStateWithSupply("discharge", relatedPartWithSupply.discharge);
//     await fetchDataAndUpdateStateWithSupply("application", relatedPartWithSupply.application);
//     await fetchDataAndUpdateStateWithSupply("etc", relatedPartWithSupply.etc);
//     await fetchDataAndUpdateStateWithRobot("etc", relatedPartWithRobot.etc);
//   }
  





  useEffect(() => {
    console.log("discharge와 엮이는 partsItem 변경", relatedPartsItemWithDischarge);
  }, [relatedPartsItemWithDischarge]);
  
  
  
  useEffect(()=>{
    console.log("supply와 엮이는 partsItem 변경")
    console.log(relatedPartsItemWithSupplyeState)
  },[relatedPartsItemWithSupplyeState])
  useEffect(()=>{
    console.log("robot와 엮이는 partsItem 변경")
    console.log(relatedPartsItemWithRobotState)
  },[relatedPartsItemWithRobotState])

  useEffect(()=>{
    console.log("user답변목록")
    console.log(userResponse)
  },[userResponse])

  useEffect(()=>{
    console.log("토출과엮이는부품정보")
    console.log(relatedPartsItemWithDischarge)
  },[relatedPartsItemWithDischarge])



  const handleCheckedItemsChange = (checkedItems: { [key: string]: boolean }) => {
    console.log(checkedItems);
    setCheckedItems(checkedItems);
  };


  const fetchQuestion = async (tableName: string, questionNumber: number) => {
    try {
      const response = await getRowData(tableName, "questionNumber", questionNumber);
      return response.data[0];
    } catch (error) {
      console.error("Error ", error);
    }
  };

  // useEffect(()=>{
  //   console.log("^^")
  //   console.log(userAnswer)
  // },[userAnswer])

    useEffect(()=>{
    console.log(partItem)
  },[partItem])

  const handleShortAnswerChange = (index: number, value: string) => {
    const updatedValues = [...shortAnswerValues];
    updatedValues[index] = value;
    setShortAnswerValues(updatedValues);
  };

  useEffect(() => {
    console.log("questionNumber",questionNumber)
    if (questionNumber === 15) {

      router.push({
        pathname: "/staffPage",
        query: { 
          userResponse: JSON.stringify(userResponse),
        }
      });
      
      
    } 
    
    else {
      if (questionNumber === 2) { //초기화
        console.log("^^")
        setPartsState({  
          application: [],
          control: [],
          discharge: [],
          etc: [],
          robot: [],
          supply: [],
        });
        setPartItem({  
          application: [],
          control: [],
          discharge: [],
          etc: [],
          robot: [],
          supply: [],
        });
      }
      const fetchData = async () => {
        try {
          const response = await fetchQuestion("question", questionNumber);
          setQuestionData(response);
        } catch (error) {
          console.error("Error fetching question: ", error);
        }
      };
      fetchData();
    }
  }, [questionNumber]);

  useEffect(() => {
    const fetchData = async () => {
      if (questionData) {
        setFilteredMultipleOptions([]);
        setFilteredShortAnswer([]);
        setShortAnswerValues([]);
        try {
          if (questionData.questionType === questionType.ShortAnswer) {
            const responseShortAnswer = await fetchQuestion("ShortAnswerQuestion", questionNumber);
            const filteredSOptions = filterAnswerOptions(responseShortAnswer);
            setFilteredShortAnswer(filteredSOptions);
          } else if (questionData.questionType === questionType.MultipleChoice) {
            const responseMultipleChoice = await fetchQuestion("MultipleChoiceQuestion", questionNumber);
            //console.log(responseMultipleChoice)
            const filteredMOptions = filterAnswerOptions(responseMultipleChoice);
            setFilteredMultipleOptions(filteredMOptions);
          } else if (questionData.questionType === questionType.CompoundType) {
            const responseShortAnswer = await fetchQuestion("ShortAnswerQuestion", questionNumber);
            const responseMultipleChoice = await fetchQuestion("MultipleChoiceQuestion", questionNumber);
            const filteredSOptions = filterAnswerOptions(responseShortAnswer);
            setFilteredShortAnswer(filteredSOptions);
            const filteredMOptions = filterAnswerOptions(responseMultipleChoice);
            setFilteredMultipleOptions(filteredMOptions);
          }
        } catch (error) {
          console.error("Error fetching question: ", error);
        }
      }
    };

    fetchData();
  }, [questionData]);

  function filterAnswerOptions(responseShortAnswer: Record<string, string | null>): string[] {
    return Object.entries(responseShortAnswer)
      .filter(([key, value]) => key !== "id" && key !== "questionNumber" && value !== null)
      .map(([key, value]) => value as string);
  }

  return (
    <>
      <div>{questionData?.questionTitle}</div>
      <div>
        <div className="relative">
          {/* {questionData?.questionType !== questionType.MultipleChoice && (
          <>
          {filteredShortAnswer.map((answer, index) => (
            <div key={index} className="relative">
              <TextField id={`standard-basic-${index}`} variant="standard" value={textFieldValue} onChange={handleTextFieldChange} />
              <span className="absolute bottom-0">{answer}</span>
            </div>
          ))}
          </>
          )} */}

          {questionData?.questionType !== questionType.MultipleChoice && (
            <>
              {filteredShortAnswer.map((answer, index) => (
                <div key={index} className="relative">
                  <TextField
                    id={`standard-basic-${index}`}
                    variant="standard"
                    value={shortAnswerValues[index] || ""}
                    onChange={(e) => handleShortAnswerChange(index, e.target.value)}
                  />
                  <span className="absolute bottom-0">{answer}</span>
                </div>
              ))}
            </>
          )}
        </div>
        <CheckBox data={filteredMultipleOptions} checkedItems={checkedItems} onCheckedItemsChange={handleCheckedItemsChange} />
      </div>
      <div>
        {questionNumber > 2 && (
          <Button onClick={() => handleNextBtn(false)} variant="contained" size="small" endIcon={<NavigateNextOutlinedIcon />}>
            prev
          </Button>
        )}
        <Button onClick={() => handleNextBtn(true)} variant="contained" size="small" endIcon={<NavigateNextOutlinedIcon />}>
          next
        </Button>
      </div>
    </>
  );
}

export default QuestionPage;
