import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { TransactionDto } from './Dto/transaction.dto';

@UseGuards(JwtAuthGuard)
@Controller('transaction')
export class TransactionsController {

    constructor(private transactionService: TransactionsService){}

    @Post('transfer')
    async transfer(@Body() transactionData: TransactionDto, @Req() req:any): Promise<object|undefined>{
        return await this.transactionService.walletTransfer(transactionData, req.user)
    }

    @Get()
    async list(){
        return await this.transactionService.listTransactions();
    }

    @Get('pending')
    @Roles([2])
    @UseGuards(RolesGuard)
    async listPending(@Req() req: any, @Res() res:any){
        res.status(200).send({success: true, data: await this.transactionService.listPendingTransactions()});
    }

    @Get('month/:month?')
    @Roles([2])
    @UseGuards(RolesGuard)
    async listMonthlyTransactions(@Param('month') month:number, @Res() res:any){
         res.status(200).send({success: true, data: await this.transactionService.listMonthlyTransactions(month)});
    }

    
    @Post('approve')
    @Roles([2])
    @UseGuards(RolesGuard)
    async approve(@Body() pendingTransactions: string[],  @Req() req: any, @Res() res:any): Promise<Object | void>{
        const _approve = await this.transactionService.approveTransactions(pendingTransactions)
        res.status(200).send({success: true, data: pendingTransactions, detail: _approve});
    }

}
