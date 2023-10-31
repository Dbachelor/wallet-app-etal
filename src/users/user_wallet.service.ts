import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserWallet } from "./user_wallet.entity";
import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { Currency } from "src/currency/entities/currency.entity";

@Injectable()
export class UserWalletService{
    constructor(@InjectRepository(UserWallet) private userWalletRepository: Repository<UserWallet>, 
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Currency) private currencyRepository: Repository<Currency>,
     private dataSource:DataSource){}

    async createWallet(userID, currencyID): Promise<Object>{
        //check if a wallet for a currency already exists for this user
        const wallet = await this.userWalletRepository.createQueryBuilder('user_wallet')
        .where('user_wallet.userId = :userid', { userid: userID })
        .andWhere('user_wallet.currencyId = :curid', { curid: currencyID })
        .getOne();
        console.log('the', wallet, 'is here');
        if (wallet){
            return {wallet_id: false};
        }
        //create a new wallet
        const wallet_id = Math.round(+new Date()/10).toString().match(/.{1,4}/g).join('-')
        const create = await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(UserWallet)
        .values({
            balance: 0.00,
            user: await this.dataSource.getRepository(User).findOneById(userID),
            currency: await this.currencyRepository.findOneBy({id:currencyID}),
            wallet_id : wallet_id
          }).execute();
        return {wallet_id: wallet_id};
    }

    async listUserWallets(userID){
        return await this.userWalletRepository.findBy({user: userID})
    }

    async creditUserWallet(amount, wallet_id){
        const walletRepository = this.dataSource.getRepository(UserWallet)
        const wallet = await walletRepository.findOneBy({
            wallet_id: wallet_id,
        })
        wallet.balance = wallet.balance + amount;
        await walletRepository.save(wallet)
        return {success: true, wallet: wallet}
    }
}