/*
  Warnings:

  - You are about to drop the column `provience` on the `addresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `addresses` DROP COLUMN `provience`,
    ADD COLUMN `province` VARCHAR(100) NULL;
