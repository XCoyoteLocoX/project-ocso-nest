import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import {Repository} from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm';
import {Manager} from './entities/manager.entity'

@Injectable()
export class ManagersService {
  constructor(
        @InjectRepository(Manager)
        private managerRepository: Repository <Manager>
      ){}
  create(createManagerDto: CreateManagerDto) {
    return this.managerRepository.save(createManagerDto)
  }

  findAll() {
    return this.managerRepository.find({
      relations: {
        location: true,
      }
    })
  }

async findOne(id: string) {
  const manager = await this.managerRepository.findOne({
    where: { managerId: id },
    relations: {
      location: true,
    },
  });

  if (!manager) {
    throw new NotFoundException('Manager not found');
  }

  return manager;
}


  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const managerToUpdate = await this.managerRepository.preload({
          managerId: id,
          ... updateManagerDto
        })
            if (!managerToUpdate) throw new NotFoundException()
              this.managerRepository.save(managerToUpdate)
            return managerToUpdate;
  }

  remove(id: string) {
        return this.managerRepository.delete({
      managerId: id
    })
  }
}
