"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableUsers1645554496150 = void 0;
class CreateTableUsers1645554496150 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                firstName VARCHAR(250) NOT NULL,
                lastName VARCHAR(250) NOT NULL
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Users
        `);
    }
}
exports.CreateTableUsers1645554496150 = CreateTableUsers1645554496150;
//# sourceMappingURL=1645554496150-CreateTableUsers.js.map