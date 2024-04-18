-- AlterTable
ALTER TABLE `MultipleChoiceQuestion` MODIFY `questionNumber` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ShortAnswerQuestion` MODIFY `questionNumber` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `question` MODIFY `questionNumber` VARCHAR(191) NULL;
