import * as exceljs from 'exceljs';

export const applyCellStyling = (cell: exceljs.Cell, color: string) => {
    cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
    };

    cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
    };

    cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
};

export const cellStyling = (color: string) => {
    return {
        fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: color },
        },
        border: {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        },

        alignment: { horizontal: 'left', vertical: 'middle', wrapText: true },
    } as any;
};
