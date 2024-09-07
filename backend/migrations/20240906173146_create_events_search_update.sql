-- +goose Up
-- +goose StatementBegin
ALTER TABLE events ADD COLUMN type TEXT NULL;
ALTER TABLE events ADD COLUMN tsv tsvector;


UPDATE events SET tsv =
    setweight(to_tsvector(coalesce(organizer_name,'')), 'A') ||
    setweight(to_tsvector(coalesce(description, '')), 'B') ||
    setweight(to_tsvector(coalesce(type, '')), 'C') ||
    setweight(to_tsvector(coalesce(location,'')), 'D');

CREATE INDEX ix_events_tsv ON events USING GIN(tsv);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE events DROP COLUMN tsv;
-- +goose StatementEnd
