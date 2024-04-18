import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { arrToStringComma, stringToArrComma } from '@/utils/stringToArr';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { Name, Value }: any = req.query;
  console.log("Name:", Name);
  console.log("Value:", Value);

  if (req.method === "GET") {
    try {
      // Prisma를 사용하여 해당하는 조건에 맞는 데이터를 가져오는 쿼리 실행
      const results = await prisma.robot.findMany({
        where: {
          [`${Name}`]: {
            gte: Number(Value) //Value가 주어진 값 이상인 경우
          }
        },
        orderBy: {
          // product_size_X 값을 오름차순으로 정렬하여 가장 작은 값 찾기
          [`${Name}`]: 'asc',
          
        }, take: 2 // 맨앞 결과2개만 가져오도록 설정
      });

      console.log("results:", results);

      // 결과를 클라이언트에게 응답
      res.status(200).json({ data: results });
    } catch (error) {
      console.error("Error executing Prisma query:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
