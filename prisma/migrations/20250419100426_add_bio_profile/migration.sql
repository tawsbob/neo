-- CreateTable
CREATE TABLE "BioProfile" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "BioProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkInBio" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "bioProfileId" INTEGER NOT NULL,

    CONSTRAINT "LinkInBio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BioProfile" ADD CONSTRAINT "BioProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkInBio" ADD CONSTRAINT "LinkInBio_bioProfileId_fkey" FOREIGN KEY ("bioProfileId") REFERENCES "BioProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
