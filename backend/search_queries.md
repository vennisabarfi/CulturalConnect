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


### Encoded URLs to build dynamic queries

import axios from 'axios';

// Function to handle the search request
function search(query) {
    // Base URL of your search endpoint
    const baseUrl = '/search';
    
    // Encode the query to make it URL-safe
    const encodedQuery = encodeURIComponent(query);

    // Construct the dynamic URL with the query as a parameter
    const url = `${baseUrl}?query=${encodedQuery}`;

    // Send the GET request to your backend with Axios
    axios.get(url)
        .then(response => {
            console.log('Search results:', response.data);
        })
        .catch(error => {
            console.error('Error performing search:', error);
        });
}

// Example usage
search('events in new york');

### SQL Queries with Union
<!-- SQL Queries -->
WITH events_query AS (
    SELECT
        id, 
        display_image, 
        organizer_name, 
        ts_headline(description, q) AS description_headline, 
        location, 
        date::text AS date,  -- Cast date to text
        time::text AS time,  -- Cast time to text
        website, 
        type,
        ts_rank(tsv, q) AS rank,
        NULL AS email,
        NULL AS phone_number
    FROM
        events, websearch_to_tsquery('rescue') q
    WHERE
        tsv @@ q
    ORDER BY
        ts_rank(tsv, q) DESC
    LIMIT 
        10
),
resources_query AS (
    SELECT
        id, 
        display_image, 
        org_name AS organizer_name, 
        ts_headline(description, q) AS description_headline, 
        location, 
        NULL::text AS date,  -- Explicitly cast NULL to text
        NULL::text AS time,  -- Explicitly cast NULL to text
        website, 
        type,
        ts_rank(tsv, q) AS rank,
        email,
        phone_number
    FROM
        resources, websearch_to_tsquery('rescue') q
    WHERE
        tsv @@ q
    ORDER BY
        ts_rank(tsv, q) DESC
    LIMIT 
        10
)
SELECT * FROM (
    SELECT * FROM events_query
    UNION ALL
    SELECT * FROM resources_query
) combined_results
ORDER BY rank DESC
LIMIT 10;