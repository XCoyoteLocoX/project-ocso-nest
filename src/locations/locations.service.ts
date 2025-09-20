import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import {Repository} from 'typeorm'
import {Location} from './entities/location.entity'

@Injectable()
export class LocationsService {
    constructor(
      private locationRepository: Repository <Location>
    ){}
    create(CreateLocationDto: CreateLocationDto){
      return this.locationRepository.save(CreateLocationDto)
    }


  findAll() {
    return this.locationRepository.find()
  }

  findOne(id: number) {
    const location = this.locationRepository.findOneBy({
      locationId:id,
    })
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
      const locationToUpdate = await this.locationRepository.preload({
          locationId: id,
          ... updateLocationDto
        })
            if (!locationToUpdate) throw new NotFoundException()
              this.locationRepository.save(locationToUpdate)
            return locationToUpdate;
  }

  remove(id: number) {
    return this.locationRepository.delete({
      locationId: id
    })
  }
}
