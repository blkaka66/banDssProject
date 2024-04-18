/*
  Warnings:

  - You are about to drop the column `option2` on the `ShortAnswerQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `option3` on the `ShortAnswerQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `option4` on the `ShortAnswerQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `option5` on the `ShortAnswerQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `option6` on the `ShortAnswerQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `option7` on the `ShortAnswerQuestion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `MultipleChoiceQuestion` ADD COLUMN `option2` VARCHAR(191) NULL,
    ADD COLUMN `option3` VARCHAR(191) NULL,
    ADD COLUMN `option4` VARCHAR(191) NULL,
    ADD COLUMN `option5` VARCHAR(191) NULL,
    ADD COLUMN `option6` VARCHAR(191) NULL,
    ADD COLUMN `option7` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ShortAnswerQuestion` DROP COLUMN `option2`,
    DROP COLUMN `option3`,
    DROP COLUMN `option4`,
    DROP COLUMN `option5`,
    DROP COLUMN `option6`,
    DROP COLUMN `option7`;
