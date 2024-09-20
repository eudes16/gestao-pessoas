-- CreateEnum
CREATE TYPE "PoepleMaritalStatus" AS ENUM ('single', 'married', 'divorced', 'widowed');

-- CreateEnum
CREATE TYPE "PoepleGender" AS ENUM ('male', 'female');

-- CreateTable
CREATE TABLE "Poeple" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "PoepleGender" NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "maritalStatus" "PoepleMaritalStatus" NOT NULL DEFAULT 'single',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Poeple_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "zipCode" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "poepleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_poepleId_fkey" FOREIGN KEY ("poepleId") REFERENCES "Poeple"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
