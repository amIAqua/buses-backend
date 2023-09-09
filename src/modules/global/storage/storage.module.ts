import { Module } from '@nestjs/common';
import { MongoDbModule } from 'modules/global/storage/modules/mongoDb.provider';

@Module({
    imports: [MongoDbModule],
    exports: [MongoDbModule]
})
export class StorageModule {}