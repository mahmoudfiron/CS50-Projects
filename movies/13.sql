SELECT DISTINCT p.name
FROM people AS p
JOIN stars AS kb ON p.id = kb.person_id
JOIN movies AS m ON kb.movie_id = m.id
JOIN stars AS kbc ON m.id = kbc.movie_id
JOIN people AS kb_actor ON kbc.person_id = kb_actor.id
WHERE kb_actor.name = 'Kevin Bacon'
AND kb_actor.birth = 1958
AND p.name != 'Kevin Bacon';
