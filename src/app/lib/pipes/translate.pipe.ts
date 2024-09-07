import { Pipe, PipeTransform } from '@angular/core';
import { Res } from '../../utils/resources';

@Pipe({ name: 'translate', standalone: true})
export class TranslatePipe implements PipeTransform {

    transform(original: string, res: string, count: number | null= null, select: string | null = null): string {

        if (count !== null) {
            return Res.Plural(res, count, original);
        }
        if (select !== null) {
            return Res.Select(res, select, original);
        }

        return Res.Get(res, original);

    }
}

