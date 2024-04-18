import axios from "axios";
import { disChargeDto, SupplyDTO, ControlDTO, RobotDTO, ApplicationDTO, EtcDTO, QuestionDTO } from "../pages/dto/dto";

function classificationData(
  tableName: string,
  data: disChargeDto | SupplyDTO | ControlDTO | RobotDTO | ApplicationDTO | EtcDTO | QuestionDTO 
) {
  switch (tableName) {
    case "discharge":
      // tableName이 'discharge'일 때는 DischargeDTO 타입으로 데이터를 변환
      return data as disChargeDto;
    case "supply":
      // tableName이 'supply'일 때는 SupplyDTO 타입으로 데이터를 변환
      return data as SupplyDTO;
    case "control":
      // tableName이 'control'일 때는 ControlDTO 타입으로 데이터를 변환
      return data as ControlDTO;
    case "automation":
      // tableName이 'automation'일 때는 AutomationDTO 타입으로 데이터를 변환
      return data as RobotDTO;
    case "application":
      // tableName이 'application'일 때는 ApplicationDTO 타입으로 데이터를 변환
      return data as ApplicationDTO;
    case "etc":
      // tableName이 'etc'일 때는 EtcDTO 타입으로 데이터를 변환
      return data as EtcDTO;
    case "question":
      // tableName이 'question'일 때는 QuestionDTO 타입으로 데이터를 변환
      return data as QuestionDTO;
    default:
      return false;
  }
}

export async function inputData(
  tableName: string,
  data: disChargeDto | SupplyDTO | ControlDTO | RobotDTO | ApplicationDTO | EtcDTO | QuestionDTO 
) {
  const classifiedData = classificationData(tableName, data);

  try {
    // tableName에 따라 데이터를 구분

    // API 요청을 보내고 해당 엔드포인트에서 데이터를 생성.
    const response = await axios.post(`/api/${tableName}`, classifiedData);

    return response.data;
  } catch (error) {
    // 요청이 실패하면 오류를 처리.
    throw new Error(`Error creating ${tableName}: ${error}`);
  }
}

//세로줄찾기
export async function getColumnData(tableName: string, columnName: string) {

  try {
    const response = await axios.get(`/api/${tableName}?Name=${columnName}`);
    return response.data;
    //getColumn에 해당하는 데이터 가져오기
    //예시로 해당 모듈에 getColumn으로 데이터를 가져오는 메서드가 있다고 가정합니다.
    //가져온 데이터 반환
  } catch (error) {
    throw new Error(`Error fetching data from ${tableName}: ${error}`);
  }
}

//가로줄 찾기
export async function getRowData(tableName: string, rowName: string,rowValue: string|boolean|number) {

  try {
    const response = await axios.get(`/api/${tableName}?Name=${rowName}&Value=${rowValue}`);
    return response.data;
    //getColumn에 해당하는 데이터 가져오기
    //예시로 해당 모듈에 getColumn으로 데이터를 가져오는 메서드가 있다고 가정합니다.
    //가져온 데이터 반환
  } catch (error) {
    throw new Error(`Error fetching data from ${tableName}: ${error}`);
  }
}



export async function deleteData(tableName: string, rowName: string,rowValue: string|boolean) {
  try {
    //4)여기서 보내가지고 string인거같은데 다른방법이있나?
    const response = await axios.delete(`/api/${tableName}?Name=${rowName}&Value=${rowValue}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting data from ${tableName}: ${error}`);
  }
}

