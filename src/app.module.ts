import { Module } from '@nestjs/common';
import { FrameworkModule } from '@stoodstill/domain-service-framework';
import { ExamplesModule } from './example/examples.module';
import { join } from 'path';

@Module({
  imports: [ExamplesModule,FrameworkModule.register(
    {
      configPath: join(process.cwd(),
        "assets",
        "config"),
      zone: process.env.ZONE
    })
],
})
export class AppModule {}

