import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Location {
    locationId: number;
    @Column('text')
    locationName: string
    @Column('text')
    locationAdress: string
    @Column('array')
    locationLatLng: number[]
}
