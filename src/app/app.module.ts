import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './core/layout/app.layout.module';
import { AuthInterceptor } from './shared/interceptor/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';




@NgModule({
    declarations: [
        AppComponent,
      
      
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
    
        
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy }, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
