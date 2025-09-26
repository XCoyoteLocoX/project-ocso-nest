import {Column, Entity, PrimaryGeneratedColumn,OneToOne, JoinColumn, ManyToOne, OneToMany} from "typeorm"
import {Manager} from "src/managers/entities/manager.entity"
import {Region} from "src/regions/entities/region.entity"
import {Employee} from "src/employees/entities/employee.entity"

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId: number;
    @Column('text')
    locationName: string
    @Column('text')
    locationAdress: string
    @Column('simple-array')
    locationLatLng: number[];

    @OneToOne(()=>Manager)
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
