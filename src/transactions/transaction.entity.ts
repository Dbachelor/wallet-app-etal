import { Currency } from "src/currency/entities/currency.entity";
import { UserWallet } from "src/users/user_wallet.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserWallet, (userWallet) => userWallet.id)
    @JoinColumn()
    sender_wallet: UserWallet;

    @ManyToOne(() => UserWallet, (userWallet) => userWallet.id)
    @JoinColumn()
    receiver_wallet: UserWallet;

    @Column()
    amount: string;

    @Column({default: 1})
    status: number;

    @ManyToOne(() => Currency, (currency) => currency.id)
    currency: Currency;

    @Column( {type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'})
    date:string;

    @Column({ unique:true})
    uuid: string;
}

