/*
  Warnings:

  - Changed the type of `startTime` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endTime` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "startTime",
ADD COLUMN     "startTime" TIMESTAMP NOT NULL,
DROP COLUMN "endTime",
ADD COLUMN     "endTime" TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "homeCenter" SET DEFAULT ARRAY[39.2654073, -76.5139326]::DOUBLE PRECISION[];
