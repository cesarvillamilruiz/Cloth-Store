import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';

export const currentEnvironment = env;

@Injectable({
  providedIn: 'root',
})
export class Configuration {
    emptyGuid = '00000000-0000-0000-0000-000000000000'
}