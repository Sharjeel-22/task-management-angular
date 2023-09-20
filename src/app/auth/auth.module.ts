import { CommonModule } from "@angular/common";
import {NgModule} from "@angular/core"
import { AuthRoutingModule } from "./auth-routing.module";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { LoginComponent } from "./login/login.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [SignUpComponent, LoginComponent],
    imports: [CommonModule, AuthRoutingModule, SharedModule],
    providers: []
})

export class AuthModule {
    
}