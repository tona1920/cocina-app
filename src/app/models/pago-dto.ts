export class PagoDTO {
    nombre: string;
    imagen: string;
    descripcion: string;
    precio: number;
    cantidad: number;
    id_usuario: number;
    id_direccion: number;
    id_producto: number;
    constructor(nombre:string,imagen:string,descripcion:string,precio:number,cantidad:number,usuario:number,direccion:number, producto:number){
        this.nombre=nombre;
        this.imagen=imagen;
        this.descripcion=descripcion;
        this.precio=precio;
        this.cantidad=cantidad;
        this.id_usuario=usuario;
        this.id_direccion=direccion;
        this.id_producto=producto;
    }
}
