import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { UserWallet } from 'src/users/user_wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, UserWallet]), UsersModule],
  providers: [TransactionsService],
  controllers: [TransactionsController]
})
export class TransactionsModule {}
