import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateActionTokens1648659476448 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS actionTokens (
                id INT PRIMARY KEY AUTO_INCREMENT,
                actionToken VARCHAR(250) NOT NULL,
                userId INT NOT NULL,
                FOREIGN KEY (userId) REFERENCES Users (id)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS ActionTokens
        `);
    }
}
