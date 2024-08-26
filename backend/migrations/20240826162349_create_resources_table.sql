-- +goose Up
-- +goose StatementBegin
CREATE TABLE resources(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    display_image BYTEA,
    org_name TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL, 
    location TEXT,
    website TEXT,
    type TEXT NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number TEXT, 
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE resources;
-- +goose StatementEnd
