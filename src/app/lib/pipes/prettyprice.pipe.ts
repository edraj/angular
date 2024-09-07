import { Pipe, PipeTransform } from '@angular/core';

import { toPrettyPrice } from '../../utils/common';

// currency pipe in angualar 2 is useless here, because i have the codes and will need to use them always?
@Pipe({ name: 'prettyprice', standalone: true })
export class PrettyPricePipe implements PipeTransform {
    transform(price: number, currencyCode: string = ''): string {
        // return pretty price with currency, or without it
        const _code =  currencyCode ? `${currencyCode} ` : '';
        return  `${_code}${toPrettyPrice(price.toString())}`;

    }
}
