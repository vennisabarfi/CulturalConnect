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


Here’s your SQL query and explanation rewritten as Markdown for documentation purposes:

---

# Full-Text Search Across Multiple Tables with `UNION` and `tsv`

## Overview

This guide explains how to perform full-text search across multiple tables using PostgreSQL’s full-text search (`tsv` and `tsquery`). We’ll use the `UNION` operator to combine results from multiple tables and rank them using `ts_rank`. 

### Example: Search Across `events` and `workshops` Tables

The following SQL query demonstrates how to search for the term `'cinema'` in both `events` and `workshops` tables and combine the results:

```sql
SELECT 
    id, 
    display_image, 
    organizer_name, 
    ts_headline(description, q) AS description_headline, 
    location, 
    date, 
    time, 
    website, 
    created_at, 
    rank
FROM (
    -- Query for events table
    SELECT
        id, 
        display_image, 
        organizer_name, 
        description, 
        location, 
        date, 
        time, 
        website, 
        ts_rank(events.tsv, q) AS rank, 
        created_at, 
        q
    FROM
        events, websearch_to_tsquery('cinema') q
    WHERE
        events.tsv @@ q

    UNION

    -- Query for workshops table
    SELECT
        id, 
        display_image, 
        organizer_name, 
        description, 
        location, 
        date, 
        time, 
        website, 
        ts_rank(workshops.tsv, q) AS rank, 
        created_at, 
        q
    FROM
        workshops, websearch_to_tsquery('cinema') q
    WHERE
        workshops.tsv @@ q
) AS combined_results
ORDER BY
    rank DESC
LIMIT 
    10;
```

### Explanation

1. **Search on Multiple Tables**:
   - The query performs a full-text search on the `events` and `workshops` tables using the `UNION` operator to combine the results.

2. **Full-text Search**:
   - We use the `tsv` column, which is a `tsvector` field, to store the preprocessed textual data for full-text search. The `@@` operator checks if the `tsv` field matches the search query.
   - The search query is constructed using `websearch_to_tsquery('cinema')`, which turns the search term `'cinema'` into a `tsquery` object.

3. **Highlighting Matches**:
   - The function `ts_headline(description, q)` highlights the search terms in the `description` field where matches occur.

4. **Ranking the Results**:
   - The `ts_rank` function is used to calculate the rank of each result based on the relevance of the search term. This rank is calculated separately for each table, then combined using the `UNION`.

5. **Combining Results**:
   - The `UNION` operator is used to combine the results from both tables into a single result set. `UNION` will remove any duplicate rows. If you want to retain duplicates, you can use `UNION ALL`.

6. **Ordering by Rank**:
   - The combined results are ordered by the `rank` (relevance score), and only the top 10 results are returned.

### Alternatives

- **Join-based Approach**: If your tables share a common key (like `event_id`), you could use a `JOIN` to combine them instead of using `UNION`.
  
- **Materialized Views**: You can create a materialized view that pre-joins or pre-aggregates data from multiple tables. This can be useful if the data doesn't change frequently and you want to avoid recalculating the results every time.

- **Combined TSV Column**: If your application frequently performs searches across multiple tables, consider creating a new table that aggregates data from multiple sources, including their `tsvector` columns, and apply the search on that table.

---

This document provides an overview of how to search across multiple tables using `UNION` and PostgreSQL's full-text search capabilities.