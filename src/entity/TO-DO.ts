import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import {User} from "./User";

@Entity()
export class TODO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Name: string;

    @Column()
    Description: string;

    @Column()
    DateCompletion: Date;

    @Column()
    DateCreation: Date;

    @Column()
    Datemodification: Date;

    @Column()
    status: number;
    @Column()
    UserId: number;

    

}