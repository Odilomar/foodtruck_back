import { TransactionStatusEnum } from '@/shared/enum/transaction-status.enum';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createTransactionStatusTable1665855213110
  implements MigrationInterface
{
  private readonly tableName = 'transactions_status';
  private readonly transactionTableName = 'transactions';

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
            name: 'transaction_id',
            type: 'integer',
          },
          {
            name: 'status',
            type: 'varchar',
            default: `'${TransactionStatusEnum.CREATED}'`,
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

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['transaction_id'],
        referencedTableName: this.transactionTableName,
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
