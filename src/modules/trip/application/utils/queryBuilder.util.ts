export class TripQueryBuilder {

    public buildTripsByQueryAggregation(
        limit: number = 10,
    ) {
        const aggregationQuery = [];

        aggregationQuery.push({$lookup: {
            from: 'location',
            localField: 'departureLocation',
            foreignField: '_id',
            as: 'departureLocation',
            pipeline : [{$project : { __v:0 }}]
        }});

        aggregationQuery.push({$lookup: {
            from: 'location',
            localField: 'arrivalLocation',
            foreignField: '_id',
            as: 'arrivalLocation',
            pipeline : [{$project : { __v:0 }}]
        }});

        aggregationQuery.push({$lookup: {
            from: 'location',
            localField: 'stops',
            foreignField: '_id',
            as: 'stops',
            pipeline : [{$project : { __v:0 }}]
        }});

        aggregationQuery.push({$unwind: '$departureLocation'});
        aggregationQuery.push({$unwind: '$arrivalLocation'});

        if (limit) { aggregationQuery.push({$limit: limit}); }

        return aggregationQuery;
    }
}