import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserWalletService } from './user_wallet.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService, private userWalletService: UserWalletService){}
    
    @Post('wallet')
    async createWallet(@Body() wallet: Record<string, any>, @Req() req: any) {
        const newWallet = await this.userWalletService.createWallet(req.user.sub, wallet.currency_id);
        if (!newWallet['wallet_id']){
            return { success: false, message: 'a wallet already exists for selected currency'}
        }
        return { success:true, message: 'wallet created successfully with wallet id: ' + newWallet['wallet_id']}
      }
    
    @HttpCode(200)
    @Get('wallet')
    async listUserWallet(@Req() req: any) {
        return this.userWalletService.listWallets(req.user);
    }

    @HttpCode(200)
    @Post('wallet/credit')
    async creditUserWallet(@Body() data: Record<string, any>){
        return await this.userWalletService.creditUserWallet(data.amount, data.wallet_id)
    }
}
