import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { User } from './users/user.entity';
import { UserWallet } from './users/user_wallet.entity';
import { Role } from './roles/role.entity';
import { Transaction } from './transactions/transaction.entity';
import { dataSourceOptions } from 'datasource.config';
import { ConfigModule } from '@nestjs/config';
import { CurrencyModule } from './currency/currency.module';



@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    TransactionsModule,
    AuthModule,
    RolesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CurrencyModule
],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
