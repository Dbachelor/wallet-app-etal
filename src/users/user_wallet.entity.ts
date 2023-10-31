import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Currency } from "src/currency/entities/currency.entity";

@Entity()
export class UserWallet{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    user: User

    @Column()
    balance: number;

    @ManyToOne(() => Currency, (currency) => currency.id)
    currency: Currency;

    @Column()
    wallet_id: string
}