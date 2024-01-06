-- CreateTable
CREATE TABLE "movies" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "posterPath" TEXT NOT NULL,
    "coverPath" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);
