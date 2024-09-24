import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { PanelType } from 'src/panel/enums/panel.enum';
import { SlotType } from 'src/parking-slot/enums/slot-type.enum';
import { VehicleType } from 'src/vehicle/enums/vehicle-type.enum';

export class firstUser1644667387718 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const pass = await bcrypt.hash('123', bcrypt.genSaltSync(10));
    const name = 'api';
    const email = 'api@phew.tech';

    await queryRunner.query(
      `INSERT INTO admins (id, name, email, password) VALUES ($1, $2, $3, $4)`,
      [1, name, email, pass],
    );

    await queryRunner.query(
      `INSERT INTO "parking-lots" (id, name) VALUES ($1, $2)`,
      [1, 'Parking Lot 1'],
    );

    await queryRunner.query(
      `INSERT INTO floors (id, number, parking_lot_id) VALUES ($1, $2, $3)`,
      [1, 1, 1],
    );

    await queryRunner.query(
      `INSERT INTO panels (id, type, floor_id) VALUES ($1, $2, $3)`,
      [1, PanelType.ENTRY, 1],
    );

    await queryRunner.query(
      `INSERT INTO "parking-slots" (id, number, type, floor_id, parking_lot_id) VALUES 
        ($1, $2, $3, $4, $5),
        ($6, $7, $8, $9, $10)`,
      [1, 1, SlotType.CAR, 1, 1, 2, 2, SlotType.MOTORBIKE, 1, 1],
    );

    await queryRunner.query(
      `INSERT INTO vehicles (id, license_plate, type) VALUES ($1, $2, $3)`,
      [1, 'ABC-1234', VehicleType.CAR],
    );

    await queryRunner.query(
      `INSERT INTO vehicles (id, license_plate, type) VALUES ($1, $2, $3)`,
      [2, 'XYZ-5678', VehicleType.MOTORBIKE],
    );

    await queryRunner.query(
      `INSERT INTO vehicles (id, license_plate, type) VALUES ($1, $2, $3)`,
      [3, 'LMN-9012', VehicleType.TRUCK],
    );

    await queryRunner.query(`
      INSERT INTO "parking-tickets" (id, entry_time, exit_time, total_amount, parking_slot_id, vehicle_id) 
      VALUES 
        (1, NOW(), NULL, NULL, 1, 1), 
        (2, NOW(), NOW(), 15.00, 2, 2);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const email = 'api@phew.tech';
    await queryRunner.query(`DELETE FROM admins WHERE email = $1`, [email]);

    await queryRunner.query(`DELETE FROM "parking-lots" WHERE name = $1`, [
      'Parking Lot 1',
    ]);

    await queryRunner.query(`DELETE FROM floors WHERE number = $1`, [1]);

    await queryRunner.query(`DELETE FROM panels WHERE type = $1`, [
      PanelType.ENTRY,
    ]);

    await queryRunner.query(
      `DELETE FROM "parking-slots" WHERE number IN ($1, $2)`,
      [1, 2],
    );

    await queryRunner.query(
      `DELETE FROM vehicles WHERE license_plate IN ($1, $2, $3)`,
      ['ABC-1234', 'XYZ-5678', 'LMN-9012'],
    );

    await queryRunner.query(`
      DELETE FROM "parking-tickets"
      WHERE id IN (1, 2);
    `);
  }
}
