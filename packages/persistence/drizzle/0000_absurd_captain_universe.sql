CREATE TYPE "public"."requirementSource" AS ENUM('canvas');--> statement-breakpoint
CREATE TYPE "public"."requirementType" AS ENUM('assignment', 'lecture');--> statement-breakpoint
CREATE TABLE "requirements" (
	"id" text PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"due" varchar(255) NOT NULL,
	"type" "requirementType" DEFAULT 'assignment' NOT NULL,
	"source" "requirementSource" DEFAULT 'canvas' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "steps" (
	"id" text PRIMARY KEY NOT NULL,
	"requirment_id" integer,
	"title" varchar(255) NOT NULL,
	"outcome" text NOT NULL,
	"complexity" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "steps" ADD CONSTRAINT "steps_requirment_id_requirements_id_fk" FOREIGN KEY ("requirment_id") REFERENCES "public"."requirements"("id") ON DELETE no action ON UPDATE no action;