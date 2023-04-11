import { addNewGroup, getAllGroups, getGroupDetailById, deleteGroup } from "./GroupServices";

beforeAll(done => {
  done()
})


describe('getAllGroups()', () => {

  it('retrieve Groups ', async () => {
    
    // Act
    const allGroups = await getAllGroups();
    // Assert
    expect(allGroups).toBeDefined();
    
  });
});

describe('addNewGroup()', () => {

  it('create Group', async () => {
    // Arrange
    const group = {
        "name" : "readWrite",
        "permissions" : [
            "READ","WRITE"
        ]
    }

    // Act
    const groupCreated = await addNewGroup(group);
    // Assert
    expect(groupCreated).toBeDefined();
    
  });

});

describe('getGroupDetailById()', () => {
  it('getGroupDetailById ', async () => {
    
    // Act
    const groupDetail = await getGroupDetailById('73ad6936-9ef4-4863-9715-7cf7da45aeff');
    // Assert
    expect(groupDetail).toBeDefined();
    
  });
})

describe('deleteGroup()', () => {
  it('deleteGroup ', async () => {
    
    // Act
    const deleteGrp = await deleteGroup('73ad6936-9ef4-4863-9715-7cf7da45aeff');
    console.log('deleteGroup deleted : ' + JSON.stringify(deleteGrp))
    // Assert
    
  });
})

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

afterAll(done => {
  done()
})