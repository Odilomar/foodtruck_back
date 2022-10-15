import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createCartTable1665875413291 implements MigrationInterface {
  private readonly tableName = 'carts';
  private readonly transactionTableName = 'carts';
  private readonly productTableName = 'carts';

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
            name: 'product_id',
            type: 'integer',
          },
          {
            name: 'unit_price',
            type: 'integer',
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

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedTableName: this.productTableName,
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
