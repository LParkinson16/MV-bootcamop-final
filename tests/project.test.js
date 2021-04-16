const { test } = require('@jest/globals')
const Project = require('../src/project')

describe('Projects', () => {
    test('Can add a new project', () => {
        const project1 = new Project ('Restaurant App', 'Development of a restaurant app');
        expect(project1.name).toEqual('Restaurant App')
    })
})

