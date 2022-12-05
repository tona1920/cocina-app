
export class ProductoDTO {
    id:number;
	nombre:string;
	descripcion:string;
	precio:number;
	imagen:string;
	idusuario:number;
	opcion1:number;
	opcion2:number;
	opcion3:number;
    
    constructor(id:number,nombre:string,descripcion:string,precio:number,imagen:string,idusuario:number,opcion1:number,opcion2:number,opcion3:number){
        this.id=id;
        this.descripcion=descripcion;
        this.idusuario=idusuario;
        this.imagen=imagen;
        this.nombre=nombre;
        this.precio=precio;
        this.opcion1=opcion1;
        this.opcion2=opcion2;
        this.opcion3=opcion3;
    }
}
