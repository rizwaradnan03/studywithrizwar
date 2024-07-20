-- AlterTable
ALTER TABLE `class_exercise` MODIFY `result` LONGTEXT NOT NULL;

-- CreateTable
CREATE TABLE `user_class_exercise` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NULL,
    `class_exercise_id` VARCHAR(191) NULL,
    `result` LONGTEXT NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_class_exercise` ADD CONSTRAINT `user_class_exercise_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_class_exercise` ADD CONSTRAINT `user_class_exercise_class_exercise_id_fkey` FOREIGN KEY (`class_exercise_id`) REFERENCES `class_exercise`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
