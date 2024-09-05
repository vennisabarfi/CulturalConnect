-- +goose Up
-- +goose StatementBegin
CREATE TABLE media(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    display_image BYTEA,
    website TEXT,
    description TEXT NOT NULL, 
    tag TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE media;
-- +goose StatementEnd
