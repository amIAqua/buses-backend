import { HydratedDocument, ObjectId, Schema as MongooseSchema  } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ETripStatus } from 'modules/trip/domain/enums/eTripStatus.enum';
import { LocationDbEntity } from 'modules/global/location/application/orm/entities/locationDb.entity';
import { IBenefit } from 'modules/trip/domain/interfaces/partials/benefit.interface';
import { ETripType } from 'modules/trip/domain/enums/eTripType.enum';
import { ECurrency } from 'modules/trip/domain/enums/eCurrency.enum';
import { Transform } from 'class-transformer';

export type TripDocument = HydratedDocument<TripDbEntity>;

@Schema({ collection: 'trip' })
export class TripDbEntity {

    @Transform(({ value }) => value.toString())
    public _id: ObjectId;

    @Prop({ type: String, length: 40 })
    public status: ETripStatus;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: LocationDbEntity.name })
    public departureLocation: LocationDbEntity;

    @Prop({ type: Date })
    public departureDateTime: Date;

    @Prop({ type: Number, default: null })
    public departurePlatform?: number;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: LocationDbEntity.name })
    public arrivalLocation: LocationDbEntity;

    @Prop({ type: Date })
    public arrivalDateTime: Date;

    @Prop({ type: Number, default: null })
    public arrivalPlatform?: number;

    @Prop({ type: Date })
    public plannedArrivalDateTime: Date;

    @Prop({ type: Number })
    public duration: number;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: LocationDbEntity.name }] })
    public stops: LocationDbEntity[];

    @Prop({ type: Array, default: [] })
    public benefits: IBenefit[];

    @Prop({ type: Number })
    public regularPrice: number;

    @Prop({ type: String })
    public currency: ECurrency;

    @Prop({ type: String, length: 40 })
    public type: ETripType;

    @Prop({ type: Boolean, default: false })
    public isSoldOut?: boolean;

    @Prop({ type: Number })
    public maxSeats: number;

    @Prop({ type: Number })
    public seatsAvailable: number;
}

export const TripDbSchema = SchemaFactory.createForClass(TripDbEntity);