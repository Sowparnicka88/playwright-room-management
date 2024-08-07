const { expect } = require('@playwright/test');

class AdminPage {
    constructor(page) {
        this.page = page;
        this.roomNumberInput = page.locator('[id="roomName"]'); 
        this.roomTypeSelect = page.locator('#type');
        this.accessibleSelect = page.locator('#accessible'); 
        this.priceInput = page.locator('[id="roomPrice"]');
        this.wifiCheckbox = page.locator('#wifiCheckbox');
        this.tvCheckbox = page.locator('#tvCheckbox');
        this.safeCheckbox = page.locator('#safeCheckbox');
        this.refreshCheckbox = page.locator('#refreshCheckbox');
        this.createButton = page.locator('button:has-text("Create")');
        this.roomListItems = page.locator('[data-testid="roomlisting"]');
        this.errorMessage = this.page.locator('text=Room name must be set');
        console.log("Locators initialized");
    }

    async goto() {
        await this.page.goto('https://automationintesting.online/#/admin/');
        console.log("Navigated to admin page");
        
    }

    async login(username, password) {
        await this.page.fill('[data-testid="username"]', username);
        await this.page.fill('[data-testid="password"]', password);
        await this.page.click('[data-testid="submit"]');
        await expect(this.page.locator('text=Rooms')).toBeVisible();
        console.log("Logged in");
    }

    async createRoom(roomData) {
        console.log("Creating room with data:", roomData.validRoom);
        await this.roomNumberInput.fill(roomData.roomNumber);
        await this.roomTypeSelect.selectOption(roomData.type);
        await this.accessibleSelect.selectOption({ value: roomData.accessible.toString() });
        await this.priceInput.fill(roomData.roomPrice)

         // Check or uncheck features based on roomData
        if (roomData.Roomdetails.includes('WiFi')) {
            await this.wifiCheckbox.check();
        } else {
            await this.wifiCheckbox.uncheck();
        }
        if (roomData.Roomdetails.includes('TV')) {
            await this.tvCheckbox.check();
        } else {
            await this.tvCheckbox.uncheck();
        }
        if (roomData.Roomdetails.includes('Safe')) {
            await this.safeCheckbox.check();
        } else {
            await this.safeCheckbox.uncheck();
        }
        if (roomData.Roomdetails.includes('Refreshments')) {
            await this.refreshCheckbox.check();
        } else {
            await this.refreshCheckbox.uncheck();
        }

        await this.createButton.click();
        console.log("Room created");
    }
    async createRoomWithInvalidData(roomData) {
        console.log("Creating room with invalid data:", roomData);

        await this.roomNumberInput.fill(roomData.roomNumber);

        await this.page.waitForSelector('#type'); 
        await this.roomTypeSelect.selectOption({ label: roomData.type });

        await this.page.waitForSelector('#accessible'); 
        await this.accessibleSelect.selectOption({ value: roomData.accessible.toString() });

        await this.priceInput.fill(roomData.roomPrice);

        if (roomData.Roomdetails.includes('WiFi')) await this.wifiCheckbox.check();
        else await this.wifiCheckbox.uncheck();
        
        if (roomData.Roomdetails.includes('TV')) await this.tvCheckbox.check();
        else await this.tvCheckbox.uncheck();
        
        if (roomData.Roomdetails.includes('Safe')) 
           await this.safeCheckbox.check();
        else 
            await this.safeCheckbox.uncheck();
        
        if (roomData.Roomdetails.includes('Refreshments')) 
            await this.refreshCheckbox.check();
        else 
            await this.refreshCheckbox.uncheck();

        await this.createButton.click();

        await expect(this.errorMessage).toBeVisible();

        
    }

    async verifyErrorMessageVisible() {
        await expect(this.errorMessage).toBeVisible();
        console.log("Room not created:", await this.errorMessage.innerText());
        
    }

    async verifyRoomCreated(roomNumber) {
        const room = await this.findRoom(roomNumber);
        await expect(room).toBeVisible();
    }
    async deleteRoom(roomNumber) {
        // Take a snapshot before deletion
        await this.page.screenshot({ path: 'before_deletion.png' });

        // Locate the room and delete button
        const room = await this.findRoom(roomNumber);
        const deleteButton = room.locator('.fa-remove.roomDelete');
        await deleteButton.click();

        // Wait for the room to be removed from the DOM
        await this.page.waitForTimeout(1000); 

        // Take a snapshot after deletion
        await this.page.screenshot({ path: 'after_deletion.png' });
    }

    async verifyRoomDeleted(roomNumber) {
        await expect(this.roomListItems.locator(`text=${roomNumber}`)).toBeHidden();
    }
    async getRoomList() {
        // Wait for the room list to be visible
        await this.page.waitForSelector('[data-testid="roomlisting"]');
        
        // Ensure the selector is correct and room list is populated
        const roomListItems = this.roomListItems;
        const count = await roomListItems.count();
        
        console.log(`Number of room list items found: ${count}`);
        if (count === 0) {
            throw new Error("No room list items found.");
        }
    
        // Extract text content of each room list item
        const roomList = await roomListItems.evaluateAll(nodes => nodes.map(n => n.textContent.trim()));
        console.log("Room list contents:", roomList);
        
        return roomList; 
    }

    async findRoom(roomNumber) {
        const rooms = await this.roomListItems;
        for (let i = 0; i < await rooms.count(); i++) {
            const room = rooms.nth(i);
            const roomNum = await room.locator('p[id^="roomName"]').textContent(); 
            console.log(`Processing room with number: ${roomNum.trim()}`);
                        if (roomNum.trim() === roomNumber) {
                return room;
            }
        }
        throw new Error(`Room with number ${roomNumber} not found`);
    }
}


module.exports = { AdminPage };
