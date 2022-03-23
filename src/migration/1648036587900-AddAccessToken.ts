import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAccessToken1648036587900 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE Tokens ADD COLUMN accessToken VARCHAR(250) NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE TOKEN DROP COLUMN accessToken');
    }
}
