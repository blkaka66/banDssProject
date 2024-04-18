import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
let  relatedPartsWithsupply: Record<number, { discharge: number[]}> = {}; //supply 이랑 엮이는 부품의 etc id를 저장하는곳
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  relatedPartsWithsupply = {};
  const {Value}:any = req.query;
  console.log("valuevaluevaluevaluevalue:",Value);
  if(Value.length>0){
    const ValueIdList = Value.split(",").map((x: string) => parseInt(x));
    console.log("ValueIdList:",ValueIdList)
    
    if (req.method === "GET"){
      const partNameList = await prisma.supply.findMany({
          where:{id:
            {in:ValueIdList}
          },
          select:{
            discharge:true
          }
      })
  
     
  
      console.log("partNameList:",partNameList)
  
  
      
      let index=0;
      for(let i=0;i<partNameList.length;i++){
   
        if(partNameList[i].discharge?.length ===0){
          console.log("난 길이가0!!")
          index++;
        }else if(partNameList[i].discharge===null){
          console.log("난 null!!")
          index++;
        }else{
          console.log("얜 정상입니다",partNameList[i].discharge)
          console.log("정상인놈의 index",ValueIdList[index])
          console.log("filteredPartNameList:", partNameList[i].discharge);
          const find = partNameList[i].discharge?.split('|').filter((y: any) => y !== null);
          console.log('find:', find);
          const dischargeIds = await prisma.discharge.findMany({
            where: {
              part_name: { in: find }
            },
            select: {
              id: true
            }
          });
          relatedPartsWithsupply[ValueIdList[index]] = { discharge: [] };
          relatedPartsWithsupply[ValueIdList[index]].discharge.push(...dischargeIds.map((x: any) => x.id));
          console.log("relatedPartsWithsupply[ValueIdList[index]].discharge:", relatedPartsWithsupply[ValueIdList[index]].discharge);
          index++;
        }
      }
      
      }
     
  
  
  
      res.status(200).json({ data: relatedPartsWithsupply});
  }

  }
  
  
  






