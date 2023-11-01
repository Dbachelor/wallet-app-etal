import { IsNumber, IsString } from "class-validator";

export class TransactionDto{
    @IsString()
    sender_wallet: string

    @IsString()
    receiver_wallet: string

    @IsNumber()
    amount: number
}