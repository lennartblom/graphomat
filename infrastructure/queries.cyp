CREATE (a:Person {name: "Lennart"}) RETURN a

MATCH (n) OPTIONAL MATCH (n)-[r]-() RETURN n, r;

MATCH (a:Person),(b:Person)
  WHERE a.name = 'Lennart' AND b.name = 'Alice'
CREATE (a)-[r:RELTYPE { name: 'follows' }]->(b)
RETURN type(r)

MATCH (n)
DETACH DELETE n
