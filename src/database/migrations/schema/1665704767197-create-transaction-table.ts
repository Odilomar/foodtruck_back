import { PaymentTypeEnum } from '@/shared/enum/payment-type.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTransactionTable1665704767197 implements MigrationInterface {
  private readonly tableName = 'transactions';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'serial',
            generationStrategy: 'increment',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'integer',
          },
          {
            name: 'customer_cpf',
            type: 'varchar',
            length: '15',
            isNullable: true,
          },
          {
            name: 'net_total',
            type: 'integer',
          },
          {
            name: 'discounts',
            type: 'integer',
            default: 0,
          },
          {
            name: 'gross_total',
            type: 'integer',
            default: 0,
          },
          {
            name: 'payment_type',
            type: 'varchar',
            default: `'${PaymentTypeEnum.CASH}'`,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
