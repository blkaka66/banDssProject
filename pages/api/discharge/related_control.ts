import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
let relatedPartsWithdischarge: Record<number, { control: number[]}> = {}; //discharge부품 이랑 엮이는 부품의 control id를 저장하는곳
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  relatedPartsWithdischarge = {};
  const {Value}:any = req.query;
  console.log("시작할때밸류:",Value);
  console.log("시작할때배열:",relatedPartsWithdischarge);
  
  if(Value === undefined){
    res.status(404);
  }
  const ValueIdList = Value.split(",").map((x: string) => parseInt(x));
  console.log("ValueIdList:",ValueIdList)
  
  if (req.method === "GET"){
    const partNameList = await prisma.discharge.findMany({
        where:{id:
          {in:ValueIdList}
        },
        select:{
          control:true
        }
    })
    console.log("partNameList:",partNameList)


  
    let index=0;
    for(let i=0;i<partNameList.length;i++){
      console.log("partNameList.length",partNameList.length)
      if(partNameList[i].control?.length ===0){
        console.log("난 길이가0!!")
        index++;
      }else if(partNameList[i].control===null){
        console.log("난 null!!")
        index++;
      }else{
        console.log("얜 정상입니다",partNameList[i].control)
        console.log("정상인놈의 index",ValueIdList[index])
        console.log("filteredPartNameList:", partNameList[i].control);
        const find = partNameList[i].control?.split('|').filter((y: any) => y !== null);
        console.log('find:', find);
        const etcIds = await prisma.control.findMany({
          where: {
            part_name: { in: find }
          },
          select: {
            id: true
          }
        });
        console.log("etcIds",etcIds);
        relatedPartsWithdischarge[ValueIdList[index]] = { control: [] };
        relatedPartsWithdischarge[ValueIdList[index]].control.push(...etcIds.map((x: any) => x.id));
        console.log("relatedPartsWithdischarge[ValueIdList[index]].control:", relatedPartsWithdischarge[ValueIdList[index]].control);
        index++;
      }
    }
   


    // for (const item of partNameList) {
    //   if(item.control){
    //     console.log(item.control.length);
    //     if (item.control.length !== 0) {
    //       console.log("filteredPartNameList:", item.control);
    //       const find = item.control.split('|').filter((y: any) => y !== null);
    //       console.log('find:', find);
    //       const controlIds = await prisma.control.findMany({
    //         where: {
    //           part_name: { in: find }
    //         },
    //         select: {
    //           id: true
    //         }
    //       });
    //       relatedPartsWithdischarge[ValueIdList[index]] = { control: [] };
    //       relatedPartsWithdischarge[ValueIdList[index]].control.push(...controlIds.map((x: any) => x.id));
    //       console.log("relatedPartsWithdischarge[ValueIdList[index]].control:", relatedPartsWithdischarge[ValueIdList[index]].control);
    //     }
    //     index++;
    //   }

    // }
   


    console.log("결과",relatedPartsWithdischarge)
    res.status(200).json({ data: relatedPartsWithdischarge});
  }
  
  
  




}

