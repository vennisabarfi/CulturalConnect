-- +goose Up
-- +goose StatementBegin
CREATE TABLE events(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    display_image BYTEA,
    organizer_name TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL, 
    location TEXT,
    date DATE NOT NULL, 
    time TIME NOT NULL,
    website TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- date format is yyyy-mm-dd
-- time format is 01:02 *so add EST to frontend
-- add googlemaps api functionality for frontend later?
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE events;
-- +goose StatementEnd
