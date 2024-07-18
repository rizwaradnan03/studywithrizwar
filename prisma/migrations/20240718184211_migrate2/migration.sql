/*
  Warnings:

  - Added the required column `login_type` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `login_type` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NULL;
