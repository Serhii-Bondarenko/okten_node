import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddActionTokenType1648659930069 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE actiontokens ADD COLUMN type VARCHAR(250) NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE TOKEN DROP COLUMN type');
    }
}
