/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "flag" VARCHAR,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Matches" (
    "id" SERIAL NOT NULL,
    "localID" INTEGER NOT NULL,
    "visitorID" INTEGER NOT NULL,
    "resultID" INTEGER NOT NULL,
    "tournamentID" INTEGER NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "Matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Predictions" (
    "id" SERIAL NOT NULL,
    "succesMatch" BOOLEAN NOT NULL DEFAULT false,
    "succesGoals" BOOLEAN NOT NULL DEFAULT false,
    "userID" INTEGER NOT NULL,
    "predictionID" INTEGER NOT NULL,

    CONSTRAINT "Predictions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Results" (
    "id" SERIAL NOT NULL,
    "local" INTEGER,
    "visitor" INTEGER,
    "penalties" BOOLEAN NOT NULL DEFAULT false,
    "penalty_local" INTEGER,
    "penalty_visitor" INTEGER,
    "is_prediction" BOOLEAN NOT NULL DEFAULT false,
    "matchID" INTEGER NOT NULL,

    CONSTRAINT "Results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teams" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "acronym" VARCHAR NOT NULL,
    "emblem" VARCHAR,
    "countryID" INTEGER NOT NULL,

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tournaments" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPoints" (
    "id" SERIAL NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "tournamentID" INTEGER NOT NULL,
    "userID" INTEGER,

    CONSTRAINT "UserPoints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR NOT NULL,
    "fullname" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- AddForeignKey
ALTER TABLE "Matches" ADD CONSTRAINT "local" FOREIGN KEY ("localID") REFERENCES "Teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Matches" ADD CONSTRAINT "result" FOREIGN KEY ("resultID") REFERENCES "Results"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Matches" ADD CONSTRAINT "tournament" FOREIGN KEY ("tournamentID") REFERENCES "Tournaments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Matches" ADD CONSTRAINT "visitor" FOREIGN KEY ("visitorID") REFERENCES "Teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Predictions" ADD CONSTRAINT "prediction" FOREIGN KEY ("predictionID") REFERENCES "Results"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Predictions" ADD CONSTRAINT "user" FOREIGN KEY ("userID") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "match" FOREIGN KEY ("matchID") REFERENCES "Matches"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Teams" ADD CONSTRAINT "country" FOREIGN KEY ("countryID") REFERENCES "Country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserPoints" ADD CONSTRAINT "tournament" FOREIGN KEY ("tournamentID") REFERENCES "Tournaments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserPoints" ADD CONSTRAINT "user" FOREIGN KEY ("userID") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
