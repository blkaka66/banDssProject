-- AlterTable
ALTER TABLE `application` ADD COLUMN `ONE_COMPONENT_OR_TWO` ENUM('ONE_COMPONENT', 'TWO_COMPONENT', 'EVERYTHING') NULL DEFAULT 'EVERYTHING';
