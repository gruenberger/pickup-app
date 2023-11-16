/*
  Warnings:

  - Added the required column `homeLocation` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "homeLocation" INTEGER NOT NULL,
ALTER COLUMN "friends" SET DATA TYPE TEXT[];

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "location_fkey" FOREIGN KEY ("homeLocation") REFERENCES "Location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
