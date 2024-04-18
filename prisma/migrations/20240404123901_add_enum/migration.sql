/*
  Warnings:

  - You are about to drop the column `fillerSupport` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `high_low_price` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `supply_form` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `UseTwoComponentCartridge` on the `discharge` table. All the data in the column will be lost.
  - You are about to drop the column `automation` on the `discharge` table. All the data in the column will be lost.
  - You are about to drop the column `curing_conditions` on the `discharge` table. All the data in the column will be lost.
  - You are about to drop the column `fillerSupport` on the `discharge` table. All the data in the column will be lost.
  - You are about to drop the column `howToUseIt` on the `discharge` table. All the data in the column will be lost.
  - You are about to drop the column `one_component_or_two` on the `discharge` table. All the data in the column will be lost.
  - You are about to drop the column `supply_form` on the `discharge` table. All the data in the column will be lost.
  - You are about to drop the column `high_low_price` on the `etc` table. All the data in the column will be lost.
  - You are about to drop the column `high_low_price` on the `robot` table. All the data in the column will be lost.
  - You are about to drop the column `high_low_price` on the `supply` table. All the data in the column will be lost.
  - You are about to drop the column `supply_form` on the `supply` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `application` DROP COLUMN `fillerSupport`,
    DROP COLUMN `high_low_price`,
    DROP COLUMN `supply_form`,
    ADD COLUMN `FILLER_SUPPORT` ENUM('YES', 'NO', 'EVERYTHING') NULL DEFAULT 'EVERYTHING',
    ADD COLUMN `HIGH_LOW_PRICE` ENUM('HIGH_PRICE', 'LOW_PRICE', 'EVERYTHING') NULL DEFAULT 'EVERYTHING',
    ADD COLUMN `SUPPLY_FORM` ENUM('BARREL_SYRINGE', 'CARTRIDGE', 'TANK', 'CAN_DRUM', 'TANK_OR_CAN_DRUM', 'EVERYTHING') NULL DEFAULT 'EVERYTHING';

-- AlterTable
ALTER TABLE `discharge` DROP COLUMN `UseTwoComponentCartridge`,
    DROP COLUMN `automation`,
    DROP COLUMN `curing_conditions`,
    DROP COLUMN `fillerSupport`,
    DROP COLUMN `howToUseIt`,
    DROP COLUMN `one_component_or_two`,
    DROP COLUMN `supply_form`,
    ADD COLUMN `AUTOMATION` ENUM('MANUAL', 'DESK_TOP_ROBOT', 'ANY_CARTESIAN_ROBOT', 'EVERYTHING') NULL DEFAULT 'EVERYTHING',
    ADD COLUMN `CURING_CONDITIONS` ENUM('WATER_REACTION', 'ANAEROBIC_REACTION', 'ROOM_TEMPERATURE', 'UV_CURING', 'TWO_COMPONENT_CURING', 'HEATED_CURING', 'NOT_CURING', 'EVERYTHING') NULL DEFAULT 'EVERYTHING',
    ADD COLUMN `FILLER_SUPPORT` ENUM('YES', 'NO', 'EVERYTHING') NULL DEFAULT 'EVERYTHING',
    ADD COLUMN `HOW_TO_USE_IT` ENUM('LINE_DISPENSING', 'DOT_DISPENSING', 'MOLDING_FILLING_METERING_VALVE', 'UNDERFILLING', 'SEALING', 'CONFORMAL_COATING_SPRAYING_SPRAY_VALVE', 'EVERYTHING') NULL DEFAULT 'EVERYTHING',
    ADD COLUMN `ONE_COMPONENT_OR_TWO` ENUM('ONE_COMPONENT', 'TWO_COMPONENT', 'EVERYTHING') NULL DEFAULT 'EVERYTHING',
    ADD COLUMN `SUPPLY_FORM` VARCHAR(191) NULL,
    ADD COLUMN `USE_TWO_COMPONENT_CARTRIDGE` ENUM('YES', 'NO', 'EVERYTHING') NOT NULL DEFAULT 'EVERYTHING';

-- AlterTable
ALTER TABLE `etc` DROP COLUMN `high_low_price`,
    ADD COLUMN `HIGH_LOW_PRICE` ENUM('HIGH_PRICE', 'LOW_PRICE', 'EVERYTHING') NULL DEFAULT 'EVERYTHING';

-- AlterTable
ALTER TABLE `robot` DROP COLUMN `high_low_price`,
    ADD COLUMN `HIGH_LOW_PRICE` ENUM('HIGH_PRICE', 'LOW_PRICE', 'EVERYTHING') NULL DEFAULT 'EVERYTHING';

-- AlterTable
ALTER TABLE `supply` DROP COLUMN `high_low_price`,
    DROP COLUMN `supply_form`,
    ADD COLUMN `HIGH_LOW_PRICE` ENUM('HIGH_PRICE', 'LOW_PRICE', 'EVERYTHING') NULL DEFAULT 'EVERYTHING',
    ADD COLUMN `SUPPLY_FORM` ENUM('BARREL_SYRINGE', 'CARTRIDGE', 'TANK', 'CAN_DRUM', 'TANK_OR_CAN_DRUM', 'EVERYTHING') NULL DEFAULT 'EVERYTHING';
