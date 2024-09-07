import { Pipe, PipeTransform } from '@angular/core';
import { Res } from '../../utils/resources';
import { toSentenceCase } from '../../utils/common';

@Pipe({ name: 'res', standalone: true })
export class ResPipe implements PipeTransform {


    transform(res: string, plural: boolean = false, count: number = 1, tocase: string = 'normal'): string {
        let value = Res.Get(res, '');

        // format: normal or sentence case only
        if (plural) {
            value = Res.Plural(res, count);
        }
        return tocase === 'sentence' ? toSentenceCase(value) : value;

    }
}

