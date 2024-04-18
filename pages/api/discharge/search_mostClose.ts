import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { stringToArrComma } from '@/utils/stringToArr';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { Name, Value,Data }: any = req.query;
  //살아남은 놈들중 가장 가까운놈을 고르는거기때문에 Data로 살아남은 부품의 id를받아옴
  const data = stringToArrComma(Data);
  console.log("data",data)
  console.log("Name",Name)
  console.log("Value",Value)
  if (req.method === "GET") {
    try {
      // Prisma를 사용하여 해당하는 조건에 맞는 데이터를 가져오는 쿼리 실행
      const results = await prisma.discharge.findMany({
        where: {
          id: {
            in: data.map(Number) // 문자열 배열을 숫자 배열로 변환하여 사용
          }
        }
      });
      const nullResults = await prisma.discharge.findMany({
        where: {
          [`${Name}`]: null // Name이 null인 경우
        }
      });
      let closestValue;
      let itemArr=[];
      let minDifference = Number.MAX_SAFE_INTEGER;
      for (const item of results) {
        if(item.median_discharge_amount){
          const difference = Math.abs(item.median_discharge_amount - Number(Value));
          console.log(item,"의 차이는",difference)
          if (difference < minDifference) {
            itemArr=[];
            minDifference = difference;
            closestValue = item;
            itemArr.push(item);
          }else if(difference === minDifference){//차이가 최솟값이랑 똑같으면 얘도추가
            itemArr.push(item);
          }
        }
      }

       itemArr = [...itemArr, ...nullResults];
      console.log("combinedResults:",itemArr)
      res.status(200).json({ data: itemArr });
    } catch (error) {
      console.error("Error executing Prisma query:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
