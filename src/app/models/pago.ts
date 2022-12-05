export class Pago {
    id: number;
    nombre: string;
    imagen: string;
    descripcion: string;
    precio: number;
    cantidad: number;
    usuario: number;
    direccion: number;
    constructor(id: number,nombre:string,imagen:string,descripcion:string,precio:number,cantidad:number,usuario:number,direccion:number){
        this.id=id;
        this.nombre=nombre;
        this.imagen=imagen;
        this.descripcion=descripcion;
        this.precio=precio;
        this.cantidad=cantidad;
        this.usuario=usuario;
        this.direccion=direccion;
    }
}
