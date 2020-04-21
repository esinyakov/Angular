import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditePageComponent } from './edite-page/edite-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './shared/services/auth.guard';
import { SerachPipe } from './shared/search.pipe';
import { AlertComponent } from './shared/components/alert/alert.component';
import { AlertService } from './shared/services/alert.service';


@NgModule({
    declarations: [
        AdminLayoutComponent, 
        DashboardPageComponent, 
        CreatePageComponent, 
        EditePageComponent,
        LoginPageComponent,
        SerachPipe,
        AlertComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '', component: AdminLayoutComponent, children: [
                    {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
                    {path: 'login', component: LoginPageComponent},
                    {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
                    {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
                    {path: 'post/:id/edit', component: EditePageComponent, canActivate: [AuthGuard]}

                ]
            }
        ])
        
    ],
    exports: [RouterModule],
    providers: [AuthGuard, AlertService]
})

export class AdminModule {

}