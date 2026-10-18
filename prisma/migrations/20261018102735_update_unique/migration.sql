/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `mUsers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[password]` on the table `mUsers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "mUsers_username_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "mUsers_username_key" ON "mUsers"("username");

-- CreateIndex
CREATE UNIQUE INDEX "mUsers_password_key" ON "mUsers"("password");
