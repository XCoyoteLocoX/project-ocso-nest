import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Manager } from 'src/managers/entities/manager.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    const newLocation = this.locationRepository.create(createLocationDto);
    return await this.locationRepository.save(newLocation);
  }

  async findAll() {
    return await this.locationRepository.find({
      relations: ['manager'],
    });
  }

  async findOne(id: number) {
    const location = await this.locationRepository.findOne({
      where: { locationId: id },
      relations: ['manager'],
    });
    if (!location) throw new NotFoundException('No location found');
    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const locationToUpdate = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto,
    });

    if (!locationToUpdate) throw new NotFoundException('Location not found');

    const savedLocation = await this.locationRepository.save(locationToUpdate);

    if (updateLocationDto.manager) {
      const manager = await this.managerRepository.findOneBy({
        managerId: updateLocationDto.manager,
      });
      if (manager) {
        manager.location = savedLocation;
        await this.managerRepository.save(manager);
      }
    }

    return savedLocation;
  }

  async remove(id: number) {
    const result = await this.locationRepository.delete({ locationId: id });
    if (result.affected === 0) {
      throw new NotFoundException('Location not found');
    }
    return { message: 'Location deleted successfully' };
  }
}
