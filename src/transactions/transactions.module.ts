import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [TransactionsService],
  controllers: [TransactionsController],
  imports: [UsersModule]
})
export class TransactionsModule {}
