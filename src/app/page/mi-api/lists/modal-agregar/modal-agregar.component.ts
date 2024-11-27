import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { PlatosService } from '../services/platos.service';
import { isPlatformBrowser } from '@angular/common';
import { Plato } from '../interface/platos';

@Component({
  selector: 'app-modal-agregar',
  standalone: true,
  imports: [],
  templateUrl: './modal-agregar.component.html',
  styleUrl: './modal-agregar.component.css'
})
export class ModalAgregarComponent {
  @ViewChild('modalElement') public modal!: ElementRef;
  private bootstrapModal: any;

  constructor(
    @Inject(PLATFORM_ID) private plataformId: object,
    private _srvPlatos: PlatosService,
  ) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.plataformId)) {
      this.inicializarModal();
    }
    if (this.modal) {
      console.log('Modal inicializado:', this.modal);
    }
  }

  inicializarModal() {
    import('bootstrap').then((boostrap) => {
      this.bootstrapModal = new boostrap.Modal(this.modal.nativeElement);
    });
  }

  open() {
    if (isPlatformBrowser(this.plataformId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.show();
      } else {
        this.inicializarModal();
        setTimeout(() => {
          this.bootstrapModal.show();
        }, 0);
      }
    }
  }

  closeModal() {
    if (isPlatformBrowser(this.plataformId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.hide();
      } else {
        console.error('El modal no está inicializado.');
      }
    }
  }

  Agregar(name: string, category: string, description: string, price: string) {
    if (!name || !category || !description || !price) {
      alert('Todos los campos son obligatorios. Por favor, rellene todos los campos.');
      return; 
    }
  
    if (isNaN(Number(price)) || Number(price) <= 0) {
      alert('El precio debe ser un número válido mayor a 0.');
      return;
    }
    const newPlato:Plato = {
      name,
      description,
      price: Number(price),
      isAvailable: true,
      category,
      createdAt: new Date()
    };

    this._srvPlatos.postPlatos(newPlato).subscribe({
      next: (res) => {
        console.log('Plato agregado');
        this.closeModal();
        window.location.reload();
      },
      error: (error) => {
        console.log(`Error al agregar el plato: ${error}`);
      }
    });
  }
}
