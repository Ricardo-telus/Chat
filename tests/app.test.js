const {findUser,changeName} = require('../app')

user=[
    [ 'fds', '1' ],
    [ 'sdf', '6' ],
    [ 'sdf', '3' ],
    [ 'dfg', '5' ]
  ]
dat={before:'1',after: 'soyNuevo'}

test('get name of a user', ()=>{
    const datos= findUser('fds',user);
    expect(datos).toEqual('1');
})
test('change name of a user', ()=>{
    expect(changeName(dat,user)).toBe(true)
})