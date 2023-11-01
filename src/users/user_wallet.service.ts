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
        //checks if a wallet for a currency already exists for this user
        const wallet = await this.userWalletRepository.createQueryBuilder('user_wallet')
        .where('user_wallet.userId = :userid', { userid: userID })
        .andWhere('user_wallet.currencyId = :curid', { curid: currencyID })
        .getOne();

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

    async listWallets(user){
        console.log(user)
        if(user.role == 1){
            return await this.userWalletRepository.findBy({user: await this.dataSource.getRepository
                (User).findOneBy({id:user.sub})})
        }
        return await this.userWalletRepository.find()
    }

    async getWalletDetails(wallet_id){
        const walletDetails = await this.userWalletRepository.findOne({
            where: {wallet_id: wallet_id},
            relations: ["user"],
          });
          return {details: walletDetails}
    }

    async creditUserWallet(amount, wallet_id){
        const walletRepository = this.dataSource.getRepository(UserWallet)
        const wallet = await walletRepository.findOneBy({
            wallet_id: wallet_id,
        })
        wallet.balance = wallet.balance + parseInt(amount);
        await walletRepository.save(wallet)
        return {success: true, wallet: wallet}
    }

    async debitUserWallet(amount, wallet_id){
        const walletRepository = this.dataSource.getRepository(UserWallet)
        const wallet = await walletRepository.findOneBy({
            wallet_id: wallet_id,
        })
        wallet.balance = wallet.balance - amount;
        await walletRepository.save(wallet)
        return true;
    }
}