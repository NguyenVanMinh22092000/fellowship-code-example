import { TYPE_LOG } from '../enums';
import {
    mgRoleLogEntity,
    mgUserLogEntity,
    mgAgentLogEntity,
    mgConfigLogEntity,
    mgSellerLogEntity,
    mgCountryLogEntity,
    mgLocalShipmentLogEntity,
    mgTransportCodeLogEntity,
    mgCurrencyExchangeLogEntity,
    mgDeliveryNumberEntity,
    mgOrderLogEntity,
} from '../models/mongo';

export class LogRepos {
    static log(data: any, action: string, colection: string) {
        try {
            let logEntry: any = { refId: data._id, action: action, data: data };
            switch (colection) {
                case TYPE_LOG.ROLE:
                    mgRoleLogEntity.create(logEntry);
                    break;
                case TYPE_LOG.ORDER:
                    mgOrderLogEntity.create(logEntry);
                    break;
                case TYPE_LOG.USER:
                    mgUserLogEntity.create(logEntry);
                    break;
                case TYPE_LOG.AGENT:
                    mgAgentLogEntity.create(logEntry);
                    break;
                case TYPE_LOG.SELLER:
                    mgSellerLogEntity.create(logEntry);
                    break;
                case TYPE_LOG.CONFIG:
                    mgConfigLogEntity.create(logEntry);
                    break;
                case TYPE_LOG.COUNTRY:
                    mgCountryLogEntity.create(logEntry);
                    break;
                case TYPE_LOG.CURRENCY_EXCHANGE:
                    mgCurrencyExchangeLogEntity.create(logEntry);
                    break;
                case TYPE_LOG.DELIVERY_NUMBER:
                    mgDeliveryNumberEntity.create(logEntry);
                    break;
                case TYPE_LOG.TRANSPORT_CODE:
                    mgTransportCodeLogEntity.create(logEntry);
                    break;
                case TYPE_LOG.LOCAL_SHIPMENT:
                    mgLocalShipmentLogEntity.create(logEntry);
                    break;
                default:
                    console.log('miss documents log!!!');
                    break;
            }
        } catch (error) {
            console.error('Error write documents log:', error);
        }
    }
}
