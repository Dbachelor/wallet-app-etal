import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TransactionsService {

    constructor(@InjectRepository(Transaction) private transactionRepo:Repository<Transaction>, private dataSource:DataSource){}

    async walletTransfer(){
        //check if wallet has up to the amount
        //
    }
}
