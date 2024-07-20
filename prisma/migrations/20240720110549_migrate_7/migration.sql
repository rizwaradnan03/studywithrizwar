/*
  Warnings:

  - Added the required column `order` to the `user_class_exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_class_exercise` ADD COLUMN `order` VARCHAR(191) NOT NULL;
