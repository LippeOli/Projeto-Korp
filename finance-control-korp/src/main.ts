import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withFetch, } from '@angular/common/http'; // Importa HttpClient com fetch

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()) // Adiciona HttpClient com suporte a fetch API
  ],
}).catch((err) => console.error(err));
