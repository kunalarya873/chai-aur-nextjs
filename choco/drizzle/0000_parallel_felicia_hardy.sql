CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"fname" varchar(100) NOT NULL,
	"lname" varchar(100) NOT NULL,
	"email" varchar(100),
	"provider" varchar(20) NOT NULL,
	"external_id" varchar(100) NOT NULL,
	"image" text,
	"role" varchar(20) DEFAULT 'customer' NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
