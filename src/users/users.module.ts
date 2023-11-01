import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { RolesModule } from 'src/roles/roles.module';
import { UsersController } from './users.controller';
import { UserWalletService } from './user_wallet.service';
import { UserWallet } from './user_wallet.entity';
import { Currency } from 'src/currency/entities/currency.entity';
import { AuthModule } from 'src/auth/auth.module';



@Module({
    imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([UserWallet]), TypeOrmModule.forFeature([Currency]), RolesModule],
    providers: [UsersService, UserWalletService],
    exports: [UsersService, UserWalletService],
    controllers: [UsersController],
})
export class UsersModule {}
