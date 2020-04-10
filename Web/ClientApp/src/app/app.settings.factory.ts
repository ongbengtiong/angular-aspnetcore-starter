import { AppSettings } from './app.settings';
import { environment } from '../environments/environment';
import { AppSettingsProduction } from './app.settings.prod';

// #region Provider
export function appSettingsFactory () {
    return (): AppSettings => {
        return environment.production ? new AppSettingsProduction() : new AppSettings();
    };
}
