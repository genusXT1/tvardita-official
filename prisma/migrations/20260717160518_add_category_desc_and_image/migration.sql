-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "description" TEXT,
ADD COLUMN     "legacyUrl" TEXT;
