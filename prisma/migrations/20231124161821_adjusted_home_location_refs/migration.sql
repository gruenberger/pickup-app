/*
  Warnings:

  - You are about to drop the column `homeLocation` on the `User` table. All the data in the column will be lost.
  - Added the required column `type` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "location_fkey";

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "homeLocation",
ADD COLUMN     "homeCenter" DOUBLE PRECISION[] DEFAULT ARRAY[39.2654073, -76.5139326]::DOUBLE PRECISION[];
