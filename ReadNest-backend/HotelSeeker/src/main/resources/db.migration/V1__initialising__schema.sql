CREATE TABLE IF NOT EXISTS "hotel"
(
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION
);

CREATE TABLE IF NOT EXISTS "room"
(
    "room_number" VARCHAR(1024) NOT NULL,
    "hotel_id" INT NOT NULL,
    "type" VARCHAR(255),
    "price" DOUBLE PRECISION,
    "is_available" BOOLEAN,
    PRIMARY KEY ("hotel_id", "room_number"),
    FOREIGN KEY ("hotel_id") REFERENCES hotel(id)
    );


CREATE TABLE IF NOT EXISTS "review"
(
    "id" SERIAL PRIMARY KEY,
    "message" VARCHAR(1024),
    "hotel_id" INT,
    FOREIGN KEY ("hotel_id") REFERENCES hotel(id)
    );


CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "role" VARCHAR(50) NOT NULL,
    "reset_token" VARCHAR(255) UNIQUE,
    "token_expiration" TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS "booking"
(
    "id" SERIAL PRIMARY KEY,
    "hotel_id" INT NOT NULL,
    "room_number" VARCHAR(1024) NOT NULL,
    "user_id" INT,
    "booking_start_date" TIMESTAMP,
    "booking_end_date" TIMESTAMP,
    "status" VARCHAR(50),
    FOREIGN KEY ("hotel_id", "room_number") REFERENCES room(hotel_id, room_number),
    FOREIGN KEY ("user_id") REFERENCES users(id)
    );
