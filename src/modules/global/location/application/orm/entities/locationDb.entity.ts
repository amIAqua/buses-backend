import { Transform } from 'class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Schema as MongooseSchema } from 'mongoose';
import { IGeoPoint } from 'modules/global/location/domain/interfaces/partials/geoPoint.interface';

export type LocationDocument = HydratedDocument<LocationDbEntity>;

@Schema({ collection: 'location' })
export class LocationDbEntity {

    @Transform(({ value }) => value.toString())
    public _id: ObjectId;

    @Prop({ default: null, length: 120, type: String })
    cityName: string;

    @Prop({ default: null, length: 120, type: String })
    countryName: string;

    @Prop({ default: null, length: 255, type: String })
    fullName: string;

    @Prop({ default: null, length: 255, type: String })
    hubName: string;

    @Prop({ default: null, length: 120, type: String })
    hubAddress: string;

    @Prop({ type: MongooseSchema.Types.Mixed })
    geoPoint: IGeoPoint;

    @Prop({ type: MongooseSchema.Types.Mixed })
    hubGeoPoint: IGeoPoint;
}

export const LocationDbSchema = SchemaFactory.createForClass(LocationDbEntity);