/*
  Warnings:

  - You are about to drop the column `author` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `page` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "author",
DROP COLUMN "page";
