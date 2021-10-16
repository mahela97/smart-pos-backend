import UserDAO from "../../src/dao/userDAO";
import chai from "chai";
import { expect } from 'chai';
import {UserDocument} from "../../src/schemaModels/user.model";

chai.should();


describe('UserDao Unit Testings', () => { // the tests container
    const userDao = new UserDAO();
    let testUser: UserDocument;
    before(async () => {
        testUser = await userDao.add({
            firstName: "Test",
            uid: "uid",
            archived: false,
            lastName: "User",
            telephone: "0779667935",
            email: "testUser@gmail.com",
            role: "manager"
        });
    });


    it('Check Add User', async () => { // the single test// this will be your class
        const user:UserDocument = await userDao.add({
            firstName: "Test",
            uid: "uid",
            archived: false,
            lastName: "Add",
            telephone: "0779667935",
            email: "addUser@gmail.com",
            role: "manager"
        });
        expect(user).to.be.a("object")

        after(async () => {
            await userDao.delete(user._id);
        });
    });

    after(async () => {
        await userDao.delete(testUser._id);
    });
});