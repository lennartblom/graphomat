const neo4j = require('neo4j-driver')

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'neo'));
const session = driver.session()


async function startDbConnectivity(username, followers) {
    try {
        const resultUsernameCreation = await session.run(
            'CREATE (a:Person {name: $name}) RETURN a',
            {name: username}
        )

        for(const follower of followers) {
            const resultFollowerCreation = await session.run(
                'CREATE (a:Person {name: $name}) RETURN a',
                {name: follower}
            )

            const resultFollowerRelationShip = await session.run(
                'MATCH (a:Person),(b:Person)\n' +
                'WHERE a.name = $username AND b.name = $follower\n' +
                'CREATE (b)-[r:RELTYPE { name: \' follows \' }]->(a)\n' +
                'RETURN type(r)',
                {username: username, follower: follower}
            )
        }

    } finally {

    }

// on application exit:
    await session.close();
    await driver.close();
}

module.exports = startDbConnectivity;