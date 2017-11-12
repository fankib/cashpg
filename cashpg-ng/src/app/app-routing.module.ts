import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentitiesComponent } from './identities/identities.component';
import { IdentityDetailComponent } from './identity-detail/identity-detail.component'
import { AddIdentityComponent } from './add-identity/add-identity.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path: '', component: IdentitiesComponent },
  { path: 'identities', component: IdentitiesComponent },
  { path: 'addIdentity', component: AddIdentityComponent},
  { path: 'identity/:id', component: IdentityDetailComponent},
  { path: 'identity/:id/addContact', component: AddContactComponent },
  { path: 'identity/:id/contact/:cid', component: ContactDetailComponent},
  { path: 'identity/:id/contact/:cid/sendPayment', component: PaymentComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
