-- CreateTable
CREATE TABLE "links" (
    "id" SERIAL NOT NULL,
    "actual_link" TEXT NOT NULL,
    "short_link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "links_short_link_key" ON "links"("short_link");
