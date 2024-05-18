import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { stringToArrComma } from '@/utils/stringToArr';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { Name, Value, Data }: any = req.query;
  const data = stringToArrComma(Data);
  console.log("data", data);
  console.log("Name", Name);
  console.log("Value", Value);
  
  if (req.method === "GET") {
    try {
      const results = await prisma.discharge.findMany({
        where: {
          id: {
            in: data.map(Number)
          }
        }
      });

      const nullResults = await prisma.discharge.findMany({
        where: {
          [`${Name}`]: null
        }
      });

      let sortedResults = results.filter(item => item.median_discharge_amount !== null);
      sortedResults.sort((a, b) => Math.abs(a.median_discharge_amount - Value) - Math.abs(b.median_discharge_amount - Value));
      sortedResults = sortedResults.slice(0, 5);

      let itemArr = [...sortedResults, ...nullResults];
      
      console.log("combinedResults:", itemArr);
      res.status(200).json({ data: itemArr });
    } catch (error) {
      console.error("Error executing Prisma query:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
