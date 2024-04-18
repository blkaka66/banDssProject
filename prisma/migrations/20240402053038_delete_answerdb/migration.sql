-- CreateTable
CREATE TABLE `discharge` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NULL,
    `part_name` VARCHAR(191) NULL,
    `operation_method` VARCHAR(191) NULL,
    `viscosity` VARCHAR(191) NULL,
    `specific_gravity` VARCHAR(191) NULL,
    `supply_form` VARCHAR(191) NULL,
    `one_component_or_two` VARCHAR(191) NULL,
    `discharge_accuracy` VARCHAR(191) NULL,
    `min_discharge_amount` VARCHAR(191) NULL,
    `max_discharge_amount` VARCHAR(191) NULL,
    `median_discharge_amount` VARCHAR(191) NULL,
    `filler_limit` VARCHAR(191) NULL,
    `curing_conditions` VARCHAR(191) NULL,
    `automation` VARCHAR(191) NULL,
    `application` VARCHAR(191) NULL,
    `single_or_double` INTEGER NULL,
    `keywords` VARCHAR(191) NULL,
    `use_of_2_component_cartridge` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supply` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NULL,
    `product_name` VARCHAR(191) NULL,
    `supply_form` VARCHAR(191) NULL,
    `supply_capacity_L` VARCHAR(191) NULL,
    `viscosity` VARCHAR(191) NULL,
    `specific_gravity` VARCHAR(191) NULL,
    `max_discharge_amount_g_per_sec` VARCHAR(191) NULL,
    `required_components` VARCHAR(191) NULL,
    `discharge` VARCHAR(191) NULL,
    `high_low_price` VARCHAR(191) NULL,
    `keywords` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `control` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NULL,
    `part_name` VARCHAR(191) NULL,
    `required_situation_discharge` VARCHAR(191) NULL,
    `required_situation_single_or_double` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `automation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NULL,
    `part_name` VARCHAR(191) NULL,
    `corresponding_product_size_X` VARCHAR(191) NULL,
    `corresponding_product_size_Y` VARCHAR(191) NULL,
    `corresponding_product_size_Z` VARCHAR(191) NULL,
    `high_low_price` VARCHAR(191) NULL,
    `keywords` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `application` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NULL,
    `part_name` VARCHAR(191) NULL,
    `viscosity` VARCHAR(191) NULL,
    `filler` VARCHAR(191) NULL,
    `supply_form` VARCHAR(191) NULL,
    `discharge_accuracy` VARCHAR(191) NULL,
    `high_low_price` VARCHAR(191) NULL,
    `mixing_ratio` VARCHAR(191) NULL,
    `keywords` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `etc` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NULL,
    `part_name` VARCHAR(191) NULL,
    `price` VARCHAR(191) NULL,
    `usage_condition_discharge` VARCHAR(191) NULL,
    `usage_condition_supply_product_name` VARCHAR(191) NULL,
    `usage_condition_auto` VARCHAR(191) NULL,
    `high_low_price` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isSubQuestion` BOOLEAN NULL,
    `questionContent` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
