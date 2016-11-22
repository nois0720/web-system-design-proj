/**
 * Created by Nois on 2016. 11. 22..
 */
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
