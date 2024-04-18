/*
  Warnings:

  - You are about to drop the `auto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `auto`;

-- CreateTable
CREATE TABLE `automate` (
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
