// Question 4
var answer_4 = `MATCH (f:Flight)
WHERE f.carrier STARTS WITH 'D' AND f.duration > 165
RETURN f.code AS code, f.carrier AS carrier, f.duration AS duration
ORDER BY f.duration DESC` // finds all planes with "D" and duration > 165 by basic where sort then returns the dets

// Question 5
var answer_5 = `MATCH path = (source:City {name: "New York"})-[:HAS_FLIGHT]->(f1:Flight)-[:FLYING_TO]->(intermediate:City)-[:HAS_FLIGHT]->(f2:Flight)-[:FLYING_TO]->(destination:City {name: "Los Angeles"})
WHERE f2.departure - f1.arrival >= 60 AND f2.departure - f1.arrival <= 600
RETURN path` //finds flights that are 60-600 minutes apart from each other by looking at HAS_FLIGHT and computing a subtracting based on arrival time and departure time across the two flights

// Question 6
var answer_6 = `MATCH (ny:City {name: "New York"}), (dest:City)
WHERE dest <> ny
  AND NOT EXISTS((ny)-[:HAS_FLIGHT]->(:Flight)-[:FLYING_TO]->(dest))
WITH ny, dest
MATCH path = shortestPath((ny)-[*..12]-(dest))
WITH dest.name AS destination_city, length(path)/2 AS shortest_path_length
ORDER BY shortest_path_length ASC, destination_city ASC
RETURN destination_city, shortest_path_length` //locates shortest path by finding nyc destinations then looking at the min number of hops

// DO NOT MODIFY BELOW THIS LINE
module.exports =  { answer_4, answer_5, answer_6 }
