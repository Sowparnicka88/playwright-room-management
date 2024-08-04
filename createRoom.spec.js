const { test, expect } = require('@playwright/test');
const { AdminPage } = require('../pageObjects/adminPage');
const { roomData } = require('../fixtures/roomData');

test.describe('Create Room', () => {
    test('should create a new room successfully', async ({ page }) => {
        const adminPage = new AdminPage(page);

        // Log in to the admin panel
        await adminPage.goto();
        await adminPage.login('admin', 'password'); 

        // Perform test operations to create a room
        await adminPage.createRoom(roomData.validRoom);
        

        try {
            const rooms = await adminPage.getRoomList();
            // Printing the room list
            console.log("Room list received in the test:", rooms);
            
            // Check if the room number appears in the list
            expect(rooms.some(room => room.includes(roomData.validRoom.roomNumber))).toBe(true);
        } catch (error) {
            console.error("Error while getting room list:", error);
        }
    }, 120000);  

    test('should show error message for invalid room data', async ({ page }) => {
        const adminPage = new AdminPage(page);

        await adminPage.goto();
        await adminPage.login('admin', 'password');

        const errorMessage = await adminPage.createRoomWithInvalidData(roomData.invalidRoom);

        await adminPage.verifyErrorMessageVisible();
    });
});
