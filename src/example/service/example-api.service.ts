import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as https from 'https';
import { CustomAxiosService } from '@stoodstill/domain-service-framework';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class ExampleApiService {
    constructor(
        private configService: ConfigService,
        private readonly axiosService: CustomAxiosService,

    ) { }
    async postExample(data,header): Promise<any> {
        const aixosConfig: AxiosRequestConfig = {
            method: this.configService.get<string>('api-services.examples.list-example.method'),
            url: this.configService.get<string>('api-services.examples.list-example.url'),
            timeout: this.configService.get<number>('api-services.examples.list-example.timeout'),
            headers: header,
            data: data,
            httpsAgent: new https.Agent({
                rejectUnauthorized: this.configService.get<boolean>('api-services.examples.list-example.reject-unauthorized')
            })
        }
        return await this.axiosService.request(aixosConfig, 'postExample')
    }

    async getExample(): Promise<any> {
        const aixosConfig: AxiosRequestConfig = {
            method: this.configService.get<string>('api-services.examples.list-example.method'),
            url: this.configService.get<string>('api-services.examples.list-example.url'),
            timeout: this.configService.get<number>('api-services.examples.list-example.timeout'),
            httpsAgent: new https.Agent({
                rejectUnauthorized: this.configService.get<boolean>('api-services.examples.list-example.reject-unauthorized')
            })
        }
        return await this.axiosService.request(aixosConfig, 'getExample')
    }

    

}
