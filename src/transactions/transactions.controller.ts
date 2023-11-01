import { Body, Controller, Get, Param, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('transaction')
export class TransactionsController {

    constructor(private transactionService: TransactionsService){}

    @Post('transfer')
    async transfer(@Body() transactionData: Record<any, any>): Promise<object|undefined>{

        return await this.transactionService.walletTransfer(transactionData)
    }

    @Get()
    async list(){
        return await this.transactionService.listTransactions();
    }

    @Get('pending')
    async listPending(@Req() req: any, @Res() res:any){
        if (req.user.role == 2) res.status(200).send({success: true, data: await this.transactionService.listPendingTransactions()});
        return res.status(401).send({message: 'Forbidden Request'})
    }

    @Get('month/:month?')
    async listMonthlyTransactions(@Param('month') month:number, @Req() req: any, @Res() res:any){
        if (req.user.role == 2) res.status(200).send({success: true, data: await this.transactionService.listMonthlyTransactions(month)});
        return res.status(401).send({message: 'Forbidden Request'})
    }

    
    @Post('approve')
    async approve(@Body() pendingTransactions: string[],  @Req() req: any, @Res() res:any): Promise<Object | void>{
        const _approve = await this.transactionService.approveTransactions(pendingTransactions)
        if (req.user.role == 2) res.status(401).send({success: true, data: pendingTransactions, detail: _approve});
        return res.status(401).send({message: 'Forbidden Request'})
    }

}
