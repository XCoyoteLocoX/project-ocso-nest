import { JoinColumn, Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from "typeorm";
import { Location } from "src/locations/entities/location.entity";
import { User } from "src/auth/entities/user.entity";
@Entity()
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    employeeId: string
    @Column('text')
    employeeName: string
    @Column('text')
    employeeLastName: string
    @Column('text')
    employeePhoneNumber: string;
    @Column('text',{
        unique: true,
    })
    employeeEmail: string
    @Column({
        type: 'text',
        nullable: true
    })
    employeePhoto: string;

    @ManyToOne(()=> Location, (location) => location.employees)
    @JoinColumn({
        name: "locationId"
        })
    location:Location;

     @OneToOne(() => User, user => user.employee) // <-- sin JoinColumn aquí
        user: User;
    
}
