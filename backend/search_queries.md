### Event table search queries
Also update struct for event and scan for get functionality.

ALTER TABLE events ADD COLUMN tsv tsvector;
<!-- use coalescs in case field is null -->
UPDATE events SET tsv =
    setweight(to_tsvector(coalesce(organizer_name,'')), 'A') ||
    setweight(to_tsvector(coalesce(description, '')), 'B') ||
    setweight(to_tsvector(coalesce(date,'')), 'C') ||
    setweight(to_tsvector(coalesce(location,'')), 'D');

CREATE INDEX ix_events_tsv ON events USING GIN(tsv);

# SQL Query. Implement in handler
<!-- using websearch to query instead of plainto_tsquery. read docs for more info if you forget -->
SELECT * as rank
FROM 
events, websearch_to_tsquery("search parameter") q
WHERE
 tsv @@ q
 ORDER BY
 rank DESC
 LIMIT 
 10;

 # Since description is expensive as it could be long, let's limit it with the headline functionality

SELECT id, display_name, organizer_name, ts_headline(description), location, date, time, website, created_at, deleted_at as rank
FROM (
    SELECT
       id, display_name, organizer_name, description, location, date, time, website, ts_rank(tsv, q), created_at, deleted_at as rank, q
    FROM
        events, websearch_to_tsquery("search parameter") q
    WHERE
        tsv @@ q
    ORDER BY
        rank DESC
        <!-- i -->
    LIMIT 
        10
)
<!-- UNION
+add search for other table --> when we write queries for main home search.
ORDER BY 
    rank DESC; 

## Search handler
var query Query
if err := shouldBindQuery(&query); err != nil{
    log.Fatal
    c.JSON(httpStatus)
}



### Resources table search queries
