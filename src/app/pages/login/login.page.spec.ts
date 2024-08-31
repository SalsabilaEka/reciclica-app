import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { waitForAsync } from '@angular/core/testing';
import { IonicModule, ToastController } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { loginReducer } from 'src/store/login/login.reducers';
import { AppState } from 'src/store/AppState';
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable, of, throwError } from 'rxjs';
import { User } from 'src/app/model/user/User';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';


describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page: { querySelector: (arg0: string) => { (): any; new(): any; click: { (): void; new(): any; }; }; };
  let store: Store<AppState>;
  let toastController: ToastController;
  let authServices: AuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature("loading", loadingReducer),
        StoreModule.forFeature("login", loginReducer),
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    toastController = TestBed.get(ToastController);
    authServices = TestBed.get(AuthService);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  }));

  it('should create form on init', () => {
    component.ngOnInit();

    expect(component.form).not.toBeUndefined();
  })

  it('should go to register page on register', () => {
    spyOn(router, 'navigate');

    component.register();

    expect(router.navigate).toHaveBeenCalledWith(['register']);
  })

  it('should recover email/password on forgot email/password', () => {
    spyOn(authServices, 'recoverEmailPassword').and.returnValue(new Observable(() => {}));

    fixture.detectChanges();
    component.form.get('email')?.setValue("valid@email.com");
    page.querySelector("#recoverPasswordButton").click();
    store.select('login').subscribe(loginState => {
      expect(loginState.isRecoveringPassword).toBeTruthy();
    })
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    })
  })

  it('should hide loading and show success message when has recovered password', () => {
    spyOn(toastController, 'create');

    fixture.detectChanges();
    store.dispatch(recoverPassword());
    store.dispatch(recoverPasswordSuccess());
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

  it('should hide loading and show error message when error on recover password', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

    fixture.detectChanges();
    store.dispatch(recoverPassword());
    store.dispatch(recoverPasswordFail({error: "message"}));
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

  it('should show loading and start login where logging in', () => {
    spyOn(authServices, 'login').and.returnValue(new Observable(() => {}));

    fixture.detectChanges();
    component.form.get('email')?.setValue('valid@email.com');
    component.form.get('password')?.setValue('anyPassword');
    page.querySelector('#loginButton').click();
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    })
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggingIn).toBeTruthy();
    })
  })

  it('should hide loading and send user to home page when user has logged in', () => {
    spyOn(router, 'navigate');
    spyOn(authServices, 'login').and.returnValue(of(new User()));

    fixture.detectChanges();
    component.form.get('email')?.setValue('valid@email.com');
    component.form.get('password')?.setValue('anyPassword');
    page.querySelector('#loginButton').click();
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggedIn).toBeTruthy();
    })
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  })

  it('should hide loading and show error when user cloundt login', () => {
    spyOn(authServices, 'login').and.returnValue(throwError({message: 'error'}));
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

    fixture.detectChanges();
    component.form.get('email')?.setValue('error@email.com');
    component.form.get('password')?.setValue('anyPassword');
    page.querySelector('#loginButton').click();
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  })
});
