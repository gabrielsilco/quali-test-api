const neo4j = require('neo4j-driver');
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'senhadificil'));
const session = driver.session();

module.exports = (server) => {
    // GET ALL PATIENTS
    server.get('/patients', async (req, res) => {
        try {
            await session
                .run('MATCH (patient:Patient) RETURN patient')
                .then((result) => {
                    const patients = result.records.map(record => {
                        const patient = record.get('patient');
                        return {
                            id: patient.identity.low,
                            fullName: patient.properties.fullName,
                            dateOfBirth: patient.properties.dateOfBirth,
                            cpf: patient.properties.cpf,
                            weight: patient.properties.weight,
                            height: patient.properties.height,
                            occupation: patient.properties.occupation,
                            everBeenAdmitted: patient.properties.everBeenAdmitted,
                            sports: patient.properties.sports,
                            familyHistory: patient.properties.familyHistory,
                            city: patient.properties.city,
                            state: patient.properties.state,
                            country: patient.properties.country
                        }
                    })
                    res.json(patients)
                })
                .catch((error) => {
                    console.error('Error creating node:', error);
                });
        } catch (error) {
            res.json({ error: 'Erro ao buscar os usuários.'})
        }
    })

    // GET PATIENT BY ID
    server.get('/patients/:id', async (req, res) => {
        const nodeId = req.params.id;
        try {
            await session
                .run('MATCH (patient) WHERE ID(patient) = $id RETURN patient', { id: neo4j.int(nodeId) })
                .then((result) => {
                    const patient = result.records[0].get('patient');
                    res.json({
                        id: patient.identity.low,
                        fullName: patient.properties.fullName,
                        dateOfBirth: patient.properties.dateOfBirth,
                        cpf: patient.properties.cpf,
                        weight: patient.properties.weight,
                        height: patient.properties.height,
                        occupation: patient.properties.occupation,
                        everBeenAdmitted: patient.properties.everBeenAdmitted,
                        sports: patient.properties.sports,
                        familyHistory: patient.properties.familyHistory,
                        city: patient.properties.city,
                        state: patient.properties.state,
                        country: patient.properties.country
                    })
                })
        } catch (error) {
            console.log(error)
        }
    })

    // CREATE PATIENT
    server.post('/patients', async (req, res) => {
        try {
            const {
                fullName,
                dateOfBirth,
                cpf,
                weight,
                height,
                occupation,
                everBeenAdmitted,
                sports,
                familyHistory,
                city,
                state,
                country
            } = req.body;
            await session
                .run(`CREATE (patient:Patient {
                        fullName: $fullName,
                        dateOfBirth: $dateOfBirth,
                        cpf: $cpf,
                        weight: $weight,
                        height: $height,
                        occupation: $occupation,
                        everBeenAdmitted: $everBeenAdmitted,
                        sports: $sports,
                        familyHistory: $familyHistory,
                        city: $city,
                        state: $state,
                        country: $country
                    }) RETURN patient`
                    , {
                        fullName,
                        dateOfBirth,
                        cpf,
                        weight,
                        height,
                        occupation,
                        everBeenAdmitted,
                        sports,
                        familyHistory,
                        city,
                        state,
                        country
                })
                .then((result) => {
                    const createdPatient = result.records[0].get('patient').properties;
                    res.json(createdPatient);
                })
                .catch((error) => {
                    console.error('Error creating node:', error);
                });
        } catch (error) {
            res.json({ error: 'Erro ao criar usuário.'})
        }
    })

    // UPDATE PATIENT
    server.put('/patients/:id', async (req, res) => {
        const nodeId = req.params.id;
        const {
            weight,
            height,
            occupation,
            everBeenAdmitted,
            sports,
            familyHistory,
            city,
            state,
            country
        } = req.body;
        try {
            await session
                .run(`MATCH (patient)
                    WHERE ID(patient) = $id
                    SET patient.weight = $weight,
                    patient.height = $height,
                    patient.occupation = $occupation,
                    patient.everBeenAdmitted = $everBeenAdmitted,
                    patient.sports = $sports,
                    patient.familyHistory = $familyHistory,
                    patient.city = $city,
                    patient.state = $state,
                    patient.country = $country
                    RETURN patient`,
                {
                    id: neo4j.int(nodeId),
                    weight,
                    height,
                    occupation,
                    everBeenAdmitted,
                    sports,
                    familyHistory,
                    city,
                    state,
                    country
                })
                .then((result) => {
                    console.log(result)
                    const patient = result.records[0].get('patient');
                    res.json({
                        id: patient.identity.low,
                        fullName: patient.properties.fullName,
                        dateOfBirth: patient.properties.dateOfBirth,
                        cpf: patient.properties.cpf,
                        weight: patient.properties.weight,
                        height: patient.properties.height,
                        occupation: patient.properties.occupation,
                        everBeenAdmitted: patient.properties.everBeenAdmitted,
                        sports: patient.properties.sports,
                        familyHistory: patient.properties.familyHistory,
                        city: patient.properties.city,
                        state: patient.properties.state,
                        country: patient.properties.country
                    })
                })
        } catch (error) {
            console.log(error)
        }
    })

    // DELETE PATIENT
    server.del('/patients/:id', async (req, res) => {
        const nodeId = req.params.id;
        try {
            await session
                .run('MATCH (patient) WHERE ID(patient) = $id DELETE patient RETURN patient', { id: neo4j.int(nodeId) })
                .then((result) => {
                    const patient = result.records[0].get('patient');
                    res.json({
                        id: patient.identity.low,
                    })
                })
        } catch (error) {
            console.log(error)
        }
    })
}