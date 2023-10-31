import { Currency } from "src/currency/entities/currency.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    from_user_id: number;

    @Column()
    to_user_id: number;

    @Column()
    amount: string;

    @Column({default: 1})
    status: number;

    @ManyToOne(() => Currency, (currency) => currency.id)
    currency: Currency;

    @Column( {type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'})
    date:string;
}

