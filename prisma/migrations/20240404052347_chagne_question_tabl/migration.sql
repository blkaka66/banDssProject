/*
  Warnings:

  - You are about to alter the column `supply_capacity_L` on the `supply` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `supply` MODIFY `supply_capacity_L` DOUBLE NULL;
