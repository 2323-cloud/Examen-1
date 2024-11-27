import { Component, ElementRef, Inject, Input, NgModule, PLATFORM_ID, ViewChild } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { Plato } from '../interface/platos';
import { PlatosService } from '../services/platos.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-modal-editar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal-editar.component.html',
  styleUrl: './modal-editar.component.css'
})
export class ModalEditarComponent {
  @ViewChild('modalElement') public modal!: ElementRef;
  private bootstrapModal: any;
  
  @Input() plato: Plato = {
    _id: '',
    name: '',
    description: '',
    price: 0,
    isAvailable: true,
    category: '',
    createdAt: new Date(),
  };

  constructor(
    @Inject(PLATFORM_ID) private plataformId: object,
    private _srvPlato: PlatosService
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.plataformId)) {
      this.inicializarModal();
    }
  }

  inicializarModal() {
    import('bootstrap').then((boostrap) => {
      this.bootstrapModal = new boostrap.Modal(this.modal.nativeElement);
    });
  }

  open(plato: Plato) {
    this.plato = { ...plato }; // Cargar el plato seleccionado en los campos del formulario
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

  editPlato(name: string, category: string, description: string, price: string) {
    // Validación de campos vacíos
    if (!name || !category || !description || !price) {
      alert('Todos los campos son obligatorios. Por favor, rellene todos los campos.');
      return; // Detiene la ejecución si algún campo está vacío
    }

    // Validación adicional para el campo de precio (debe ser un número válido)
    if (isNaN(Number(price)) || Number(price) <= 0) {
      alert('El precio debe ser un número válido mayor a 0.');
      return; // Detiene la ejecución si el precio no es válido
    }

    // Actualizar los datos del plato
    const updatedPlato = {
      name,
      category,
      description,
      price: Number(price),
      isAvailable: this.plato.isAvailable, // Mantener el estado de disponibilidad
      createdAt: this.plato.createdAt, // Mantener la fecha de creación
    };

    // Llamar al servicio para actualizar el plato
    this._srvPlato.putPlatos(this.plato._id!, updatedPlato).subscribe({
      next: (res) => {
        console.log('Plato actualizado');
        this.closeModal(); // Cierra el modal
        window.location.reload(); // Recarga la página o actualiza la lista
      },
      error: (error) => {
        console.log(`Error al actualizar el plato: ${error}`);
      }
    });
  }

}
