/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `mUsers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "mUsers_password_key";

-- CreateIndex
CREATE UNIQUE INDEX "mUsers_email_key" ON "mUsers"("email");
