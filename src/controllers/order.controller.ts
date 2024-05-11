import { Request, RestBindings, post, requestBody } from '@loopback/rest';
import { inject } from '@loopback/context';
import { getApiError, getApiPayload, getApiRespDesc, getUploadedFiles, throwApiError } from '../utils';

import { AppRespCodes } from '../constants';

import { Order } from '../models';
import { orderService } from '../services';

export class OrderController {
    constructor(
        @inject(RestBindings.Http.REQUEST)
        private req: Request,
    ) {}

    @post(
        '/order/import',
        getApiRespDesc('Import Order response', {
            model: Order,
            pagination: true,
        }),
    )
    async import(
        @requestBody({
            description: 'multipart/form-data value.',
            required: true,
            content: {
                'multipart/form-data': {
                    'x-parser': 'stream',
                    schema: { type: 'object' },
                },
            },
        })
        request: Request,
    ) {
        try {
            const files = await getUploadedFiles(request);

            const desiredFileName = 'orders';
            let deliveryProvider: string = 'deliveryProvider';
            let countryCode: string = 'countryCode';
            let agentOrgId: string = 'agentOrgId';
            let sellerOrgId: string = 'sellerOrgId';

            deliveryProvider = (files.value.fields || [])[deliveryProvider];
            countryCode = (files.value.fields || [])[countryCode];
            agentOrgId = (files.value.fields || [])[agentOrgId];
            sellerOrgId = (files.value.fields || [])[sellerOrgId];

            const desiredFile = (files.value.files || []).find((el: any) => el.fieldname === desiredFileName);
            if (!desiredFile) {
                throw throwApiError(AppRespCodes.INVALID_PARAM, 'Cannot find file!');
            }
            const result = await orderService.handleImportFile(
                desiredFile,
                this.req.users,
                deliveryProvider,
                agentOrgId,
                sellerOrgId,
            );
            return getApiPayload(result);
        } catch (error) {
            return getApiError(error, this.req);
        }
    }
}
