CREATE TYPE "public"."requirementType" AS ENUM('assignment', 'lecture', 'examn', 'admin');--> statement-breakpoint
CREATE TABLE "requirements" (
	"requirement_id" serial PRIMARY KEY NOT NULL,
	"type" "requirementType" NOT NULL
);
