/*
  Warnings:

  - You are about to drop the column `pasteSupport` on the `discharge` table. All the data in the column will be lost.
  - The values [DESK_TOP_ROBOT,ANY_CARTESIAN_ROBOT] on the enum `discharge_AUTOMATION` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `SUPPLY_FORM` on the `discharge` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(12))`.
  - You are about to drop the column `isSubQuestion` on the `question` table. All the data in the column will be lost.
  - You are about to drop the column `questionContent` on the `question` table. All the data in the column will be lost.
  - You are about to drop the column `relatedCriteria` on the `question` table. All the data in the column will be lost.
  - You are about to drop the column `subjectiveQuestionContent` on the `question` table. All the data in the column will be lost.
  - You are about to drop the column `pasteSupport` on the `supply` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `discharge` DROP COLUMN `pasteSupport`,
    ADD COLUMN `SUPPROT_PASTE` ENUM('YES', 'NO', 'EVERYTHING') NULL DEFAULT 'EVERYTHING',
    MODIFY `AUTOMATION` ENUM('MANUAL', 'Automated', 'EVERYTHING') NULL DEFAULT 'EVERYTHING',
    MODIFY `SUPPLY_FORM` ENUM('BARREL_SYRINGE', 'CARTRIDGE', 'TANK', 'CAN_DRUM', 'TANK_OR_CAN_DRUM', 'EVERYTHING') NULL DEFAULT 'EVERYTHING';

-- AlterTable
ALTER TABLE `question` DROP COLUMN `isSubQuestion`,
    DROP COLUMN `questionContent`,
    DROP COLUMN `relatedCriteria`,
    DROP COLUMN `subjectiveQuestionContent`,
    ADD COLUMN `questionNumber` INTEGER NULL,
    ADD COLUMN `questionType` ENUM('ShortAnswer', 'MultipleChoice', 'CompoundType') NULL DEFAULT 'ShortAnswer';

-- AlterTable
ALTER TABLE `supply` DROP COLUMN `pasteSupport`,
    ADD COLUMN `SUPPROT_PASTE` ENUM('YES', 'NO', 'EVERYTHING') NULL DEFAULT 'EVERYTHING';

-- CreateTable
CREATE TABLE `ShortAnswerQuestion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `questionNumber` INTEGER NULL,
    `option1` VARCHAR(191) NULL,
    `option2` VARCHAR(191) NULL,
    `option3` VARCHAR(191) NULL,
    `option4` VARCHAR(191) NULL,
    `option5` VARCHAR(191) NULL,
    `option6` VARCHAR(191) NULL,
    `option7` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MultipleChoiceQuestion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `questionNumber` INTEGER NULL,
    `option1` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
