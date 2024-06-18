-- CreateEnum
CREATE TYPE "Phases" AS ENUM ('Grupos', 'Octavos', 'Cuartos', 'Semi', 'Final');

-- AlterTable
ALTER TABLE "Matches" ADD COLUMN     "phase" "Phases" NOT NULL DEFAULT 'Grupos';
