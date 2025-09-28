import {Column, Entity, PrimaryGeneratedColumn,OneToOne, JoinColumn, ManyToOne, OneToMany} from "typeorm"
import {Manager} from "src/managers/entities/manager.entity"
import {Region} from "src/regions/entities/region.entity"
import {Employee} from "src/employees/entities/employee.entity"
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId: number;

    @ApiProperty({
        default: "OCSO juriquilla"
    })
    @Column('text')
    locationName: string

    @ApiProperty({
        default: "Avenida tal, s/n, 76115"
    })
    @Column('text')
    locationAddress: string

    @ApiProperty({
        default: [12, 12]
    })
    @Column('simple-array')
    locationLatLng: number[];

    @OneToOne(()=>Manager, {
        eager: true, 
    })
    @JoinColumn({
        name: "managerId"
    })
    manager: Manager

    @ManyToOne(() => Region, (region)=> region.locations)
    @JoinColumn({
        name: "regionId"
    })
        region: Region

    @OneToMany(()=> Employee, (employee) => employee.location)
    employees: Employee[];
}
