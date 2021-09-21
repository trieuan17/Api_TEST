import {Entity, Column, PrimaryGeneratedColumn,OneToMany,ManyToOne} from "typeorm"


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;
    
    @Column()
    fullname: string;

    @Column()
    password: string;
    



    

}