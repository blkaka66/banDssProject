import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";
import { stringToArr } from "@/utils/stringToArr";
const prisma = new PrismaClient();
let  relatedPartsWithdischarge: Record<number, { supply: number[]}> = {}; //discharge부품 이랑 엮이는 부품의 supply id를 저장하는곳
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  relatedPartsWithdischarge = {};
  const {Value}:any = req.query;
  console.log("valuevaluevaluevaluevalue:",Value);
  if(Value === undefined){
    res.status(404);
  }
  const ValueIdList = Value.split(",").map((x: string) => parseInt(x));
  console.log(ValueIdList)
  
  if (req.method === "GET"){
    const partNameList = await prisma.discharge.findMany({
        where:{id:
          {in:ValueIdList}
        },
        select:{
          supply:true
        }
    })
    console.log("partNameList:",partNameList)

    let index=0;
    for(let i=0;i<partNameList.length;i++){
 
      if(partNameList[i].supply?.length ===0){
        console.log("난 길이가0!!")
        index++;
      }else if(partNameList[i].supply===null){
        console.log("난 null!!")
        index++;
      }else{
        console.log("얜 정상입니다",partNameList[i].supply)
        console.log("정상인놈의 index",ValueIdList[index])
        console.log("filteredPartNameList:", partNameList[i].supply);
        const find = partNameList[i].supply?.split('|').filter((y: any) => y !== null);
        console.log('find:', find);
        const etcIds = await prisma.supply.findMany({
          where: {
            part_name: { in: find }
          },
          select: {
            id: true
          }
        });
        relatedPartsWithdischarge[ValueIdList[index]] = { supply: [] };
        relatedPartsWithdischarge[ValueIdList[index]].supply.push(...etcIds.map((x: any) => x.id));
        console.log("relatedPartsWithdischarge[ValueIdList[index]].etc:", relatedPartsWithdischarge[ValueIdList[index]].supply);
        index++;
      }
    }

    

    // for (const item of partNameList) {
    //   if(item.supply){
    //     console.log(item.supply.length);
    //     if (item.supply.length !== 0) {
    //       console.log("filteredPartNameList:", item.supply);
    //       const find = item.supply.split('|').filter((y: any) => y !== null);
    //       console.log('find:', find);
    //       const supplyIds = await prisma.supply.findMany({
    //         where: {
    //           part_name: { in: find }
    //         },
    //         select: {
    //           id: true
    //         }
    //       });
    //       relatedPartsWithdischarge[ValueIdList[index]] = { supply: [] };
    //       relatedPartsWithdischarge[ValueIdList[index]].supply.push(...supplyIds.map((x: any) => x.id));
    //       console.log("relatedPartsWithdischarge[ValueIdList[index]].supply:", relatedPartsWithdischarge[ValueIdList[index]].supply);
    //     }
    //     index++;
    //   }

    // }
   



    res.status(200).json({ data: relatedPartsWithdischarge});
  }
  
  
  




}

