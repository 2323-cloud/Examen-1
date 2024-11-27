import { Component, OnInit, ViewChild } from '@angular/core';
import { Platos } from './interface/platos';
import { PlatosService } from './services/platos.service';
import { CardComponent } from './card/card.component';
import { ModalAgregarComponent } from './modal-agregar/modal-agregar.component';



@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [CardComponent, ModalAgregarComponent],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit{
  platos:Platos | undefined

  @ViewChild(ModalAgregarComponent) public modal!: ModalAgregarComponent

  constructor(private _srvPlatos:PlatosService){}

  ngOnInit(): void {
    this._srvPlatos.getPlatos().subscribe(platos => {
      this.platos = platos
    })
  }

  openmodal(){
    if(this.modal){
      this.modal.open()
    }
  }
}
