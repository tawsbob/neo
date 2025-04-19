/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `BioProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BioProfile_url_key" ON "BioProfile"("url");
