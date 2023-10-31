import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Currency {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({name : "currency"})
    currency: string;
}
