export const TimeZoneMapping = [
    { identifier: 'Africa/Abidjan', offset: '+00:00' },
    { identifier: 'Africa/Algiers', offset: '+01:00' },
    { identifier: '	Africa/Blantyre', offset: '+02:00' },
    { identifier: '	Africa/Asmera', offset: '+03:00' },
    { identifier: 'Asia/Baku', offset: '+04:00' },
    { identifier: 'Asia/Dushanbe', offset: '+05:00' },
    { identifier: 'Asia/Colombo', offset: '+05:30' },
    { identifier: 'Asia/Bishkek', offset: '+06:00' },
    { identifier: 'Asia/Ho_Chi_Minh', offset: '+07:00' },
    { identifier: 'Asia/Singapore', offset: '+08:00' },
    { identifier: 'Asia/Tokyo', offset: '+09:00' },
    { identifier: 'Asia/Seoul', offset: '+09:00' },
    { identifier: 'Antarctica/Macquarie', offset: '+10:00' },
    { identifier: 'Asia/Magadan', offset: '+11:00' },
];

export const VIET_NAME_TIME_ZONE = '+07:00';

export function getTimeModifier(offset: string) {
    const mapping = TimeZoneMapping.find((zone) => zone.offset === offset);
    return mapping ? mapping.identifier : 'Asia/Ho_Chi_Minh';
}
