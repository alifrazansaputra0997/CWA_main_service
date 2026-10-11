/*
  Warnings:

  - You are about to drop the `Module` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Module_permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role_permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Module_permission" DROP CONSTRAINT "Module_permission_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "Module_permission" DROP CONSTRAINT "Module_permission_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "Role_permission" DROP CONSTRAINT "Role_permission_roleId_fkey";

-- DropForeignKey
ALTER TABLE "User_role" DROP CONSTRAINT "User_role_roleId_fkey";

-- DropForeignKey
ALTER TABLE "User_role" DROP CONSTRAINT "User_role_usersId_fkey";

-- DropTable
DROP TABLE "Module";

-- DropTable
DROP TABLE "Module_permission";

-- DropTable
DROP TABLE "Permission";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "Role_permission";

-- DropTable
DROP TABLE "User_role";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "mUsers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "mUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userRole" (
    "id" SERIAL NOT NULL,
    "usersId" INTEGER,
    "roleId" INTEGER,

    CONSTRAINT "userRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mRole" (
    "id" SERIAL NOT NULL,
    "roleName" VARCHAR(35) NOT NULL,
    "roleCode" CHAR(6) NOT NULL,
    "description" VARCHAR(200) NOT NULL,

    CONSTRAINT "mRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rolePermission" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER,

    CONSTRAINT "rolePermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mModule" (
    "id" SERIAL NOT NULL,
    "moduleName" VARCHAR(100) NOT NULL,
    "parentId" INTEGER,
    "path" VARCHAR(225) NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "mModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mPermission" (
    "id" SERIAL NOT NULL,
    "permission" VARCHAR(30) NOT NULL,
    "permissionCode" VARCHAR(30) NOT NULL,
    "description" VARCHAR(225) NOT NULL,

    CONSTRAINT "mPermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modulePermission" (
    "id" SERIAL NOT NULL,
    "permissionId" INTEGER,
    "moduleId" INTEGER,

    CONSTRAINT "modulePermission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mUsers_username_key" ON "mUsers"("username");

-- CreateIndex
CREATE UNIQUE INDEX "mRole_roleCode_key" ON "mRole"("roleCode");

-- CreateIndex
CREATE UNIQUE INDEX "mPermission_permission_key" ON "mPermission"("permission");

-- AddForeignKey
ALTER TABLE "userRole" ADD CONSTRAINT "userRole_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "mUsers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userRole" ADD CONSTRAINT "userRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "mRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rolePermission" ADD CONSTRAINT "rolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "mRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modulePermission" ADD CONSTRAINT "modulePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "mPermission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modulePermission" ADD CONSTRAINT "modulePermission_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "mModule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
