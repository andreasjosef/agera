CREATE TYPE "public"."requirementSource" AS ENUM('canvas');--> statement-breakpoint
CREATE TYPE "public"."requirementType" AS ENUM('assignment', 'lecture');--> statement-breakpoint
CREATE TABLE "requirements" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "requirements_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"due" varchar(255) NOT NULL,
	"type" "requirementType" DEFAULT 'assignment',
	"source" "requirementSource" DEFAULT 'canvas'
);
--> statement-breakpoint
CREATE TABLE "steps" (
	"requirment_id" integer,
	"title" varchar(255) NOT NULL,
	"outcome" text NOT NULL,
	"complexity" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "steps" ADD CONSTRAINT "steps_requirment_id_requirements_id_fk" FOREIGN KEY ("requirment_id") REFERENCES "public"."requirements"("id") ON DELETE no action ON UPDATE no action;