/*
  Warnings:

  - You are about to drop the column `filler` on the `application` table. All the data in the column will be lost.
  - You are about to alter the column `viscosity` on the `application` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `discharge_accuracy` on the `application` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `mixing_ratio` on the `application` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `required_situation_discharge` on the `control` table. All the data in the column will be lost.
  - You are about to drop the column `required_situation_single_or_double` on the `control` table. All the data in the column will be lost.
  - You are about to drop the column `application` on the `discharge` table. All the data in the column will be lost.
  - You are about to drop the column `filler_limit` on the `discharge` table. All the data in the column will be lost.
  - You are about to drop the column `max_discharge_amount` on the `discharge` table. All the data in the column will be lost.
  - You are about to drop the column `min_discharge_amount` on the `discharge` table. All the data in the column will be lost.
  - You are about to drop the column `single_or_double` on the `discharge` table. All the data in the column will be lost.
  - You are about to drop the column `use_of_2_component_cartridge` on the `discharge` table. All the data in the column will be lost.
  - You are about to alter the column `viscosity` on the `discharge` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `specific_gravity` on the `discharge` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `discharge_accuracy` on the `discharge` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `median_discharge_amount` on the `discharge` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to drop the column `usage_condition_auto` on the `etc` table. All the data in the column will be lost.
  - You are about to drop the column `usage_condition_discharge` on the `etc` table. All the data in the column will be lost.
  - You are about to drop the column `usage_condition_supply_product_name` on the `etc` table. All the data in the column will be lost.
  - You are about to drop the column `max_discharge_amount_g_per_sec` on the `supply` table. All the data in the column will be lost.
  - You are about to drop the column `product_name` on the `supply` table. All the data in the column will be lost.
  - You are about to drop the column `required_components` on the `supply` table. All the data in the column will be lost.
  - You are about to alter the column `viscosity` on the `supply` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `specific_gravity` on the `supply` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `automation` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `application` DROP COLUMN `filler`,
    ADD COLUMN `fillerSupport` BOOLEAN NULL,
    ADD COLUMN `primeCost` INTEGER NULL,
    ADD COLUMN `userKRW` INTEGER NULL,
    ADD COLUMN `userUSD` INTEGER NULL,
    MODIFY `viscosity` INTEGER NULL,
    MODIFY `discharge_accuracy` INTEGER NULL,
    MODIFY `mixing_ratio` INTEGER NULL;

-- AlterTable
ALTER TABLE `control` DROP COLUMN `required_situation_discharge`,
    DROP COLUMN `required_situation_single_or_double`,
    ADD COLUMN `primeCost` INTEGER NULL,
    ADD COLUMN `userKRW` INTEGER NULL,
    ADD COLUMN `userUSD` INTEGER NULL;

-- AlterTable
ALTER TABLE `discharge` DROP COLUMN `application`,
    DROP COLUMN `filler_limit`,
    DROP COLUMN `max_discharge_amount`,
    DROP COLUMN `min_discharge_amount`,
    DROP COLUMN `single_or_double`,
    DROP COLUMN `use_of_2_component_cartridge`,
    ADD COLUMN `UseTwoComponentCartridge` BOOLEAN NULL,
    ADD COLUMN `control` VARCHAR(191) NULL,
    ADD COLUMN `etc` VARCHAR(191) NULL,
    ADD COLUMN `fillerSupport` BOOLEAN NULL,
    ADD COLUMN `howToUseIt` VARCHAR(191) NULL,
    ADD COLUMN `pasteSupport` BOOLEAN NULL,
    ADD COLUMN `primeCost` INTEGER NULL,
    ADD COLUMN `supply` VARCHAR(191) NULL,
    ADD COLUMN `userKRW` INTEGER NULL,
    ADD COLUMN `userUSD` INTEGER NULL,
    MODIFY `viscosity` INTEGER NULL,
    MODIFY `specific_gravity` INTEGER NULL,
    MODIFY `discharge_accuracy` INTEGER NULL,
    MODIFY `median_discharge_amount` DOUBLE NULL;

-- AlterTable
ALTER TABLE `etc` DROP COLUMN `usage_condition_auto`,
    DROP COLUMN `usage_condition_discharge`,
    DROP COLUMN `usage_condition_supply_product_name`;

-- AlterTable
ALTER TABLE `question` ADD COLUMN `relatedCriteria` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `supply` DROP COLUMN `max_discharge_amount_g_per_sec`,
    DROP COLUMN `product_name`,
    DROP COLUMN `required_components`,
    ADD COLUMN `application` VARCHAR(191) NULL,
    ADD COLUMN `etc` VARCHAR(191) NULL,
    ADD COLUMN `max_discharge_amount` INTEGER NULL,
    ADD COLUMN `part_name` VARCHAR(191) NULL,
    ADD COLUMN `pasteSupport` BOOLEAN NULL,
    ADD COLUMN `primeCost` INTEGER NULL,
    ADD COLUMN `userKRW` INTEGER NULL,
    ADD COLUMN `userUSD` INTEGER NULL,
    MODIFY `viscosity` INTEGER NULL,
    MODIFY `specific_gravity` INTEGER NULL;

-- DropTable
DROP TABLE `automation`;

-- CreateTable
CREATE TABLE `auto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NULL,
    `part_name` VARCHAR(191) NULL,
    `product_size_X` INTEGER NULL,
    `product_size_Y` INTEGER NULL,
    `product_size_Z` INTEGER NULL,
    `high_low_price` VARCHAR(191) NULL,
    `keywords` VARCHAR(191) NULL,
    `etc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