export async function updateData(tableName: string, rowName: string, rowValue: string | boolean,newData: any) {
  try {
    const response = await axios.patch(`/api/${tableName}?Name=${rowName}&Value=${rowValue}`, {
      [rowName]: newData
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error updating data in ${tableName}: ${error}`);
  }
}

export async function dischargeRelatedControl(value:number[]) {
  try {
    const response = await axios.get(`/api/discharge/related_control/?Value=${value}`);
    return response.data;
  } catch (error) {
    console.log("에러났어요")
    throw new Error(`Error updating data in related_control: ${error}`);
  }
}

export async function dischargeRelatedSupply(value:number[]) {
  try {
    const response = await axios.get(`/api/discharge/related_supply/?Value=${value}`);
    return response.data;
  } catch (error) {
    console.log("에러났어요")
    throw new Error(`Error updating data in related_control: ${error}`);
  }
}

export async function dischargeRelatedEtc(value:number[]) {
  try {
    const response = await axios.get(`/api/discharge/related_etc/?Value=${value}`);
    return response.data;
  } catch (error) {
    console.log("에러났어요")
    throw new Error(`Error updating data in related_control: ${error}`);
  }
}

export async function supplyRelatedEtc(value:number[]) {
  try {
    const response = await axios.get(`/api/supply/related_etc/?Value=${value}`);
    return response.data;
  } catch (error) {
    console.log("에러났어요")
    throw new Error(`Error updating data in related_control: ${error}`);
  }
}

export async function supplyRelatedDischarge(value:number[]) {
  try {
    const response = await axios.get(`/api/supply/related_discharge/?Value=${value}`);
    return response.data;
  } catch (error) {
    console.log("에러났어요")
    throw new Error(`Error updating data in related_control: ${error}`);
  }
}


export async function supplyRelatedApplication(value:number[]) {
  try {
    const response = await axios.get(`/api/supply/related_application/?Value=${value}`);
    return response.data;
  } catch (error) {
    console.log("에러났어요")
    throw new Error(`Error updating data in related_control: ${error}`);
  }
}

export async function robotRelatedEtc(value:number[]) {
  try {
    const response = await axios.get(`/api/robot/related_etc/?Value=${value}`);
    return response.data;
  } catch (error) {
    console.log("에러났어요")
    throw new Error(`Error updating data in related_control: ${error}`);
  }
}


export async function dischargeSearchUnder(rowName: string,rowValue: string,data:any) { //discharge에서 이하인놈찾기
  try {
    const response = await axios.get(`/api/discharge/search_under/?Name=${rowName}&Value=${rowValue}&Data=${data}`);
    return response.data;
  } catch (error) {
    console.log("에러났어요")
    throw new Error(`Error updating data in related_control: ${error}`);
  }
}
export async function dischargeSearchUpper(rowName: string,rowValue: string) { //discharge에서 이상인놈찾기
  try {
    const response = await axios.get(`/api/discharge/search_upper/?Name=${rowName}&Value=${rowValue}`);
    return response.data;
  } catch (error) {
    console.log("에러났어요")
    throw new Error(`Error updating data in related_control: ${error}`);
  }
}

export async function dischargeSearchMostClose(rowName: string,rowValue: string,data:any) { //discharge에서 가장가까운값찾기
  console.log(data)
  try {
    const response = await axios.get(`/api/discharge/search_mostClose/?Name=${rowName}&Value=${rowValue}&Data=${data}`);
    return response.data;
  } catch (error) {
    console.log("에러났어요")
    throw new Error(`Error updating data in related_control: ${error}`);
  }
}


export async function supplySearchUpper(rowName: string,rowValue: string,data?:any) { //supply에서 이상인놈찾기
  try {
    const response = await axios.get(`/api/supply/search_upper/?Name=${rowName}&Value=${rowValue}&Data=${data}`);
    return response.data;
  } catch (error) {
    console.log("에러났어요")
    throw new Error(`Error updating data in related_control: ${error}`);
  }
}


export async function applicationSearchUnder(rowName: string,rowValue: string) { //application에서 이하인놈찾기
  try {
    const response = await axios.get(`/api/application/search_under/?Name=${rowName}&Value=${rowValue}`);
    return response.data;
  } catch (error) {
    console.log("에러났어요")
    throw new Error(`Error updating data in related_control: ${error}`);
  }
}

export async function applicationSearchUpper(rowName: string,rowValue: string) { //application에서 이하인놈찾기
  try {
    const response = await axios.get(`/api/application/search_upper/?Name=${rowName}&Value=${rowValue}`);
    return response.data;
  } catch (error) {
    console.log("에러났어요")
    throw new Error(`Error updating data in related_control: ${error}`);
  }
}

export async function robotSearchUpper(rowName: string,rowValue: string) { //application에서 이하인놈찾기
  try {
    const response = await axios.get(`/api/robot/search_upper/?Name=${rowName}&Value=${rowValue}`);
    return response.data;
  } catch (error) {
    console.log("에러났어요")
    throw new Error(`Error updating data in related_control: ${error}`);
  }
}