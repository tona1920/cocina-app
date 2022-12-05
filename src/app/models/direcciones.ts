export class Direcciones {
    id: number;
    calle: String;
    municipio: string;
    estado: string;
    usuario: number;
    colonia: string;
    constructor(id: number,calle:string,colonia:string,estado:string,municipio:string,usuario:number){
        this.id=id;
        this.calle=calle;
        this.colonia=colonia;
        this.estado=estado;
        this.municipio=municipio;
        this.usuario=usuario;
    }
}
