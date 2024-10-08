import { FormBuilder, FormGroup } from "@angular/forms";
import { RegisterPageForm } from "./register.page.form"

describe('RegisterPageForm', () => {

  let registerPageForm: RegisterPageForm;
  let form: FormGroup;

  beforeEach(() => {
    registerPageForm = new RegisterPageForm(new FormBuilder());
    form = registerPageForm.getForm();
  })

  it('should empty name be invalid', () => {
    expect(form.get('name')?.valid).toBeFalsy();
  })
  it('should empty email be invalid', () => {
    expect(form.get('email')?.valid).toBeFalsy();
  })
  it('should empty password be invalid', () => {
    expect(form.get('password')?.valid).toBeFalsy();
  })
  it('should empty repeatPassword be invalid', () => {
    expect(form.get('repeatPassword')?.valid).toBeFalsy();
  })
  it('should empty phone be invalid', () => {
    expect(form.get('phone')?.valid).toBeFalsy();
  })
  it('should empty address street be invalid', () => {
    expect(form.get('street')?.valid).toBeFalsy();
  })
  it('should empty address number be invalid', () => {
    expect(form.get('number')?.valid).toBeFalsy();
  })
  it('should empty address neighborhood be invalid', () => {
    expect(form.get('neighborhood')?.valid).toBeFalsy();
  })
  it('should empty address complement be invalid', () => {
    expect(form.get('complement')?.valid).toBeFalsy();
  })
  it('should empty address zipCode be invalid', () => {
    expect(form.get('zipCode')?.valid).toBeFalsy();
  })
  it('should empty address state be invalid', () => {
    expect(form.get('state')?.valid).toBeFalsy();
  })
  it('should empty address city be invalid', () => {
    expect(form.get('city')?.valid).toBeFalsy();
  })

  it('should invalid email be invalid', () => {
    form.get('email')?.setValue('invalidEmail');

    expect(form.get('email')?.valid).toBeFalsy();
  })

  it('should password less than 6 characters be invalid', () => {
    form.get('password')?.setValue('12345');

    expect(form.get('password')?.valid).toBeFalsy();
  })

  it('should password defferent from repeat password be invalid', () => {
    form.get('password')?.setValue('anyPassword');
    form.get('repeatPassword')?.setValue('anotherPassword');

    expect(form.get('repeatPassword')?.valid).toBeFalsy();
  })

  it('should form be valid', () => {
    form.get('name')?.setValue("anyName");
    form.get('email')?.setValue("any@email.com");
    form.get('password')?.setValue("anyPassword");
    form.get('repeatPassword')?.setValue("anyPassword");
    form.get('phone')?.setValue("anyPhone");
    form.get('street')?.setValue("any stree");
    form.get('number')?.setValue("any number");
    form.get('complement')?.setValue("any complement");
    form.get('neighborhood')?.setValue("any neighborhood");
    form.get('zipCode')?.setValue("any zip Code");
    form.get('city')?.setValue("any city");
    form.get('state')?.setValue("any state");

    expect(form.valid).toBeTruthy();
  })
})
