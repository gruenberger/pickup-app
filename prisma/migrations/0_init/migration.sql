-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "location" INTEGER NOT NULL,
    "owner" INTEGER NOT NULL,
    "attendance" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "activity" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startTime" TIMETZ NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "friends" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "city" VARCHAR(255),
    "state" VARCHAR(255),
    "country" VARCHAR(50),
    "eventsCreated" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "eventsAttended" INTEGER[] DEFAULT ARRAY[]::INTEGER[],

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "location_fkey" FOREIGN KEY ("location") REFERENCES "Location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

