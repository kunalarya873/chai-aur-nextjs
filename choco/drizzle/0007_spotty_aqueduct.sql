ALTER TABLE "inventories" ALTER COLUMN "quantity" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "inventories" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "inventories" ALTER COLUMN "created_at" DROP NOT NULL;