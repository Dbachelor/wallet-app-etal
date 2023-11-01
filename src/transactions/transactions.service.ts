import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { DataSource, In, Repository } from 'typeorm';
import { UserWalletService } from 'src/users/user_wallet.service';
import { UserWallet } from 'src/users/user_wallet.entity';

@Injectable()
export class TransactionsService {

    constructor(
    @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>,
    private dataSource:DataSource,
    private userWalletService: UserWalletService){}

    async walletTransfer(transactionData, user): Promise<Object | undefined>{
        //first authenticate the transaction
        const owner = await this.userWalletService.getWalletDetails(transactionData.sender_wallet);
        if (user.sub !== owner.details.user.id){
            return {success: false, message:'wallet authorization failed', dev_error: `${transactionData.sender_wallet} belongs to a different user`}
        }
        //check if wallet has up to the amount
        const userWallet = await this.dataSource.getRepository(UserWallet).findOneBy({wallet_id: transactionData?.sender_wallet})
        if (userWallet.balance < transactionData.amount){
            return {success: false, message:'insufficient funds'}
        }
        //debit the sender's wallet
        await this.userWalletService.debitUserWallet(transactionData.amount, transactionData.sender_wallet);
        //save transaction
        if (transactionData.amount > 1000000){
            transactionData = {...transactionData, status:0}
            await this.saveTransaction(transactionData)
        }else{
            transactionData = {...transactionData, status:1}
            await this.saveTransaction(transactionData)
            //also credit receiver's wallet
            await this.userWalletService.creditUserWallet(transactionData.amount, transactionData.receiver_wallet)
        }
        return {success: true, message:'transaction successful'}
    }

    async saveTransaction(transactionData): Promise<boolean | undefined>{
        const save = await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(Transaction)
        .values({
            sender_wallet: await this.dataSource.getRepository(UserWallet).findOneBy({wallet_id: transactionData?.sender_wallet}),
            receiver_wallet: await this.dataSource.getRepository(UserWallet).findOneBy({wallet_id: transactionData?.receiver_wallet}),
            amount: transactionData.amount,
            status: transactionData.status,
            uuid: `trans_${(Math.round(Date.now() / 10)).toString().match(/.{1,3}/g).join('-')}`
          }).execute();
        return true
    }

    async listTransactions(): Promise<Object | void>{
        return await this.dataSource.getRepository(Transaction).find();
    }

    async listPendingTransactions(): Promise<Object | void>{
        return await this.dataSource.getRepository(Transaction).findBy({status:0});
    }

    async listMonthlyTransactions(month = new Date().getMonth() + 1): Promise<Object | void>{
        return await this.dataSource.getRepository(Transaction).createQueryBuilder('transactions')
        .where('EXTRACT (MONTH from transactions.date) = :month', {month:month}).getMany();
    }

    async approveTransactions(pendingTransactions: string[]): Promise<Object | void>{
        var data = []
        pendingTransactions.map(async(pendingTransaction)=>{
            const trans_details = await this.transactionRepository.findOne({
                where: {uuid: pendingTransaction},
                relations: ["receiver_wallet"],
              })
            if (trans_details.status == 0){
                data.push(pendingTransaction)
                await this.userWalletService.creditUserWallet(trans_details.amount, trans_details.receiver_wallet.wallet_id)
                await this.dataSource.getRepository(Transaction).createQueryBuilder('transactions')
                .update(Transaction)
                .set({ status: 1 })
                .where({ uuid: pendingTransaction })
                .execute();
            }
            
        })
        return data;
    }
}
