import { Employee } from "src/employees/entities/employee.entity";
import { Manager } from "src/managers/entities/manager.entity";
import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    userId: string

    @Column('text', {
        unique: true,
    })
    userEmail: string

    @Column('text')
    userPassword: string

@Column("text", { array: true })
userRoles: string[];

  @OneToOne(() => Manager, manager => manager.user)
  manager: Manager;

  @OneToOne(() => Employee, employee => employee.user)
  employee: Employee;

}