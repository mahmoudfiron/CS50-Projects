SELECT movies.title
FROM movies
JOIN stars AS sc ON movies.id = sc.movie_id
JOIN people AS bc ON sc.person_id = bc.id
JOIN stars AS sl ON movies.id = sl.movie_id
JOIN people AS jl ON sl.person_id = jl.id
WHERE bc.name = 'Bradley Cooper'
AND jl.name = 'Jennifer Lawrence';
