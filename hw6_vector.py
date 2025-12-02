# Question 7
answer_7 = """
SELECT m2.title AS title,
       ROUND((s1.embedding <=> s2.embedding)::numeric, 5) AS distance
FROM movies m1
JOIN synopses s1 ON m1.id = s1.movie_id
CROSS JOIN movies m2
JOIN synopses s2 ON m2.id = s2.movie_id
WHERE m1.title = 'The Insatiable'
  AND m1.release_year > 2000
  AND m2.id != m1.id
ORDER BY distance ASC, title ASC
LIMIT 10
"""

# Question 8
answer_8 = """
SELECT comedy, horror, distance
FROM (
  SELECT DISTINCT ON (m_comedy.title)
         m_comedy.title AS comedy,
         m_horror.title AS horror,
         ROUND((s_comedy.embedding <=> s_horror.embedding)::numeric, 5) AS distance
  FROM movies m_comedy
  JOIN synopses s_comedy ON m_comedy.id = s_comedy.movie_id
  JOIN movie_genres g_comedy ON m_comedy.id = g_comedy.movie_id
  CROSS JOIN movies m_horror
  JOIN synopses s_horror ON m_horror.id = s_horror.movie_id
  JOIN movie_genres g_horror ON m_horror.id = g_horror.movie_id
  WHERE m_comedy.release_year > 2010
    AND m_horror.release_year > 2010
    AND g_comedy.genre = 'Comedy'
    AND g_horror.genre = 'Horror'
    AND m_comedy.id != m_horror.id
  ORDER BY m_comedy.title, distance ASC
) subquery
ORDER BY distance ASC, comedy ASC, horror ASC
LIMIT 15
"""
