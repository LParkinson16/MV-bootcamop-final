const User = require('../src/user')

describe('user class tests', () => {
    test('add a user', () => {
        const user1 = new User('Shazeen Amir', 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/4_avatar-512.png')
        expect(user1.name).toEqual('Shazeen Amir')
    })
})