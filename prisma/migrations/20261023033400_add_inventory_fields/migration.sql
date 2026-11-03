ALTER TABLE `Product`
    ADD COLUMN `stock` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `sku` VARCHAR(191) NULL,
    MODIFY `image` LONGTEXT NULL,
    ADD UNIQUE INDEX `Product_sku_key` (`sku`),
    ADD INDEX `Product_categoryId_idx` (`categoryId`),
    ADD INDEX `Product_createdAt_idx` (`createdAt`);
