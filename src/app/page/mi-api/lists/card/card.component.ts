import { Component, Input, ViewChild } from '@angular/core';
import { Plato, Platos } from '../interface/platos';
import { CommonModule, NgFor } from '@angular/common';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component';
import { PlatosService } from '../services/platos.service';

@Component({
  selector: 'app-cardP',
  standalone: true,
  imports: [NgFor, CommonModule, ModalEditarComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() platosC:Platos | undefined

  @ViewChild(ModalEditarComponent) public modal!: ModalEditarComponent

  constructor(private _srvPlato:PlatosService){}

  openModal(plato:Plato){
    if(this.modal){
      this.modal.open(plato)
    }
  }

  eliminar(id:string){
    this._srvPlato.deletePlato(id).subscribe({
      next: next => {
        console.log('Eliminado')
        this._srvPlato.getPlatos().subscribe(plat => {
          this.platosC = plat
        })
      }
    })
  }
}
