import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient  } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.method);
  if (req.method === "POST") {
    try {
      // Prisma를 사용하여 데이터 생성
      const createdEtc = await prisma.etc.create({
        data: req.body,
      });

      // 성공적인 응답을 반환합니다.
      res.status(200).json({ message: "etc created successfully.", etc: createdEtc });
    } catch (error) {
      // 요청이 실패하면 오류를 처리합니다.
      console.error("에러발생", error);
      res.status(500).json({ error: "Error creating etc." });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === "GET") {
    // GET 요청 처리
    try {
      console.log(req.query);
      // URL 쿼리 파라미터에서 getcolumn 값 받아오기
      const { Name, Value } = req.query;
      console.log("^^^여기다");
      console.log(Name, Value);
      //가로줄가져오기
      
      
      if (Name && Value) {
        if(Name ==="id"){
          let responseData = await prisma.etc.findMany({
            where: {
              [`${Name}`]: Number(Value),
            },
          });
          res.status(200).json({ data: responseData });
        }
        
        else{
          let responseData = await prisma.etc.findMany({
          where: {
            [`${Name}`]: Value,
          },
          });
          res.status(200).json({ data: responseData });
        }
      }
      
      //세로줄가져오기
      else if (Name && Value === undefined) {
        console.log("세로줄");
        
        let groupByArray: string[];
        if (typeof Name === 'string') {
          groupByArray = [Name];
        } else if (Array.isArray(Name)) {
          groupByArray = Name;
        } else {
          // 유효하지 않은 타입인 경우 오류 처리
          return res.status(400).send('Invalid group by parameter');
        }
        console.log("Value:", Value);
        let responseData = await prisma.etc.groupBy({
          by: groupByArray as any
        });
        res.status(200).json({ data: responseData });
      }
    } catch (error) {
      console.error("에러발생", error);
      res.status(500).json({ error: "Error fetching data." });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === "DELETE") {
    try {
      const { Name, Value } = req.query;
      console.log("^^^삭제");
      console.log(Name, Value);
      if (Name && Value) {
        console.log("열 삭제 시작");
        // 열에 해당하는 데이터를 찾아서 삭제
        if (typeof Value === "string") {
          const deleteResult = await prisma.etc.deleteMany({
            where: {
              [`${Name}`]: Value,
            },
          });
        } 
        // else if (typeof Value === Number) {
        // }

        console.log("열 삭제 완료");
        //res.status(200).json({ message: "Column deleted successfully.", deletedRows: deleteResult.count });
      } else {
        res.status(400).json({ error: "Column name and value are required." });
      }
    } catch (error) {
      console.error("에러 발생", error);
      res.status(500).json({ error: "Error deleting column." });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === "PATCH") {
    try {
      const { Name, Value } = req.query;
      const newData = req.body;
      if (typeof Name === "string") {
        const newData = req.body[Name];
      }

      if (!Name || !Value || !newData) {
        return res.status(400).json({ error: "Column name, column value, and new data are required." });
      }

      const updatedEtc = await prisma.etc.updateMany({
        where: {
          [`${Name}`]: Value,
        },
        data: newData,
      });

      res.status(200).json({ message: "etc updated successfully.", updatedRows: updatedEtc.count });
    } catch (error) {
      console.error("Error occurred", error);
      res.status(500).json({ error: "Error updating etc." });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "올바른 함수를 사용하세요" });
  }
}
