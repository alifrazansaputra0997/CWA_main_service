/*
  Warnings:

  - A unique constraint covering the columns `[username,email]` on the table `mUsers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `mUsers` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "mUsers_username_key";

-- AlterTable
ALTER TABLE "mUsers" ADD COLUMN     "email" VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "mUsers_username_email_key" ON "mUsers"("username", "email");
