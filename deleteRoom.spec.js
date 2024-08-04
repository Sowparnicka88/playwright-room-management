const { test, expect } = require('@playwright/test');
const { AdminPage } = require('../pageObjects/adminPage');
const { roomData } = require('../fixtures/roomData');

test.describe('Delete Room', () => {
    test('Delete the room successfully', async ({ page }) => {
        const adminPage = new AdminPage(page);

        // Log in to the admin panel
        await adminPage.goto();
        await adminPage.login('admin', 'password'); 
        // Create a room to delete
        await adminPage.createRoom(roomData.validRoom2);

        await adminPage.verifyRoomCreated(roomData.validRoom2.roomNumber);

        // Delete the room
        await adminPage.deleteRoom(roomData.validRoom2.roomNumber);


        // Verify the room is deleted
        const rooms = await adminPage.getRoomList();
        expect(rooms).not.toContain(roomData.validRoom2.roomNumber);
        console.log()
        
        try {
            const rooms = await adminPage.getRoomList();
            // Print the room list 
            console.log("Room list received in the test:", rooms);
            
            // Check if the room number appears in the list
            expect(rooms.some(room => room.includes(roomData.validRoom2.roomNumber))).toBe(true);
        } catch (error) {
            console.error("Error while getting room list:", error);
        }
    }, 120000);  



});
