-- +goose Up
-- +goose StatementBegin
CREATE TABLE businesses(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    display_image BYTEA,
    business_name TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL, 
    location TEXT,
    website TEXT,
    service_type TEXT NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number TEXT, 
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE businesses;
-- +goose StatementEnd
