/*
  Warnings:

  - Added the required column `serieId` to the `episodes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "episodes" ADD COLUMN     "serieId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
