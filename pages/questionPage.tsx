import React, { useEffect, useState, useRef } from "react";
import CheckBox from "@/components/CheckBox";
import { inputData, getRowData, getColumnData, deleteData, updateData } from "../utils/tableApi";
import { QuestionDTO } from "./dto/dto";
import { stringToArr } from "@/utils/stringToArr";
import { questionType } from "./dto/dto";
import { Button, TextField } from "@mui/material";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import questionContentLogic from "@/utils/QuestionContentLogic";
import { useRecoilState } from "recoil";
import { partsState,relatedPartsWithdischargeState, relatedPartsWithsupplyeState,relatedPartsWithrobotState } from "@/utils/state";
import { ControlCameraSharp } from "@mui/icons-material";


function QuestionPage() {
  const [relatedPartsWithDischarge, setRelatedPartsWithDischargeState] = useRecoilState(relatedPartsWithdischargeState);
  const [relatedPartWithSupply,setRelatedPartWithSupply] = useRecoilState(relatedPartsWithsupplyeState);
  const [relatedPartWithRobot,setRelatedPartWithRobot] = useRecoilState(relatedPartsWithrobotState);
  const [parts, setPartsState] = useRecoilState(partsState);
  const [questionData, setQuestionData] = useState<QuestionDTO | null>(null);
  const [questionNumber, setQuestionNumber] = useState(2);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  //const [textFieldValue, setTextFieldValue] = useState("");
  const [filteredMultipleOptions, setFilteredMultipleOptions] = useState<string[]>([]);
  const [filteredShortAnswer , setFilteredShortAnswer] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState<{ questionNumber: number, filteredShortAnswer: string[], filteredMultipleOptions: string[] }>({ questionNumber: 0, filteredShortAnswer: [], filteredMultipleOptions: [] });
  const [userResponse, setUserResponse] = useState<Record<number, { shortAnswerValues: string[], choiceItem: string }>>({}); //각 질문에 어떻게답했는지 저장 
  const [shortAnswerValues, setShortAnswerValues] = useState<string[]>([]);
  const handleBtn = async () => {
    const trueKeys = Object.keys(checkedItems).filter(key => checkedItems[key]);
    const choiceItem = trueKeys[0]

    const updatedResponse = { ...userResponse, [questionNumber]: { shortAnswerValues, choiceItem } };
    console.log("updatedResponse",updatedResponse)
    setUserResponse(updatedResponse);
    //getRowData("discharge", "ONE_COMPONENT_OR_TWO","ONE_COMPONENT")
    const res =questionContentLogic({ 
      textFieldValue: shortAnswerValues, 
       choiceItem ,
       questionNumber:questionNumber,
       setPartsState,
       setRelatedPartWithSupply,
       relatedPartsWithDischarge,
       setRelatedPartsWithDischargeState,
       setRelatedPartWithRobot,
       userResponse
       });
    setQuestionNumber(res+questionNumber);
    setCheckedItems({});
  }

  useEffect(()=>{
    console.log("parts번호 변경")
    console.log(parts)
  },[parts])
  // useEffect(()=>{
  //   console.log("discharge와 엮이는 parts 변경")
  //   console.log(relatedPartsWithDischarge)
  // },[relatedPartsWithDischarge])
  // useEffect(()=>{
  //   console.log("supply와 엮이는 parts 변경")
  //   console.log(relatedPartWithSupply)
  // },[relatedPartWithSupply])
  // useEffect(()=>{
  //   console.log("robot와 엮이는 parts 변경")
  //   console.log(relatedPartWithRobot)
  // },[relatedPartWithRobot])

  // useEffect(()=>{
  //   console.log("user답변목록")
  //   console.log(userResponse)
  // },[userResponse])

  // useEffect(()=>{
  //   if(questionNumber === 15){
     
  //     console.log("user답변목록")
  //   console.log(userResponse)
  //   console.log("parts번호 변경")
  //   console.log(parts)
  //   console.log("robot와 엮이는 parts 변경")
  //   console.log(relatedPartWithRobot)
  //   console.log("discharge와 엮이는 parts 변경")
  //   console.log(relatedPartsWithDischarge)
  //   console.log("supply와 엮이는 parts 변경")
  //   console.log(relatedPartWithSupply)
  //   }
  // },[questionNumber])

  const handleCheckedItemsChange = (checkedItems: { [key: string]: boolean }) => {
    console.log(checkedItems);
    setCheckedItems(checkedItems);
  };

  // const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = event.target;
  //   setTextFieldValue(value);
  // };

  const fetchQuestion = async (tableName:string,questionNumber: number) => {
    try {
      const response = await getRowData(tableName, "questionNumber", questionNumber);
      return response.data[0]
    } catch (error) {
      console.error("Error ", error);
    }
  };

  // useEffect(()=>{
  //   console.log("^^")
  //   console.log(userAnswer)
  // },[userAnswer])

  const handleShortAnswerChange = (index: number, value: string) => {
    const updatedValues = [...shortAnswerValues];
    updatedValues[index] = value;
    setShortAnswerValues(updatedValues);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchQuestion("question", questionNumber);
        setQuestionData(response)
      } catch (error) {
        console.error("Error fetching question: ", error);
      }
    };
  
    fetchData();
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
            const filteredSOptions = filterAnswerOptions(responseShortAnswer)
            setFilteredShortAnswer(filteredSOptions)

          } 
          else if (questionData.questionType === questionType.MultipleChoice) {
            
            const responseMultipleChoice = await fetchQuestion("MultipleChoiceQuestion", questionNumber);
            //console.log(responseMultipleChoice)
            const filteredMOptions = filterAnswerOptions(responseMultipleChoice)
            setFilteredMultipleOptions(filteredMOptions);
          } 
          else if (questionData.questionType === questionType.CompoundType) {
            
            const responseShortAnswer = await fetchQuestion("ShortAnswerQuestion", questionNumber);
            const responseMultipleChoice = await fetchQuestion("MultipleChoiceQuestion", questionNumber);
            const filteredSOptions = filterAnswerOptions(responseShortAnswer)
            setFilteredShortAnswer(filteredSOptions)
            const filteredMOptions = filterAnswerOptions(responseMultipleChoice)
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
      .filter(([key, value]) => key !== 'id' && key !== 'questionNumber' && value !== null)
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
        <TextField id={`standard-basic-${index}`} variant="standard" value={shortAnswerValues[index] || ''} onChange={(e) => handleShortAnswerChange(index, e.target.value)} />
        <span className="absolute bottom-0">{answer}</span>
      </div>
    ))}
  </>
)}

        </div>
        <CheckBox data={filteredMultipleOptions} checkedItems={checkedItems} onCheckedItemsChange={handleCheckedItemsChange} />
      </div>
      <div>
        <Button onClick={handleBtn} variant="contained" size="small" endIcon={<NavigateNextOutlinedIcon />}>
          next
        </Button>
      </div>
    </>
  );
}

export default QuestionPage;
