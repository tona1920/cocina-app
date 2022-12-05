export class Users {
    id: number;
    correo: string;
    contrasena: string;
    telefono: string;
    usuario: string;

    constructor(id, correo, contrasena,telefono, usuario) {
        this.id = id;
        this.contrasena = contrasena;
        this.correo = correo;
        this.telefono = telefono;
        this.usuario = usuario;
    }
}
