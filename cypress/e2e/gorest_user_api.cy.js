import { GorestUserAPI } from '../support/pages/GorestUserAPI';

describe('GoRest API CRUD automation', () => {
  const api = new GorestUserAPI();
  let userId;
  let originalUserData;
  let updatedUserData;

  it('1. Create user (POST)', () => {
    originalUserData = api.generateUserData();

    api.createUser(originalUserData).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.include(originalUserData);
      expect(res.body.id).to.exist;
      userId = res.body.id;
    });
  });

  it('2. Get user (GET)', () => {
    api.getUser(userId).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.include(originalUserData);
    });
  });

  it('3. Update user (PATCH)', () => {
    updatedUserData = api.generateUpdatedUserData();

    api.updateUser(userId, updatedUserData).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.include(updatedUserData);
    });
  });

  it('4. Verify updated user (GET)', () => {
    api.getUser(userId).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.include(updatedUserData);
    });
  });

  it('5. Delete user (DELETE)', () => {
    api.deleteUser(userId).then((res) => {
      expect(res.status).to.eq(204);
    });
  });

  it('6. Verify user is deleted (GET)', () => {
    api.getUser(userId).then((res) => {
      expect(res.status).to.eq(404);
    });
  });
});
