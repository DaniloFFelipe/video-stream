/*
  Warnings:

  - A unique constraint covering the columns `[contentId]` on the table `movies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "movies_contentId_key" ON "movies"("contentId");
