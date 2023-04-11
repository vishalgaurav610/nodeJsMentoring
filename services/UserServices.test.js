import { addNewUser, retrieveUserDetails, retrieveUserDetailById, deleteUser } from "./UserServices.js";

beforeAll(done => {
  done()
})


describe('retrieveUserDetails()', () => {

  it('retrieve Users ', async () => {
    
    // Act
    const userDetails = await retrieveUserDetails();
    // Assert
    expect(userDetails).toBeDefined();
    
  });
});

describe('createUser()', () => {

  it('create User fails, if it exist', async () => {
    // Arrange
    const user = {
      "login" : "login",
      "password" : "user3@password",
      "age" : 28,
      "isDeleted" : false
    }

    // Act
    const userCreated = await addNewUser(user);
    // Assert
    expect(userCreated).toBe('user already Exist');
    
  });

  it('create User , if it does not exist', async () => {
    // Arrange
    const login = makeid(5)
    const user = {
      "login" : login,
      "password" : "user3@password",
      "age" : 28,
      "isDeleted" : false
    }

    // Act
    const userCreated = await addNewUser(user);
    // Assert
    expect(userCreated).toBeDefined();
    
  });

});

describe('retrieveUserDetailById()', () => {
  it('retrieveUserDetailById ', async () => {
    
    // Act
    const userDetails = await retrieveUserDetailById('73ad6936-9ef4-4863-9715-7cf7da45aeff');
    // Assert
    expect(userDetails).toBeDefined();
    
  });
})

describe('deleteUser()', () => {
  it('deleteUser ', async () => {
    
    // Act
    const userDetails = await deleteUser('73ad6936-9ef4-4863-9715-7cf7da45aeff');
    console.log('userDetails deleted : ' + JSON.stringify(userDetails))
    // Assert
    expect(userDetails.isDeleted).toBeTruthy();
    
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