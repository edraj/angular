import { Pipe, PipeTransform } from '@angular/core';
import { Res } from '../../utils/resources';

@Pipe({ name: 'dayname', standalone: true })
export class DayNamePipe implements PipeTransform {


    transform(day: number): string {
        // return string?
        return Res.Get('Days')[day];

    }
}

