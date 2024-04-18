import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { stringToArrComma } from '@/utils/stringToArr';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { Name, Value ,Data}: any = req.query;
  console.log("Name:", Name);
  console.log("Value:", Value);
  console.log("data:", Data);
  if(Data){
    const data = stringToArrComma(Data);
  }
  const data = stringToArrComma(Data);
  if (req.method === "GET") {
    if(Name === "supply_capacity_L" && Data){
      let itemArr=[];
      console.log("data",data)
      try {
        const results = await prisma.supply.findMany({
          where: {
            AND: [
              { id: { in: data.map(Number) } }, // 문자열 배열을 숫자 배열로 변환하여 사용
              { supply_capacity_L: { gte: Number(Value) } } // Value가 주어진 값 이상인 경우
              ]
            },
          orderBy: {
            supply_capacity_L: 'asc' // 'asc'는 오름차순 정렬을 의미함
          },
          take: 1 // 결과 중 첫 번째 항목만 가져오도록 함
          });
          console.log("results",results)
          const nullResults = await prisma.supply.findMany({ //용량 빈칸인거가져오기
            where: {
              [`${Name}`]: null // Name이 null인 경우
            }
          });
          console.log("nullResults",nullResults)
          itemArr = [...results, ...nullResults];
          console.log("itemArr",itemArr)
          res.status(200).json({ data: itemArr});
        } catch (error) {
          console.error("Error executing Prisma query:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else{
      try {
        // Prisma를 사용하여 해당하는 조건에 맞는 데이터를 가져오는 쿼리 실행
          const results = await prisma.supply.findMany({
            where: {
              OR: [
                {
                  [`${Name}`]: null //Name이 null인 경우
                },
                {
                  [`${Name}`]: {
                    gte: Number(Value) //Value가 주어진 값 이상인 경우
                  }
                }
              ]
            }
          });
  
        console.log("results:", results);
  
        // 결과를 클라이언트에게 응답
        res.status(200).json({ data: results});
      } catch (error) {
        console.error("Error executing Prisma query:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
    
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
