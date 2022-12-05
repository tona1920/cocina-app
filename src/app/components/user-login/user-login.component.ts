import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/models/users';
import { StorageService } from 'src/app/service/storage.service';
import { UsuariosService } from 'src/app/service/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  myScriptElement: HTMLScriptElement;
  form: FormGroup ;
  formR: FormGroup;
  usuario: Users;

  constructor(private formBuilder: FormBuilder, private serviceUser: UsuariosService, private storageService:StorageService){
  }
  ngOnInit(): void {
    if(this.storageService.existsUser()){
      this.storageService.clear();
    }
    this.buildForm();
    this.buildFormR();
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "../../../assets/js/login.js";
    document.body.appendChild(this.myScriptElement);

  }


  private buildForm(): any {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
        });
  }

  private buildFormR(): any {
    this.formR = this.formBuilder.group({
      user: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(20)]],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        });
  }
 
  login(event: Event): any {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.serviceUser.login(value.email.toString(),value.password.toString()).subscribe(data => { 
        if(data.length >0){
          this.storageService.setUser(data);
          window.location.href = 'home';
        }else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Datos incorrectos',
            showConfirmButton: false,
            timer: 1500
          })
        }       
      });
    }else
    {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Los datos ingresados son erroneos',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  registro(event: Event): any {
    event.preventDefault();
    if (this.formR.valid) {
      const value = this.formR.value;
      this.usuario = new Users('',value.email.toString(),value.password.toString(),value.telefono.toString(),value.user);
      this.serviceUser.create(this.usuario).subscribe(data=>{
        if(data){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario Creado',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ya existe una cuenta con ese correo',
            showConfirmButton: false,
            timer: 1500
          })
        }
      });
      console.log(`'%c'USER: ${value.email} - PASSWORD: ${value.password}`, 'background: #222; color: #bada55');
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Los datos ingresados son erroneos',
        showConfirmButton: false,
        timer: 1500
      })
    }

  }


}
