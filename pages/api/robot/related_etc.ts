import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
let  relatedPartsWithrobot: Record<number, { etc: number[]}> = {}; //robot부품 이랑 엮이는 부품의 etc id를 저장하는곳
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  relatedPartsWithrobot = {};
  const {Value}:any = req.query;
  console.log("valuevaluevaluevaluevalue:",Value);
  if(Value === undefined){
    res.status(404);
  }
  const ValueIdList = Value.split(",").map((x: string) => parseInt(x));
  console.log("ValueIdList:",ValueIdList)
  
  if (req.method === "GET"){
    const partNameList = await prisma.robot.findMany({
        where:{id:
          {in:ValueIdList}
        },
        select:{
          etc:true
        }
    })

   

    console.log("partNameList:",partNameList)


    
    let index=0;
    for(let i=0;i<partNameList.length;i++){
 
      if(partNameList[i].etc?.length ===0){
        console.log("난 길이가0!!")
        index++;
      }else if(partNameList[i].etc===null){
        console.log("난 null!!")
        index++;
      }else{
        console.log("얜 정상입니다",partNameList[i].etc)
        console.log("정상인놈의 index",ValueIdList[index])
        console.log("filteredPartNameList:", partNameList[i].etc);
        const find = partNameList[i].etc?.split('|').filter((y: any) => y !== null);
        console.log('find:', find);
        const etcIds = await prisma.etc.findMany({
          where: {
            part_name: { in: find }
          },
          select: {
            id: true
          }
        });
        relatedPartsWithrobot[ValueIdList[index]] = { etc: [] };
        relatedPartsWithrobot[ValueIdList[index]].etc.push(...etcIds.map((x: any) => x.id));
        console.log("relatedPartsWithrobot[ValueIdList[index]].etc:", relatedPartsWithrobot[ValueIdList[index]].etc);
        index++;
      }
    }

    }
   



    res.status(200).json({ data: relatedPartsWithrobot});
  }
  
  
  






