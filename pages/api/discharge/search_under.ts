import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { stringToArrComma } from '@/utils/stringToArr';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { Name, Value ,Data}: any = req.query;
  
  console.log("Name:", Name);
  console.log("Value:", Value);
  console.log("data:", Data);
  const data = stringToArrComma(Data);

  if (req.method === "GET") {
    if(Name === "discharge_accuracy" && Data){ //토출정량성 찾는거면 
      try {
          const results = await prisma.discharge.findMany({
            where: {
              AND: [
                { id: { in: data.map(Number) } }, // 문자열 배열을 숫자 배열로 변환하여 사용
                { discharge_accuracy: { lte: Number(Value) } } // Value가 주어진 값 이하인 경우
              ]
            }
          });
        res.status(200).json({ data: results});
      } catch (error) {
        console.error("Error executing Prisma query:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
        try {
          // Prisma를 사용하여 해당하는 조건에 맞는 데이터를 가져오는 쿼리 실행
            const results = await prisma.discharge.findMany({
              where: {
                OR: [
                  {
                    [`${Name}`]: null //Name이 null인 경우
                  },
                  {
                    [`${Name}`]: {
                      lte: Number(Value) //Value가 주어진 값 이하인 경우
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
  }
}
