import {Entity, Column, PrimaryGeneratedColumn,OneToOne,JoinColumn} from "typeorm"
import { User } from "./User";


@Entity()
export class Token {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    token: string;
    @Column()
    userid: number;

    
    

}