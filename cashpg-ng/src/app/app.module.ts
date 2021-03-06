import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CurrencyPipe } from './currency.pipe';

import { AppComponent } from './app.component';
import { AddIdentityComponent } from './add-identity/add-identity.component';
import { IdentityDetailComponent } from './identity-detail/identity-detail.component';
import { IdentitiesComponent } from './identities/identities.component';
import { AppRoutingModule } from './/app-routing.module';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { IdentityService } from './identity.service';
import { OpenpgpService } from './openpgp.service';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ContactService } from './contact.service';
import { PaymentComponent } from './payment/payment.component';
import { HkpService } from './hkp.service';
import { CashpgClientService } from './cashpg-client.service';
import { PaymentService } from './payment.service';
import { FingerprintComponent } from './fingerprint/fingerprint.component';
import { PgparmoredComponent } from './pgparmored/pgparmored.component';
import { PaymentValidationService } from './payment-validation.service';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';
import { ExternalLockiDashboardComponent } from './external-locki-dashboard/external-locki-dashboard.component';
import { LockiClientService } from './locki-client.service';

@NgModule({
  declarations: [
    CurrencyPipe,
    AppComponent,
    AddIdentityComponent,
    IdentityDetailComponent,
    IdentitiesComponent,
    ContactDetailComponent,
    BackButtonComponent,
    AddContactComponent,
    PaymentComponent,
    FingerprintComponent,
    PgparmoredComponent,
    MessagesComponent,
    ExternalLockiDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    IdentityService,
    OpenpgpService,
    ContactService,
    HkpService,
    CashpgClientService,
    PaymentService,
    PaymentValidationService,
    MessageService,
    LockiClientService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
