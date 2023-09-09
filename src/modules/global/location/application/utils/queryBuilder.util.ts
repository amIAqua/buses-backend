export class LocationQueryBuilder {

    public buildAggregationQuery(
        dbIndex: string,
        query: string,
        aggregationType: 'autocomplete' = 'autocomplete',
        aggregationFields: string[],
        isCompound: boolean,
        limit: number = 10,
    ) {
        const aggregationQuery = [];

        aggregationQuery.push({$search: {
            index: dbIndex ?? dbIndex,
        }});

        if (isCompound) {
            aggregationQuery[0].$search.compound = {};
            aggregationQuery[0].$search.compound.should = [];

            aggregationFields.forEach((aggregationField) => {
                aggregationQuery[0].$search.compound.should.push({
                    [aggregationType]: {query, path: aggregationField}
                });
            })
        }

        if (limit) { aggregationQuery.push({$limit: limit}); }

        return aggregationQuery;
    }
}