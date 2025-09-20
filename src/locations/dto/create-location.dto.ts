

import { IsString, MaxLength, IsArray, ArrayNotEmpty } from "class-validator"
import { Location } from "../entities/location.entity"

export class CreateLocationDto {
    @IsString()
    @MaxLength(35)
    locationName: string
    @IsString()
    @MaxLength(120)
    locationAdress: string
    @IsArray()
    @ArrayNotEmpty()
    locationLatLng: number[]
}
