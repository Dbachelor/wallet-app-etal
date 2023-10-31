import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserWalletService } from './user_wallet.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService, private userWalletService: UserWalletService){}

    @Post('wallet')
    async createWallet(@Body() wallet: Record<string, any>) {
        const newWallet = await this.userWalletService.createWallet(wallet.user_id, wallet.currency_id);
        if (!newWallet['wallet_id']){
            return { success: false, message: 'a wallet already exists for selected currency'}
        }
        return { success:true, message: 'wallet created successfully with wallet id: ' + newWallet['wallet_id']}
      }
    @Get('wallet')
    async listUserWallet(){
        return this.userWalletService.listUserWallets(1);
    }

    @Post('wallet/credit')
    async creditUserWallet(@Body() data: Record<string, any>){
        return await this.userWalletService.creditUserWallet(data.amount, data.wallet_id)
    }
}
