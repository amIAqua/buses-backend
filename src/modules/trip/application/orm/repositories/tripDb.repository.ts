import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IDeletedTripResult } from 'modules/trip/domain/interfaces/partials/deletedTripResult.interface';
import { ITripsQueryFilter } from 'modules/trip/domain/interfaces/partials/queryFilter.interface';
import { ITripRepository } from 'modules/trip/domain/repository/tripRepository.interface';
import { TripQueryBuilder } from 'modules/trip/application/utils/queryBuilder.util';
import { TripDbEntity } from 'modules/trip/application/orm/entities/tripDb.entity';
import { TripMapper } from 'modules/trip/application/mappers/trip.mapper';
import { TripEntity } from 'modules/trip/domain/entities/trip.entity';
import { ITrip } from 'modules/trip/domain/interfaces/trip.interface';

@Injectable()
export class TripDbRepository implements ITripRepository {

    public constructor(
        private readonly tripMapper: TripMapper,
        private readonly tripQueryBuilder: TripQueryBuilder,
        @InjectModel(TripDbEntity.name) private tripDbRepositoryModel: Model<TripDbEntity>
    ) {}

    public async findTripsByQuery(queryFilter: ITripsQueryFilter): Promise<TripEntity[]> {
        const aggregationQuery = this.tripQueryBuilder.buildTripsByQueryAggregation(queryFilter.limit);

        const aggregationResult = await this.tripDbRepositoryModel.aggregate(aggregationQuery);
        return aggregationResult.map((tripDbEntity) => {
            return this.tripMapper.mapTripDbEntityToDomainEntity(tripDbEntity);
        });
    }

    public async addTrip(addTrip: ITrip): Promise<TripEntity> {
        const createdTrip = new this.tripDbRepositoryModel({
            ...addTrip,
            stops: addTrip.stopIds && addTrip.stopIds.map((stopId) => new ObjectId(stopId)),
            departureLocation: {
                _id: new ObjectId(addTrip.departureLocationId)
            },
            arrivalLocation: {
                _id: new ObjectId(addTrip.arrivalLocationId)
            }
        });

        await createdTrip.save();
        return this.tripMapper.mapTripDbEntityToDomainEntity(
            await this.tripDbRepositoryModel
                .findById(createdTrip._id)
                .populate('departureLocation', '-__v', 'LocationDbEntity')
                .populate('arrivalLocation', '-__v', 'LocationDbEntity')
                .populate('stops', '-__v', 'LocationDbEntity')
                .lean()
                .exec()
        );
    }

    public async updateTrip(id: string, tripToUpdate: ITrip): Promise<any> {
        await this.tripDbRepositoryModel.updateOne({
            _id: id,
            ...tripToUpdate,
            stops: tripToUpdate.stopIds && tripToUpdate.stopIds.map((stopId) => new ObjectId(stopId)),
            departureLocation: {
                _id: new ObjectId(tripToUpdate.departureLocationId)
            },
            arrivalLocation: {
                _id: new ObjectId(tripToUpdate.arrivalLocationId)
            }
        });

        return this.tripMapper.mapTripDbEntityToDomainEntity(
            await this.tripDbRepositoryModel
                .findById(id)
                .populate('departureLocation', '-__v', 'LocationDbEntity')
                .populate('arrivalLocation', '-__v', 'LocationDbEntity')
                .populate('stops', '-__v', 'LocationDbEntity')
                .lean()
                .exec()
        );
    }

    public async deleteTrip(id: string): Promise<IDeletedTripResult> {
        const deletedResult = await this.tripDbRepositoryModel.deleteOne({ _id: id });

        if (!deletedResult.acknowledged || deletedResult.deletedCount === 0) {
            return { deletedTripId: id, status: 'ERROR' };
        }

        return { deletedTripId: id, status: 'OK'};
    }
 }